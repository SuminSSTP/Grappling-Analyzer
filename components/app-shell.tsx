"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ArrowUpRight, CircleHelp, Compass, Dumbbell, FolderClock, House, Plus, Settings2 } from "lucide-react";

const navigation = [
  { href: "/", label: "Overview", icon: House },
  { href: "/analyze", label: "Analyze video", icon: Compass },
  { href: "/sessions", label: "Session library", icon: FolderClock },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = pathname === "/sessions" ? "Session library" : pathname === "/analyze" ? "Video analysis" : "Overview";

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Tempo home">
          <span className="brand-mark"><Activity size={18} strokeWidth={2.4} /></span>
          <span className="brand-name">tempo<span>.</span><small>movement intelligence</small></span>
        </Link>

        <div className="workspace-switcher">
          <div className="workspace-avatar"><Dumbbell size={16} /></div>
          <div><strong>Personal workspace</strong><span>Training analysis</span></div>
          <span className="switch-caret">⌄</span>
        </div>

        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return <Link key={href} href={href} className={`nav-link ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{href === "/sessions" && <span className="nav-count">02</span>}
            </Link>;
          })}
        </nav>

        <div className="side-divider" />
        <div className="side-label side-label-row">YOUR SPORTS <Plus size={13} /></div>
        <Link className="sport-nav" href="/analyze?sport=grappling"><span className="sport-dot dot-grappling" />Grappling <span className="sport-nav-sub">BJJ · wrestling</span></Link>
        <Link className="sport-nav" href="/analyze?sport=climbing"><span className="sport-dot dot-climbing" />Climbing <span className="sport-nav-sub">Bouldering</span></Link>

        <div className="sidebar-bottom">
          <div className="sidebar-note"><span className="note-icon"><CircleHelp size={14} /></span><div><strong>Built for the replay</strong><p>Turn training footage into a clearer next session.</p></div><ArrowUpRight size={14} /></div>
          <Link className="nav-link quiet-link" href="/sessions"><Settings2 size={16} strokeWidth={1.8} /><span>Preferences</span></Link>
          <div className="profile-row"><div className="profile-avatar">A</div><div><strong>Athlete</strong><span>Personal account</span></div><span className="profile-more">···</span></div>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark"><Activity size={17} /></span><strong>tempo<span>.</span></strong></div>
          <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{pageTitle}</strong></div>
          <div className="topbar-right"><span className="local-status"><i /> Private workspace</span><Link className="topbar-cta" href="/analyze"><Plus size={15} /> New analysis</Link></div>
        </header>
        <nav className="mobile-nav" aria-label="Main navigation">{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : ""}><Icon size={15} />{label}</Link>)}</nav>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
