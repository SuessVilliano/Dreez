"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Moon, Radio, Send, Sparkles, Sun, X } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };
type Theme = "dark" | "light";

const starter: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Yo — I’m the Dreez concierge. Ask me where he’s playing, how to book him, where to get tickets or merch, or how to catch the next live room.",
  },
];

const quickPrompts = ["Where is Dreez playing?", "Book Dreez", "Tickets & merch", "Watch Dreez live"];

export default function DreezExperience() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starter);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [exitStatus, setExitStatus] = useState("");
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("dreez-theme") as Theme | null;
    const next: Theme = saved === "light" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, sending]);

  useEffect(() => {
    const shown = window.sessionStorage.getItem("dreez-exit-shown");
    if (shown) return;

    const openExit = () => {
      if (window.sessionStorage.getItem("dreez-exit-shown")) return;
      window.sessionStorage.setItem("dreez-exit-shown", "1");
      setExitOpen(true);
    };

    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && !event.relatedTarget) openExit();
    };

    document.addEventListener("mouseout", onMouseOut);
    const mobileTimer = window.setTimeout(() => {
      if (window.innerWidth < 768) openExit();
    }, 45000);

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.clearTimeout(mobileTimer);
    };
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("dreez-theme", next);
  };

  async function ask(text: string) {
    const cleaned = text.trim();
    if (!cleaned || sending) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: cleaned }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "The signal dropped.");
      setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "The AI signal is fuzzy right now, but the site still has you: use Events for upcoming dates, /live for the fan room, or the Book Dreez button for an event request.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function submitChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  async function submitExit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setExitStatus("Tuning you in…");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "exit-intent" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Could not join right now.");
      setExitStatus("You’re in. Next frequency drop goes to your inbox.");
      form.reset();
    } catch (error) {
      setExitStatus(error instanceof Error ? error.message : "Could not join right now.");
    }
  }

  const ariaTheme = useMemo(() => (theme === "dark" ? "Switch to light theme" : "Switch to dark theme"), [theme]);

  return (
    <>
      <div className="frequency-veil" aria-hidden="true"><span /><span /><span /></div>

      <div className="experience-dock" aria-label="Dreez experience controls">
        <a className="experience-pill" href="/story"><Sparkles size={15} /> STORY</a>
        <a className="experience-pill live-pill" href="/live"><Radio size={15} /> LIVE ROOM</a>
        <button className="experience-pill icon-pill" type="button" onClick={toggleTheme} aria-label={ariaTheme} title={ariaTheme}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <button className="chat-launcher" type="button" onClick={() => setChatOpen((open) => !open)} aria-label="Open Dreez concierge" aria-expanded={chatOpen}>
        {chatOpen ? <X size={22} /> : <><Bot size={22} /><span>ASK DREEZ AI</span></>}
      </button>

      {chatOpen && (
        <section className="dreez-chat" aria-label="Dreez AI concierge">
          <header>
            <div><Sparkles size={18} /><span><b>DREEZ AI</b><small>FAN CONCIERGE</small></span></div>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close concierge"><X size={18} /></button>
          </header>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => <p className={message.role} key={`${message.role}-${index}`}>{message.content}</p>)}
            {sending && <p className="assistant typing">Tuning the frequency…</p>}
            <div ref={chatEnd} />
          </div>
          <div className="quick-prompts">
            {quickPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => void ask(prompt)}>{prompt}</button>)}
          </div>
          <form onSubmit={submitChat}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Dreez…" maxLength={600} aria-label="Ask Dreez AI" />
            <button type="submit" disabled={sending || !input.trim()} aria-label="Send message"><Send size={17} /></button>
          </form>
        </section>
      )}

      {exitOpen && (
        <div className="exit-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setExitOpen(false); }}>
          <section className="exit-card" role="dialog" aria-modal="true" aria-labelledby="exit-title">
            <button className="exit-close" type="button" onClick={() => setExitOpen(false)} aria-label="Close"><X size={20} /></button>
            <span className="exit-kicker">DON’T LOSE THE FREQUENCY ✳</span>
            <h2 id="exit-title">Before you dip…</h2>
            <p>Get first notice when Dreez drops a new date, opens the live room, or releases the next piece of merch.</p>
            <form onSubmit={submitExit}>
              <input name="name" placeholder="First name" maxLength={100} />
              <input name="email" type="email" placeholder="Email address" maxLength={254} required />
              <input className="exit-honey" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="button lime full" type="submit">KEEP ME IN THE LOOP</button>
            </form>
            {exitStatus && <small className="exit-status" role="status">{exitStatus}</small>}
            <small>Good energy only. Unsubscribe anytime.</small>
          </section>
        </div>
      )}
    </>
  );
}
