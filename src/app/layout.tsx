import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Poppins, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1F4D2E",
};

export const metadata: Metadata = {
  title: "Palle Aathidhyam | Authentic Telugu Dining Experience",
  description:
    "Experience the warmth of traditional Telugu hospitality at Palle Aathidhyam. Authentic recipes, fresh ingredients, and premium dining in a luxurious setting.",
  keywords: [
    "Palle Aathidhyam",
    "Telugu restaurant",
    "South Indian food",
    "authentic Telugu cuisine",
    "traditional dining",
    "premium restaurant",
    "banana leaf meals",
    "biryani",
    "family restaurant",
  ],
  authors: [{ name: "Palle Aathidhyam" }],
  icons: {
    icon: "/brand-logo.jpeg",
  },
  openGraph: {
    title: "Palle Aathidhyam | Authentic Telugu Dining",
    description:
      "Traditional Telugu recipes, fresh ingredients, and premium dining. Reserve your table today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${poppins.variable} ${inter.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}