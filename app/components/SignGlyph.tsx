// Original, synthetic road-sign glyphs (spec §16: never copy official artwork).
// These are schematic SVGs drawn from scratch for training recognition.

export function SignGlyph({ refId, size = 64 }: { refId: string; size?: number }) {
  const s = size;
  switch (refId) {
    case "warn_exclaim":
      return (
        <WarnTriangle s={s}>
          <text x="50" y="62" textAnchor="middle" fontSize="34" fontWeight="700">
            !
          </text>
        </WarnTriangle>
      );
    case "warn_pedestrian":
      return (
        <WarnTriangle s={s}>
          <circle cx="50" cy="34" r="5" fill="#000" />
          <path
            d="M50 39 L50 56 M50 45 L42 52 M50 45 L58 52 M50 56 L44 66 M50 56 L56 66"
            stroke="#000"
            strokeWidth="3"
            fill="none"
          />
        </WarnTriangle>
      );
    case "prohibit_noentry":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" role="img">
          <circle cx="50" cy="50" r="44" fill="#c0192b" />
          <rect x="22" y="43" width="56" height="14" rx="2" fill="#fff" />
        </svg>
      );
    case "prohibit_nostop":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" role="img">
          <circle cx="50" cy="50" r="44" fill="#1a4ea8" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="#c0192b" strokeWidth="8" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="#c0192b" strokeWidth="8" />
          <line x1="78" y1="22" x2="22" y2="78" stroke="#c0192b" strokeWidth="8" />
        </svg>
      );
    case "mandatory_straight":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" role="img">
          <circle cx="50" cy="50" r="44" fill="#1a4ea8" />
          <path d="M50 30 L50 70 M50 30 L40 44 M50 30 L60 44" stroke="#fff" strokeWidth="7" fill="none" />
        </svg>
      );
    case "priority_road":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" role="img">
          <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" fill="#f4c20d" stroke="#000" strokeWidth="3" />
          <rect x="34" y="34" width="32" height="32" transform="rotate(45 50 50)" fill="#fff" />
        </svg>
      );
    case "give_way":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" role="img">
          <polygon points="50,88 8,16 92,16" fill="#fff" stroke="#c0192b" strokeWidth="9" />
        </svg>
      );
    case "stop":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" role="img">
          <polygon
            points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32"
            fill="#c0192b"
          />
          <text x="50" y="60" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff">
            STOP
          </text>
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" role="img">
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#e2e8f0" />
          <text x="50" y="56" textAnchor="middle" fontSize="14" fill="#64748b">
            ?
          </text>
        </svg>
      );
  }
}

function WarnTriangle({ s, children }: { s: number; children: React.ReactNode }) {
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" role="img">
      <polygon points="50,10 92,84 8,84" fill="#f4c20d" stroke="#c0192b" strokeWidth="7" strokeLinejoin="round" />
      {children}
    </svg>
  );
}
