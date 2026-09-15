"use client";

import { FormEvent, useEffect, useState } from "react";

const defaults = {
  poll: { question: "What should Dreez make next?", options: ["Rooftop sunset set", "Deep after-hours set", "R&B × house blend", "Fan-voted mix"], counts: {} as Record<string, number>, total: 0 },
  blendUrl: "",
};

type FanData = typeof defaults;
type FanActionResponse = { error?: string };

export default function FanLab() {
  const [data, setData] = useState<FanData>(defaults);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [voted, setVoted] = useState(false);

  async function refresh() {
    try {
      const response = await fetch("/api/fans", { cache: "no-store" });
      if (response.ok) setData(await response.json() as FanData);
    } catch {}
  }

  useEffect(() => {
    setVoted(window.localStorage.getItem("dreez-poll-voted") === "1");
    void refresh();
  }, []);

  async function post(payload: Record<string, unknown>, form?: HTMLFormElement) {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/fans", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as FanActionResponse;
      if (!response.ok) throw new Error(result.error || "Could not send that right now.");
      form?.reset();
      setMessage(payload.type === "vote" ? "Vote locked in. You’re shaping the next frequency." : payload.type === "song" ? "Request sent to Dreez." : "Custom blend request sent. Dreez can follow up by email.");
      if (payload.type === "vote") { window.localStorage.setItem("dreez-poll-voted", "1"); setVoted(true); }
      await refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not send that right now."); }
    finally { setBusy(false); }
  }

  function formPayload(event: FormEvent<HTMLFormElement>, type: string) {
    event.preventDefault(); const form = event.currentTarget; void post({ type, ...Object.fromEntries(new FormData(form)) }, form);
  }

  return <>
    <section className="fan-hero">
      <p className="eyebrow mint">THE FAN LAB</p>
      <h1>DON’T JUST FOLLOW.<br/><em>SHAPE THE SOUND.</em></h1>
      <p>Vote on what Dreez makes next, request a track for a future set, or commission a custom blend built around your moment.</p>
    </section>

    <section className="fan-grid">
      <article className="fan-card poll-card">
        <span className="fan-number">01</span><p className="eyebrow">PICK THE NEXT MOVE</p><h2>{data.poll.question}</h2>
        <div className="poll-options">{data.poll.options.map((option) => {
          const count = Number(data.poll.counts?.[option] || 0); const pct = data.poll.total ? Math.round(count / data.poll.total * 100) : 0;
          return <button key={option} type="button" disabled={busy || voted} onClick={() => void post({ type: "vote", option })}><span>{option}</span><b>{voted ? `${pct}%` : "VOTE"}</b><i style={{ width: voted ? `${pct}%` : "0%" }} /></button>;
        })}</div>
        <small>{voted ? `${data.poll.total} fan vote${data.poll.total === 1 ? "" : "s"} so far.` : "One tap. No email required."}</small>
      </article>

      <article className="fan-card request-card">
        <span className="fan-number">02</span><p className="eyebrow orange">SEND A MUSIC REQUEST</p><h2>Put something in Dreez’s ear.</h2>
        <p>Drop a track you think belongs in a set, a blend, or one of the live-room sessions.</p>
        <form onSubmit={(event) => formPayload(event, "song")}>
          <input name="track" required placeholder="Track / song" maxLength={160}/><input name="artist" placeholder="Artist (optional)" maxLength={160}/><textarea name="note" placeholder="Why this one? What moment does it fit?" maxLength={800}/><div className="fan-two"><input name="name" placeholder="Your name" maxLength={100}/><input name="email" type="email" placeholder="Email (optional)" maxLength={254}/></div><label className="fan-check"><input type="checkbox" name="join"/> Keep me in the inner circle</label><button className="button lime full" disabled={busy}>SEND REQUEST</button>
        </form>
      </article>

      <article className="fan-card blend-card">
        <span className="fan-number">03</span><p className="eyebrow pink">CUSTOM PRODUCT</p><h2>Your moment. Dreez’s blend.</h2>
        <p>A custom DJ blend for a birthday, wedding moment, workout, brand video, trip, party intro or anything that needs its own soundtrack.</p>
        {data.blendUrl && <a className="button lime full blend-buy" href={data.blendUrl} target="_blank" rel="noreferrer">ORDER THE CUSTOM BLEND ↗</a>}
        <form onSubmit={(event) => formPayload(event, "blend")}>
          <div className="fan-two"><input name="name" placeholder="Your name" maxLength={100}/><input name="email" type="email" required placeholder="Email" maxLength={254}/></div><input name="occasion" placeholder="What is it for?" maxLength={160}/><textarea name="vibe" required placeholder="Describe the vibe / energy you want" maxLength={500}/><textarea name="references" placeholder="Songs, artists or references Dreez should know" maxLength={800}/><div className="fan-two"><input name="length" placeholder="Target length" maxLength={80}/><input name="budget" placeholder="Budget / range" maxLength={80}/></div><input name="due" placeholder="When do you need it?" maxLength={40}/><label className="fan-check"><input type="checkbox" name="join"/> Send me Dreez drops too</label><button className="button lime full" disabled={busy}>{data.blendUrl ? "ASK DREEZ A QUESTION" : "START MY CUSTOM BLEND"}</button>
        </form>
        <small>Scope, turnaround, usage and pricing are confirmed before Dreez starts the work.</small>
      </article>
    </section>
    {message && <p className="fan-message" role="status">{message}</p>}
  </>;
}
