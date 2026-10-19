import { ContactForm } from "./ContactForm"; import { Img } from "../Img"; import { Reveal } from "../motion/Reveal";
/** Shared section rendered by PageLayout right before the footer. */
export function ContactCTA() {
  return (
    <section className="section section--tint" id="contact-cta" aria-labelledby="cta-title">
      <div className="container grid grid--2 cta-grid">
        <Reveal effect="left" className="stack">
          <h2 id="cta-title">Let&apos;s Build a Safer Workplace Together</h2>
          <p>Discover how ecoPortal can help your organization improve safety engagement, simplify reporting, and create healthier work environments.</p>
          <Img name="ctaVisual" alt="" />
          <a className="btn btn--secondary" href="/contact">Schedule a demo</a>
        </Reveal>
        <Reveal effect="right"><div className="card"><ContactForm variant="short" /></div></Reveal>
      </div>
    </section>);
}
