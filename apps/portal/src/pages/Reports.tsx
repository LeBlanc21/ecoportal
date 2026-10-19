import { useState } from "react";
/** TODO: load from your API. Records are sensitive: enforce access on the server, not here. */
const rows = [{ id: "R-104", title: "Wet floor near dock 2", status: "Open" }, { id: "R-103", title: "Missing guard on press 4", status: "In review" }, { id: "R-102", title: "Near miss: forklift", status: "Closed" }];
const badge = { Open: "danger", "In review": "warning", Closed: "success" } as const;
export function Reports() {
  const [q, setQ] = useState(""); const list = rows.filter(r => (r.title + r.id).toLowerCase().includes(q.toLowerCase()));
  return <div className="stack"><h1 className="page-title">Reports</h1>
    <div className="field" style={{ maxWidth: 360 }}><label htmlFor="q">Search reports</label><input id="q" className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="Title or ID" /></div>
    <div className="card" style={{ padding: 0, overflowX: "auto" }}><table className="table"><thead><tr><th>ID</th><th>Title</th><th>Status</th></tr></thead>
      <tbody>{list.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.title}</td><td><span className={`badge badge--${badge[r.status as keyof typeof badge]}`}>{r.status}</span></td></tr>)}</tbody></table>
      {!list.length && <p style={{ padding: "1rem" }}>No reports match &ldquo;{q}&rdquo;. Try a different title or ID.</p>}</div></div>;
}
