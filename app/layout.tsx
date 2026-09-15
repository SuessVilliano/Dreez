import type { Metadata } from "next";
import DreezExperience from "@/components/dreez-experience";
import "./globals.css";
import "./finish.css";
import "./fans.css";
import "./growth.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dreezz.liv8.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "DREEZZ — Follow the feeling", template: "%s | Dreezz" },
  description: "Official Dreezz site — Tampa Bay house music, rooftop sessions, live fan broadcasts, events, merch, booking and good energy.",
  keywords: ["Dreezz", "Dreezz DJ", "Tampa DJ", "Tampa house music", "Tampa Bay house music", "house music DJ", "Florida DJ"],
  alternates: { canonical: "/" },
  openGraph: {type:"website",url:siteUrl,title:"DREEZZ — Follow the feeling",description:"House music. Human connection. Find Dreezz live, discover events, enter the live room and follow the frequency.",siteName:"Dreezz",images:[{url:"/images/sunset.webp",width:1200,height:630,alt:"Dreezz — Follow the feeling"}]},
  twitter: { card: "summary_large_image", title: "DREEZZ — Follow the feeling", description: "House music. Human connection. Tampa Bay, Florida.", images: ["/images/sunset.webp"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
const structuredData={"@context":"https://schema.org","@graph":[{"@type":"Person","@id":`${siteUrl}/#dreezz`,name:"Dreezz",alternateName:"DREEZZ",jobTitle:"DJ",description:"Tampa Bay house-music DJ focused on house music, human connection and live fan experiences.",url:siteUrl,sameAs:["https://www.instagram.com/__dreezz/"],knowsAbout:["House music","DJ performance","Live music"],homeLocation:{"@type":"Place",name:"Tampa Bay, Florida"}},{"@type":"WebSite","@id":`${siteUrl}/#website`,url:siteUrl,name:"Dreezz",description:"Official Dreezz fan site, events, live room, booking and merch hub.",about:{"@id":`${siteUrl}/#dreezz`}}]};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" data-theme="dark" suppressHydrationWarning><body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>{children}<DreezExperience/></body></html>}
