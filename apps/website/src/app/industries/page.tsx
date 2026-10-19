import { PageLayout } from "@/components/layout/PageLayout"; import { Img } from "@/components/Img"; import { Reveal } from "@/components/motion/Reveal"; import { industries } from "@/content/site";
export const metadata = { title: "Industries" };
export default function Industries() {
  return <PageLayout><section className="page-banner"><div className="container"><h1>Built for the way your industry works</h1></div></section>
    <section className="section"><div className="container grid grid--2">{industries.map((x, i) => <Reveal key={x.title} index={i}><article className="card card--interactive stack"><Img name="industryImage" alt={`${x.title} worksite`} /><h3>{x.title}</h3><p>{x.text}</p></article></Reveal>)}</div></section></PageLayout>;
}
