"use client";
import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
/** Adds data-visible once the element enters the viewport. Animation itself lives in animations.css. */
export function Reveal({ as: Tag = "div", effect = "up", index = 0, className, children }:
  { as?: ElementType; effect?: "up" | "left" | "right" | "scale"; index?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.dataset.visible = "true"; io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag ref={ref} data-reveal={effect === "up" ? "" : effect} className={className} style={{ "--i": index } as CSSProperties}>{children}</Tag>;
}
