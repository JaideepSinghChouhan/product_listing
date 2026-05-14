import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { LegalPage } from "../components/legal-page";

export const metadata: Metadata = {
  title: "Refund & Exchange Policy | PR Associates",
  description: "Refund and exchange policy for PR Associates customized orders.",
};

const sections = [
  {
    heading: "No Refunds Or Exchanges",
    paragraphs: [
      "PR Associates maintains a strict no-refund and no-exchange policy for all customized orders.",
      "All products are manufactured to client specifications and cannot be altered, restocked, or returned for refunds once the order has been confirmed and production has commenced.",
    ],
  },
  {
    heading: "Client Responsibility Before Production",
    paragraphs: [
      "This policy applies uniformly to all transactions regardless of the circumstances.",
      "Clients are advised to exercise due diligence during the artwork approval phase to ensure complete satisfaction before authorizing production.",
    ],
  },
  {
    heading: "Review Before Confirmation",
    paragraphs: [
      "We encourage clients to carefully review all specifications, design elements, and quantity requirements prior to final confirmation.",
    ],
  },
];

export default function RefundExchangePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LegalPage
        title="Refund & Exchange Policy"
        intro="Customized products are made to order, so all confirmation and production steps are final."
        sections={sections}
      />
      <SiteFooter />
    </div>
  );
}