"use client";

import { useState } from "react";
import { assets } from "@/config/assets";
const nav = [
  ["/", "Home"],
  ["/features", "Platform"],
  ["/industries", "Industries"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__in">
        <a href="/" aria-label="ecoPortal home">
          <img src={assets.logo.src} alt="ecoPortal" height={32} width={128} />
        </a>
        <button
          className="site-header__menu-toggle"
          type="button"
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav
          id="site-navigation"
          className={`site-header__nav${menuOpen ? " site-header__nav--open" : ""}`}
          aria-label="Main"
        >
          <ul>
            {nav.map(([h, l]) => (
              <li key={h}>
                <a className="navlink" href={h} onClick={() => setMenuOpen(false)}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--primary site-header__cta" href="/contact">
          Request a demo
        </a>
      </div>
    </header>
  );
}
