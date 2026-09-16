import { getCurrentSessionRsc } from "@/lib/session-rsc";
import { redirect } from "next/navigation";
import HermesReportsClient from "./hermes-reports-client";
import { HERMES_REPORTS } from "./reports-data";

export default async function HermesReportsPage() {
  const session = await getCurrentSessionRsc();
  if (!session || session.role !== "admin") redirect("/login");

  const isHudson = session.email?.toLowerCase() === "hudsonargollo@gmail.com";

  return <HermesReportsClient reports={HERMES_REPORTS} isHudson={isHudson} email={session.email} />;
}
