import type { SessionAnalysis, Sport } from "@/lib/types";

const grappling: SessionAnalysis = {
  id: "demo-grappling",
  sport: "grappling",
  title: "No-gi sparring",
  discipline: "No-Gi",
  date: "2026-09-24",
  duration: 522,
  summary:
    "You stayed composed through two guard passes and recovered your frames well. The clearest opportunity is earlier inside-position defense: once your shoulders were flattened, the recovery became much more expensive.",
  strengths: ["Composed defensive reactions", "Strong hip-escape timing", "Connected elbows on recovery"],
  priorities: [
    { title: "Win inside position earlier", detail: "Build a frame before your shoulders touch the mat." },
    { title: "Connect elbow to knee", detail: "Close the space before your partner settles chest-to-chest." },
    { title: "Vary your stand-up entry", detail: "Pair the single-leg look with a level change or snap." },
  ],
  suggestedDrills: ["Underhook pummel to knee shield · 3 × 2 min", "Side-control frame to hip escape · 3 × 8 reps", "Single-leg entry, two finishes · 3 × 90 sec"],
  categories: [
    { category: "Defense", status: "strong", count: 2 },
    { category: "Escapes", status: "strong", count: 1 },
    { category: "Positioning", status: "developing", count: 2 },
    { category: "Takedowns", status: "focus", count: 1 },
  ],
  moments: [
    { id: "g1", timestamp: 34, endTimestamp: 47, category: "Defense", title: "Inside position lost", description: "Your partner threaded an underhook as your near elbow drifted away from your ribs.", whyItMatters: "With your shoulder line flattened, building back to a knee shield takes more effort and gives up passing pressure.", recommendation: "Pummel for the underhook while your shoulders are still on their side. Keep the near elbow connected to your knee.", importance: "high", position: "Half guard" },
    { id: "g2", timestamp: 88, endTimestamp: 101, category: "Escapes", title: "Strong hip escape", description: "You made space with your frame, then turned onto your side before your partner settled their weight.", whyItMatters: "The early angle kept your hips mobile and opened a clean path back to guard.", recommendation: "Repeat the same timing, then recover your knee inside before reaching for the far sleeve.", importance: "low", position: "Side control" },
    { id: "g3", timestamp: 146, endTimestamp: 163, category: "Positioning", title: "Back exposure in the scramble", description: "You turned away to stand, leaving your far shoulder available during the transition.", whyItMatters: "Turning your back gives your partner access to seatbelt control and slows your return to a safe base.", recommendation: "Post on the mat, face your partner, and build to a tripod before clearing the grip.", importance: "high", position: "Scramble" },
    { id: "g4", timestamp: 231, endTimestamp: 245, category: "Takedowns", title: "Entry became predictable", description: "The same level change appeared twice without a setup grip or a change of rhythm.", whyItMatters: "Your partner could widen their base before your hands reached the legs.", recommendation: "Use a collar tie snap or arm drag first, then enter when their weight shifts forward.", importance: "medium", position: "Standing" },
    { id: "g5", timestamp: 319, endTimestamp: 332, category: "Defense", title: "Good defensive framing", description: "Your forearm stayed between the shoulders and hips as pressure moved across your chest.", whyItMatters: "That frame bought enough room to turn back onto your side instead of absorbing the pass.", recommendation: "Keep the wrist firm and use the opposite foot to make space at the hip.", importance: "low", position: "Side control" },
    { id: "g6", timestamp: 411, endTimestamp: 429, category: "Positioning", title: "Late guard recovery", description: "You recovered half guard after your partner's crossface was already established.", whyItMatters: "The late knee insertion stopped the pass, but left your head and shoulders pinned for several seconds.", recommendation: "Track the near elbow earlier and insert your knee as soon as the crossface arm reaches across.", importance: "medium", position: "Half guard" },
  ],
  isDemo: true,
};

const climbing: SessionAnalysis = {
  id: "demo-climbing",
  sport: "climbing",
  title: "Boulder session · V4 circuit",
  discipline: "Bouldering",
  date: "2026-09-22",
  duration: 374,
  summary:
    "Your feet stayed quiet on the first half of the problem, and the high step gave you a stable position at the crux. You spent extra energy resetting your right hand where a hip turn could have made the next hold easier.",
  strengths: ["Quiet foot placement", "Good balance through the traverse", "Committed high-step on the crux"],
  priorities: [
    { title: "Trust the footholds", detail: "Reduce hand readjustments once your feet are set." },
    { title: "Bring the hip to the wall", detail: "Rotate before pulling on the next hold." },
    { title: "Read the rest positions", detail: "Look for a shake-out before the steep section." },
  ],
  suggestedDrills: ["Silent feet on easy terrain · 3 × 5 min", "Hover-hand placements · 3 × 6 moves", "Outside flag and hip turn · 3 × 4 reps per side"],
  categories: [
    { category: "Footwork", status: "strong", count: 1 },
    { category: "Balance", status: "strong", count: 1 },
    { category: "Body position", status: "developing", count: 1 },
    { category: "Grip efficiency", status: "focus", count: 1 },
    { category: "Route reading", status: "developing", count: 1 },
    { category: "Commitment", status: "strong", count: 1 },
  ],
  moments: [
    { id: "c1", timestamp: 22, endTimestamp: 35, category: "Footwork", title: "Precise foothold", description: "You placed the left toe quietly on the edge and kept your hips balanced over the foothold.", whyItMatters: "A controlled foot lets the leg take more load, preserving grip for the steeper moves ahead.", recommendation: "Keep this pace on the next two placements; look at the hold until the shoe settles.", importance: "low", position: "Move 2" },
    { id: "c2", timestamp: 74, endTimestamp: 91, category: "Grip efficiency", title: "Unnecessary hand readjustment", description: "You reset the right hand twice while your feet and body position stayed stable.", whyItMatters: "Each adjustment adds forearm tension without improving the hold you already have.", recommendation: "Set the grip once, soften your fingers, and shift your hips before deciding to readjust.", importance: "medium", position: "Move 4" },
    { id: "c3", timestamp: 128, endTimestamp: 145, category: "Body position", title: "Hip stayed away from the wall", description: "You pulled with both arms as your hips drifted away from the wall on the reach.", whyItMatters: "The extra distance increases the load on your arms and makes the next move harder to control.", recommendation: "Drive through the right foot and rotate your hip toward the wall before reaching.", importance: "high", position: "Move 6" },
    { id: "c4", timestamp: 184, endTimestamp: 201, category: "Balance", title: "Efficient outside flag", description: "Your left leg counterbalanced the reach and kept your hips from swinging off the wall.", whyItMatters: "The flag reduced swing and left your right hand free to move without a correction.", recommendation: "Use the same flag shape on the next steep move; keep the leg long and relaxed.", importance: "low", position: "Move 8" },
    { id: "c5", timestamp: 246, endTimestamp: 260, category: "Route reading", title: "Drop-knee opportunity", description: "The foothold angle allowed a right drop-knee, but you pulled straight upward instead.", whyItMatters: "A hip turn would lower your center of gravity and bring the next hold closer.", recommendation: "Pause before the crux and test the right drop-knee before committing to the reach.", importance: "medium", position: "Crux" },
    { id: "c6", timestamp: 301, endTimestamp: 319, category: "Commitment", title: "Strong crux commitment", description: "You drove through the high right foot and committed to the finishing hold without cutting feet.", whyItMatters: "A decisive push kept your center of gravity close and made the finish controlled.", recommendation: "Keep this foot-first sequence in your beta for the next attempt.", importance: "low", position: "Top" },
  ],
  isDemo: true,
};

export const demoSessions: SessionAnalysis[] = [grappling, climbing];

export function makeMockAnalysis(sport: Sport, duration?: number): SessionAnalysis {
  const source = sport === "grappling" ? grappling : climbing;
  const resolvedDuration = duration && duration > 0 ? Math.round(duration) : source.duration;
  const scale = resolvedDuration / source.duration;
  const momentCount = resolvedDuration < 120
    ? Math.max(1, Math.min(source.moments.length, Math.floor(resolvedDuration / 20)))
    : source.moments.length;
  const moments = source.moments.slice(0, momentCount).map((moment, index) => {
    const timestamp = resolvedDuration < 120
      ? resolvedDuration * (index + 1) / (momentCount + 1)
      : moment.timestamp * scale;
    return {
      ...moment,
      timestamp,
      endTimestamp: Math.min(resolvedDuration, Math.max(timestamp + 1, resolvedDuration < 120 ? timestamp + Math.min(10, resolvedDuration / (momentCount + 1) * 0.35) : moment.endTimestamp * scale)),
    };
  });
  const categoryOrder = sport === "grappling"
    ? ["Defense", "Escapes", "Positioning", "Takedowns"]
    : ["Footwork", "Balance", "Body position", "Grip efficiency", "Route reading", "Commitment"];
  const strongCategories = sport === "grappling" ? ["Defense", "Escapes"] : ["Footwork", "Balance", "Commitment"];
  const focusCategories = sport === "grappling" ? ["Takedowns"] : ["Grip efficiency"];
  const categories = categoryOrder.flatMap((category) => {
    const count = moments.filter((moment) => moment.category === category).length;
    if (!count) return [];
    return [{ category, count, status: strongCategories.includes(category) ? "strong" as const : focusCategories.includes(category) ? "focus" as const : "developing" as const }];
  });
  return {
    ...source,
    id: `session-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    duration: resolvedDuration,
    isDemo: false,
    categories,
    moments,
  };
}
