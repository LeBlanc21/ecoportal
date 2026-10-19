import { useEffect, useState } from "react";
type Data = { metrics: { label: string; value: number }[]; weekly: number[] };
/** TODO: replace with fetch(`${import.meta.env.VITE_API_URL}/dashboard`). Demo data only. */
const demo: Data = { metrics: [{ label: "Open reports", value: 18 }, { label: "Actions overdue", value: 3 }, { label: "Inspections this week", value: 24 }], weekly: [4, 7, 5, 9, 6, 8, 3] };
export function Dashboard() {
  const [d, setD] = useState<Data | null>(null);
  useEffect(() => { const t = setTimeout(() => setD(demo), 700); return () => clearTimeout(t); }, []);
  const max = Math.max(...(d?.weekly ?? [1]));
  return <div className="stack" style={{ ["--stack" as string]: "1.5rem" }}><h1 className="page-title">Dashboard</h1>
    <div className="grid grid--3">{(d?.metrics ?? [0, 1, 2]).map((m, i) => typeof m === "number"
      ? <div key={i} className="card"><div className="skeleton" style={{ height: 14, width: "50%", marginBottom: 12 }} /><div className="skeleton" style={{ height: 36, width: "30%" }} /></div>
      : <div key={m.label} className="card card--interactive"><p className="caption">{m.label}</p><span className="metric">{m.value}</span></div>)}</div>
    <section className="card" aria-labelledby="w"><h2 id="w" style={{ fontSize: "var(--font-size-xl)" }}>Reports filed this week</h2>
      {d ? <div className="bars" role="img" aria-label={`Reports per day: ${d.weekly.join(", ")}`}>{d.weekly.map((v, i) => <div key={i} className="bar" style={{ height: `${(v / max) * 100}%`, transitionDelay: `${i * 60}ms` }} title={String(v)} />)}</div>
        : <div className="skeleton" style={{ height: 160 }} />}</section></div>;
}
