import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://forgedisplay.com"),
  title: "ForgeDisplay | Custom Display Stands",
  description:
    "ForgeDisplay creates premium custom display stands for businesses, collectors, card shops, and branded setups.",
  icons: {
    icon: "/logo/forgedisplay-logo-transparent.png",
    shortcut: "/logo/forgedisplay-logo-transparent.png",
    apple: "/logo/forgedisplay-logo-transparent.png",
  },
  openGraph: {
    title: "ForgeDisplay | Custom Display Stands",
    description:
      "Premium custom display stands built for brands, collectors, and professional presentation.",
    images: ["/logo/forgedisplay-logo-white.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ForgeDisplay | Custom Display Stands",
    description:
      "Premium custom display stands built for brands, collectors, and professional presentation.",
    images: ["/logo/forgedisplay-logo-white.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}