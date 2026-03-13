export function EdgeNav({ onNavigate }) {
  return (
    <>
      <button className="edge-nav nav-logo" onClick={() => onNavigate("home")} aria-label="前往首頁">
        <div className="nav-logo-top-rule" />
        <div className="nav-logo-name">SCAICT</div>
        <div className="nav-logo-year">EST · 2021</div>
        <div className="nav-logo-dot" />
        <div className="nav-logo-vol">VOL.05</div>
      </button>

      <button className="edge-nav nav-tape" onClick={() => onNavigate("about")} aria-label="關於我們 — Manifesto">
        <div className="nav-tape-publication">STUDENTS' COMPUTING CONFERENCE</div>
        <div className="nav-tape-sep" />
        <div className="nav-tape-section">MANIFESTO</div>
        <div className="nav-tape-fill" />
        <div className="nav-tape-date">2026 · SPRING ISSUE</div>
      </button>

      <button className="edge-nav nav-torn" onClick={() => onNavigate("modules")} aria-label="活動專題 — Events">
        <div className="nav-torn-index">03</div>
        <div className="nav-torn-divider" />
        <div className="nav-torn-body">
          <div className="nav-torn-label">EVENTS</div>
          <div className="nav-torn-meta">FEATURED DOSSIER · scaict.org</div>
        </div>
      </button>

      <button className="edge-nav nav-alert" onClick={() => onNavigate("events")} aria-label="活動紀錄 — Logs">
        <div className="nav-alert-num">04</div>
        <div className="nav-alert-stack">
          <div className="nav-alert-issue">ARCHIVE · ISSUE 05</div>
          <div className="nav-alert-label">LOGS</div>
        </div>
      </button>

      <button className="edge-nav nav-network" onClick={() => onNavigate("partners")} aria-label="贊助與合作社團 — Network">
        <div className="nav-network-num">05</div>
        <div className="nav-network-stack">
          <div className="nav-network-issue">SPONSORS · CLUBS</div>
          <div className="nav-network-label">NETWORK</div>
        </div>
      </button>
    </>
  );
}
