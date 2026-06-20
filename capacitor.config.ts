import type { CapacitorConfig } from "@capacitor/cli";

// Capacitor wraps the statically-exported Next.js site (webDir = "out") into a
// native Android shell. The web assets are bundled in the APK, so the app runs
// fully offline — matching the offline-first design.
const config: CapacitorConfig = {
  appId: "com.taxisvenska.francais",
  appName: "TaxiSvenska Français",
  webDir: "out",
};

export default config;
