import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { LegalPage } from "../components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | PR Associates",
  description: "Privacy policy for PR Associates corporate gifting services.",
};

const sections = [
  {
    heading: "Information We Collect",
    paragraphs: [
      "PR Associates, headquartered in Jaipur, Rajasthan, India, is committed to safeguarding the privacy of its clients, partners, and website visitors.",
      "We collect business and contact information, order and transaction data, communication records, and website usage data solely for the purposes of processing orders, generating documentation, providing customer support, and improving our services.",
    ],
  },
  {
    heading: "How We Use And Share Data",
    paragraphs: [
      "Your data is never sold or rented to third parties. It is shared only with trusted logistics partners, payment gateways, and manufacturing vendors on a need-to-know basis, all of whom are bound by confidentiality obligations.",
    ],
  },
  {
    heading: "Retention And Security",
    paragraphs: [
      "We retain data in accordance with applicable Indian laws and employ industry-standard security measures, including SSL encryption, to help protect client information.",
    ],
  },
  {
    heading: "Your Rights",
    paragraphs: [
      "Clients may access, correct, or request deletion of their data at any time by contacting us directly.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LegalPage
        title="Privacy Policy"
        intro="This policy explains how PR Associates collects, uses, protects, and shares information when you interact with our website and business services."
        sections={sections}
      />
      <SiteFooter />
    </div>
  );
}