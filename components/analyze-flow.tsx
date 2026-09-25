"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleHelp, Clock3, FileVideo2, LockKeyhole, Sparkles, UploadCloud } from "lucide-react";
import { AnalysisWorkspace } from "@/components/analysis-workspace";
import { ProcessingState, processingSteps } from "@/components/processing-state";
import { SportSelector } from "@/components/sport-selector";
import { UploadDropzone } from "@/components/upload-dropzone";
import { mockAnalysisService } from "@/lib/analysis-service";
import { demoSessions } from "@/lib/mock-data";
import { readSavedSessions, saveSession } from "@/lib/session-storage";
import type { SessionAnalysis, Sport } from "@/lib/types";

type Stage = "form" | "processing" | "analysis";
const wait = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export function AnalyzeFlow() {
  const [sport, setSport] = useState<Sport>("grappling");
  const [discipline, setDiscipline] = useState("No-Gi");
  const [file, setFile] = useState<File | null>(null);
  const [fileDuration, setFileDuration] = useState(0);
  const [context, setContext] = useState("");
  const [stage, setStage] = useState<Stage>("form");
  const [progressStep, setProgressStep] = useState(0);
  const [analysis, setAnalysis] = useState<SessionAnalysis | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const startedFromQuery = useRef(false);

  useEffect(() => {
    return () => { if (videoUrl.startsWith("blob:")) URL.revokeObjectURL(videoUrl); };
  }, [videoUrl]);

  const startAnalysis = async (options?: { demo?: boolean; requestedSport?: Sport }) => {
    const useFile = options?.demo ? undefined : file ?? undefined;
    if (!useFile && !options?.demo) return;
    const localUrl = useFile ? URL.createObjectURL(useFile) : "";
    setVideoUrl(localUrl);
    setStage("processing");
    setProgressStep(0);
    for (let step = 0; step < processingSteps.length; step += 1) {
      setProgressStep(step);
      await wait(710);
    }
    const selectedSport = options?.requestedSport ?? sport;
    const selectedDiscipline = options?.requestedSport ? (options.requestedSport === "climbing" ? "Bouldering" : "No-Gi") : discipline;
    const result = await mockAnalysisService.analyze({
      sport: selectedSport,
      discipline: selectedDiscipline,
      context,
      file: useFile,
      duration: useFile ? fileDuration || undefined : undefined,
    });
    if (localUrl) result.videoUrl = localUrl;
    setAnalysis(result);
    if (useFile) saveSession(result);
    setStage("analysis");
  };

  useEffect(() => {
    if (startedFromQuery.current) return;
    startedFromQuery.current = true;
    const query = new URLSearchParams(window.location.search);
    const requestedSport = query.get("sport");
    if (requestedSport === "climbing" || requestedSport === "grappling") {
      setSport(requestedSport);
      setDiscipline(requestedSport === "climbing" ? "Bouldering" : "No-Gi");
    }
    const sessionId = query.get("session");
    if (sessionId) {
      const existing = [...demoSessions, ...readSavedSessions()].find((item) => item.id === sessionId);
      if (existing) {
        setSport(existing.sport);
        setDiscipline(existing.discipline);
        setAnalysis(existing);
        setStage("analysis");
        return;
      }
    }
    if (query.get("demo") === "1") {
      const selectedSport = requestedSport === "climbing" ? "climbing" : "grappling";
      setSport(selectedSport);
      setDiscipline(selectedSport === "climbing" ? "Bouldering" : "No-Gi");
      void startAnalysis({ demo: true, requestedSport: selectedSport });
    }
  // Query parameters are read once on mount; state updates are intentionally owned by this page.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetFlow = () => {
    setAnalysis(null);
    setStage("form");
    setContext("");
    setFile(null);
    setFileDuration(0);
    setVideoUrl("");
  };

  if (stage === "processing") return <ProcessingState step={progressStep} sport={sport} fileName={file?.name} />;
  if (stage === "analysis" && analysis) return <div className="analysis-result-page"><button type="button" className="back-to-form" onClick={resetFlow}>← Start a new analysis</button><AnalysisWorkspace session={{ ...analysis, videoUrl: analysis.videoUrl || videoUrl || undefined }} /></div>;

  const disciplines = sport === "grappling" ? ["BJJ", "Wrestling", "No-Gi", "Other"] : ["Bouldering", "Sport climbing", "Training session"];
  return <div className="page-stack analyze-page">
    <section className="analyze-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> REVIEW YOUR TRAINING</div><h1>Start with the footage.</h1><p>Bring a clip from the mat or the wall. We’ll shape the review around your sport.</p></div><div className="analyze-privacy"><span><LockKeyhole size={14} /></span><div><strong>Private by default</strong><small>Footage stays in this browser</small></div></div></section>

    <div className="analyze-layout">
      <section className="analyze-form-card">
        <div className="form-section"><div className="form-section-heading"><span className="form-kicker">01 / PICK YOUR SPORT</span><span className="step-count">01 <i>/</i> 03</span></div><SportSelector value={sport} onChange={(nextSport) => { setSport(nextSport); setDiscipline(nextSport === "grappling" ? "No-Gi" : "Bouldering"); }} /></div>
        <div className="form-section form-section-divider"><div className="form-section-heading"><span className="form-kicker">02 / ADD SOME CONTEXT</span><span className="optional-badge">OPTIONAL</span></div><div className="context-fields"><label className="field-label">Discipline<select value={discipline} onChange={(event) => setDiscipline(event.target.value)}>{disciplines.map((item) => <option key={item}>{item}</option>)}</select></label><label className="field-label">What would you like feedback on?<span className="field-hint">A little direction helps keep your review focused.</span><textarea rows={3} maxLength={180} value={context} onChange={(event) => setContext(event.target.value)} placeholder={sport === "grappling" ? "e.g. escaping side control, guard retention, takedown entries" : "e.g. footwork, route reading, hip positioning"} /><span className="character-count">{context.length} / 180</span></label></div></div>
        <div className="form-section form-section-divider"><div className="form-section-heading"><span className="form-kicker">03 / ADD YOUR VIDEO</span><span className="optional-badge">MP4 · MOV</span></div><UploadDropzone file={file} onFile={setFile} duration={fileDuration} onDuration={setFileDuration} /></div>
        <div className="form-submit-row"><button type="button" className="button button-primary submit-analysis" onClick={() => void startAnalysis()} disabled={!file}><UploadCloud size={16} /> Analyze this video <ArrowRight size={16} /></button><span><LockKeyhole size={12} /> Local preview · mock analysis</span></div>
      </section>

      <aside className="analyze-side-column">
        <div className="demo-card"><div className="demo-card-orb"><Sparkles size={17} /></div><span className="rail-overline">WANT TO TAKE A LOOK FIRST?</span><h3>Explore a sample review</h3><p>See how a session turns into moments, observations, and a practical next step.</p><div className="demo-preview-row"><span className="demo-preview-thumb"><img src={sport === "grappling" ? "/grappling-scene.svg" : "/climbing-scene.svg"} alt="" /></span><span><strong>{sport === "grappling" ? "No-Gi sparring" : "Boulder session"}</strong><small>{sport === "grappling" ? "6 moments · Guard & positioning" : "6 moments · Footwork & balance"}</small></span><Check size={14} /></div><button type="button" className="button button-secondary demo-button" onClick={() => void startAnalysis({ demo: true })}>Open sample analysis <ArrowRight size={15} /></button></div>
        <div className="what-you-get"><div className="rail-overline">WHAT’S IN A REVIEW</div><div className="what-row"><span>01</span><div><strong>Moments worth a second look</strong><small>Jump to key exchanges and moves.</small></div></div><div className="what-row"><span>02</span><div><strong>Context for each moment</strong><small>What happened and why it matters.</small></div></div><div className="what-row"><span>03</span><div><strong>A practical training focus</strong><small>Take one clear idea into practice.</small></div></div></div>
        <div className="ai-note"><CircleHelp size={14} /><span>Analysis is in prototype mode. A real video model is not connected yet.</span></div>
      </aside>
    </div>
    <div className="analyze-footer"><span><FileVideo2 size={14} /> Your original footage is not uploaded.</span><span>Questions? <Link href="/sessions">Browse sample sessions <ArrowRight size={12} /></Link></span></div>
  </div>;
}
