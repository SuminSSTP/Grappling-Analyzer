"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronRight, CircleHelp, Clock3, Flag, Maximize2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import type { Moment, SessionAnalysis } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/format";

export function AnalysisWorkspace({ session }: { session: SessionAnalysis }) {
  const [selectedId, setSelectedId] = useState(session.moments[0]?.id ?? "");
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const selected = session.moments.find((moment) => moment.id === selectedId) ?? session.moments[0];
  const maxTime = Math.max(1, session.duration);
  const handleTimeChange = useCallback((time: number) => setCurrentTime(time), []);

  useEffect(() => {
    setSelectedId(session.moments[0]?.id ?? "");
    setCurrentTime(0);
  }, [session.id, session.moments]);

  const chooseMoment = (moment: Moment) => {
    setSelectedId(moment.id);
    setCurrentTime(moment.timestamp);
    if (videoRef.current && session.videoUrl) videoRef.current.currentTime = moment.timestamp;
  };

  return <div className="analysis-workspace">
    <div className="analysis-topline"><div><div className="eyebrow small-eyebrow">SESSION REVIEW <span className="crumb-slash">/</span> {session.sport === "grappling" ? "GRAPPLING" : "CLIMBING"}</div><h1>{session.title}</h1><div className="analysis-meta"><span>{session.discipline}</span><i />{formatDate(session.date)}<i /><Clock3 size={13} />{formatTime(session.duration)}<i /><span className="moment-meta-tag">{session.moments.length} moments</span></div></div><div className="analysis-actions"><span className="review-status"><i /> REVIEW READY</span><button className="icon-button share-button" type="button" title="Start over" onClick={() => window.location.assign("/analyze")}><RotateCcw size={15} /></button></div></div>

    <div className="prototype-banner"><CircleHelp size={15} /><span><strong>Structured sample feedback.</strong> The clip is previewed locally; movement notes are mock data until a video-analysis provider is connected.</span><span className="banner-tag">PROTOTYPE MODE</span></div>

    <div className="workspace-grid">
      <div className="workspace-main-column">
        <VideoPlayer session={session} activeMoment={selected} currentTime={currentTime} onTimeChange={handleTimeChange} videoRef={videoRef} />
        <VideoTimeline session={session} currentTime={currentTime} selectedId={selected?.id ?? ""} onSelect={chooseMoment} onScrub={(time) => { setCurrentTime(time); if (videoRef.current && session.videoUrl) videoRef.current.currentTime = time; }} />
        <div className="summary-two-col"><SessionSummary session={session} /><CategoryBreakdown session={session} /></div>
      </div>
      <aside className="analysis-rail">
        <div className="rail-heading"><div><span className="rail-overline">MOMENT REVIEW</span><h2>Key moments <span>{session.moments.length}</span></h2></div><button className="text-icon-button" type="button" title="Moments are selected from a structured sample"><CircleHelp size={15} /></button></div>
        <div className="moment-list" role="list" aria-label="Key moments">{session.moments.map((moment) => <button type="button" role="listitem" key={moment.id} className={`moment-list-item ${selected?.id === moment.id ? "selected" : ""}`} onClick={() => chooseMoment(moment)}>
          <span className={`moment-severity severity-${moment.importance}`} /><span className="moment-list-content"><span className="moment-list-top"><strong>{moment.title}</strong><time>{formatTime(moment.timestamp)}</time></span><span className="moment-list-bottom"><span>{moment.category}</span>{moment.position && <><i>·</i><span>{moment.position}</span></>}</span></span><ChevronRight className="moment-chevron" size={14} />
        </button>)}</div>
        {selected && <MomentAnalysisCard moment={selected} />}
        <div className="rail-priority"><div className="rail-priority-icon"><Flag size={14} /></div><div><span className="rail-overline">NEXT SESSION FOCUS</span><strong>{session.priorities[0]?.title}</strong><p>{session.priorities[0]?.detail}</p></div></div>
      </aside>
    </div>
    <div className="analysis-bottom-note"><span>Analysis is a training aid, not a coaching verdict.</span><span>Session date <b>{formatDate(session.date)}</b></span></div>
  </div>;
}

function VideoPlayer({ session, activeMoment, currentTime, onTimeChange, videoRef }: {
  session: SessionAnalysis;
  activeMoment?: Moment;
  currentTime: number;
  onTimeChange: (time: number) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [duration, setDuration] = useState(session.duration);
  const demoTime = useRef(currentTime);
  const maxTime = Math.max(duration || session.duration, 1);
  useEffect(() => setDuration(session.duration), [session.id, session.duration]);
  useEffect(() => { demoTime.current = currentTime; }, [currentTime]);
  useEffect(() => {
    if (session.videoUrl || !playing) return;
    const timer = window.setInterval(() => {
      const next = Math.min(maxTime, demoTime.current + 1);
      demoTime.current = next;
      onTimeChange(next);
      if (next >= maxTime) setPlaying(false);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing, session.videoUrl, maxTime, onTimeChange]);

  const togglePlayback = () => {
    if (session.videoUrl && videoRef.current) {
      if (videoRef.current.paused) void videoRef.current.play();
      else videoRef.current.pause();
      return;
    }
    if (currentTime >= maxTime) onTimeChange(0);
    setPlaying((value) => !value);
  };

  return <section className="video-panel" aria-label="Session video">
    <div className={`video-stage ${session.videoUrl ? "has-video" : "demo-video"}`}>
      {session.videoUrl ? <video ref={videoRef} src={session.videoUrl} playsInline preload="metadata" muted={muted} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || session.duration)} onTimeUpdate={(event) => { onTimeChange(event.currentTarget.currentTime); setPlaying(!event.currentTarget.paused); }} onEnded={() => setPlaying(false)} /> : <div className={`demo-frame ${session.sport}`}><img src={session.sport === "grappling" ? "/grappling-scene.svg" : "/climbing-scene.svg"} alt="Illustrated session frame" /><div className="demo-frame-top"><span><i className="live-dot" /> {session.isDemo ? "SAMPLE SESSION" : "SAVED REVIEW"}</span><span>{session.isDemo ? "ILLUSTRATIVE FRAME" : "CLIP NOT STORED"}</span></div><div className="demo-frame-focus"><small>{activeMoment?.position ?? "SESSION OVERVIEW"}</small><strong>{activeMoment?.title ?? session.title}</strong><span>{session.isDemo ? "Sample review · no source video attached" : "The original clip stays on the device it was analyzed on."}</span></div></div>}
      <div className="video-overlay-top"><span className="video-discipline">{session.sport === "grappling" ? "GRAPPLING" : "CLIMBING"} <i>·</i> {session.discipline.toUpperCase()}</span>{session.videoUrl && <span className="source-local"><i /> LOCAL PREVIEW</span>}</div>
      {session.videoUrl && <div className="video-controls"><button className="player-icon-button" type="button" aria-label={playing ? "Pause video" : "Play video"} onClick={togglePlayback}>{playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button><span className="player-time">{formatTime(currentTime)} <i>/</i> {formatTime(maxTime)}</span><input className="player-range" aria-label="Seek video" type="range" min={0} max={maxTime} value={Math.min(currentTime, maxTime)} onChange={(event) => { const value = Number(event.target.value); onTimeChange(value); if (videoRef.current) videoRef.current.currentTime = value; }} /><button className="player-icon-button" type="button" aria-label={muted ? "Unmute video" : "Mute video"} onClick={() => setMuted((value) => !value)}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button><button className="player-icon-button" type="button" aria-label="Full screen" onClick={() => void videoRef.current?.requestFullscreen()}><Maximize2 size={15} /></button></div>}
      {!session.videoUrl && <div className="demo-controls"><button className="player-icon-button" type="button" aria-label={playing ? "Pause sample timeline" : "Play sample timeline"} onClick={togglePlayback}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button><span className="player-time">{formatTime(currentTime)} <i>/</i> {formatTime(maxTime)}</span><input className="player-range" aria-label="Scrub sample timeline" type="range" min={0} max={maxTime} value={Math.min(currentTime, maxTime)} onChange={(event) => onTimeChange(Number(event.target.value))} /><span className="demo-control-label">SAMPLE</span></div>}
    </div>
  </section>;
}

function VideoTimeline({ session, currentTime, selectedId, onSelect, onScrub }: {
  session: SessionAnalysis;
  currentTime: number;
  selectedId: string;
  onSelect: (moment: Moment) => void;
  onScrub: (time: number) => void;
}) {
  const duration = Math.max(1, session.duration);
  const ticks = useMemo(() => [0, .25, .5, .75, 1], []);
  return <section className="timeline-panel">
    <div className="timeline-heading"><div><span className="rail-overline">SESSION TIMELINE</span><strong>{session.moments.length} moments to review</strong></div><span className="timeline-current"><span className="timeline-current-dot" /> PLAYHEAD <b>{formatTime(currentTime)}</b></span></div>
    <div className="timeline-track-wrap"><div className="timeline-track" role="group" aria-label="Moment timeline" onClick={(event) => { if ((event.target as HTMLElement).closest("button")) return; const bounds = event.currentTarget.getBoundingClientRect(); onScrub(((event.clientX - bounds.left) / bounds.width) * duration); }}>
      <div className="timeline-progress" style={{ width: `${Math.min(100, currentTime / duration * 100)}%` }} />{ticks.map((tick) => <span key={tick} className="timeline-tick" style={{ left: `${tick * 100}%` }} />)}
      {session.moments.map((moment) => <button key={moment.id} type="button" aria-label={`${formatTime(moment.timestamp)} ${moment.title}`} title={`${formatTime(moment.timestamp)} · ${moment.title}`} className={`timeline-marker marker-${moment.importance} ${selectedId === moment.id ? "active" : ""}`} style={{ left: `${Math.min(98, moment.timestamp / duration * 100)}%` }} onClick={(event) => { event.stopPropagation(); onSelect(moment); }}><span /></button>)}
      <span className="timeline-playhead" style={{ left: `${Math.min(100, currentTime / duration * 100)}%` }} />
    </div><div className="timeline-labels">{ticks.map((tick) => <span key={tick}>{formatTime(duration * tick)}</span>)}</div></div>
    <div className="timeline-legend"><span><i className="legend-high" />High importance</span><span><i className="legend-medium" />Worth a look</span><span><i className="legend-low" />Positive moment</span><span className="timeline-click-hint">Select a marker to jump to that moment <ArrowDownRight size={12} /></span></div>
  </section>;
}

export function MomentAnalysisCard({ moment }: { moment: Moment }) {
  return <section className="moment-analysis-card" aria-live="polite">
    <div className="moment-analysis-top"><span className="rail-overline">SELECTED MOMENT</span><span className={`importance-label importance-${moment.importance}`}><i /> {moment.importance === "low" ? "POSITIVE" : moment.importance === "medium" ? "REVIEW" : "HIGH IMPORTANCE"}</span></div>
    <h3>{moment.title}</h3><div className="moment-analysis-meta"><span>{formatTime(moment.timestamp)} – {formatTime(moment.endTimestamp)}</span><i />{moment.category}{moment.position && <><i />{moment.position}</>}</div>
    <div className="moment-explanation"><div className="explanation-block"><span className="explanation-mark mark-event">01</span><div><span>WHAT HAPPENED</span><p>{moment.description}</p></div></div><div className="explanation-block"><span className="explanation-mark mark-context">02</span><div><span>WHY IT MATTERS</span><p>{moment.whyItMatters}</p></div></div><div className="explanation-block try-block"><span className="explanation-mark mark-try"><ArrowRight size={13} /></span><div><span>WHAT TO TRY</span><p>{moment.recommendation}</p></div></div></div>
  </section>;
}

export function SessionSummary({ session }: { session: SessionAnalysis }) {
  return <section className="summary-panel">
    <div className="summary-panel-header"><div><span className="rail-overline">SESSION NOTES</span><h2>A read on this session</h2></div><span className="summary-stamp">{session.sport === "grappling" ? "MAT REVIEW" : "WALL REVIEW"}</span></div>
    <p className="session-summary-copy">{session.summary}</p>
    <div className="strengths-block"><span className="summary-subhead"><Check size={13} /> WHAT’S WORKING</span><div className="strength-list">{session.strengths.map((strength) => <span key={strength}><i />{strength}</span>)}</div></div>
    <div className="priority-block"><div className="summary-priority-head"><span className="summary-subhead"><Flag size={13} /> TRAINING PRIORITIES</span><span>TOP {session.priorities.length}</span></div>{session.priorities.map((priority, index) => <div className="priority-row" key={priority.title}><span className="priority-number">0{index + 1}</span><div><strong>{priority.title}</strong><p>{priority.detail}</p></div><ChevronRight size={14} /></div>)}</div>
    <div className="drills-block"><span className="summary-subhead">SUGGESTED PRACTICE</span>{session.suggestedDrills.map((drill, index) => <div className="drill-row" key={drill}><span>{String(index + 1).padStart(2, "0")}</span>{drill}</div>)}</div>
  </section>;
}

export function CategoryBreakdown({ session }: { session: SessionAnalysis }) {
  const total = session.moments.length || 1;
  return <section className="category-panel">
    <div className="category-panel-header"><div><span className="rail-overline">MOMENT BREAKDOWN</span><h2>Areas in this review</h2></div><button type="button" className="text-icon-button" title="Counts show the mix of moments in this session"><CircleHelp size={15} /></button></div>
    <div className="category-total"><strong>{session.moments.length}</strong><span>moments<br />reviewed</span></div>
    <div className="category-bars">{session.categories.map((category) => <div className="category-row" key={category.category}><div className="category-row-top"><span>{category.category}</span><span className={`category-status status-${category.status}`}>{category.status === "focus" ? "Needs attention" : category.status}</span></div><div className="category-bar"><i className={`bar-${category.status}`} style={{ width: `${Math.max(12, category.count / total * 100)}%` }} /></div><div className="category-row-foot"><span>{category.count} moments</span><span>{category.status === "strong" ? "Consistent" : category.status === "developing" ? "Room to refine" : "Focus area"}</span></div></div>)}</div>
    <div className="category-footnote"><span className="category-key key-strong" /> Strong <span className="category-key key-developing" /> Developing <span className="category-key key-focus" /> Focus</div>
  </section>;
}
