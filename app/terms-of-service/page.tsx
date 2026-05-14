import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { LegalPage } from "../components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | PR Associates",
  description: "Terms of service for PR Associates B2B engagements and website use.",
};

const sections = [
  {
    heading: "Scope And Order Confirmation",
    paragraphs: [
      "These Terms of Service govern all engagements between PR Associate and its B2B clients, including order placement, customization, payment, and website use.",
      "All orders are confirmed exclusively upon written acknowledgement by PR Associate, client approval of the pre-production artwork proof, and receipt of the agreed advance payment.",
    ],
  },
  {
    heading: "Payment And Production",
    paragraphs: [
      "The standard payment structure comprises 50% of the order value due at the time of booking and order confirmation, with the remaining 50% payable prior to dispatch.",
      "No refunds or exchanges shall be permitted under any circumstances following order confirmation and the commencement of production.",
    ],
  },
  {
    heading: "Client Materials And Liability",
    paragraphs: [
      "Clients submitting brand assets for customization warrant and represent that they hold all necessary intellectual property rights and licenses, and PR Associate assumes no liability for infringement claims arising from client-supplied materials.",
      "PR Associate's total liability in any dispute shall be limited to the invoice value of the specific order concerned.",
    ],
  },
  {
    heading: "Governing Law And Amendments",
    paragraphs: [
      "These Terms are governed by the laws of India, with all disputes subject to the exclusive jurisdiction of the courts located in Jaipur, Rajasthan.",
      "PR Associate reserves the right to amend these Terms at any time, and continued engagement with the company shall constitute acceptance of any such amendments.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LegalPage
        title="Terms of Service"
        intro="These terms govern B2B engagements, website use, order confirmation, payment, and liability limits."
        sections={sections}
      />
      <SiteFooter />
    </div>
  );
}