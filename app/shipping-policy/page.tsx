import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { LegalPage } from "../components/legal-page";

export const metadata: Metadata = {
  title: "Shipping Policy | PR Associates",
  description: "Shipping policy for PR Associates pan-India order delivery.",
};

const sections = [
  {
    heading: "Delivery Timelines",
    paragraphs: [
      "PR Associates ensures timely and reliable pan-India delivery of all corporate gifting orders, with dispatch timelines ranging from 7 to 25 business days depending on order volume and complexity.",
      "These timelines commence from the date of final artwork approval and confirmed advance payment.",
    ],
  },
  {
    heading: "Shipping Charges And Tracking",
    paragraphs: [
      "We partner with reputed national logistics providers, with shipping charges calculated based on order weight, delivery location, and consignment size, and communicated transparently in the final quotation.",
      "Clients receive a tracking number upon dispatch.",
    ],
  },
  {
    heading: "Delivery Responsibility And Damage Claims",
    paragraphs: [
      "Clients are responsible for providing accurate delivery information, and PR Associates is not liable for non-delivery arising from incorrect address details.",
      "In the event of transit damage, clients must inspect consignments upon delivery, document any damage on the courier's receipt, and report the matter with photographic evidence within 48 hours for further resolution.",
    ],
  },
  {
    heading: "Service Area",
    paragraphs: [
      "PR Associates currently fulfils orders within India only and does not offer international shipping.",
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LegalPage
        title="Shipping Policy"
        intro="Here’s how we handle dispatch, delivery, tracking, and damage reporting for all corporate gifting orders."
        sections={sections}
      />
      <SiteFooter />
    </div>
  );
}