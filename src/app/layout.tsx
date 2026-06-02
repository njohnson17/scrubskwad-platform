import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScrubSkwad Booking",
  description: "Premium booking and quote engine for ScrubSkwad services."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

