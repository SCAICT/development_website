import { usePageAnim } from "../shared/usePageAnim";
import { EVENTS } from "../../constants/events";

export function EventsPage({ isExiting, navDir }) {
  const { anim } = usePageAnim(isExiting, navDir);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: "3rem", paddingBottom: "6rem" }}>

      {/* 頁首 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "6px solid var(--rose)",
          paddingBottom: 16,
          marginBottom: 60,
          ...anim(0, 160),
        }}
      >
        <h1 style={{ fontFamily: "var(--head)", fontSize: "clamp(40px,7vw,88px)", lineHeight: 0.9, margin: 0 }}>
          ARCHIVE
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "2px var(--zine-mid)" }}>LOGS</span>
        </h1>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, textAlign: "right", color: "var(--text-dim)", paddingBottom: 8 }}>
          RECORDS: 0{EVENTS.length}
          <br />
          STATUS: GALLERY_READY
        </div>
      </div>

      {/* 活動卡片 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48, alignItems: "start" }}>
        {EVENTS.map((event, index) => (
          <div
            key={event.title}
            style={{
              position: "relative",
              marginTop: index === 1 ? 40 : index === 2 ? 72 : 0,
              ...anim(80 + index * 80, 100 - index * 30),
            }}
          >
            <a
              href={event.status === "ARCHIVED" ? event.actionHref : undefined}
              onClick={(ev) => {
                if (event.status !== "ARCHIVED") {
                  ev.preventDefault();
                }
              }}
              style={{ display: "block" }}
            >
            <div
              className="punk-img"
              style={{ transform: `rotate(${event.rot}deg)`, width: "100%", transition: "transform 0.2s steps(2)" }}
              onMouseEnter={(ev) => { ev.currentTarget.style.transform = "rotate(0deg)"; }}
              onMouseLeave={(ev) => { ev.currentTarget.style.transform = `rotate(${event.rot}deg)`; }}
            >
              {event.coverImage ? (
                <img src={event.coverImage} alt="" style={{ width: "100%", height: 220, objectFit: "cover" }} />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${event.color}22, rgba(15,14,20,0.92))`,
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: 2,
                    color: "var(--text-faint)",
                  }}
                >
                  DROP PHOTOS IN FOLDER
                </div>
              )}
            </div>

            <div
              style={{
                position: "absolute", top: -20, left: -16,
                background: "var(--bg2)",
                border: `3px solid ${event.color}`,
                color: event.color,
                padding: "6px 14px",
                fontFamily: "var(--head)",
                fontSize: 16,
                zIndex: 30,
                transform: "rotate(-1deg)",
              }}
            >
              {event.dateRange}
            </div>

            <div
              style={{
                position: "absolute", top: -20, right: -8,
                background: event.status === "UPCOMING" ? "var(--rose)" : "transparent",
                border: `1.5px solid ${event.status === "UPCOMING" ? "var(--coal)" : "var(--border)"}`,
                color: event.status === "UPCOMING" ? "var(--coal)" : "var(--text-faint)",
                padding: "3px 10px",
                fontFamily: "var(--mono)",
                fontSize: 8,
                letterSpacing: 1.5,
                zIndex: 30,
              }}
            >
              {event.status}
            </div>

            <div
              style={{
                marginTop: 28,
                padding: "20px 24px",
                border: "1.5px dashed rgba(200,191,176,0.2)",
                background: "rgba(33,30,26,0.5)",
              }}
            >
              <h3 style={{ fontFamily: "var(--head)", fontSize: 20, color: event.color, marginBottom: 10, whiteSpace: "pre-line" }}>
                {event.title}
              </h3>
              <p style={{ fontFamily: "var(--mono)", fontSize: 15, color: "var(--text-dim)", lineHeight: 1.8 }}>
                {event.description}
              </p>
              <div style={{ marginTop: 14, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, color: "var(--text-faint)" }}>
                TAGS: {event.tags.length ? event.tags.join(" · ") : "UNTAGGED"}
              </div>
            </div>
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
