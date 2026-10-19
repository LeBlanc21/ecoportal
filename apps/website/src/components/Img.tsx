import { assets, type AssetKey } from "@/config/assets";
/** Renders a named asset with reserved space (no layout shift). Override alt per use if needed. */
export function Img({ name, alt, parallax = false, priority = false }: { name: AssetKey; alt?: string; parallax?: boolean; priority?: boolean }) {
  const a = assets[name];
  return <div className={`img-slot${parallax ? " parallax" : ""}`} style={{ "--ratio": a.ratio } as React.CSSProperties}>
    <img src={a.src} alt={alt ?? a.alt} loading={priority ? "eager" : "lazy"} decoding="async" /></div>;
}
