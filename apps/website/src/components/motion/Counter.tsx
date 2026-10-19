"use client";
import { useEffect, useRef, useState } from "react";
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null); const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current; if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now(); const tick = (t: number) => { const k = Math.min((t - t0) / 1200, 1); setN(Math.round(value * (1 - (1 - k) ** 3))); if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
    io.observe(el); return () => io.disconnect();
  }, [value]);
  return <span ref={ref} className="metric">{n}{suffix}</span>;
}
