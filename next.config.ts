import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the whole app can be bundled offline inside the Capacitor
  // Android shell (webDir = "out"). The app is fully client-side (localStorage),
  // so no server runtime is required.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
