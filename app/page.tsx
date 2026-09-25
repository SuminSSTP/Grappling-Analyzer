import { ArrowDown, ArrowRight, ArrowUpRight, CirclePlay, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { SessionCard } from "@/components/session-card";
import { demoSessions } from "@/lib/mock-data";

export default function HomePage() {
  return <div className="page-stack home-page">
    <section className="hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> A CLEARER READ ON YOUR TRAINING</div>
        <h1>See what happened.<br /><span>Know what to fix.</span></h1>
        <p className="hero-description">Your training has the answers. Review the moments that matter and turn every round or route into a more useful next session.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/analyze">Analyze a session <ArrowRight size={16} /></Link><a className="button button-secondary" href="#how-it-works"><CirclePlay size={16} /> See how it works</a></div>
        <div className="hero-footnote"><span className="mini-avatar-stack"><i>G</i><i>C</i></span><span>Made for the mat and the wall</span><span className="footnote-divider">·</span><span>Private by default</span></div>
      </div>
      <div className="hero-art-panel">
        <div className="hero-art-head"><span><i className="live-dot" /> SESSION REVIEW</span><span>01 / 02</span></div>
        <div className="hero-art-img" role="img" aria-label="Illustrated grappling athletes in a training session"><div className="hero-image-vignette" /><div className="hero-art-label"><span>NO-GI · ROUND 03</span><strong>Find the moment<br />before the turn.</strong></div>
          <div className="floating-insight"><span className="insight-symbol">↗</span><div><small>POSITIONING</small><strong>Inside position lost</strong><span>00:34 <i>·</i> High importance</span></div><ArrowUpRight size={15} /></div>
          <div className="art-play"><CirclePlay size={23} fill="currentColor" /></div>
        </div>
        <div className="hero-art-footer"><div className="micro-waveform">{Array.from({ length: 42 }, (_, index) => <i key={index} style={{ height: `${8 + ((index * 19 + 11) % 22)}px` }} />)}</div><span>REVIEW A MOMENT</span><ArrowRight size={14} /></div>
      </div>
    </section>

    <section className="sport-section" id="sports">
      <div className="section-heading"><div><div className="eyebrow small-eyebrow">TWO DISCIPLINES. ONE CLEARER VIEW.</div><h2>Choose your session</h2></div><span className="section-side-note">Start with a demo or bring your own footage <ArrowDown size={14} /></span></div>
      <div className="sport-grid">
        <article className="sport-card sport-card-grappling">
          <img src="/grappling-scene.svg" alt="Illustrated grappling athletes on the mat" />
          <div className="sport-card-shade" />
          <div className="sport-card-content"><span className="sport-overline"><i className="sport-dot dot-grappling" /> GRAPPLING <i className="overline-connector" /> BJJ · WRESTLING · NO-GI</span><h3>Read the exchange.</h3><p>Positions, transitions, and the small battles for inside control.</p><div className="sport-card-actions"><Link className="button button-light" href="/analyze?sport=grappling">Analyze a video <ArrowRight size={15} /></Link><Link className="text-link" href="/analyze?sport=grappling&demo=1">Explore demo <MoveUpRight size={14} /></Link></div></div>
          <div className="sport-card-index">01</div>
        </article>
        <article className="sport-card sport-card-climbing">
          <img src="/climbing-scene.svg" alt="Illustrated climber moving across an indoor wall" />
          <div className="sport-card-shade" />
          <div className="sport-card-content"><span className="sport-overline"><i className="sport-dot dot-climbing" /> CLIMBING <i className="overline-connector" /> BOULDERING · SPORT</span><h3>Make each move count.</h3><p>Footwork, body position, and choices through the crux.</p><div className="sport-card-actions"><Link className="button button-light" href="/analyze?sport=climbing">Analyze a video <ArrowRight size={15} /></Link><Link className="text-link" href="/analyze?sport=climbing&demo=1">Explore demo <MoveUpRight size={14} /></Link></div></div>
          <div className="sport-card-index">02</div>
        </article>
      </div>
    </section>

    <section className="process-section" id="how-it-works">
      <div className="section-heading"><div><div className="eyebrow small-eyebrow">FROM FOOTAGE TO FOCUS</div><h2>A useful review, in four steps</h2></div><Link className="subtle-link" href="/analyze">Start a review <ArrowRight size={14} /></Link></div>
      <div className="process-steps">
        {[["01", "Bring a session", "Upload a short training clip or open a sample review."], ["02", "Find the moments", "Get a structured pass through the key exchanges or moves."], ["03", "Review the why", "See what happened, why it mattered, and what to try."], ["04", "Train with a focus", "Leave with a small set of priorities for next time."]].map(([number, title, body], index) => <div className="process-step" key={number}><div className="step-top"><span>{number}</span>{index < 3 && <i />}</div><strong>{title}</strong><p>{body}</p></div>)}
      </div>
    </section>

    <section className="recent-section">
      <div className="section-heading"><div><div className="eyebrow small-eyebrow">PICK UP WHERE YOU LEFT OFF</div><h2>Recent sessions</h2></div><Link className="subtle-link" href="/sessions">All sessions <ArrowRight size={14} /></Link></div>
      <div className="session-card-grid">{demoSessions.map((session) => <SessionCard key={session.id} session={session} compact />)}</div>
    </section>

    <footer className="page-footer"><span>tempo<span className="accent-dot">.</span> movement intelligence</span><span>Built around the work you put in.</span></footer>
  </div>;
}
