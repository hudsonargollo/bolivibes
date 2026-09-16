import type { Metadata } from "next";
import TermsClient from "./terms-client";

export const metadata: Metadata = {
  title: "BoliVibes · Terms of Service",
  description: "Terms and Conditions for using BoliVibes — Santa Cruz de la Sierra city network and BoliPass.",
};

export default function TermsPage() {
  return <TermsClient />;
}
