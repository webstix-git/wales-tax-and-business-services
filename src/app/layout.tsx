import type { Metadata } from "next";
import ScrollTop from "@/components/ScrollTop";
import ImagePrefetch from "@/components/ImagePrefetch";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wales Tax & Business Services",
  description:
    "Tax strategy, implementation, and preparation from Wales Tax & Business Services in St. Joseph, Michigan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ScrollTop />
        <ImagePrefetch />
      </body>
    </html>
  );
}
