import { EVENTS } from "../../constants/events";

export function GalleryPage() {
  const slug = window.location.pathname.replace(/^\/gallery\//, "").replace(/\/$/, "");
  const event = EVENTS.find((item) => item.slug === slug);

  if (!event) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "40px 24px",
          background: "linear-gradient(180deg, #131118 0%, #0f0e14 100%)",
          color: "var(--text)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <a href="/" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 2, color: "var(--sand)" }}>
            ← BACK TO SCAICT
          </a>
          <div style={{ marginTop: 48, fontFamily: "var(--head)", fontSize: "clamp(44px, 8vw, 108px)", lineHeight: 0.92 }}>
            GALLERY
          </div>
          <div style={{ marginTop: 24, fontFamily: "var(--mono)", fontSize: 14, letterSpacing: 1.8, color: "var(--text-faint)" }}>
            EVENT_NOT_FOUND
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px 24px 64px",
        background:
          "radial-gradient(circle at top left, rgba(212,117,106,0.12), transparent 36%), linear-gradient(180deg, #15131c 0%, #0f0e14 100%)",
        color: "var(--text)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start" }}>
          <a href="/" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 2, color: event.color }}>
            ← BACK TO SCAICT
          </a>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.8, color: "var(--text-faint)", textAlign: "right" }}>
            WEBSITE GALLERY
            <br />
            {event.dateRange}
          </div>
        </div>

        <section style={{ marginTop: 24, paddingBottom: 28, borderBottom: `1px solid ${event.color}` }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 2.2, color: event.color, marginBottom: 14 }}>
            {event.label} / GALLERY ISSUE
          </div>
          <div
            aria-hidden="true"
            style={{
              fontFamily: "var(--head)",
              fontSize: "clamp(64px, 14vw, 180px)",
              lineHeight: 0.82,
              color: "transparent",
              WebkitTextStroke: "1px rgba(237,229,216,0.1)",
              userSelect: "none",
            }}
          >
            GALLERY
          </div>
          <h1 style={{ marginTop: -18, fontFamily: "var(--head)", fontSize: "clamp(36px, 5vw, 74px)", lineHeight: 0.92, whiteSpace: "pre-line" }}>
            {event.title}
          </h1>
          <div style={{ marginTop: 12, fontFamily: "var(--mono)", fontSize: 13, letterSpacing: 1.8, color: "var(--text-faint)" }}>
            {event.subtitle} · {event.images.length} PHOTOS
          </div>
          <div style={{ marginTop: 10, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, color: "var(--text-faint)" }}>
            FOLDER: <code>src/content/events/{event.slug}/gallery/</code>
          </div>
        </section>

        <section style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }}>
          {event.images.length > 0 ? (
            event.images.map((imageUrl, index) => {
              const columnSpan = index % 5 === 0 ? "span 7" : index % 3 === 0 ? "span 5" : "span 4";
              return (
                <figure
                  key={imageUrl}
                  style={{
                    gridColumn: columnSpan,
                    margin: 0,
                    background: "rgba(15,14,20,0.72)",
                    border: "1px solid rgba(200,191,176,0.18)",
                    padding: 8,
                  }}
                >
                  <img src={imageUrl} alt={`${event.title} ${index + 1}`} style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
                </figure>
              );
            })
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                padding: "56px 24px",
                border: "1px dashed rgba(200,191,176,0.22)",
                fontFamily: "var(--mono)",
                fontSize: 13,
                letterSpacing: 1.8,
                color: "var(--text-faint)",
              }}
            >
              NO_GALLERY_IMAGES_YET
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
