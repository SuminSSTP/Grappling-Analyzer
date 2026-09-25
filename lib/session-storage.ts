import type { SavedSession, SessionAnalysis } from "@/lib/types";

const STORAGE_KEY = "motion-analysis.sessions.v1";

export function readSavedSessions(): SavedSession[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as SavedSession[]) : [];
  } catch {
    return [];
  }
}

export function saveSession(session: SessionAnalysis): void {
  if (typeof window === "undefined") return;
  const { videoUrl: _videoUrl, ...stored } = session;
  const record: SavedSession = {
    ...stored,
    thumbnail: session.sport,
  };
  const next = [record, ...readSavedSessions().filter((item) => item.id !== record.id)].slice(0, 12);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
