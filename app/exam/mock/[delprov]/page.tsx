import { notFound } from "next/navigation";
import { MockRunner } from "./MockRunner";
import type { Delprov } from "@/lib/domain/types";

// Pre-render both delprov so the route works in a static export (required to
// bundle the app inside the Capacitor Android shell). The `mode=short` flag is
// read client-side in MockRunner, so no server-side searchParams are needed.
export function generateStaticParams() {
  return [{ delprov: "1" }, { delprov: "2" }];
}
export const dynamicParams = false;

export default async function MockPage({
  params,
}: {
  params: Promise<{ delprov: string }>;
}) {
  const { delprov } = await params;
  const d = Number(delprov);
  if (d !== 1 && d !== 2) notFound();
  return <MockRunner delprov={d as Delprov} />;
}
