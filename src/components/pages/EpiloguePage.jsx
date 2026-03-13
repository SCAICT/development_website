import { useEffect, useState } from "react";
import { usePageAnim } from "../shared/usePageAnim";
import { useIsMobile } from "../shared/useIsMobile";

const BUILD_LINES = [
  { type: "dim",    text: "[ SCAICT · SYSTEM STATUS ]" },
  { type: "ok",     text: "boot          ── DONE" },
  { type: "ok",     text: "about         ── DONE" },
  { type: "ok",     text: "modules       ── DONE" },
  { type: "ok",     text: "archive       ── DONE" },
  { type: "ok",     text: "network       ── DONE" },
  { type: "warn",   text: "contents      ── FILLING IN..." },
  { type: "warn",   text: "photos        ── UPLOADING..." },
  { type: "warn",   text: "next_chapter  ── WRITING..." },
  { type: "prompt", text: "█" },
];

const TYPE_COLOR = {
  ok:     "var(--sage)",
  warn:   "var(--sand)",
  dim:    "rgba(200,190,175,0.35)",
  prompt: "var(--rose)",
};

export function EpiloguePage({ isExiting, navDir }) {
  const { anim } = usePageAnim(isExiting, navDir);
  const isMobile = useIsMobile();
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (isExiting) return;
    let i = 0;
    const tick = () => {
      i++;
      setVisibleLines(i);
      if (i < BUILD_LINES.length) setTimeout(tick, i === 0 ? 400 : 120);
    };
    const start = setTimeout(tick, 600);
    return () => clearTimeout(start);
  }, [isExiting]);

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "3rem 1rem" : "4rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景大字浮水印 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "var(--head)",
            fontSize: isMobile ? "clamp(72px, 28vw, 140px)" : "clamp(100px, 22vw, 280px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(210,190,170,0.04)",
            lineHeight: 1,
            whiteSpace: "nowrap",
            letterSpacing: "-0.04em",
          }}
        >
          WIP
        </span>
      </div>

      {/* 中央容器 */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 760 }}>

        {/* 膠帶標籤 */}
        <div style={{ ...anim(0, 200), marginBottom: isMobile ? 28 : 48 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: isMobile ? 8 : 9,
              letterSpacing: isMobile ? 2.4 : 4,
              color: "var(--text-faint)",
              padding: "5px 14px",
              border: "1px solid var(--border-light)",
              display: "inline-block",
            }}
          >
            SCAICT · INTERIM SITE · VOL.01
          </span>
        </div>

        {/* 主標題 */}
        <h1
          style={{
            fontFamily: "var(--head)",
            fontSize: isMobile ? "clamp(34px, 12vw, 54px)" : "clamp(44px, 8vw, 100px)",
            lineHeight: 0.92,
            margin: "0 0 12px",
            ...anim(60, 160),
          }}
        >
          <span style={{ display: "block", color: "var(--text)" }}>THE STORY</span>
          <span
            style={{
              display: "inline-block",
              color: "transparent",
              WebkitTextStroke: "2px var(--rose)",
              transform: "rotate(-1.5deg) translateX(8px)",
            }}
          >
            ISN'T
          </span>
          <span
            style={{
              display: "block",
              background: "var(--rose)",
              color: "var(--coal)",
              padding: isMobile ? "0 10px" : "0 16px",
              width: "max-content",
              transform: "rotate(0.5deg)",
              marginTop: 8,
            }}
          >
            FINISHED.
          </span>
        </h1>

        {/* 副文字 */}
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: isMobile ? 11 : 13,
            lineHeight: isMobile ? 2 : 2.2,
            color: "var(--text-dim)",
            maxWidth: 480,
            marginTop: isMobile ? 24 : 36,
            marginBottom: isMobile ? 28 : 48,
            borderLeft: "3px solid var(--rose)",
            paddingLeft: isMobile ? 14 : 20,
            ...anim(140, 100),
          }}
        >
          這是過渡時期的版本。內容持續更新中。<br />
          我們正在記錄、整理、填滿每一格空白。<br />
          <span style={{ color: "var(--rose)" }}>真正的故事，正在進行中。</span>
        </p>

        {/* Terminal build log */}
        <div
          style={{
            border: "1px solid var(--border-light)",
            background: "rgba(12,11,18,0.85)",
            ...anim(200, 60),
          }}
        >
          {/* terminal title bar */}
          <div
            style={{
              padding: isMobile ? "8px 12px" : "8px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            {["#c4998a", "#c9b89a", "#8a9e8c"].map((c) => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text-faint)", marginLeft: 8, letterSpacing: 2 }}>
              site_build.log
            </span>
          </div>

          {/* log 行 */}
          <div style={{ padding: isMobile ? "16px 12px" : "20px 24px", fontFamily: "var(--mono)", fontSize: isMobile ? 11 : 12, lineHeight: isMobile ? 2 : 2.2 }}>
            {BUILD_LINES.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                style={{
                  color: TYPE_COLOR[line.type] ?? "var(--text-dim)",
                  display: "flex",
                  gap: 12,
                  animation: "epilogue-line-in 0.08s ease forwards",
                }}
              >
                {line.type !== "dim" && line.type !== "prompt" && (
                  <span style={{ color: "var(--rose)", userSelect: "none" }}>$</span>
                )}
                <span style={line.type === "prompt" ? { animation: "blink 1s steps(1) infinite" } : {}}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 底部 */}
        <div
          style={{
            marginTop: isMobile ? 28 : 48,
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            ...anim(260, 0),
          }}
        >
          <div style={{ fontFamily: "var(--mono)", fontSize: isMobile ? 9 : 10, color: "var(--text-faint)", letterSpacing: 2, lineHeight: 2 }}>
            LAST UPDATED: {new Date().toISOString().slice(0, 10)}
            <br />
            <span style={{ color: "var(--sage)" }}>● LIVE · ACTIVELY UPDATING</span>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["#WIP", "#COMING_SOON", "#STAY_TUNED"].map((tag, i) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--head)",
                  fontSize: isMobile ? 11 : 12,
                  border: `1.5px solid ${["var(--rose)", "var(--slate)", "var(--sand)"][i]}`,
                  color: ["var(--rose)", "var(--slate)", "var(--sand)"][i],
                  padding: "3px 10px",
                  transform: `rotate(${[-1.5, 1, -0.8][i]}deg)`,
                  display: "inline-block",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes epilogue-line-in {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
