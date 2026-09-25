import Link from "next/link";
import { ArrowUpRight, Clock3, Film } from "lucide-react";
import type { SessionAnalysis, SavedSession } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/format";

type SessionCardProps = { session: SessionAnalysis | SavedSession; compact?: boolean };

export function SessionCard({ session, compact = false }: SessionCardProps) {
  const label = session.sport === "grappling" ? "GRAPPLING" : "CLIMBING";
  const mainFocus = session.priorities[0]?.title ?? "Session review";
  return <Link className={`session-card ${compact ? "session-card-compact" : ""}`} href={`/analyze?session=${encodeURIComponent(session.id)}`}>
    <div className={`session-thumbnail ${session.sport === "grappling" ? "thumb-grappling" : "thumb-climbing"}`}>
      <img src={session.sport === "grappling" ? "/grappling-scene.svg" : "/climbing-scene.svg"} alt="" />
      <span className="thumbnail-play"><Film size={14} /></span>
      <span className="thumbnail-duration"><Clock3 size={11} /> {formatTime(session.duration)}</span>
    </div>
    <div className="session-card-body">
      <div className="session-card-overline"><span className={`sport-mini-dot ${session.sport}`} />{label}<span className="session-card-date">{formatDate(session.date)}</span></div>
      <div className="session-card-title-row"><strong>{session.title}</strong><ArrowUpRight className="session-arrow" size={15} /></div>
      <div className="session-card-footer"><span><b>{session.moments.length}</b> key moments</span><span className="focus-chip">Focus · {mainFocus}</span></div>
    </div>
  </Link>;
}
