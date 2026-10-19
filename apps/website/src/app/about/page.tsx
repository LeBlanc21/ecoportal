import { PageLayout } from "@/components/layout/PageLayout"; import { Img } from "@/components/Img"; import { Reveal } from "@/components/motion/Reveal";
export const metadata = { title: "About" };
export default function About() {
  return <PageLayout><section className="page-banner"><div className="container"><h1>About ecoPortal</h1><Img name="aboutBanner" parallax priority /></div></section>
    <section className="section"><div className="container grid grid--2"><Reveal effect="left" className="stack"><h2>Why we built it</h2><p>Replace with your company story: who you are, why workplace safety matters to you, and what you do differently.</p></Reveal>
      <Reveal effect="right"><Img name="teamImage" /></Reveal></div></section></PageLayout>;
}
