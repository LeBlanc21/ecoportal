import { Header } from "./Header"; import { Footer } from "./Footer"; import { ContactCTA } from "../contact/ContactCTA";
/** Every public page uses this. The contact section is added here once, so no page can forget it.
 *  Pass cta={false} only on /contact, whose main form already fills that slot. */
export function PageLayout({ children, cta = true }: { children: React.ReactNode; cta?: boolean }) {
  return <><a href="#main" className="skip">Skip to content</a><Header /><main id="main">{children}</main>{cta && <ContactCTA />}<Footer /></>;
}
