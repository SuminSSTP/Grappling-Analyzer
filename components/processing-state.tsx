"use client";

import { Check, Circle, LoaderCircle, ScanLine, Sparkles, Video, WandSparkles } from "lucide-react";
import type { Sport } from "@/lib/types";

export const processingSteps = [
  { title: "Preparing your clip", detail: "Checking the session format", icon: Video },
  { title: "Finding key moments", detail: "Mapping changes in the session", icon: ScanLine },
  { title: "Reading movement", detail: "Organizing sport-specific notes", icon: WandSparkles },
  { title: "Building your review", detail: "Putting feedback into context", icon: Sparkles },
];

export function ProcessingState({ step, sport, fileName }: { step: number; sport: Sport; fileName?: string }) {
  return <div className="processing-screen">
    <div className="processing-art"><div className={`processing-art-image ${sport}`}><img src={sport === "grappling" ? "/grappling-scene.svg" : "/climbing-scene.svg"} alt="" /></div><div className="scan-line" /><span className="scan-node node-one" /><span className="scan-node node-two" /><span className="scan-node node-three" /><div className="processing-file"><Video size={14} /><span>{fileName || (sport === "grappling" ? "No-gi · sample session" : "Bouldering · sample session")}</span><i /></div></div>
    <div className="processing-copy"><div className="eyebrow"><span className="eyebrow-line" /> SESSION REVIEW</div><h1>Taking a closer look<span className="loading-ellipsis">...</span></h1><p>We’re organizing the moments that can make your next session more intentional.</p>
      <div className="processing-list">{processingSteps.map(({ title, detail, icon: Icon }, index) => <div key={title} className={`processing-step ${index < step ? "complete" : index === step ? "in-progress" : "pending"}`}><span className="processing-icon">{index < step ? <Check size={14} /> : index === step ? <LoaderCircle className="spin" size={15} /> : <Icon size={14} />}</span><span><strong>{title}</strong><small>{detail}</small></span>{index === step ? <span className="step-status">IN PROGRESS</span> : index < step ? <Check className="step-done" size={14} /> : <Circle className="step-wait" size={8} />}</div>)}</div>
      <div className="processing-note"><span className="mock-note-dot" /> Prototype analysis uses structured sample feedback. Visual AI is not connected yet.</div>
    </div>
  </div>;
}
