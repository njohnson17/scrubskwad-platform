import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/site/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ScrubSkwad | Premium Property Services",
    template: "%s | ScrubSkwad"
  },
  description: "Premium cleaning, removals, bin cleaning and mobile vehicle care across Greater Manchester."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Sora:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
