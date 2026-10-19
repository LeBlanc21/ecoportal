import { PageLayout } from "@/components/layout/PageLayout"; import { Img } from "@/components/Img"; import { Reveal } from "@/components/motion/Reveal"; import { Counter } from "@/components/motion/Counter";
import { features, stats } from "@/content/site";
const d = (i: number) => ({ "--i": i }) as React.CSSProperties;
export default function Home() {
  return <PageLayout>
    <section className="hero"><div className="container grid grid--2 hero__in">
      <div className="stack"><h1 className="hero-in" style={d(0)}>Safety reports people actually file</h1>
        <p className="hero-in" style={d(1)}>ecoPortal makes it quick to report hazards, run inspections, and close actions, so your team spots problems before they become incidents.</p>
        <p className="hero-in" style={d(2)}><a className="btn btn--primary" href="/contact">Request a demo</a> <a className="btn btn--secondary" href="/features">See the platform</a></p></div>
      <div className="hero-in" style={d(3)}><Img name="homeHero" priority parallax /></div></div></section>
    <section className="section section--alt" aria-labelledby="f"><div className="container"><Reveal><h2 id="f">Everything safety teams need in one place</h2></Reveal>
      <div className="grid grid--3">{features.map((f, i) => <Reveal key={f.title} index={i}><article className="card card--interactive"><h3>{f.title}</h3><p>{f.text}</p></article></Reveal>)}</div></div></section>
    <section className="section" aria-labelledby="s"><div className="container"><Reveal><h2 id="s">Results teams see</h2></Reveal>
      <div className="grid grid--3">{stats.map((s, i) => <Reveal key={s.label} index={i}><Counter value={s.value} suffix={s.suffix} /><p className="caption">{s.label}</p></Reveal>)}</div></div></section>
  </PageLayout>;
}
