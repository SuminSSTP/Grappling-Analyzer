"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal, Video } from "lucide-react";
import { SessionCard } from "@/components/session-card";
import { demoSessions } from "@/lib/mock-data";
import { readSavedSessions } from "@/lib/session-storage";
import type { SavedSession, SessionAnalysis } from "@/lib/types";

type Filter = "all" | "grappling" | "climbing";

export function SessionsLibrary() {
  const [sessions, setSessions] = useState<(SessionAnalysis | SavedSession)[]>(demoSessions);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const saved = readSavedSessions();
    setSessions([...saved, ...demoSessions.filter((demo) => !saved.some((item) => item.id === demo.id))]);
  }, []);
  const filtered = useMemo(() => sessions.filter((session) => {
    const sportMatch = filter === "all" || session.sport === filter;
    const textMatch = `${session.title} ${session.discipline} ${session.priorities[0]?.title ?? ""}`.toLowerCase().includes(query.toLowerCase());
    return sportMatch && textMatch;
  }), [sessions, filter, query]);

  return <div className="page-stack sessions-page">
    <section className="library-header"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR TRAINING, IN CONTEXT</div><h1>Session library</h1><p>Revisit a session, notice a pattern, and carry a clearer focus into what comes next.</p></div><Link className="button button-primary" href="/analyze"><Video size={15} /> Analyze a session <ArrowRight size={15} /></Link></section>
    <div className="library-stats"><div><span>SESSIONS REVIEWED</span><strong>{String(sessions.length).padStart(2, "0")}</strong></div><i /><div><span>SPORTS</span><strong>02</strong></div><i /><div><span>RECENT ACTIVITY</span><strong className="recent-stat">{sessions.length ? "ACTIVE" : "—"}</strong></div><div className="library-stat-note"><SlidersHorizontal size={14} /> Your history is stored in this browser.</div></div>
    <section className="library-content"><div className="library-toolbar"><div><h2>All sessions <span>{filtered.length}</span></h2><p>Your recent analysis and sample sessions</p></div><div className="library-controls"><label className="search-field"><Search size={15} /><input type="search" placeholder="Search sessions" value={query} onChange={(event) => setQuery(event.target.value)} /></label><div className="filter-control" role="group" aria-label="Filter by sport">{([["all", "All"], ["grappling", "Grappling"], ["climbing", "Climbing"]] as [Filter, string][]).map(([value, label]) => <button type="button" key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div></div></div>
      {filtered.length ? <div className="library-session-grid">{filtered.map((session) => <SessionCard key={session.id} session={session} />)}</div> : <div className="sessions-empty"><div><Search size={20} /></div><h3>No sessions found</h3><p>Try a different search or clear the sport filter.</p><button type="button" className="text-button" onClick={() => { setQuery(""); setFilter("all"); }}>Clear filters <ArrowRight size={13} /></button></div>}
    </section>
    <div className="library-tip"><span className="tip-marker">↗</span><div><strong>Look for the repeated moment.</strong><span>A pattern across sessions can be a useful place to focus your next block.</span></div><Link href="/analyze">Review new footage <ArrowRight size={13} /></Link></div>
  </div>;
}
