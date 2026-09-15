"use client";

import { useEffect, useState } from "react";

const instagram = "https://www.instagram.com/__dreezz/";

type PublicFeed = { settings?: { liveStreamUrl?: string } };

export default function LiveRoom() {
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    fetch("/api/feed", { cache: "no-store" })
      .then((response) => response.ok ? response.json() as Promise<PublicFeed> : null)
      .then((data) => setStreamUrl(data?.settings?.liveStreamUrl || ""))
      .catch(() => {});
  }, []);

  return (
    <main className="live-room-page">
      <div className="live-orb orb-one" aria-hidden="true" />
      <div className="live-orb orb-two" aria-hidden="true" />
      <nav className="subpage-nav">
        <a href="/">← Back to the frequency</a>
        <a className="wordmark" href="/">dreezz<span>®</span></a>
        <a href={instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
      </nav>
      <section className="live-room-hero">
        <p className="eyebrow mint">● THE FAN ROOM</p>
        <h1>WHEN DREEZZ GOES LIVE,<br/><em>YOU’RE IN THE ROOM.</em></h1>
        <p>Home-studio sessions. Pop-up shows. Late-night experiments. This is the inside channel for the people who follow the frequency beyond the venue.</p>
      </section>
      <section className="live-player-shell" aria-label="Dreezz Live Room">
        {streamUrl ? (
          <iframe src={streamUrl} title="Dreezz Live Room" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <div className="live-offline">
            <span className="signal-rings"><i/><i/><i/></span>
            <div className="live-radio-mark">◉</div>
            <h2>Between transmissions.</h2>
            <p>The room is ready. When Dreezz switches on the official stream from backstage, the player appears right here.</p>
            <a className="button lime" href={instagram} target="_blank" rel="noreferrer">Follow @__dreezz for the signal</a>
          </div>
        )}
      </section>
      <section className="live-room-grid">
        <article><b>✳</b><h3>Not just another stream.</h3><p>Sets, studio moments, guest energy, first listens and experiments that may never happen the same way twice.</p></article>
        <article><b>●</b><h3>Built for the inner circle.</h3><p>Keep this page bookmarked. This is the home base whenever Dreezz and the team decide to turn the cameras on.</p></article>
        <article><b>↗</b><h3>Catch the signal early.</h3><p>Follow Dreezz and join the email list from the homepage so a spontaneous session does not pass you by.</p></article>
      </section>
    </main>
  );
}
