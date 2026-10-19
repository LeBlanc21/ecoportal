import { useState, type FormEvent } from "react";
export function Support() {
  const [s, setS] = useState<"idle" | "loading" | "success" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = e.currentTarget; setS("loading");
    try { const r = await fetch(`${import.meta.env.VITE_API_URL}/support`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(f))) });
      if (!r.ok) throw new Error(); setS("success"); f.reset(); } catch { setS("error"); }
  }
  return <div className="stack"><h1 className="page-title">Help and support</h1><p>Describe the problem and we&apos;ll reply by email. For urgent safety issues, follow your site emergency procedure first.</p>
    <form onSubmit={submit} className="card stack" style={{ maxWidth: 560 }}>
      <div className="field"><label htmlFor="topic">Topic</label><select id="topic" name="topic" className="input"><option>Using the app</option><option>Report a bug</option><option>Access or permissions</option></select></div>
      <div className="field"><label htmlFor="msg">What do you need help with?</label><textarea id="msg" name="message" className="input" required /></div>
      <button className="btn btn--primary" disabled={s === "loading"}>{s === "loading" ? "Sending…" : "Send to support"}</button>
      {s === "success" && <p className="alert alert--success" role="status">Request sent. We&apos;ll reply by email.</p>}
      {s === "error" && <p className="alert alert--danger" role="alert">Your request wasn&apos;t sent. Check your connection and try again.</p>}</form></div>;
}
