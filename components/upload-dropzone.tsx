"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileVideo2, Film, RotateCcw, Upload, X } from "lucide-react";
import { formatTime } from "@/lib/format";

export function UploadDropzone({ file, onFile, duration, onDuration }: {
  file: File | null;
  onFile: (file: File | null) => void;
  duration: number;
  onDuration: (duration: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file) { setPreviewUrl(""); return; }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const acceptFile = (candidate?: File) => {
    if (!candidate) return;
    const supported = candidate.type === "video/mp4" || candidate.type === "video/quicktime" || /\.(mp4|mov)$/i.test(candidate.name);
    if (!supported) {
      setError("Choose a video file in MP4 or MOV format.");
      return;
    }
    if (candidate.size > 500 * 1024 * 1024) {
      setError("This prototype supports videos up to 500 MB.");
      return;
    }
    setError("");
    onDuration(0);
    onFile(candidate);
  };

  return <div className="upload-panel">
    <div className="upload-panel-head"><div><span className="form-kicker">01 / YOUR FOOTAGE</span><h3>Add a training video</h3><p>Choose a short clip to keep your review focused.</p></div><span className="optional-badge">VIDEO FILE</span></div>
    {file ? <div className="selected-file-card">
      <div className="file-icon"><FileVideo2 size={21} /></div><div className="selected-file-details"><strong>{file.name}</strong><span>{(file.size / (1024 * 1024)).toFixed(1)} MB{duration ? ` · ${formatTime(duration)}` : " · Reading clip…"}</span></div><span className="file-ready"><Check size={12} /> READY</span><button type="button" className="icon-button remove-file" aria-label="Remove video" onClick={() => { onFile(null); onDuration(0); if (inputRef.current) inputRef.current.value = ""; }}><X size={16} /></button><video className="metadata-reader" src={previewUrl || undefined} onLoadedMetadata={(event) => onDuration(event.currentTarget.duration)} preload="metadata" />
      <div className="file-actions"><button type="button" className="text-button" onClick={() => inputRef.current?.click()}><RotateCcw size={13} /> Replace video</button><span>Preview available in your review</span></div>
    </div> : <button type="button" className={`dropzone ${dragging ? "dragging" : ""}`} onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files[0]); }}>
      <span className="upload-orbit"><Upload size={19} /></span><strong>Drop your video here, or <em>browse files</em></strong><span>MP4 or MOV · up to 500 MB</span><span className="upload-formats"><i><Film size={13} /> MP4</i><i><Film size={13} /> MOV</i></span>
    </button>}
    <input ref={inputRef} className="visually-hidden" type="file" accept="video/mp4,video/quicktime,.mp4,.mov" onChange={(event) => acceptFile(event.target.files?.[0])} />
    {error && <p className="field-error" role="alert">{error}</p>}
    <p className="upload-privacy"><span className="privacy-lock">◇</span> Your footage stays in this browser. Nothing is uploaded to a server.</p>
  </div>;
}
