import type { Metadata } from "next";
import DreezExperience from "@/components/dreez-experience";
import "./globals.css";
import "./finish.css";
import "./fans.css";
import "./growth.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dreez.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "DREEZ — Follow the feeling", template: "%s | Dreez" },
  description: "Official Dreez site — Tampa Bay house music, rooftop sessions, live fan broadcasts, events, merch, booking and good energy.",
  keywords: ["Dreez", "Dreez DJ", "Tampa DJ", "Tampa house music", "Tampa Bay house music", "house music DJ", "Florida DJ"],
  alternates: { canonical: "/" },
  openGraph: {type:"website",url:siteUrl,title:"DREEZ — Follow the feeling",description:"House music. Human connection. Find Dreez live, discover events, enter the live room and follow the frequency.",siteName:"Dreez",images:[{url:"/images/sunset.webp",width:1200,height:630,alt:"Dreez — Follow the feeling"}]},
  twitter: { card: "summary_large_image", title: "DREEZ — Follow the feeling", description: "House music. Human connection. Tampa Bay, Florida.", images: ["/images/sunset.webp"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
const structuredData={"@context":"https://schema.org","@graph":[{"@type":"Person","@id":`${siteUrl}/#dreez`,name:"Dreez",alternateName:"DREEZ",jobTitle:"DJ",description:"Tampa Bay house-music DJ focused on house music, human connection and live fan experiences.",url:siteUrl,sameAs:["https://www.instagram.com/__dreezz/"],knowsAbout:["House music","DJ performance","Live music"],homeLocation:{"@type":"Place",name:"Tampa Bay, Florida"}},{"@type":"WebSite","@id":`${siteUrl}/#website`,url:siteUrl,name:"Dreez",description:"Official Dreez fan site, events, live room, booking and merch hub.",about:{"@id":`${siteUrl}/#dreez`}}]};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" data-theme="dark" suppressHydrationWarning><body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>{children}<DreezExperience/></body></html>}
