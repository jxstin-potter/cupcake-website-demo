import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { MockStoreProvider } from "@/components/providers/mock-store-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantText = Cormorant_Garamond({
  variable: "--font-cormorant-text",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "CakeCup",
  description: "CakeCup — order cupcakes for local pickup, delivery, or nationwide shipping. Demo storefront with deterministic mock data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} ${cormorant.variable} ${cormorantText.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <MockStoreProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6">{children}</main>
          <SiteFooter />
        </MockStoreProvider>
      </body>
    </html>
  );
}
