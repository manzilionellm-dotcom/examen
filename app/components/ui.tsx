import Link from "next/link";

// Small shared presentational helpers (kept dependency-free).

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-slate-600 text-sm">{subtitle}</p>}
    </div>
  );
}

/** Surfaces that a displayed official figure is an unverified placeholder. */
export function VerifyBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded bg-rose-100 text-rose-700 text-[10px] font-semibold uppercase px-1.5 py-0.5 align-middle ${className}`}
      title="Valeur de référence — à vérifier auprès des autorités officielles"
    >
      À vérifier
    </span>
  );
}

export function TileLink({
  href,
  title,
  desc,
  emoji,
}: {
  href: string;
  title: string;
  desc: string;
  emoji: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-amber-400 hover:shadow transition"
    >
      <div className="text-2xl">{emoji}</div>
      <div className="mt-2 font-semibold">{title}</div>
      <div className="text-sm text-slate-600">{desc}</div>
    </Link>
  );
}

export function Meter({ value }: { value: number }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  const color =
    pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
