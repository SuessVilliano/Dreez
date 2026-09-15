type InputMessage = { role?: string; content?: string };

const system = `You are the official Dreezz fan-site concierge. Dreezz is a Tampa Bay house-music DJ whose site language is “Follow the feeling,” “Good people. Better frequencies,” and “House music. Human connection.” Help visitors with upcoming events, tickets, booking requests, merch, the live fan room, Dreezz's story, Fan Lab polls, music requests, custom blend commissions, Instagram, and navigating the site. Never invent an event, ticket price, merchandise availability, booking confirmation, location, livestream status, custom-blend price, turnaround time, or fact not present in the supplied context. Keep answers warm, concise, useful, and in the Dreezz brand voice. For actions, point people to /#events, /#find, /#merch, /fans, /live, /story, the Book Dreezz button, or Instagram @__dreezz as appropriate.`;

function fallback(message: string) {
  const text = message.toLowerCase();
  if (/poll|vote|fan lab|request music|song request|track request/.test(text)) return "Hit /fans for the Fan Lab. You can vote on what Dreezz should make next and send him a track request without turning the whole site into a giant community app.";
  if (/custom blend|blend|custom mix|mix for|soundtrack/.test(text)) return "Dreezz’s custom blend product lives in /fans. You can send the occasion, vibe, references, target length, budget and due date. If an official checkout link is active, the Fan Lab will show it; otherwise Dreezz can quote the request directly.";
  if (/ticket|event|playing|play|show|date|where/.test(text)) return "For announced dates, hit the Events section on the homepage. The Find My DJ section shows a venue only when Dreezz deliberately checks in live — no private background tracking. If a date has a ticket link, the site will show it there.";
  if (/book|booking|wedding|party|event request|hire/.test(text)) return "Use the Book Dreezz button on the homepage and send the date, venue/city, budget if you have one, and a quick event description. It submits a request — it does not fake a confirmed booking.";
  if (/merch|shirt|tee|store|goods/.test(text)) return "The Goods section is the merch hub. The Frequency Tee is currently presented as a first-drop concept unless an official store link is connected. Join the inner circle to hear when a real drop goes live.";
  if (/live|stream|studio|watch/.test(text)) return "Head to /live. That is the fan room for home-studio sessions, pop-up shows and live broadcasts. When Dreezz switches on the official stream from backstage, the player appears there.";
  if (/story|who|about|bio/.test(text)) return "Start at /story. The Dreezz identity is Tampa Bay house music built around human connection — rooftops, dance floors, late-night energy, and the idea that house is a feeling before it is a genre.";
  if (/instagram|social/.test(text)) return "Dreezz is on Instagram at @__dreezz. The homepage also links directly to the profile.";
  return "I can help with Dreezz events, tickets, booking, Fan Lab polls, music requests, custom blends, merch, the live room, his story, or finding the right part of the site. What are you trying to do?";
}

function extractText(data: any) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && typeof content?.text === "string" && content.text.trim()) return content.text.trim();
    }
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (raw.length > 12000) return Response.json({ error: "Message too large." }, { status: 413 });
    const body = JSON.parse(raw || "{}");
    const messages: InputMessage[] = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    const latest = [...messages].reverse().find((message) => message?.role === "user" && typeof message?.content === "string")?.content?.slice(0, 600) || "";
    if (!latest.trim()) return Response.json({ error: "Ask me something about Dreezz." }, { status: 400 });

    const key = process.env.OPENAI_API_KEY;
    if (!key) return Response.json({ reply: fallback(latest), mode: "fallback" });

    let siteContext = "Live event data is unavailable right now. Do not claim a live location or announced date.";
    try {
      const feed = await fetch(new URL("/api/feed", req.url), { cache: "no-store" });
      if (feed.ok) {
        const data = await feed.json() as any;
        siteContext = `Current public site feed: ${JSON.stringify({ live: data.live || null, events: (data.events || []).slice(0, 12), settings: data.settings || {} })}`;
      }
    } catch {}

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || "gpt-5.6-luna",
        instructions: `${system}\n\n${siteContext}`,
        input: messages.map((message) => ({ role: message.role === "assistant" ? "assistant" : "user", content: String(message.content || "").slice(0, 1200) })),
        max_output_tokens: 300,
      }),
    });

    if (!response.ok) return Response.json({ reply: fallback(latest), mode: "fallback" });
    const data = await response.json() as any;
    const reply = extractText(data) || fallback(latest);
    return Response.json({ reply, mode: "ai" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "The concierge signal dropped. Try again." }, { status: 400 });
  }
}
