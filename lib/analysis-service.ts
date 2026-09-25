import { makeMockAnalysis } from "@/lib/mock-data";
import type { AnalysisService, AnalyzeInput, SessionAnalysis } from "@/lib/types";

/**
 * This is the replaceable boundary for a future multimodal video-analysis API.
 * The UI only consumes SessionAnalysis, so a real provider can replace this
 * implementation without changing the workspace components.
 */
export const mockAnalysisService: AnalysisService = {
  async analyze(input: AnalyzeInput): Promise<SessionAnalysis> {
    await new Promise((resolve) => setTimeout(resolve, 550));
    const analysis = makeMockAnalysis(input.sport, input.duration);
    analysis.isDemo = !input.file;
    analysis.discipline = input.discipline;
    analysis.title = input.file?.name.replace(/\.[^.]+$/, "") || analysis.title;
    if (input.file) analysis.videoName = input.file.name;
    if (input.context.trim()) {
      analysis.priorities[0] = {
        title: input.context.trim(),
        detail: "Use this as the main focus for your next review and training block.",
      };
    }
    return analysis;
  },
};
