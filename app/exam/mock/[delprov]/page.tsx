import { notFound } from "next/navigation";
import { MockRunner } from "./MockRunner";
import type { Delprov } from "@/lib/domain/types";

// Server wrapper: awaits the route params/searchParams (Promises in Next 16)
// and hands typed props to the interactive client runner.
export default async function MockPage({
  params,
  searchParams,
}: {
  params: Promise<{ delprov: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { delprov } = await params;
  const { mode } = await searchParams;
  const d = Number(delprov);
  if (d !== 1 && d !== 2) notFound();
  return <MockRunner delprov={d as Delprov} short={mode === "short"} />;
}
