import type { Metadata } from "next";
import PrivacyClient from "./privacy-client";

export const metadata: Metadata = {
  title: "BoliVibes · Privacy Policy",
  description: "Privacy Policy for BoliVibes — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
