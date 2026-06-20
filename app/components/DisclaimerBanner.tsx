import { PERSISTENT_DISCLAIMER_FR } from "@/lib/config/examConfig";

// Persistent legal disclaimer (spec §13). Always visible — never claims to be
// official, never promises a pass.
export function DisclaimerBanner() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-600">
      <p className="max-w-3xl mx-auto px-4 py-3 text-xs leading-relaxed">
        ⚠️ {PERSISTENT_DISCLAIMER_FR}
      </p>
    </footer>
  );
}
