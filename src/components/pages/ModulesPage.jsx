import { useState } from "react";

const modules = [
  {
    id: "01",
    en: "ANNUAL\nCONFERENCE",
    zh: "年度計算機大會",
    color: "var(--rose)",
    bg: "rgba(196,153,138,0.06)",
    desc: "專屬於中學生的超大型技術年會。邀請業界頂尖講者帶來最前沿的技術沙龍，並提供學生發表專案的絕佳舞台。",
    tags: ["KEYNOTE", "WORKSHOP", "SHOWCASE"]
  },
  {
    id: "02",
    en: "TECH\nBOOTCAMPS",
    zh: "實戰技術營隊",
    color: "var(--slate)",
    bg: "rgba(122,143,160,0.06)",
    desc: "從 InforCamp 寒暑假培訓營到週末技術工作坊。涵蓋網頁開發、演算法基礎到資安攻防，手把手帶領新手跨過門檻。",
    tags: ["WEB_DEV", "ALGORITHM", "SECURITY"]
  },
  {
    id: "03",
    en: "COMMUNITY\nNETWORK",
    zh: "跨校社群串聯",
    color: "var(--sage)",
    bg: "rgba(138,158,140,0.06)",
    desc: "孤軍奮戰太孤單。我們建立龐大的全台學生交流網絡，讓有想法的 Side Project 在這裡找到共同開發者。",
    tags: ["OPEN_SOURCE", "COLLAB", "NETWORK"]
  }
];

export function ModulesPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: "3rem", paddingBottom: "6rem" }}>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 14,
          background: "var(--cream)",
          color: "var(--coal)",
          padding: "4px 12px",
          display: "inline-block",
          marginBottom: 40,
          border: "1.5px solid var(--coal)"
        }}
      >
        [ SYS_MODULES_LOADED ]
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {modules.map((module) => (
          <div
            key={module.id}
            style={{
              position: "relative",
              background: hovered === module.id ? module.bg : "rgba(33,30,26,0.6)",
              border: `2px solid ${
                hovered === module.id ? module.color : "rgba(200,191,176,0.15)"
              }`,
              padding: "32px 48px 32px 80px",
              cursor: "none",
              transition: "all 0.2s steps(3)"
            }}
            onMouseEnter={() => setHovered(module.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              style={{
                position: "absolute",
                left: -8,
                top: -16,
                fontFamily: "var(--head)",
                fontSize: 88,
                color: "transparent",
                WebkitTextStroke: `2px ${
                  hovered === module.id ? module.color : "rgba(200,191,176,0.2)"
                }`,
                lineHeight: 1,
                transition: "all 0.2s steps(3)",
                transform: "rotate(-3deg)",
                pointerEvents: "none"
              }}
            >
              {module.id}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                alignItems: "start"
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--head)",
                    fontSize: "clamp(28px,3vw,44px)",
                    whiteSpace: "pre-line",
                    lineHeight: 1.1,
                    marginBottom: 8,
                    background: hovered === module.id ? module.color : "transparent",
                    color: hovered === module.id ? "var(--coal)" : "var(--text)",
                    display: "inline-block",
                    padding: hovered === module.id ? "0 8px" : "0",
                    transition: "all 0.1s steps(2)"
                  }}
                >
                  {module.en}
                </h2>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    color: module.color,
                    letterSpacing: 2,
                    marginTop: 4
                  }}
                >
                  &gt;&gt; {module.zh}
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
                        border: `1px solid ${
                          hovered === module.id ? module.color : "var(--border)"
                        }`,
                        color: hovered === module.id ? module.color : "var(--text-faint)",
                        transition: "all 0.1s steps(2)"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 14,
                  lineHeight: 2,
                  color: "var(--text-dim)",
                  marginTop: 4
                }}
              >
                {module.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 48,
          padding: "28px 36px",
          border: "2px dashed rgba(196,153,138,0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--head)", fontSize: 28, color: "var(--rose)" }}>
            YOU ARE THE MISSING PIECE
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 14,
              color: "var(--text-faint)",
              marginTop: 6
            }}
          >
            電池還缺你一個 — 立即加入我們
          </div>
        </div>

        <a
          href="https://docs.google.com/forms/d/1z0w7kQtNb30YG9nXQZEUM1WEZ1CTA52rcvi-X9L04-U"
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
            cursor: "none",
            boxShadow: "4px 4px 0 var(--coal)",
            display: "inline-block"
          }}
        >
          APPLY_NOW →
        </a>
      </div>
    </div>
  );
}
