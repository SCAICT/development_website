import { usePageAnim } from "../shared/usePageAnim";
import { Typewriter } from "../shared/Typewriter";

function MarqueeStrip() {
  const items = ["CODE YOUR WORLD", "中部高中電資", "BREAK THE SYSTEM", "BUILD THE FUTURE", "OPEN SOURCE", "COMMUNITY", "SCAICT · VOL.01"];
  const repeated = [...items, ...items];
  return (
    <div className="home-marquee">
      <div className="home-marquee-track">
        {repeated.map((item, i) => (
          <span key={`${item}-${i}`} className="home-marquee-item">{item} ◆</span>
        ))}
      </div>
    </div>
  );
}

export function HomePage({ isExiting, navDir }) {
  const { anim } = usePageAnim(isExiting, navDir);

  return (
    <div className="home-shell">
      {/* 背景 */}
      <div className="home-ambient home-ambient-rose" />
      <div className="home-ambient home-ambient-slate" />
      <div className="home-grid-lines" />

      {/* ── 頂部報頭 ── */}
      <header className="home-masthead" style={anim(0, 220)}>
        <span className="home-masthead-meta home-masthead-meta-left">ISSUE 001 · VOL.01 · 2026</span>
        <span className="home-masthead-title">SCAICT  ZINE</span>
        <span className="home-masthead-meta home-masthead-meta-right">CENTRAL TAIWAN · [ SYS_ONLINE ]</span>
      </header>

      {/* ── 主視覺區 ── */}
      <div className="home-stage">

        {/* 左側直排字 */}
        <div className="home-side-label" style={anim(240, 60)}>
          STUDENTS' COMPUTING CONFERENCE
        </div>

        {/* 中央內容 */}
        <div className="home-center">

          {/* kicker */}
          <div className="home-kicker" style={anim(60, 180)}>
            <span className="home-kicker-bracket">[</span>
            <span className="home-kicker-desktop">
              &nbsp;SYS_ONLINE&nbsp;·&nbsp;STUDENTS' COMPUTING CONFERENCE&nbsp;·&nbsp;2026&nbsp;
            </span>
            <span className="home-kicker-mobile">SYS_ONLINE · CONF · 2026</span>
            <span className="home-kicker-bracket">]</span>
          </div>

          {/* 主標 */}
          <div className="home-title-block" style={anim(120, 140)}>
            {/* 浮水印影子 */}
            <div className="home-title-bg" aria-hidden="true">SCAICT</div>
            <h1 className="home-title">SCAICT</h1>
          </div>

          {/* 分隔線 */}
          <div className="home-rule" style={anim(170, 110)}>
            <div className="home-rule-line" />
            <span className="home-rule-dot">◆</span>
            <div className="home-rule-line home-rule-line-faint" />
          </div>

          {/* 副標 cutouts */}
          <div className="home-cutouts" style={anim(220, 80)}>
            {[
              { text: "中部高中", cls: "cutout", rot: -2 },
              { text: "電資社團", cls: "cutout cutout-slate", rot: 1 },
              { text: "聯合會議", cls: "cutout", rot: -1 },
            ].map(({ text, cls, rot }) => (
              <span
                key={text}
                className={cls}
                style={{
                  fontSize: "clamp(20px, 2.6vw, 36px)",
                  transform: `rotate(${rot}deg) skewX(-8deg)`,
                  fontFamily: "var(--serif-tc)",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                }}
              >
                {text}
              </span>
            ))}
          </div>

          {/* 宣言文字 */}
          <div className="home-manifesto" style={anim(275, 45)}>
            <p className="home-manifesto-desktop">student computing collective / central taiwan</p>
            <p className="home-manifesto-mobile">student collective 2026 / SCAICT 5th</p>
            <strong className="home-manifesto-desktop">WE ARE THE SYSTEM OVERRIDE.</strong>
            <strong className="home-manifesto-mobile">WE ARE THE OVERRIDE.</strong>
          </div>

          {/* 打字機 */}
          <div className="home-type" style={anim(340, 15)}>
            <Typewriter texts={[
              "CODE / BUILD / SHARE / CONNECT",
              "HIGH SCHOOLERS MAKING SIGNAL",
              "WEBSITE · MODULES · EVENTS · CLUBS",
            ]} />
          </div>

          {/* CTA */}
          <div style={anim(400, 0)}>
            <a
              href="https://docs.google.com/forms/d/1z0w7kQtNb30YG9nXQZEUM1WEZ1CTA52rcvi-X9L04-U"
              target="_blank"
              rel="noreferrer"
              className="home-primary-cta"
            >
              JOIN_NOW →
            </a>
          </div>
        </div>

        {/* ── 雜誌裝飾 ── */}

        {/* 左上角括號 */}
        <div className="home-corner home-corner-tl" style={anim(80, 170)} aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M40 2 H2 V40" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* 右下角括號 */}
        <div className="home-corner home-corner-br" style={anim(100, 150)} aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M0 38 H38 V0" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* 右上：期號圓形印章 */}
        <div className="home-stamp" style={anim(150, 120)} aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" className="home-stamp-svg">
            <circle cx="60" cy="60" r="52" stroke="var(--rose)" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="60" cy="60" r="44" stroke="var(--rose)" strokeWidth="0.8" />
            <text textAnchor="middle" dominantBaseline="middle" x="60" y="54"
              fontFamily="var(--head)" fontSize="22" fill="var(--rose)" letterSpacing="2">
              VOL.01
            </text>
            <text textAnchor="middle" dominantBaseline="middle" x="60" y="72"
              fontFamily="var(--mono)" fontSize="10" fill="var(--rose)" letterSpacing="3">
              2026
            </text>
          </svg>
        </div>

        {/* 左下：分類標籤堆疊 */}
        <div className="home-tags" style={anim(190, 90)} aria-hidden="true">
          {["ZINE", "OPEN SOURCE", "STUDENT-RUN"].map((t, i) => (
            <span key={t} className="home-tag" style={{ transform: `rotate(${[-3, 2, -1.5][i]}deg)` }}>
              {t}
            </span>
          ))}
        </div>

        {/* 右側垂直文字 */}
        <div className="home-side-label home-side-label-right" style={anim(210, 80)} aria-hidden="true">
          VOL.01 / 2026 / ISSUE NO.001
        </div>

        {/* 浮水印大字 */}
        <div className="home-watermark" aria-hidden="true">2026</div>
      </div>

      {/* ── 底部跑馬燈 ── */}
      <MarqueeStrip />
    </div>
  );
}
