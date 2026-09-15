import type { Metadata } from "next";
import { ArrowLeft, Instagram, Radio, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Dreez Live Room | Watch live studio sessions & pop-up sets",
  description: "The official Dreez live fan room for home-studio sessions, pop-up shows and live house-music broadcasts from Tampa Bay.",
};

const instagram = "https://www.instagram.com/__dreezz/";

export default function LiveRoom() {
  const embed = process.env.DREEZ_LIVE_EMBED_URL?.trim();
  const title = process.env.DREEZ_LIVE_TITLE?.trim() || "Dreez Live Room";

  return (
    <main className="live-room-page">
      <div className="live-orb orb-one" aria-hidden="true" />
      <div className="live-orb orb-two" aria-hidden="true" />
      <nav className="subpage-nav">
        <a href="/"><ArrowLeft size={17} /> Back to the frequency</a>
        <a className="wordmark" href="/">dreez<span>®</span></a>
        <a href={instagram} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a>
      </nav>
      <section className="live-room-hero">
        <p className="eyebrow mint"><Radio size={15} /> THE FAN ROOM</p>
        <h1>WHEN DREEZ GOES LIVE,<br/><em>YOU’RE IN THE ROOM.</em></h1>
        <p>Home-studio sessions. Pop-up shows. Late-night experiments. This is the inside channel for the people who follow the frequency beyond the venue.</p>
      </section>
      <section className="live-player-shell" aria-label={title}>
        {embed ? (
          <iframe src={embed} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <div className="live-offline">
            <span className="signal-rings"><i/><i/><i/></span>
            <Radio size={44} />
            <h2>Between transmissions.</h2>
            <p>The room is ready. When the official livestream is switched on, the player appears right here.</p>
            <a className="button lime" href={instagram} target="_blank" rel="noreferrer">Follow @__dreezz for the signal</a>
          </div>
        )}
      </section>
      <section className="live-room-grid">
        <article><Sparkles/><h3>Not just another stream.</h3><p>Expect sets, studio moments, guest energy, first listens and experiments that may never happen the same way twice.</p></article>
        <article><Radio/><h3>Built for the inner circle.</h3><p>Keep this page bookmarked. The live room is the home base whenever Dreez and the team decide to turn the cameras on.</p></article>
        <article><Instagram/><h3>Catch the signal early.</h3><p>Follow Dreez and join the email list from the homepage so a spontaneous session does not pass you by.</p></article>
      </section>
    </main>
  );
}
