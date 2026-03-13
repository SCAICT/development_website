import { usePageAnim } from "../shared/usePageAnim";
import { useIsMobile } from "../shared/useIsMobile";
import { EVENTS } from "../../constants/events";

export function EventsPage({ isExiting, navDir }) {
  const { anim } = usePageAnim(isExiting, navDir);
  const isMobile = useIsMobile();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: "3rem", paddingBottom: isMobile ? "4rem" : "6rem" }}>

      {/* 頁首 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 12 : 0,
          borderBottom: "6px solid var(--rose)",
          paddingBottom: 16,
          marginBottom: isMobile ? 36 : 60,
          ...anim(0, 160),
        }}
      >
        <h1 style={{ fontFamily: "var(--head)", fontSize: isMobile ? "clamp(34px,12vw,52px)" : "clamp(40px,7vw,88px)", lineHeight: 0.9, margin: 0 }}>
          ARCHIVE
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "2px var(--zine-mid)" }}>LOGS</span>
        </h1>
        <div style={{ fontFamily: "var(--mono)", fontSize: isMobile ? 10 : 12, textAlign: isMobile ? "left" : "right", color: "var(--text-dim)", paddingBottom: isMobile ? 0 : 8 }}>
          RECORDS: 0{EVENTS.length}
          <br />
          STATUS: GALLERY_READY
        </div>
      </div>

      {/* 活動卡片 */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 28 : 48, alignItems: "start" }}>
        {EVENTS.map((event, index) => (
          <div
            key={event.title}
            style={{
              position: "relative",
              marginTop: isMobile ? 0 : index === 1 ? 40 : index === 2 ? 72 : 0,
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
                <img src={event.coverImage} alt="" style={{ width: "100%", height: isMobile ? 200 : 220, objectFit: "cover" }} />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: isMobile ? 200 : 220,
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
                position: "absolute", top: -14, left: isMobile ? -4 : -16,
                background: "var(--bg2)",
                border: `3px solid ${event.color}`,
                color: event.color,
                padding: isMobile ? "5px 10px" : "6px 14px",
                fontFamily: "var(--head)",
                fontSize: isMobile ? 12 : 16,
                zIndex: 30,
                transform: "rotate(-1deg)",
              }}
            >
              {event.dateRange}
            </div>

            <div
              style={{
                position: "absolute", top: -14, right: isMobile ? -2 : -8,
                background: event.status === "UPCOMING" ? "var(--rose)" : "transparent",
                border: `1.5px solid ${event.status === "UPCOMING" ? "var(--coal)" : "var(--border)"}`,
                color: event.status === "UPCOMING" ? "var(--coal)" : "var(--text-faint)",
                padding: isMobile ? "3px 8px" : "3px 10px",
                fontFamily: "var(--mono)",
                fontSize: isMobile ? 7 : 8,
                letterSpacing: 1.5,
                zIndex: 30,
              }}
            >
              {event.status}
            </div>

            <div
              style={{
                marginTop: 20,
                padding: isMobile ? "16px 16px" : "20px 24px",
                border: "1.5px dashed rgba(200,191,176,0.2)",
                background: "rgba(33,30,26,0.5)",
              }}
            >
              <h3 style={{ fontFamily: "var(--head)", fontSize: isMobile ? 18 : 20, color: event.color, marginBottom: 10, whiteSpace: "pre-line" }}>
                {event.title}
              </h3>
              <p style={{ fontFamily: "var(--mono)", fontSize: isMobile ? 12 : 15, color: "var(--text-dim)", lineHeight: isMobile ? 1.75 : 1.8 }}>
                {event.description}
              </p>
              <div style={{ marginTop: 14, fontFamily: "var(--mono)", fontSize: isMobile ? 10 : 11, letterSpacing: 1.6, color: "var(--text-faint)" }}>
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
