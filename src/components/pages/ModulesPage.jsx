import { useState } from "react";
import { usePageAnim } from "../shared/usePageAnim";
import { MODULES } from "../../constants/events";

export function ModulesPage({ isExiting, navDir, onNavigate }) {
  const { anim } = usePageAnim(isExiting, navDir);
  const [hovered, setHovered] = useState(null);
  const featuredSignupEvent = MODULES.find((event) => event.status === "UPCOMING") ?? MODULES[0];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: "3rem", paddingBottom: "6rem" }}>

      {/* 徽章 */}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 14,
          background: "var(--cream)",
          color: "var(--coal)",
          padding: "4px 12px",
          display: "inline-block",
          marginBottom: 40,
          border: "1.5px solid var(--coal)",
          ...anim(0, 150),
        }}
      >
        [ SYS_MODULES_LOADED ]
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: 40,
          marginBottom: 68,
          alignItems: "end",
          ...anim(25, 120),
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -34,
              left: -6,
              fontFamily: "var(--head)",
              fontSize: "clamp(56px, 8vw, 120px)",
              lineHeight: 0.9,
              color: "transparent",
              WebkitTextStroke: "1px rgba(212, 169, 106, 0.14)",
              letterSpacing: "0.04em",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            EVENTS
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              letterSpacing: 2.4,
              color: "var(--sand)",
              marginBottom: 14,
            }}
          >
            FEATURED EVENTS DOSSIER
          </div>
          <h1
            style={{
              fontFamily: "var(--head)",
              fontSize: "clamp(48px, 6vw, 92px)",
              lineHeight: 0.95,
              color: "var(--text)",
              position: "relative",
              zIndex: 1,
            }}
          >
            EVENTS
          </h1>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: 1.8,
              color: "var(--text-faint)",
            }}
          >
            <span style={{ padding: "4px 8px", border: "1px solid rgba(212, 169, 106, 0.35)", color: "var(--sand)" }}>
              ISSUE 03
            </span>
            <span>EDITORIAL SELECT</span>
            <span style={{ color: "var(--sand)" }}>●</span>
            <span>SCAICT PROGRAM INDEX</span>
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--sans)",
            fontSize: 15,
            lineHeight: 2,
            color: "var(--text-dim)",
            maxWidth: 420,
            justifySelf: "end",
          }}
        >
          這一頁不是抽象模組清單，而是正在發生與即將發生的活動編排。
          我把它保留成雜誌式資訊頁，讓每個 event 同時像企劃條目，也像一期刊物裡的重點版面。
        </p>
      </div>

      {/* 模組列表 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {MODULES.map((module, i) => (
          <button
            key={module.id}
            type="button"
            style={{
              display: "block",
              position: "relative",
              background: hovered === module.id ? module.bg : "rgba(33,30,26,0.6)",
              border: `2px solid ${hovered === module.id ? module.color : "rgba(200,191,176,0.15)"}`,
              padding: "40px 48px 40px 88px",
              textAlign: "left",
              width: "100%",
              transition: "background 0.2s steps(3), border-color 0.2s steps(3)",
              ...anim(60 + i * 70, 90 - i * 25),
            }}
            onMouseEnter={() => setHovered(module.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              if (module.actionType === "internal-gallery") {
                window.location.href = module.actionHref;
                return;
              }

              window.open(module.actionHref, "_blank", "noopener,noreferrer");
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -8,
                top: -16,
                fontFamily: "var(--head)",
                fontSize: 88,
                color: "transparent",
                WebkitTextStroke: `2px ${hovered === module.id ? module.color : "rgba(200,191,176,0.2)"}`,
                lineHeight: 1,
                transition: "all 0.2s steps(3)",
                transform: "rotate(-3deg)",
                pointerEvents: "none",
              }}
            >
              {module.id}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: `1px solid ${hovered === module.id ? module.color : "rgba(200,191,176,0.12)"}`,
              }}
            >
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 2.2, color: module.color }}>
                {module.label} / {module.status}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  gap: 10,
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: 1.6,
                  color: "var(--text-faint)",
                }}
              >
                <span>{module.dateRange}</span>
                <span style={{ color: module.color }}>●</span>
                <span>{module.schedule}</span>
                <span style={{ color: module.color }}>●</span>
                <span>{module.format}</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--head)",
                    fontSize: "clamp(28px,3vw,44px)",
                    whiteSpace: "pre-line",
                    lineHeight: 1.1,
                    marginBottom: 8,
                    background: hovered === module.id ? module.color : "rgba(0,0,0,0)",
                    color: hovered === module.id ? "var(--coal)" : "var(--text)",
                    display: "inline-block",
                    padding: "0 8px",
                    transition: "all 0.1s steps(2)",
                  }}
                >
                  {module.title}
                </h2>
                <div style={{ fontFamily: "var(--mono)", fontSize: 14, color: module.color, letterSpacing: 2, marginTop: 4 }}>
                  &gt;&gt; {module.subtitle}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 13,
                        letterSpacing: 1.5,
                        padding: "3px 10px",
                        border: `1px solid ${hovered === module.id ? module.color : "var(--border)"}`,
                        color: hovered === module.id ? module.color : "var(--text-faint)",
                        transition: "all 0.1s steps(2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: 2,
                    color: "var(--text-faint)",
                    marginBottom: 12,
                  }}
                >
                  ACTIVE PROGRAM BRIEF
                </div>
                <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 2, color: "var(--text-dim)", marginTop: 4 }}>
                  {module.description}
                </p>
                <div
                  style={{
                    marginTop: 20,
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: 2,
                    color: module.color,
                  }}
                >
                  {module.actionLabel} →
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 48,
          padding: "28px 36px",
          border: "2px dashed rgba(196,153,138,0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ...anim(280, 0),
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--head)", fontSize: 28, color: "var(--rose)" }}>
            YOU ARE THE MISSING PIECE
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--text-faint)", marginTop: 6 }}>
            {featuredSignupEvent
              ? `${featuredSignupEvent.title.replace(/\n/g, " ")} 差你一個 — 點擊去報名`
              : "最新活動差你一個 — 點擊去報名"}
          </div>
        </div>
        <a
          href={featuredSignupEvent?.status === "UPCOMING" ? featuredSignupEvent.actionHref : featuredSignupEvent?.signupUrl ?? featuredSignupEvent?.actionHref ?? "#"}
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: 2,
            fontWeight: 700,
            padding: "12px 32px",
            background: "var(--rose)",
            color: "var(--coal)",
            border: "2px solid var(--coal)",
            boxShadow: "4px 4px 0 var(--coal)",
            display: "inline-block",
          }}
        >
          REGISTER_NOW →
        </a>
      </div>

    </div>
  );
}
