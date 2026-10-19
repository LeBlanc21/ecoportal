"use client";
import { useState, type FormEvent } from "react";
const TYPES = [
  "Request a Demo",
  "Product Information",
  "Technical Support",
  "Partnership",
  "General Inquiry",
];
type Errors = Record<string, string>;
export function ContactForm({
  variant = "short",
}: {
  variant?: "short" | "full";
}) {
  const full = variant === "full";
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const d: Record<string, string> = {};

    new FormData(form).forEach((value, key) => {
      if (typeof value === "string") {
        d[key] = value;
      }
    });
    const er: Errors = {};
    if (!d.name?.trim()) er.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? ""))
      er.email = "Enter a valid work email, like name@company.com.";
    if (full && !d.subject?.trim()) er.subject = "Enter a subject.";
    if (!d.message?.trim()) er.message = "Tell us how we can help.";
    if (full && !d.consent) er.consent = "Please agree to the privacy notice.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMsg(
          body.error ?? "We couldn't send your message. Please try again.",
        );
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMsg("Network problem. Check your connection and try again.");
    }
  }
  const F = ({
    id,
    label,
    req,
    children,
    wide,
  }: {
    id: string;
    label: string;
    req?: boolean;
    children: React.ReactNode;
    wide?: boolean;
  }) => (
    <div className="field" style={wide ? { gridColumn: "1/-1" } : undefined}>
      <label htmlFor={`${id}-${variant}`}>
        {label}
        {req ? "" : " (optional)"}
      </label>
      {children}
      {errors[id] && (
        <span id={`${id}-${variant}-err`} className="field__error" role="alert">
          {errors[id]}
        </span>
      )}
    </div>
  );
  const p = (id: string) => ({
    id: `${id}-${variant}`,
    name: id,
    className: "input",
    "aria-invalid": !!errors[id],
    "aria-describedby": errors[id] ? `${id}-${variant}-err` : undefined,
  });
  if (status === "success")
    return (
      <div className="alert alert--success" role="status">
        Thank you for contacting ecoPortal. Your message has been received, and
        our team will follow up with you.
      </div>
    );
  return (
    <form onSubmit={onSubmit} noValidate className="contact-form">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hp"
      />
      <F id="name" label="Full name" req>
        <input {...p("name")} autoComplete="name" />
      </F>
      <F id="email" label="Work email" req>
        <input {...p("email")} type="email" autoComplete="email" />
      </F>
      <F id="company" label="Company name">
        <input {...p("company")} autoComplete="organization" />
      </F>
      {full && (
        <F id="phone" label="Phone number">
          <input {...p("phone")} type="tel" autoComplete="tel" />
        </F>
      )}
      {full && (
        <F id="subject" label="Subject" req wide>
          <input {...p("subject")} />
        </F>
      )}
      <F id="inquiry" label="Inquiry type" req>
        <select {...p("inquiry")} defaultValue={TYPES[0]}>
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </F>
      <F id="message" label="Message" req wide>
        <textarea {...p("message")} />
      </F>
      {full && (
        <div style={{ gridColumn: "1/-1" }}>
          <label>
            <input type="checkbox" name="consent" /> I agree that ecoPortal may
            use these details to respond to my inquiry.
          </label>
          {errors.consent && (
            <span className="field__error" role="alert">
              {" "}
              {errors.consent}
            </span>
          )}
        </div>
      )}
      <div style={{ gridColumn: "1/-1" }}>
        <button className="btn btn--primary" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p
            className="alert alert--danger"
            role="alert"
            style={{ marginTop: "1rem" }}
          >
            {msg}
          </p>
        )}
      </div>
    </form>
  );
}
