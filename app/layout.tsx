import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DREEZ — Follow the feeling",
  description: "Tampa house music, rooftop sessions and good energy. Find Dreez live, discover events, join the inner circle and book your next night.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
