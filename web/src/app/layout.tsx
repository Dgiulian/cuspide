import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  // Lets pages use relative canonical/OG URLs and gives Next a base for og:image
  metadataBase: new URL("https://cuspidebr.com.ar"),
  // No `template` here: every page already carries the brand in its own title.
  title: "Cuspide Bienes Raices | Propiedades en Neuquén y Río Negro",
  description:
    "Cuspide Bienes Raices. Propiedades, terrenos, casas y departamentos en el Alto Valle de Río Negro y Neuquén.",
  applicationName: "Cuspide Bienes Raices",
  openGraph: {
    siteName: "Cuspide Bienes Raices",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
