"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Accueil" },
  { href: "/exam", label: "Examen" },
  { href: "/signs", label: "Panneaux" },
  { href: "/calc", label: "Calculs" },
  { href: "/phrases", label: "Phrases" },
  { href: "/eligibility", label: "Éligibilité" },
  { href: "/booking", label: "Démarches" },
];

export function NavBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 bg-amber-400 text-slate-900 shadow">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <Link href="/" className="font-bold text-lg tracking-tight">
          🚕 TaxiSvenska <span className="font-normal">Français</span>
        </Link>
        <nav className="mt-2 flex flex-wrap gap-1 text-sm">
          {LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1 transition-colors ${
                  active
                    ? "bg-slate-900 text-amber-300"
                    : "bg-amber-300/60 hover:bg-amber-300"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
