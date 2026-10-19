import { useState } from "react"; import { NavLink, Outlet, useLocation } from "react-router-dom"; import { useAuth } from "../lib/auth";
const links = [["/", "Dashboard"], ["/reports", "Reports"], ["/support", "Help and support"]];
export function AppLayout() {
  const [open, setOpen] = useState(true); const u = useAuth(); const { pathname } = useLocation();
  return <div className={`shell${open ? "" : " shell--collapsed"}`}>
    <aside className="sidebar" aria-label="Sidebar"><button className="btn btn--secondary" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle sidebar">{open ? "Collapse" : "☰"}</button>
      <nav><ul>{links.map(([to, l]) => <li key={to}><NavLink to={to} end={to === "/"} className="side-link"><span>{l}</span></NavLink></li>)}</ul></nav></aside>
    <div className="shell__main"><header className="topbar"><strong>ecoPortal</strong><span className="caption">{u?.name} · {u?.role}</span></header>
      <main id="main" key={pathname} className="view-enter"><Outlet /></main></div></div>;
}
