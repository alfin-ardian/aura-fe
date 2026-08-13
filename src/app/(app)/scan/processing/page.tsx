import { redirect } from "next/navigation";

export default function LegacyScanProcessingRedirect() {
  redirect("/scan");
}
