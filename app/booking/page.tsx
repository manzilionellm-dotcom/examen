import { LOGISTICS, OFFICIAL_SOURCES, SOURCE_BY_ID } from "@/lib/content/officialSources";
import { REFERENCE_FEES } from "@/lib/config/examConfig";
import { Card, PageTitle, VerifyBadge } from "@/app/components/ui";

// Booking & logistics guide (spec §5.9) — display only, links to authorities.
export default function Booking() {
  return (
    <div className="space-y-4">
      <PageTitle
        title="Démarches & logistique"
        subtitle="Guide d'orientation. Vérifiez toujours les détails actuels auprès des autorités officielles."
      />

      <Card>
        <h2 className="font-semibold mb-2">Frais de référence <VerifyBadge /></h2>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>Par delprov : ≈ {REFERENCE_FEES.perDelprov.value} {REFERENCE_FEES.perDelprov.currency}</li>
          <li>Körprov (pratique) : ≈ {REFERENCE_FEES.korprov.value} {REFERENCE_FEES.korprov.currency}</li>
          <li>Demande de légitimation : ≈ {REFERENCE_FEES.application.value} {REFERENCE_FEES.application.currency}</li>
        </ul>
      </Card>

      <div className="space-y-3">
        {LOGISTICS.map((item) => {
          const src = item.sourceId ? SOURCE_BY_ID(item.sourceId) : undefined;
          return (
            <Card key={item.id}>
              <h3 className="font-semibold">{item.titleFr}</h3>
              <p className="text-sm text-slate-700 mt-1">{item.bodyFr}</p>
              {item.referenceValue && (
                <p className="text-xs mt-1">
                  <span className="font-mono">{item.referenceValue}</span>
                </p>
              )}
              {src && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 underline mt-2 inline-block"
                >
                  {src.authorityName} ↗
                </a>
              )}
            </Card>
          );
        })}
      </div>

      <section>
        <h2 className="font-semibold mb-2">Sources officielles</h2>
        <div className="space-y-2">
          {OFFICIAL_SOURCES.map((s) => (
            <Card key={s.id} className="text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{s.authorityName}</span>
                <span className="text-xs text-slate-500">
                  {s.retrievedAt ? `Vérifié le ${s.retrievedAt}` : "Non encore vérifié"}
                  {!s.retrievedAt && <VerifyBadge className="ml-1" />}
                </span>
              </div>
              <p className="text-slate-600">{s.title}</p>
              <p className="text-xs text-slate-400">Revue prévue : {s.reviewDueDate}</p>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">
                {s.url} ↗
              </a>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
