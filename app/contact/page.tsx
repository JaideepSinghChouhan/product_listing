import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { ContactSection } from "../components/home/contact-section"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
