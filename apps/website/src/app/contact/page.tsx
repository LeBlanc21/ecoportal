import { PageLayout } from "@/components/layout/PageLayout"; import { Img } from "@/components/Img"; import { ContactForm } from "@/components/contact/ContactForm";
export const metadata = { title: "Contact" };
export default function Contact() {
  // cta={false}: this page's full form is the contact section, so we never show two forms back to back.
  return <PageLayout cta={false}><section className="page-banner"><div className="container"><h1>Contact us</h1><Img name="contactBanner" priority /></div></section>
    <section className="section section--tint" id="contact-cta"><div className="container"><h2>Let&apos;s Build a Safer Workplace Together</h2>
      <p>Discover how ecoPortal can help your organization improve safety engagement, simplify reporting, and create healthier work environments.</p>
      <div className="card"><ContactForm variant="full" /></div></div></section></PageLayout>;
}
