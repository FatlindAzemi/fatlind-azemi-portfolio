import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "../components/NoiseOverlay";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${geistMono.variable} font-sans bg-[#03040b] text-gray-100 antialiased w-full min-h-screen overflow-x-hidden overflow-y-auto`}
        style={{ fontFamily: '"Outfit", var(--font-outfit), system-ui, sans-serif' }}
      >
        <NoiseOverlay opacity={0.035} />
        {children}
      </body>
    </html>
  );
}
