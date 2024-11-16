import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingCard from "./setting-card";

export default async function Settings() {
  const session = await auth();

  if (!session) redirect("/");

  if (session) {
    return <SettingCard session={session} />;
  }
}
