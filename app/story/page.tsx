import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Disc3, Headphones, MapPin, Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "The Dreezz Story | Tampa Bay house music, human connection & good frequencies",
  description: "Meet Dreezz: a Tampa Bay house-music DJ built around human connection, rooftop energy, dance floors and the belief that house music is a feeling.",
};

const instagram = "https://www.instagram.com/__dreezz/";

export default function Story() {
  const faq = [
    ["What kind of music does Dreezz play?", "Dreezz is rooted in house music, with the site intentionally describing the sound as a little deeper, a little weirder and built for movement rather than tight genre boxes."],
    ["Where is Dreezz based?", "Dreezz is based in Tampa Bay, Florida."],
    ["How do I find Dreezz live?", "The Find My DJ section on the official site can show a venue only when Dreezz deliberately checks in during a set. It is venue-based status, not private background GPS tracking."],
    ["How do I book Dreezz?", "Use the Book Dreezz request form on the homepage with your date, venue/city and event details. Submitting the form is a request, not an automatic booking confirmation."],
    ["Where can I watch Dreezz online?", "The official Live Room at /live is built for home-studio sessions, pop-up shows and future livestreams."],
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };

  return (
    <main className="story-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <nav className="subpage-nav story-nav"><a href="/"><ArrowLeft size={17}/> Back home</a><a className="wordmark" href="/">dreezz<span>®</span></a><a href={instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={17}/></a></nav>
      <section className="story-hero">
        <div className="story-photo" />
        <div className="story-overlay" />
        <div className="story-copy"><p className="eyebrow mint">FROM TAMPA, WITH LOVE.</p><h1>MORE THAN A SET.<br/><em>IT’S A WHOLE FEELING.</em></h1><p>Dreezz lives where house music stops being background noise and becomes the reason strangers turn into a room full of people moving together.</p></div>
      </section>
      <section className="story-body">
        <aside><Disc3/><span>GOOD PEOPLE.<br/>BETTER FREQUENCIES.</span></aside>
        <article>
          <p className="story-lede">The point was never to stand behind decks and simply play records. The point is the feeling that happens around them.</p>
          <p>From Tampa Bay rooftops to packed dance floors, Dreezz is building a world around house music, human connection and nights people remember because the room felt right. The sound can go deeper. It can get stranger. It can stretch from a sunset warm-up into the part of the night nobody planned to stay for.</p>
          <p>That same idea shapes the official site. Fans can see announced dates, save events to their calendar, find the venue only when Dreezz intentionally checks in live, join the inner circle, request a booking, watch for merch and enter the Live Room when the cameras come on.</p>
          <blockquote>House is a feeling. Find your people. Follow the frequency.</blockquote>
        </article>
      </section>
      <section className="story-principles">
        <article><Headphones/><b>SELECTED WITH SOUL</b><p>Music first. Energy second. Ego nowhere near the front of the room.</p></article>
        <article><MapPin/><b>THE CITY IS PART OF THE SET</b><p>Rooftops, rooms, neighborhoods and the people inside them all shape the night.</p></article>
        <article><Radio/><b>THE EXPERIENCE KEEPS MOVING</b><p>Events, the live room, fan drops and future releases keep the relationship going after the last track.</p></article>
      </section>
      <section className="story-faq"><p className="eyebrow orange">FREQUENCY CHECK</p><h2>Questions people ask.</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    </main>
  );
}
