import type { Metadata } from "next";
import FanLab from "@/components/fan-lab";

export const metadata: Metadata = {
  title: "Fan Lab — Polls, requests & custom blends",
  description: "Vote on what Dreez makes next, submit a music request and commission a custom Dreez blend.",
};

export default function FansPage(){
 return <main className="fans-page"><nav className="subpage-nav"><a href="/">← Back home</a><a className="wordmark" href="/">dreez<span>®</span></a><a href="/live">Live Room ↗</a></nav><FanLab/></main>;
}
