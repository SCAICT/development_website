const events = [
  {
    date: "2026.SUMMER",
    title: "SCAICT ANNUAL CONF",
    desc: "數百名資訊熱愛者齊聚，開源社群攤位與技術沙龍。",
    img: "https://images.unsplash.com/photo-1511649475669-e288648b2339?w=600&q=70",
    status: "UPCOMING",
    color: "var(--rose)",
    rot: -2
  },
  {
    date: "2025.AUTUMN",
    title: "ALPHA HACKATHON",
    desc: "24小時不間斷的創意與程式碼碰撞實戰。",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=70",
    status: "COMPLETED",
    color: "var(--slate)",
    rot: 2
  },
  {
    date: "2025.WINTER",
    title: "WINTER BOOTCAMP",
    desc: "幹部訓練暨技術營，培育下一代社群領袖。",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=70",
    status: "COMPLETED",
    color: "var(--sage)",
    rot: -3
  }
];

export function EventsPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: "3rem", paddingBottom: "6rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "6px solid var(--rose)",
          paddingBottom: 16,
          marginBottom: 60
        }}
      >
        <h1
          style={{
            fontFamily: "var(--head)",
            fontSize: "clamp(40px,7vw,88px)",
            lineHeight: 0.9,
            margin: 0
          }}
        >
          ARCHIVE
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "2px var(--zine-mid)" }}>
            LOGS
          </span>
        </h1>

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            textAlign: "right",
            color: "var(--text-dim)",
            paddingBottom: 8
          }}
        >
          RECORDS: 0{events.length}
          <br />
          STATUS: CLASSIFIED
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 48,
          alignItems: "start"
        }}
      >
        {events.map((event, index) => (
          <div
            key={event.title}
            style={{ position: "relative", marginTop: index === 1 ? 40 : index === 2 ? 72 : 0 }}
          >
            <div
              className="punk-img"
              style={{ transform: `rotate(${event.rot}deg)`, width: "100%", transition: "transform 0.2s steps(2)" }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.transform = "rotate(0deg)";
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.transform = `rotate(${event.rot}deg)`;
              }}
            >
              <img src={event.img} alt="" style={{ width: "100%", height: 220, objectFit: "cover" }} />
            </div>

            <div
              style={{
                position: "absolute",
                top: -20,
                left: -16,
                background: "var(--bg2)",
                border: `3px solid ${event.color}`,
                color: event.color,
                padding: "6px 14px",
                fontFamily: "var(--head)",
                fontSize: 16,
                zIndex: 30,
                transform: "rotate(-1deg)"
              }}
            >
              {event.date}
            </div>

            <div
              style={{
                position: "absolute",
                top: -20,
                right: -8,
                background: event.status === "UPCOMING" ? "var(--rose)" : "transparent",
                border: `1.5px solid ${
                  event.status === "UPCOMING" ? "var(--coal)" : "var(--border)"
                }`,
                color: event.status === "UPCOMING" ? "var(--coal)" : "var(--text-faint)",
                padding: "3px 10px",
                fontFamily: "var(--mono)",
                fontSize: 8,
                letterSpacing: 1.5,
                zIndex: 30
              }}
            >
              {event.status}
            </div>

            <div
              style={{
                marginTop: 28,
                padding: "20px 24px",
                border: "1.5px dashed rgba(200,191,176,0.2)",
                background: "rgba(33,30,26,0.5)"
              }}
            >
              <h3 style={{ fontFamily: "var(--head)", fontSize: 20, color: event.color, marginBottom: 10 }}>
                {event.title}
              </h3>
              <p style={{ fontFamily: "var(--mono)", fontSize: 15, color: "var(--text-dim)", lineHeight: 1.8 }}>
                {event.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
