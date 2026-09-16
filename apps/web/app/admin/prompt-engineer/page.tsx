import { getCurrentSessionRsc } from "@/lib/session-rsc";
import { redirect } from "next/navigation";
import PromptEngineerClient from "./prompt-engineer-client";

export default async function PromptEngineerPage() {
  const session = await getCurrentSessionRsc();
  if (!session || session.role !== "admin") redirect("/login");

  return <PromptEngineerClient email={session.email} />;
}
