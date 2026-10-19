import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setError("Sign-in failed. Check your email and password.");
        return;
      }

      const from = location.state?.from;
      const destination =
        from &&
        typeof from.pathname === "string" &&
        from.pathname.startsWith("/") &&
        !from.pathname.startsWith("//")
          ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
          : "/";

      navigate(destination, { replace: true });
    } catch {
      setError("Unable to sign in. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="view-enter"
      style={{ maxWidth: 440, margin: "10vh auto", padding: "0 1rem" }}
    >
      <h1 style={{ fontSize: "var(--font-size-3xl)" }}>
        Sign in to ecoPortal
      </h1>

      <p>Enter your account details to continue.</p>

      <form onSubmit={submit} className="card stack">
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="alert alert--danger" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}