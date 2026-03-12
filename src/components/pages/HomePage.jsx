import { useEffect, useLayoutEffect, useState } from "react";
import { Typewriter } from "../shared/Typewriter";

const heroGlob = import.meta.glob(
  "/src/assets/hero/*.{jpg,jpeg,png,gif,webp,svg}",
  { query: "?url", import: "default", eager: true }
);

const SHADOW_CYCLE = ["var(--slate)", "var(--rose)", "var(--sand)", "var(--sage)", "var(--violet)"];

const FALLBACK_IMGS = [
  { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=70", label: "HACK / CODE" },
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=70", label: "COMMUNITY" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=70", label: "BUILD" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=70", label: "HACKATHON" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=70", label: "CONF" },
];

// 每張照片在四周的絕對位置定義
const PHOTO_SLOTS = [
  // 左上
  { top: "8%",  left: "3%",   width: "min(160px,13vw)", rotate: -7,  aspect: "3/4",  tapePos: { bottom: -9, right: 6 } },
  // 右上
  { top: "6%",  right: "3%",  width: "min(190px,15vw)", rotate: 5,   aspect: "4/3",  tapePos: { bottom: -9, left: 8 } },
  // 左下
  { bottom: "10%", left: "2%", width: "min(155px,12vw)", rotate: 6,  aspect: "4/3",  tapePos: { top: -9,   right: 6 } },
  // 右下
  { bottom: "8%",  right: "2%", width: "min(170px,13vw)", rotate: -5, aspect: "3/4", tapePos: { top: -9,   left: 8 } },
  // 右側中
  { top: "38%", right: "1%",  width: "min(140px,11vw)", rotate: 3,   aspect: "1/1",  tapePos: { bottom: -9, left: 6 } },
];

// tablet 版只留角落四張
const PHOTO_SLOTS_TABLET = [
  { top: "6%",     left: "2%",   width: "min(120px,12vw)", rotate: -6, aspect: "3/4", tapePos: { bottom: -9, right: 6 } },
  { top: "5%",     right: "2%",  width: "min(140px,13vw)", rotate: 5,  aspect: "4/3", tapePos: { bottom: -9, left: 8 } },
  { bottom: "8%",  left: "2%",   width: "min(120px,12vw)", rotate: 5,  aspect: "4/3", tapePos: { top: -9,   right: 6 } },
  { bottom: "7%",  right: "2%",  width: "min(130px,12vw)", rotate: -4, aspect: "3/4", tapePos: { top: -9,   left: 8 } },
];

function getImgList() {
  const entries = Object.entries(heroGlob);
  if (entries.length === 0) return FALLBACK_IMGS;
  return entries
    .sort(() => Math.random() - 0.5)
    .map(([path, url]) => ({
      src: url,
      label: path.split("/").pop().replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").toUpperCase(),
    }));
}

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function MarqueeStrip() {
  const items = ["CODE YOUR WORLD", "中部高中電資", "BREAK THE SYSTEM", "BUILD THE FUTURE", "OPEN SOURCE", "COMMUNITY", "SCAICT · VOL.01"];
  const repeated = [...items, ...items];
  return (
    <div style={{
      height: 34, background: "var(--rose)", overflow: "hidden",
      display: "flex", alignItems: "center",
      borderTop: "2px solid var(--coal)", flexShrink: 0,
    }}>
      <div style={{ display: "flex", animation: "marqueeScroll 22s linear infinite", whiteSpace: "nowrap" }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--coal)", fontWeight: 700, padding: "0 28px" }}>
            {item} ◆
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const [imgs, setImgs] = useState([]);
  const [entered, setEntered] = useState(false);
  const width = useWindowWidth();

  const isTablet = width >= 768 && width < 1200;

  useLayoutEffect(() => { setImgs(getImgList()); }, []);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay) => ({
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  const slots = isTablet ? PHOTO_SLOTS_TABLET : PHOTO_SLOTS;

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 50% 45%, rgba(212,117,106,0.09), transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(94,143,191,0.06), transparent 40%)",
      }} />

      {/* ── MASTHEAD ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isTablet ? "11px 18px 9px" : "13px 28px 11px",
        borderBottom: "1px solid var(--border-light)",
        zIndex: 10, flexShrink: 0,
        ...fadeUp(0),
      }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 4, color: "var(--text-faint)" }}>
          ISSUE 001 · VOL.01 · 2026
        </span>
        <span style={{ fontFamily: "var(--head)", fontSize: "clamp(14px, 1.8vw, 20px)", letterSpacing: 4, color: "var(--ash)" }}>
          SCAICT  ZINE
        </span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 4, color: "var(--text-faint)" }}>
          CENTRAL TAIWAN · [ SYS_ONLINE ]
        </span>
      </div>

      {/* ── STAGE：照片 + 主視覺 ── */}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>

        {/* 散落的照片 */}
        {imgs.slice(0, slots.length).map((img, i) => {
          const slot = slots[i];
          const { rotate, aspect, tapePos, width: w, ...pos } = slot;
          return (
            <div
              key={img.label}
              style={{
                position: "absolute", width: w,
                transform: `rotate(${rotate}deg)`,
                zIndex: 4,
                ...pos,
                ...fadeUp(120 + i * 60),
              }}
            >
              <div className="punk-img" style={{ width: "100%", "--punk-shadow": SHADOW_CYCLE[i] }}>
                <img src={img.src} alt={img.label}
                  style={{ width: "100%", aspectRatio: aspect, objectFit: "cover", display: "block" }} />
                <div className="tape" style={{ transform: "rotate(-2deg)", ...tapePos }}>{img.label}</div>
              </div>
            </div>
          );
        })}

        {/* 主視覺：絕對置中 */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: isTablet ? "min(440px, 58vw)" : "min(520px, 42vw)",
          zIndex: 6,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 4, color: "var(--ash)", marginBottom: 14, ...fadeUp(80) }}>
            [ SYS_ONLINE ] · STUDENTS' COMPUTING CONFERENCE · 2026
          </div>

          <div style={fadeUp(160)}>
            <div style={{
              fontFamily: "var(--head)",
              fontSize: isTablet ? "clamp(72px, 14vw, 150px)" : "clamp(80px, 10vw, 160px)",
              color: "transparent",
              WebkitTextStroke: "2px var(--rose)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              transform: "rotate(-1deg)",
              userSelect: "none",
              textRendering: "optimizeLegibility",
            }}>
              SCAICT
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0 16px" }}>
              <div style={{ flex: 1, height: 2, background: "var(--rose)" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--rose)" }}>◆</span>
              <div style={{ flex: 1, height: 1, background: "var(--border-light)" }} />
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 22 }}>
              {["中部高中", "電資社團", "聯合會議"].map((part, idx) => (
                <span key={part}
                  className={idx === 1 ? "cutout-slate" : "cutout"}
                  style={{
                    fontSize: isTablet ? "clamp(16px, 3vw, 28px)" : "clamp(18px, 2.2vw, 32px)",
                    transform: `rotate(${idx === 0 ? -2 : idx === 1 ? 1 : -1}deg) skewX(-8deg)`,
                    fontFamily: "var(--serif-tc)", fontWeight: 900, letterSpacing: "0.08em",
                  }}>
                  {part}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            padding: "11px 16px",
            background: "rgba(42,38,32,0.82)",
            borderLeft: "3px solid var(--rose)",
            fontFamily: "var(--mono)", fontSize: 11, lineHeight: 2,
            backdropFilter: "blur(12px)", marginBottom: 20,
            ...fadeUp(240),
          }}>
            <span style={{ color: "var(--text-dim)" }}>student computing collective / central taiwan</span><br />
            <span style={{ color: "var(--rose)" }}>WE ARE THE SYSTEM OVERRIDE.</span>
          </div>

          <div style={{ fontFamily: "var(--head)", fontSize: "clamp(15px, 1.8vw, 22px)", color: "var(--sand)", letterSpacing: 2, minHeight: 28, marginBottom: 24, ...fadeUp(300) }}>
            <Typewriter texts={["CODE / BUILD / SHARE / CONNECT", "HIGH SCHOOLERS MAKING SIGNAL", "WEBSITE · MODULES · EVENTS · CLUBS"]} />
          </div>

          <div style={fadeUp(360)}>
            <a
              href="https://docs.google.com/forms/d/1z0w7kQtNb30YG9nXQZEUM1WEZ1CTA52rcvi-X9L04-U"
              target="_blank" rel="noreferrer"
              style={{
                fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 2, fontWeight: 700,
                padding: "12px 28px",
                background: "var(--rose)", color: "var(--coal)",
                border: "2px solid var(--coal)", boxShadow: "4px 4px 0 var(--coal)",
                transition: "all 0.1s steps(2)", display: "inline-block",
              }}>
              JOIN_NOW →
            </a>
          </div>
        </div>

        {/* 浮水印 */}
        <div style={{
          position: "absolute", bottom: 8, right: 16,
          fontFamily: "var(--head)", fontSize: "clamp(70px, 9vw, 120px)",
          color: "transparent", WebkitTextStroke: "1px rgba(210,190,170,0.05)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none", zIndex: 2,
        }}>
          2026
        </div>

        {/* 側邊直排字 */}
        <div style={{
          position: "absolute", left: 10, top: "50%",
          transform: "translateY(-50%) rotate(180deg)",
          writingMode: "vertical-rl",
          fontFamily: "var(--mono)", fontSize: 8, letterSpacing: 5,
          color: "var(--text-faint)", userSelect: "none", zIndex: 3,
          ...fadeUp(200),
        }}>
          STUDENTS' COMPUTING CONFERENCE
        </div>
      </div>

      {/* ── Marquee ── */}
      <MarqueeStrip />
    </div>
  );
}
