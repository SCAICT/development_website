export function AboutPage() {
  return (
    <div className="zine-grid" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
      <div
        style={{
          gridColumn: "1 / -1",
          borderBottom: "6px solid var(--zine-mid)",
          paddingBottom: "1.5rem",
          marginBottom: "2rem"
        }}
      >
        <h1
          style={{
            fontFamily: "var(--head)",
            fontSize: "clamp(50px,8vw,100px)",
            lineHeight: 0.9,
            margin: 0,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <span>THE</span>
          <span
            className="cutout-rose"
            style={{
              display: "inline-block",
              width: "max-content",
              padding: "0 20px",
              transform: "rotate(-1.5deg)"
            }}
          >
            REVOLUTION
          </span>
        </h1>
      </div>

      <div style={{ gridColumn: "1 / 8", fontFamily: "var(--mono)", fontSize: 14, lineHeight: 2 }}>
        <div
          style={{
            padding: "20px 24px",
            border: "2px dashed rgba(200,191,176,0.25)",
            background: "rgba(42,38,32,0.5)",
            marginBottom: 24
          }}
        >
          <p>SCAICT 是一個由全台高中職生自主發起的資訊社群。</p>
          <br />
          <p>
            頂尖的程式資源與技術交流，往往侷限於少數明星學校。
            <span
              style={{
                background: "var(--cream)",
                color: "var(--coal)",
                padding: "0 4px",
                fontWeight: 700
              }}
            >
              {" "}
              我們認為這是不合理的。
            </span>
          </p>
        </div>

        <p style={{ color: "var(--text-dim)", lineHeight: 2.2, marginBottom: 24 }}>
          技術的本質是開源與共享。我們打破學校的藩籬，弭平城鄉資訊落差，連結每一個對程式碼充滿熱情的年輕靈魂。無論你是演算法狂熱者，還是剛寫出 Hello World 的新手，這裡都有你的歸屬。
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
          {["#HACKATHON", "#OPEN_SOURCE", "#COMMUNITY", "#FREE"].map((tag, index) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--head)",
                fontSize: 16,
                border: `2px solid ${["var(--rose)", "var(--sage)", "var(--slate)", "var(--sand)"][index]}`,
                color: ["var(--rose)", "var(--sage)", "var(--slate)", "var(--sand)"][index],
                padding: "4px 12px",
                transform: `rotate(${[-2, 1.5, -1, 2][index]}deg)`,
                display: "inline-block"
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          gridColumn: "8 / -1",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: 16
        }}
      >
        <div className="punk-img" style={{ transform: "rotate(2deg)" }}>
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=420&q=75"
            alt=""
            style={{ width: "100%", maxWidth: 360 }}
          />
          <div
            className="tape"
            style={{
              top: "50%",
              left: 0,
              right: 0,
              transform: "translateY(-50%) rotate(10deg)",
              textAlign: "center",
              fontSize: "1rem",
              padding: "4px 0"
            }}
          >
            CLASSIFIED
          </div>
        </div>
      </div>

      <div style={{ gridColumn: "1 / 6", marginTop: 48 }}>
        <div style={{ border: "1px solid var(--border-light)", background: "var(--bg2)" }}>
          <div
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              gap: 8,
              alignItems: "center"
            }}
          >
            {["#c4998a", "#c9b89a", "#8a9e8c"].map((color) => (
              <div key={color} style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            ))}
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9,
                color: "var(--text-faint)",
                marginLeft: 8
              }}
            >
              scaict_info.sh
            </span>
          </div>

          <div
            style={{
              padding: "20px",
              fontFamily: "var(--mono)",
              fontSize: 12,
              lineHeight: 2.4,
              color: "var(--text-dim)"
            }}
          >
            {[
              ["$", "org", "SCAICT"],
              ["$", "location", "Central Taiwan"],
              ["$", "founded", "2021"],
              ["$", "type", "Student Community"],
              ["$", "status", <span style={{ color: "var(--sage)" }}>● ACTIVE</span>],
              ["$", "members", <span style={{ color: "var(--rose)" }}>500+ students</span>]
            ].map(([prompt, cmd, value], index) => (
              <div key={index} style={{ display: "flex", gap: 12 }}>
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

      <div
        style={{
          gridColumn: "7 / -1",
          marginTop: 48,
          padding: "24px 28px",
          border: "2px solid var(--border-light)",
          background: "rgba(42,38,32,0.4)"
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: 3,
            color: "var(--ash)",
            marginBottom: 16
          }}
        >
          TRUSTED BY
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["PREMIUM", "var(--rose)", "AIS3 / DEVCORE"],
            ["SPONSOR", "var(--slate)", "NCSE NETWORK"],
            ["PARTNER", "var(--sage)", "OCF 開放文化基金會"]
          ].map(([tier, color, name]) => (
            <div key={tier} style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  letterSpacing: 2,
                  padding: "3px 10px",
                  border: `1px solid ${color}`,
                  color
                }}
              >
                {tier}
              </span>
              <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--text-dim)" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
