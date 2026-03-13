const eventMarkdownModules = import.meta.glob("../content/events/*/event.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const eventImageModules = import.meta.glob("../content/events/*/gallery/*.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
  import: "default",
});

const PALETTE = [
  { color: "var(--rose)", bg: "rgba(196,153,138,0.06)", rot: -2 },
  { color: "var(--slate)", bg: "rgba(122,143,160,0.06)", rot: 2 },
  { color: "var(--sage)", bg: "rgba(138,158,140,0.06)", rot: -3 },
  { color: "var(--sand)", bg: "rgba(212,169,106,0.06)", rot: 1 },
  { color: "var(--violet)", bg: "rgba(155,127,196,0.06)", rot: -1 },
];

function decodeMultiline(value = "") {
  return value.replace(/\\n/g, "\n");
}

function parseKeyValues(source) {
  const entry = {};

  source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) return;

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      entry[key] = value;
    });

  return entry;
}

function toDayTimestamp(dateString) {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return 0;
  return Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate());
}

function formatRange(startDate, endDate) {
  if (startDate === endDate) return startDate;
  return `${startDate} ~ ${endDate}`;
}

function getImagesForSlug(slug) {
  return Object.entries(eventImageModules)
    .filter(([path]) => path.includes(`/content/events/${slug}/gallery/`))
    .map(([, url]) => url)
    .sort();
}

function buildEvent([path, source], index) {
  const slug = path.split("/").slice(-2, -1)[0];
  const entry = parseKeyValues(source);

  if (!entry.title || !entry.start_date || !entry.end_date) return null;

  const startTimestamp = toDayTimestamp(entry.start_date);
  const endTimestamp = toDayTimestamp(entry.end_date);

  if (!startTimestamp || !endTimestamp) return null;

  const today = new Date();
  const todayTimestamp = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const images = getImagesForSlug(slug);
  const palette = PALETTE[index % PALETTE.length];

  let status = "ARCHIVED";
  let actionLabel = "VIEW_GALLERY";
  let actionType = "internal-gallery";
  let actionHref = `/gallery/${slug}`;

  if (todayTimestamp < startTimestamp) {
    status = "UPCOMING";
    actionLabel = "REGISTER_NOW";
    actionType = "external";
    actionHref = entry.signup_url ?? entry.website_url ?? "#";
  } else if (todayTimestamp <= endTimestamp) {
    status = "ONGOING";
    actionLabel = "VISIT_SITE";
    actionType = "external";
    actionHref = entry.website_url ?? entry.signup_url ?? "#";
  }

  return {
    id: String(index + 1).padStart(2, "0"),
    slug,
    title: decodeMultiline(entry.title),
    subtitle: decodeMultiline(entry.subtitle ?? ""),
    label: entry.label ?? "ACTIVITY MODULE",
    schedule: entry.schedule ?? "",
    format: entry.format ?? "",
    description: decodeMultiline(entry.description ?? ""),
    tags: entry.tags ? entry.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
    startDate: entry.start_date,
    endDate: entry.end_date,
    dateRange: formatRange(entry.start_date, entry.end_date),
    timestamp: startTimestamp,
    status,
    actionLabel,
    actionType,
    actionHref,
    websiteUrl: entry.website_url ?? "",
    signupUrl: entry.signup_url ?? "",
    images,
    coverImage: images[0] ?? null,
    ...palette,
  };
}

export const EVENTS = Object.entries(eventMarkdownModules)
  .map(buildEvent)
  .filter(Boolean)
  .sort((a, b) => b.timestamp - a.timestamp)
  .map((event, index) => ({
    ...event,
    id: String(index + 1).padStart(2, "0"),
  }));

export const MODULES = EVENTS.slice(0, 5);
