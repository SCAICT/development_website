import { useMemo, useState } from "react";
import { usePageAnim } from "../shared/usePageAnim";
import { useIsMobile } from "../shared/useIsMobile";
import { parseFrontmatter } from "../../utils/parseFrontmatter";

// ── data ─────────────────────────────────────────────────────────────────
const rawSponsors = import.meta.glob("../../data/sponsors/*.md", {
  eager: true, query: "?raw", import: "default",
});
const rawClubs = import.meta.glob("../../data/clubs/*.md", {
  eager: true, query: "?raw", import: "default",
});

function loadEntries(rawMap) {
  return Object.values(rawMap)
    .map(parseFrontmatter)
    .filter((e) => e.name)
    .sort((a, b) => Number(a.order ?? 99) - Number(b.order ?? 99));
}

function resolveExternalLink(entry) {
  return entry.website || entry.instagram || "";
}

const TIER_ORDER = ["PREMIUM", "GOLD", "SILVER", "BRONZE", "PARTNER"];
const ACCENT_MAP = {
  rose:   "var(--rose)",
  sand:   "var(--sand)",
  slate:  "var(--slate)",
  sage:   "var(--sage)",
  violet: "var(--violet)",
};
const CLUB_COLORS = ["var(--rose)", "var(--slate)", "var(--sage)", "var(--sand)", "var(--violet)"];
const PARTNER_FORM_URL = "https://docs.google.com/forms/d/1z0w7kQtNb30YG9nXQZEUM1WEZ1CTA52rcvi-X9L04-U/viewform";

// ── helpers ───────────────────────────────────────────────────────────────
function initials(name) {
  return name.split(/[\s/·_\-（(]+/).filter(Boolean)
    .slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function LogoField({ logo, name, accent, width, height }) {
  const [failed, setFailed] = useState(false);
  const show = logo && !failed;
  return (
    <div
      style={{
        width, height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
        // dot-grid backdrop
        backgroundImage: `radial-gradient(circle, ${accent}22 1px, transparent 1px)`,
        backgroundSize: "18px 18px",
        backgroundColor: "rgba(10,9,16,0.85)",
      }}
    >
      {/* vignette */}
      <div aria-hidden style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse at center, transparent 38%, rgba(10,9,16,0.7) 100%)",
        pointerEvents:"none" }} />

      {show ? (
        <img src={logo} alt={name} onError={() => setFailed(true)}
          style={{ width:"58%", height:"58%", objectFit:"contain",
            filter:"grayscale(15%) brightness(1.05) drop-shadow(0 0 12px rgba(0,0,0,0.5))",
            position:"relative", zIndex:1 }} />
      ) : (
        <span style={{
          fontFamily:"var(--head)",
          fontSize: Math.min(width, height) * 0.3,
          color:"transparent",
          WebkitTextStroke:`1.5px ${accent}55`,
          letterSpacing:2,
          userSelect:"none",
          position:"relative", zIndex:1,
        }}>{initials(name)}</span>
      )}
    </div>
  );
}

// ── PREMIUM — full-width feature block ───────────────────────────────────
function PremiumBlock({ sponsor, style, isMobile }) {
  const [hov, setHov] = useState(false);
  const accent = ACCENT_MAP[sponsor.accent] ?? "var(--ash)";
  const href = resolveExternalLink(sponsor);

  return (
    <a href={href || undefined} target={href ? "_blank" : undefined}
      rel="noreferrer" style={{ textDecoration:"none", color:"inherit", display:"block", ...style }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position:"relative",
        display:"grid",
        gridTemplateColumns:isMobile ? "1fr" : "280px 1fr",
        border:`2px solid ${hov ? accent : "rgba(200,191,176,0.18)"}`,
        background: hov
          ? `linear-gradient(90deg, rgba(10,9,16,0.98), ${accent}0d 100%)`
          : "rgba(14,12,20,0.95)",
        transition:"border-color 0.12s steps(2)",
        overflow:"hidden",
      }}>
        {/* 左：logo area */}
        <div style={{ borderRight:`2px solid ${hov ? accent : "rgba(200,191,176,0.1)"}`,
          borderRightWidth: isMobile ? 0 : 2,
          borderBottom: isMobile ? `2px solid ${hov ? accent : "rgba(200,191,176,0.1)"}` : undefined,
          transition:"border-color 0.12s steps(2)" }}>
          <LogoField logo={sponsor.logo} name={sponsor.name} accent={accent} width={isMobile ? "100%" : 280} height={200} />
        </div>

        {/* 右：content */}
        <div style={{ padding:isMobile ? "18px 16px" : "28px 32px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            {/* tier + index */}
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
              <span style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:3,
                padding:"3px 10px", border:`1px solid ${accent}`, color:accent }}>
                {sponsor.tier}
              </span>
              <div style={{ flex:1, height:"1px", background:`${accent}33` }} />
              <span style={{ fontFamily:"var(--mono)", fontSize:9, color:"var(--text-faint)", letterSpacing:2 }}>
                01
              </span>
            </div>

            {/* name */}
            <div style={{
              fontFamily:"var(--head)",
              fontSize:isMobile ? "clamp(24px,8vw,34px)" : "clamp(32px,4vw,56px)",
              lineHeight:0.92,
              color: hov ? accent : "var(--text)",
              transition:"color 0.1s steps(2)",
              letterSpacing:"-0.01em",
              marginBottom:16,
            }}>
              {sponsor.name}
            </div>

            {sponsor.description && (
              <div style={{ fontFamily:"var(--mono)", fontSize:isMobile ? 11 : 12, lineHeight:1.9,
                color:"var(--text-dim)", maxWidth:380 }}>
                {sponsor.description}
              </div>
            )}
          </div>

          {href && (
            <div style={{ fontFamily:"var(--mono)", fontSize:10, letterSpacing:2.4,
              color: hov ? accent : "var(--text-faint)", marginTop:20,
              transition:"color 0.1s steps(2)" }}>
              {href.replace(/^https?:\/\//, "")} →
            </div>
          )}
        </div>

        {/* 右上角裁切標記 */}
        <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none"
          style={{ position:"absolute", top:6, right:6, opacity:0.3 }}>
          <path d="M20 2 H12 M18 2 V10" stroke={accent} strokeWidth="1.2" />
        </svg>
      </div>
    </a>
  );
}

// ── GOLD / SILVER — half-width block ─────────────────────────────────────
function TieredBlock({ sponsor, globalIndex, style }) {
  const [hov, setHov] = useState(false);
  const accent = ACCENT_MAP[sponsor.accent] ?? "var(--ash)";
  const href = resolveExternalLink(sponsor);

  return (
    <a href={href || undefined} target={href ? "_blank" : undefined}
      rel="noreferrer" style={{ textDecoration:"none", color:"inherit", display:"block", ...style }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{
        border:`1.5px solid ${hov ? accent : "rgba(200,191,176,0.14)"}`,
        background: hov ? `linear-gradient(160deg, ${accent}0d, rgba(14,12,20,0.97))` : "rgba(14,12,20,0.92)",
        transition:"border-color 0.12s steps(2)",
        overflow:"hidden",
      }}>
        {/* logo 橫幅 */}
        <div style={{ borderBottom:`1px solid ${hov ? accent : "rgba(200,191,176,0.1)"}`,
          transition:"border-color 0.12s steps(2)" }}>
          <LogoField logo={sponsor.logo} name={sponsor.name} accent={accent} width="100%" height={130} />
        </div>

        {/* info */}
        <div style={{ padding:"16px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:2.5,
              color:accent }}>{sponsor.tier}</span>
            <span style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:2,
              color:"var(--text-faint)" }}>
              {String(globalIndex + 1).padStart(2,"0")}
            </span>
          </div>
          <div style={{ fontFamily:"var(--head)", fontSize:"clamp(18px,2.2vw,26px)",
            lineHeight:0.96, color: hov ? accent : "var(--text)",
            transition:"color 0.1s steps(2)", marginBottom:8 }}>
            {sponsor.name}
          </div>
          {sponsor.description && (
            <div style={{ fontFamily:"var(--mono)", fontSize:10, lineHeight:1.8,
              color:"var(--text-faint)" }}>
              {sponsor.description}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

// ── Club stamp card ───────────────────────────────────────────────────────
function ClubStamp({ club, index, style, isMobile }) {
  const [hov, setHov] = useState(false);
  const color = CLUB_COLORS[index % CLUB_COLORS.length];
  const rot = ([-1.2, 0.9, -0.5, 1.4, -1, 0.6][index % 6]);
  const href = resolveExternalLink(club);

  return (
    <div
      style={{
        transform: hov ? "rotate(0deg) translateY(-4px)" : `rotate(${rot}deg)`,
        transition:"transform 0.18s cubic-bezier(0.22,1,0.36,1)",
        ...style,
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {href
        ? <a href={href} target="_blank" rel="noreferrer"
            style={{ textDecoration:"none", color:"inherit", display:"block" }}>
            <StampInner club={club} color={color} hov={hov} isMobile={isMobile} />
          </a>
        : <StampInner club={club} color={color} hov={hov} isMobile={isMobile} />
      }
    </div>
  );
}

function StampInner({ club, color, hov, isMobile }) {
  return (
    <div style={{
      border:`2px solid ${hov ? color : "rgba(200,191,176,0.22)"}`,
      background:"rgba(12,11,18,0.96)",
      overflow:"hidden",
      transition:"border-color 0.12s steps(2)",
    }}>
      {/* logo area */}
      <div style={{
        position:"relative",
        borderBottom:`1px solid ${hov ? color : "rgba(200,191,176,0.1)"}`,
        transition:"border-color 0.12s steps(2)",
      }}>
        <LogoField logo={club.logo} name={club.name} accent={color} width="100%" height={isMobile ? 120 : 138} />

        {/* 角標 */}
        <div aria-hidden style={{
          position:"absolute", top:0, right:0,
          borderTop:`22px solid ${color}`,
          borderLeft:"22px solid transparent",
          opacity: hov ? 0.9 : 0.45,
          transition:"opacity 0.1s",
        }} />
      </div>

      {/* footer */}
      <div style={{ padding:isMobile ? "12px 12px 14px" : "14px 16px 16px" }}>
        <div style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:2.3,
          color:color, marginBottom:8 }}>
          {club.id} · {club.region}
        </div>
        <div style={{ fontFamily:"var(--sans)", fontSize:isMobile ? 14 : 16, fontWeight:700,
          lineHeight:1.5, color:"var(--text)" }}>
          {club.name}
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────
export function PartnersPage({ isExiting, navDir }) {
  const { anim } = usePageAnim(isExiting, navDir);
  const isMobile = useIsMobile();

  const sponsors = useMemo(() => loadEntries(rawSponsors), []);
  const clubs    = useMemo(() => loadEntries(rawClubs),    []);

  // 分出 premium 跟其他
  const premiums = sponsors.filter((s) => s.tier === "PREMIUM");
  const others   = sponsors.filter((s) => s.tier !== "PREMIUM");

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", paddingTop: "3rem", paddingBottom: isMobile ? "4rem" : "7rem" }}>

      {/* ── HEADER ── */}
      <div style={{ marginBottom: isMobile ? 40 : 64, ...anim(0, 160) }}>
        {/* 頂部細線 */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:isMobile ? 20 : 32 }}>
          <div style={{ flex:1, height:1, background:"var(--border-light)" }} />
          <span style={{ fontFamily:"var(--mono)", fontSize:isMobile ? 8 : 9, letterSpacing:isMobile ? 2.4 : 4, color:"var(--text-faint)" }}>
            SCAICT · ALLIES · VOL.01
          </span>
          <div style={{ flex:1, height:1, background:"var(--border-light)" }} />
        </div>

        {/* 主標 */}
        <div style={{ display:"flex", alignItems:isMobile ? "flex-start" : "flex-end", flexDirection:isMobile ? "column" : "row", justifyContent:"space-between", gap:isMobile ? 14 : 24 }}>
          <h1 style={{ fontFamily:"var(--head)", fontSize:isMobile ? "clamp(40px,14vw,66px)" : "clamp(48px,8vw,108px)",
            lineHeight:0.84, margin:0, letterSpacing:"-0.02em" }}>
            <span style={{ display:"block", color:"var(--text)" }}>THOSE</span>
            <span style={{ display:"inline-block", color:"transparent",
              WebkitTextStroke:"2px var(--zine-mid)", transform:"translateX(4px)" }}>WHO</span>
            <span style={{ display:"block" }}>
              <span style={{ background:"var(--rose)", color:"var(--coal)",
                padding:isMobile ? "0 12px" : "0 18px", display:"inline-block", transform:"rotate(-0.8deg)" }}>
                BACK US
              </span>
            </span>
          </h1>

          <div style={{ paddingBottom:8, textAlign:isMobile ? "left" : "right" }}>
            <div style={{ fontFamily:"var(--mono)", fontSize:isMobile ? 10 : 11, color:"var(--text-faint)",
              letterSpacing:2, lineHeight:2.4 }}>
              <span style={{ color:"var(--rose)" }}>●</span> {sponsors.length} SPONSORS<br />
              <span style={{ color:"var(--slate)" }}>●</span> {clubs.length} ALLIED CLUBS
            </div>
          </div>
        </div>

        {/* 底線 */}
        <div style={{ marginTop:24, height:5, background:"var(--rose)", position:"relative" }}>
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"40%",
            background:"var(--slate)" }} />
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"18%",
            background:"var(--sage)" }} />
        </div>
      </div>


      {/* ── SPONSORS ── */}
      <section style={{ marginBottom: isMobile ? 48 : 80 }}>

        {/* section label */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:isMobile ? 20 : 28, ...anim(50, 120) }}>
          <span style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:4, color:"var(--ash)",
            flexShrink:0 }}>01 / SPONSORS</span>
          <div style={{ flex:1, height:1, background:"var(--border)" }} />
          <span style={{ fontFamily:"var(--head)", fontSize:isMobile ? 9 : 10, letterSpacing:3,
            color:"var(--text-faint)" }}>THOSE WHO MAKE IT POSSIBLE</span>
        </div>

        {/* PREMIUM */}
        {premiums.map((s, i) => (
          <PremiumBlock key={s.name} sponsor={s} isMobile={isMobile} style={{ marginBottom:16, ...anim(70 + i*40, 100) }} />
        ))}

        {/* 其他 tier — 兩欄格 */}
        {others.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:isMobile ? "1fr" : "repeat(2, minmax(0,1fr))",
            gap:12, marginTop: premiums.length ? 12 : 0 }}>
            {others.map((s, i) => (
              <TieredBlock key={s.name} sponsor={s} globalIndex={premiums.length + i}
                style={anim(110 + i*35, 80)} />
            ))}
          </div>
        )}

        {/* become a sponsor */}
        <a
          href={PARTNER_FORM_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop:20,
            padding:isMobile ? "16px 16px" : "18px 24px",
            border:"1.5px dashed rgba(212,117,106,0.22)",
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            gap:16,
            flexWrap:"wrap",
            color:"inherit",
            textDecoration:"none",
            ...anim(110 + sponsors.length * 35 + 20, 0),
          }}
        >
          <div style={{ fontFamily:"var(--mono)", fontSize:isMobile ? 11 : 12, color:"var(--text-faint)",
            letterSpacing:1.5, lineHeight:2 }}>
            <span style={{ color:"var(--rose)", display:"block", fontSize:isMobile ? 11 : 12,
              letterSpacing:4, marginBottom:4 }}>BECOME A SPONSOR</span>
            想加入？歡迎透過社群管道聯絡我們。
          </div>
          <span style={{ fontFamily:"var(--mono)", fontSize:isMobile ? 9 : 10, letterSpacing:2,
            padding:"9px 22px", border:"1px solid var(--rose)", color:"var(--rose)",
            flexShrink:0 }}>
            CONTACT →
          </span>
        </a>
      </section>


      {/* ── CLUBS ── */}
      <section>

        {/* section label */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:isMobile ? 20 : 32,
          ...anim(200, 80) }}>
          <span style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:4, color:"var(--ash)",
            flexShrink:0 }}>02 / ALLIED CLUBS</span>
          <div style={{ flex:1, height:1, background:"var(--border)" }} />
          <span style={{ fontFamily:"var(--head)", fontSize:isMobile ? 9 : 10, letterSpacing:3,
            color:"var(--text-faint)" }}>UNITED WE HACK</span>
        </div>

        {/* stamp grid — 微旋轉的排列 */}
        <div style={{ display:"grid",
          gridTemplateColumns:isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(auto-fill, minmax(220px, 1fr))",
          gap:isMobile ? 14 : 28, alignItems:"start" }}>
          {clubs.map((club, i) => (
            <ClubStamp key={club.id ?? club.name} club={club} index={i}
              style={anim(220 + i * 30, 60)} isMobile={isMobile} />
          ))}

          {/* 申請空位 */}
          <div style={{
            border:"1.5px dashed rgba(200,191,176,0.14)",
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            gap:10, aspectRatio:"1/1", minHeight:isMobile ? 160 : 220,
            ...anim(220 + clubs.length * 30 + 20, 0),
          }}>
            <span style={{ fontFamily:"var(--head)", fontSize:36, color:"transparent",
              WebkitTextStroke:"1px rgba(200,191,176,0.18)" }}>?</span>
            <span style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:3,
              color:"var(--text-faint)", textAlign:"center", lineHeight:2 }}>
              YOUR<br />CLUB
            </span>
          </div>
        </div>

      </section>

    </div>
  );
}
