export const PAGE_ORDER = ["home", "about", "modules", "events"];

export const HOME_STATS = [
  ["500+", "ACTIVE MEMBERS"],
  ["30+", "EVENTS HELD"],
  ["20+", "SCHOOLS"],
  ["2021", "ESTABLISHED"]
];

export const TYPEWRITER_TEXTS = [
  "CODE YOUR WORLD",
  "BREAK THE SYSTEM",
  "BUILD THE FUTURE",
  "POWER THE NETWORK"
];

export const MODULES = [
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

export const EVENTS = [
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

export const ABOUT_TAGS = ["#HACKATHON", "#OPEN_SOURCE", "#COMMUNITY", "#FREE"];
