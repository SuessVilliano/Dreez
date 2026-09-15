import type { Metadata } from "next";
import FanLab from "@/components/fan-lab";

export const metadata: Metadata = {
  title: "Fan Lab — Polls, requests & custom blends",
  description: "Vote on what Dreezz makes next, submit a music request and commission a custom Dreezz blend.",
};

export default function FansPage(){
 return <main className="fans-page"><nav className="subpage-nav"><a href="/">← Back home</a><a className="wordmark" href="/">dreezz<span>®</span></a><a href="/live">Live Room ↗</a></nav><FanLab/></main>;
}
