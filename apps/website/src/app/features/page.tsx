import { PageLayout } from "@/components/layout/PageLayout"; import { Img } from "@/components/Img"; import { Reveal } from "@/components/motion/Reveal"; import { features } from "@/content/site";
export const metadata = { title: "Platform features" };
export default function Features() {
  return <PageLayout><section className="page-banner"><div className="container grid grid--2"><div className="stack"><h1>One platform for safety work</h1><p>From the first report to the closed action.</p></div><Img name="platformPreview" priority /></div></section>
    <section className="section section--alt"><div className="container grid grid--3">{features.map((f, i) => <Reveal key={f.title} index={i}><article className="card card--interactive"><h3>{f.title}</h3><p>{f.text}</p></article></Reveal>)}</div></section></PageLayout>;
}
