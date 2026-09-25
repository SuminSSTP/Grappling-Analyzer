# Tempo — Movement intelligence

A video-first review workspace for grappling and climbing sessions. This MVP runs locally and uses sport-specific sample feedback while keeping the interface ready for a real video-analysis provider.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The production build can be checked with `npm run build` and served with `npm run start`.

## Main routes

- `/` — overview, sport entry points, review steps, and recent sessions
- `/analyze` — local video selection, session context, processing state, and analysis workspace
- `/sessions` — searchable, filterable session history

The analyzer accepts MP4 and MOV clips up to 500 MB. It previews the selected file in the browser; the clip is not sent to a server. Session summaries are stored in this browser's local storage. The original video itself is not persisted after leaving the current review.

## Architecture

- `lib/types.ts` — `SessionAnalysis`, `Moment`, and sport-specific result types
- `lib/analysis-service.ts` — the `AnalysisService` boundary and current mock provider
- `lib/mock-data.ts` — grappling and climbing sample sessions and moments
- `lib/session-storage.ts` — browser-local session history
- `components/analysis-workspace.tsx` — player, timeline, moment feedback, and session summary
- `components/analyze-flow.tsx` — sport selection, upload, processing, and review state
- `app/` — overview, analyzer, session library, app shell, and global styling

## Mocked behavior

Processing stages are simulated. The mock provider returns structured sport-specific notes and does not inspect the uploaded clip, so feedback is clearly labeled as sample data in the workspace. The next engineering step is to implement a server-side provider for `AnalysisService` that sends the clip to a multimodal analysis service and returns the existing `SessionAnalysis` shape. Video upload, job state, and secure media storage should be added alongside that provider.
