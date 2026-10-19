import { NextResponse } from "next/server"; import nodemailer from "nodemailer";
export const runtime = "nodejs";
const hits = new Map<string, number[]>(); // In-memory limiter: swap for Redis/Upstash when running multiple instances.
const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown", now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  hits.set(ip, [...recent, now]);
  let b: Record<string, unknown>; try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot: silently drop bots
  const d = { name: clean(b.name, 120), email: clean(b.email, 200), company: clean(b.company, 160), phone: clean(b.phone, 40), subject: clean(b.subject, 160) || "Website inquiry", inquiry: clean(b.inquiry, 60), message: String(b.message ?? "").trim().slice(0, 5000) };
  if (!d.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || !d.message) return NextResponse.json({ error: "Please complete the required fields with valid details." }, { status: 422 });
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECIPIENT, CONTACT_FROM, CONTACT_SEND_CONFIRMATION } = process.env;
  if (!SMTP_HOST || !CONTACT_RECIPIENT || !CONTACT_FROM) return NextResponse.json({ error: "Messaging isn't configured yet. Please try again later." }, { status: 503 });
  try {
    const t = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT) || 587, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined });
    await t.sendMail({ from: CONTACT_FROM, to: CONTACT_RECIPIENT, replyTo: d.email, subject: `[${d.inquiry}] ${d.subject}`,
      text: `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company}\nPhone: ${d.phone}\nType: ${d.inquiry}\n\n${d.message}` });
    if (CONTACT_SEND_CONFIRMATION === "true") await t.sendMail({ from: CONTACT_FROM, to: d.email, subject: "We received your message", text: "Thank you for contacting ecoPortal. Our team will follow up with you." });
    return NextResponse.json({ ok: true }); // only after the mail server accepted it
  } catch { return NextResponse.json({ error: "We couldn't send your message. Please try again." }, { status: 502 }); }
}
