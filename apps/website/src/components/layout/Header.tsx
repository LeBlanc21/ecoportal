import { assets } from "@/config/assets";
const nav = [["/", "Home"], ["/features", "Platform"], ["/industries", "Industries"], ["/about", "About"], ["/contact", "Contact"]];
export function Header() {
  return <header className="site-header"><div className="container site-header__in">
    <a href="/" aria-label="ecoPortal home"><img src={assets.logo.src} alt="ecoPortal" height={32} width={128} /></a>
    <nav aria-label="Main"><ul>{nav.map(([h, l]) => <li key={h}><a className="navlink" href={h}>{l}</a></li>)}</ul></nav>
    <a className="btn btn--primary" href="/contact">Request a demo</a></div></header>;
}
