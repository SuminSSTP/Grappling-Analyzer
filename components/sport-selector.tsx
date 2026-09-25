"use client";

import { Check, Dumbbell, Mountain } from "lucide-react";
import type { Sport } from "@/lib/types";

export function SportSelector({ value, onChange }: { value: Sport; onChange: (sport: Sport) => void }) {
  return <div className="sport-selector" role="group" aria-label="Choose a sport">
    <button type="button" onClick={() => onChange("grappling")} className={`selector-card ${value === "grappling" ? "selected" : ""}`} aria-pressed={value === "grappling"}>
      <span className="selector-icon grappling-icon"><Dumbbell size={17} /></span><span><strong>Grappling</strong><small>BJJ · Wrestling · No-Gi</small></span>{value === "grappling" && <Check className="selector-check" size={15} />}
    </button>
    <button type="button" onClick={() => onChange("climbing")} className={`selector-card ${value === "climbing" ? "selected" : ""}`} aria-pressed={value === "climbing"}>
      <span className="selector-icon climbing-icon"><Mountain size={17} /></span><span><strong>Climbing</strong><small>Bouldering · Sport</small></span>{value === "climbing" && <Check className="selector-check" size={15} />}
    </button>
  </div>;
}
