import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Building Simulation",
  description: "Compare design options for one Calgary house",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={display.variable}>
      <body className="bg-slate-50 text-slate-900 min-h-screen">{children}</body>
    </html>
  );
};

export default RootLayout;
