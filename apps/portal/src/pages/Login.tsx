export function Login() {
  return <main className="view-enter" style={{ maxWidth: 440, margin: "10vh auto", padding: "0 1rem" }}><h1 style={{ fontSize: "var(--font-size-3xl)" }}>Sign in to ecoPortal</h1>
    <p>Authentication isn&apos;t connected yet. Wire your provider in <code>src/lib/auth.tsx</code>, or set <code>VITE_DEV_AUTH_BYPASS=true</code> for local development only.</p></main>;
}
