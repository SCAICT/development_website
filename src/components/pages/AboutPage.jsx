import { usePageAnim } from "../shared/usePageAnim";
import { useIsMobile } from "../shared/useIsMobile";

export function AboutPage({ isExiting, navDir }) {
  const { anim } = usePageAnim(isExiting, navDir);
  const isMobile = useIsMobile();

  return (
    <div className="zine-grid" style={{ paddingTop: "3rem", paddingBottom: isMobile ? "4rem" : "6rem" }}>

      {/* 標題 */}
      <div
        style={{
          gridColumn: "1 / -1",
          borderBottom: "6px solid var(--zine-mid)",
          paddingBottom: isMobile ? "1rem" : "1.5rem",
          marginBottom: isMobile ? "1.25rem" : "2rem",
          ...anim(0, 180),
        }}
      >
        <h1
          style={{
            fontFamily: "var(--head)",
            fontSize: isMobile ? "clamp(40px,14vw,72px)" : "clamp(50px,8vw,100px)",
            lineHeight: 0.9,
            margin: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>WHO</span>
          <span
            className="cutout-rose"
            style={{
              display: "inline-block",
              width: "max-content",
              padding: isMobile ? "0 14px" : "0 20px",
              transform: "rotate(-1.5deg)",
            }}
          >
            AMONG US
          </span>
        </h1>
      </div>

      {/* 左欄：文字 */}
      <div
        style={{
          gridColumn: isMobile ? "1 / -1" : "1 / 8",
          fontFamily: "var(--mono)",
          fontSize: isMobile ? 13 : 14,
          lineHeight: isMobile ? 1.85 : 2,
          ...anim(70, 130),
        }}
      >
        <div
          style={{
            padding: isMobile ? "16px 16px" : "20px 24px",
            border: "2px dashed rgba(200,191,176,0.25)",
            background: "rgba(42,38,32,0.5)",
            marginBottom: isMobile ? 18 : 24,
          }}
        >
          <p>SCAICT 是一個由全台高中職生自主發起的資訊社群。</p>
          <br />
          <p>
            頂尖的程式資源與技術交流，往往侷限於少數明星學校。
            <span style={{ background: "var(--cream)", color: "var(--coal)", padding: "0 4px", fontWeight: 700 }}>
              {" "}我們認為這是不合理的。
            </span>
          </p>
        </div>

        <p style={{ color: "var(--text-dim)", lineHeight: isMobile ? 2 : 2.2, marginBottom: isMobile ? 18 : 24 }}>
          技術的本質是開源與共享。我們打破學校的藩籬，弭平城鄉資訊落差，連結每一個對程式碼充滿熱情的年輕靈魂。無論你是演算法狂熱者，還是剛寫出 Hello World 的新手，這裡都有你的歸屬。
        </p>

        <div style={{ display: "flex", gap: isMobile ? 8 : 12, flexWrap: "wrap", marginTop: isMobile ? 20 : 32 }}>
          {["#HACKATHON", "#OPEN_SOURCE", "#COMMUNITY", "#FREE"].map((tag, index) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--head)",
                fontSize: isMobile ? 13 : 16,
                border: `2px solid ${["var(--rose)", "var(--sage)", "var(--slate)", "var(--sand)"][index]}`,
                color: ["var(--rose)", "var(--sage)", "var(--slate)", "var(--sand)"][index],
                padding: isMobile ? "4px 8px" : "4px 12px",
                transform: `rotate(${[-2, 1.5, -1, 2][index]}deg)`,
                display: "inline-block",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 右欄：照片 */}
      <div
        style={{
          gridColumn: isMobile ? "1 / -1" : "8 / -1",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: isMobile ? 8 : 16,
          marginTop: isMobile ? 12 : 0,
          ...anim(140, 80),
        }}
      >
        <div className="punk-img" style={{ transform: "rotate(2deg)" }}>
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=420&q=75"
            alt=""
            style={{ width: "100%", maxWidth: isMobile ? 300 : 360 }}
          />
          <div
            className="tape"
            style={{
              top: "50%", left: 0, right: 0,
              transform: "translateY(-50%) rotate(10deg)",
              textAlign: "center", fontSize: isMobile ? "0.78rem" : "1rem", padding: "4px 0",
            }}
          >
            CLASSIFIED
          </div>
        </div>
      </div>

      {/* 左下：Terminal */}
      <div style={{ gridColumn: isMobile ? "1 / -1" : "1 / 6", marginTop: isMobile ? 24 : 48, ...anim(200, 40) }}>
        <div style={{ border: "1px solid var(--border-light)", background: "var(--bg2)" }}>
          <div style={{ padding: isMobile ? "10px 12px" : "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, alignItems: "center" }}>
            {["#c4998a", "#c9b89a", "#8a9e8c"].map((color) => (
              <div key={color} style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            ))}
            <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text-faint)", marginLeft: 8 }}>
              scaict_info.sh
            </span>
          </div>
          <div style={{ padding: isMobile ? "16px 12px" : "20px", fontFamily: "var(--mono)", fontSize: isMobile ? 11 : 12, lineHeight: isMobile ? 2.1 : 2.4, color: "var(--text-dim)" }}>
            {[
              ["$", "org",      "SCAICT"],
              ["$", "location", "Central Taiwan"],
              ["$", "founded",  "2021"],
              ["$", "type",     "Student Community"],
              ["$", "status",   <span key="s" style={{ color: "var(--sage)" }}>● ACTIVE</span>],
              ["$", "members",  <span key="m" style={{ color: "var(--rose)" }}>500+ students</span>],
            ].map(([prompt, cmd, value], index) => (
              <div key={index} style={{ display: "flex", gap: isMobile ? 8 : 12, flexWrap: isMobile ? "wrap" : "nowrap" }}>
                <span style={{ color: "var(--rose)" }}>{prompt}</span>
                <span style={{ color: "var(--slate)" }}>{cmd}</span>
                {value && (
                  <>
                    <span style={{ color: "var(--text-faint)" }}>→</span>
                    <span>{value}</span>
                  </>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "var(--rose)" }}>$</span>
              <span style={{ animation: "blink 1s infinite" }}>_</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右下：Sponsors */}
      <div
        style={{
          gridColumn: isMobile ? "1 / -1" : "7 / -1",
          marginTop: isMobile ? 24 : 48,
          padding: isMobile ? "18px 16px" : "24px 28px",
          border: "2px solid var(--border-light)",
          background: "rgba(42,38,32,0.4)",
          ...anim(260, 0),
        }}
      >
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 3, color: "var(--ash)", marginBottom: 16 }}>
          TRUSTED BY
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["PREMIUM", "var(--rose)",  "AIS3 / DEVCORE"],
            ["SPONSOR", "var(--slate)", "NCSE NETWORK"],
            ["PARTNER", "var(--sage)",  "OCF 開放文化基金會"],
          ].map(([tier, color, name]) => (
            <div key={tier} style={{ display: "flex", gap: isMobile ? 10 : 16, alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 2, padding: "3px 10px", border: `1px solid ${color}`, color }}>
                {tier}
              </span>
              <span style={{ fontFamily: "var(--sans)", fontSize: isMobile ? 12 : 13, color: "var(--text-dim)" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
