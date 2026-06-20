import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/store/progressStore";
import { NavBar } from "@/app/components/NavBar";
import { DisclaimerBanner } from "@/app/components/DisclaimerBanner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaxiSvenska Français — préparation taxiförarlegitimation",
  description:
    "Préparation non officielle au permis de conducteur de taxi suédois " +
    "(taxiförarlegitimation) pour francophones : examens blancs, panneaux, " +
    "calculs, suédois fonctionnel.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProgressProvider>
          <NavBar />
          <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
            {children}
          </main>
          <DisclaimerBanner />
        </ProgressProvider>
      </body>
    </html>
  );
}
