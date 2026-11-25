"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const paths = {
  drive:
    '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 10h18"/>',
  folder:
    '<path d="M2.8 7A2 2 0 0 1 5 5h5l2 2h7a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2.2-2Z" fill="currentColor" opacity=".14"/><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 10h18"/>',
  inbox:
    '<path d="m3 13 3-8h12l3 8v5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18Z"/><path d="M3 13h6l1 3h4l1-3h6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  chat: '<path d="M19 16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3v4l5-4z"/><path d="M7 9h10M7 12h6"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-13 5h2"/>',
  recordings:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3Z"/>',
  network:
    '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="m10.8 7.3-4.6 8.3m7-8.3 4.6 8.3M7.5 18h9"/>',
  person:
    '<circle cx="12" cy="8" r="3.5"/><path d="M5 20v-2a7 7 0 0 1 14 0v2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.8"/><path d="m16 16 5 5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.2"/>',
  institution: '<path d="m3 8 9-5 9 5H3Zm1 12h16M6 11v6m4-6v6m4-6v6m4-6v6"/>',
  workspace:
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  file: '<path d="M6 3h8l4 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h4m-10 5h7m-7 3h5"/>',
  sheet:
    '<path d="M5 3h9l5 5v13H5Z"/><path d="M14 3v5h5M8 12h8v6H8zm0 3h8m-4-3v6"/>',
  slides:
    '<rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M12 17v4m-4 0 4-3 4 3M7 13l3-3 3 2 3-4"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>',
  external:
    '<path d="M14 3h7v7m0-7-10 10M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  filter:
    '<path d="M3 6h11m4 0h3M3 12h3m4 0h11M3 18h8m4 0h6"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="13" cy="18" r="2"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.2M3 12h.2M3 18h.2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  right: '<path d="m9 5 7 7-7 7"/>',
  left: '<path d="m15 5-7 7 7 7"/>',
  chain:
    '<path d="m10 14 4-4m-4-3 2-2a5 5 0 0 1 7 7l-2 2m-3 3-2 2a5 5 0 0 1-7-7l2-2"/>',
  share: '<path d="M12 15V3m-4 4 4-4 4 4M6 10H4v10h16V10h-2"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  pages:
    '<rect x="7" y="6" width="12" height="15" rx="1.5"/><path d="M15 3H4v15"/>',
  archive:
    '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9m-10 4h6"/>',
  time: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
};
function icon(key) {
  return (
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' +
    (paths[key] || paths.file) +
    "</svg>"
  );
}

const views = {
  drive: ["Drive", "Drive", ""],
  inbox: [
    "Inbox",
    "Inbox",
    "Explore sourced messages and their correspondence.",
  ],
  chat: ["Chat", "Chat", "Read released conversations in chronological order."],
  calendar: [
    "Calendar",
    "Calendar",
    "Browse documented meetings and events by date.",
  ],
  recordings: [
    "Recordings",
    "Recordings",
    "Explore released recordings and available transcripts.",
  ],
  network: [
    "Network",
    "Network",
    "Follow cited connections between people, organizations, and programs.",
  ],
  search: ["Search", "Search results", ""],
};
const filterNames = {
  type: "Record type",
  organization: "Organization",
  participant: "Participant",
  program: "Program",
  from: "From",
  to: "To",
};
const state = {
  meta: null,
  record: null,
  list: null,
  layout: "list",
  version: 0,
  controller: null,
  observer: null,
  lastList: "/",
  shareURL: "",
  toastTimer: null,
};
try {
  state.layout =
    localStorage.getItem("aidroom-layout") === "grid" ? "grid" : "list";
} catch {}
const pageSize = 25;
const displayNumber = (value) => Number(value).toLocaleString("en-US");
const currentParams = () => new URLSearchParams(location.search);
const getView = () => {
  const v = currentParams().get("view");
  return Object.hasOwn(views, v) ? v : "drive";
};
function pathFor(view, values = {}) {
  const query = new URLSearchParams();
  if (view !== "drive") query.set("view", view);
  for (const [key, val] of Object.entries(values))
    if (val !== "" && val != null) query.set(key, String(val));
  return "/" + (query.size ? "?" + query : "");
}
function targetRecord(id, opts = {}) {
  const p = new URLSearchParams(opts);
  return "/r/" + encodeURIComponent(id) + (p.size ? "?" + p : "");
}
function localAsset(value) {
  if (!value) return "";
  try {
    const url = new URL(value, location.origin);
    return url.origin === location.origin &&
      ["http:", "https:"].includes(url.protocol)
      ? url.href
      : "";
  } catch {
    return "";
  }
}
function external(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}
function dateText(value) {
  if (!value) return "";
  const month = /^(\d{4})-(\d{2})$/.exec(value);
  if (month)
    return new Date(+month[1], +month[2] - 1, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  const m = String(value).match(/^(\d{4})-(\d{2})-(\d{2})(?:$|T| )/);
  if (!m) return String(value);
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function formatTimestamp(value) {
  const n = Math.max(0, Math.floor(Number(value) || 0)),
    h = Math.floor(n / 3600),
    m = Math.floor((n % 3600) / 60),
    s = String(n % 60).padStart(2, "0");
  return h ? h + ":" + String(m).padStart(2, "0") + ":" + s : m + ":" + s;
}
function appearance(record) {
  const s = [record.category, record.kind, record.format]
    .join(" ")
    .toLowerCase();
  if (/email|e-mail|mailbox/.test(s)) return ["mail", "teal"];
  if (/spreadsheet|xls|csv|table/.test(s)) return ["sheet", "teal"];
  if (/brief|presentation|slides|powerpoint/.test(s)) return ["slides", "gold"];
  if (/recording|video|audio|mp4/.test(s)) return ["recordings", "violet"];
  if (/chat/.test(s)) return ["chat", "violet"];
  if (/event|meeting/.test(s)) return ["calendar", "rose"];
  if (/organization|agency/.test(s)) return ["institution", "slate"];
  if (/entity|person/.test(s)) return ["person", "slate"];
  return ["file", "blue"];
}
function fileIcon(record, folder = false) {
  const [shape, tone] = appearance(record);
  return (
    '<span class="' +
    (folder ? "folder-icon" : "file-icon") +
    " tone-" +
    tone +
    '">' +
    icon(folder ? "folder" : shape) +
    "</span>"
  );
}
function category(record) {
  return (
    record.category ||
    {
      document: "Document",
      email: "Email",
      event: "Event",
      recording: "Recording",
      chat: "Chat",
      entity: "Entity",
    }[record.kind] ||
    "Record"
  );
}
function summary(record) {
  const bits = [];
  if (record.pages > 0)
    bits.push(record.pages + " " + (record.pages === 1 ? "page" : "pages"));
  if (record.date) bits.push(dateText(record.date));
  if (record.bytes && record.id === record.source_id) {
    const b = Number(record.bytes);
    bits.push(
      b >= 1e6
        ? (b / 1e6).toFixed(b < 10e6 ? 1 : 0) + " MB"
        : Math.max(1, Math.round(b / 1e3)) + " KB",
    );
  }
  if (!bits.length && record.locator) bits.push(record.locator);
  return bits.join(" · ");
}
function cleanTitle(type) {
  const labels = {
    "Chat log": "Chat logs",
    Document: "Documents",
    Email: "Emails",
    Briefing: "Briefings",
    Spreadsheet: "Spreadsheets",
    Recording: "Recordings",
    Video: "Videos",
    Presentation: "Presentations",
    Report: "Reports",
    Memo: "Memos",
  };
  return labels[type] || type;
}
function viewLink(view) {
  return pathFor(view);
}
function navigation(view) {
  $("#navigation").innerHTML = Object.keys(views)
    .filter((key) => key !== "search")
    .map((key) => {
      const selected = view === key,
        n = state.meta?.counts?.[key];
      return (
        '<a data-app href="' +
        viewLink(key) +
        '" class="nav-item' +
        (selected ? " active" : "") +
        '" ' +
        (selected ? 'aria-current="page"' : "") +
        ">" +
        icon(key) +
        "<span>" +
        views[key][0] +
        "</span>" +
        (selected && Number.isInteger(n)
          ? '<small class="nav-count">' + displayNumber(n) + "</small>"
          : "") +
        "</a>"
      );
    })
    .join("");
  $("#crumb").textContent =
    view === "record" ? "Source record" : views[view]?.[0] || "Drive";
}
function archiveHero() {
  const count = state.meta?.counts?.drive;
  return (
    '<section class="hero" aria-labelledby="collection-heading"><div class="hero-copy"><div class="hero-kicker"><i></i>Source collection</div><h1 id="collection-heading">USAID Files</h1><p>Explore the public records of the U.S. Agency for International Development.</p><div class="hero-stats">' +
    (Number.isInteger(count)
      ? '<span class="hero-stat">' +
        icon("archive") +
        displayNumber(count) +
        " source files</span>"
      : "") +
    '<a class="hero-stat" href="https://www.usaid.gov/" target="_blank" rel="noopener noreferrer">' +
    icon("external") +
    'usaid.gov</a></div></div><canvas aria-hidden="true" class="blueprint"></canvas></section>'
  );
}
// Axonometric drawing of an open archival file box. All decoration is local.
function drawBox(canvas) {
  const rect = canvas.getBoundingClientRect(),
    dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (!rect.width || !rect.height) return;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const w = rect.width,
    h = rect.height;
  ctx.strokeStyle = "rgba(169,204,228,.12)";
  ctx.lineWidth = 0.6;
  for (let i = 0; i < w; i += 18) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }
  for (let i = 0; i < h; i += 18) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(w, i);
    ctx.stroke();
  }
  const scale = Math.min(w / 315, h / 160) * (w < 165 ? 1.4 : 1.02);
  ctx.translate(w * (w < 165 ? 0.22 : 0.37), h * 0.77);
  ctx.scale(scale, scale);
  const project = ([x, y, z]) => [x * 0.94 + y * 0.72, x * 0.29 - y * 0.43 - z];
  function line(points, color = "#a6c9e2", width = 0.85, dash = []) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash);
    points
      .map(project)
      .forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    ctx.setLineDash([]);
  }
  function face(points, fill, stroke = "#c1daee", width = 0.9) {
    ctx.beginPath();
    points
      .map(project)
      .forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  const dimension = "#83a5c184",
    guide = "#8dafc460";
  line(
    [
      [-28, -12, 0],
      [99, -12, 0],
    ],
    guide,
    0.65,
    [3, 2],
  );
  line(
    [
      [-11, -19, 0],
      [-11, 111, 0],
    ],
    guide,
    0.65,
    [3, 2],
  );
  line(
    [
      [87, 0, -4],
      [87, 98, -4],
    ],
    dimension,
    0.75,
  );
  line(
    [
      [84, 0, -6],
      [90, 0, -2],
    ],
    dimension,
    0.75,
  );
  line(
    [
      [84, 98, -6],
      [90, 98, -2],
    ],
    dimension,
    0.75,
  );
  for (let y = 10; y < 97; y += 10)
    line(
      [
        [87, y, -4],
        [89, y, -3],
      ],
      dimension,
      0.55,
    );
  face(
    [
      [0, 102, 0],
      [77, 102, 0],
      [77, 102, 54],
      [0, 102, 54],
    ],
    "#2e587d",
  );
  face(
    [
      [0, 0, 0],
      [0, 102, 0],
      [0, 102, 54],
      [0, 0, 54],
    ],
    "#416c90",
  );
  for (let i = 6; i >= 0; i--) {
    const y = 10 + i * 13,
      z = 61 + (i % 3) * 1.5,
      tab = 4 + (i % 3) * 19;
    face(
      [
        [3, y, 6],
        [74, y, 6],
        [74, y, z],
        [tab + 20, y, z],
        [tab + 18, y, z + 6],
        [tab + 2, y, z + 6],
        [tab, y, z],
        [3, y, z],
      ],
      i % 2 ? "#4b7496" : "#658aa6",
      "#c2d9e7",
      0.85,
    );
    line(
      [
        [7, y, z - 3],
        [69, y, z - 3],
      ],
      "#b3cbdd",
      0.55,
    );
  }
  face(
    [
      [0, 0, 0],
      [77, 0, 0],
      [77, 0, 48],
      [0, 0, 48],
    ],
    "#467195",
  );
  face(
    [
      [77, 0, 0],
      [77, 102, 0],
      [77, 102, 54],
      [77, 0, 48],
    ],
    "#335b7e",
  );
  line(
    [
      [0, 0, 44],
      [77, 0, 44],
      [77, 102, 50],
    ],
    "#b8d0e1",
    0.85,
  );
  line(
    [
      [0, 0, 4],
      [77, 0, 4],
      [77, 102, 4],
    ],
    "#a2bfd7",
    0.65,
  );
  face(
    [
      [19, -0.3, 16],
      [58, -0.3, 16],
      [58, -0.3, 32],
      [19, -0.3, 32],
    ],
    "#a5c0d4",
    "#d5e4ec",
    1,
  );
  for (let z = 19; z <= 28; z += 3)
    line(
      [
        [24, -0.5, z],
        [z === 28 ? 44 : 52, -0.5, z],
      ],
      "#456580",
      0.8,
    );
  for (let y = 7; y < 99; y += 6)
    line(
      [
        [77, y, 5],
        [77, y + 5, 10],
      ],
      "#7194af",
      0.5,
    );
}
function folderSection(params) {
  const counts = state.meta?.type_counts || {},
    types = state.meta?.facets?.type || Object.keys(counts);
  const popular = [...types].sort(
    (a, b) => (counts[b] || 0) - (counts[a] || 0),
  );
  if (!popular.length) return "";
  return (
    '<section class="browse-block"><div class="section-top"><h2>Browse by type</h2></div><div class="folders">' +
    popular
      .slice(0, 4)
      .map(
        (type) =>
          '<a data-app href="' +
          esc(
            pathFor("drive", { type: params.get("type") === type ? "" : type }),
          ) +
          '" class="folder' +
          (params.get("type") === type ? " selected" : "") +
          '">' +
          fileIcon({ category: type }, true) +
          "<span><strong>" +
          esc(cleanTitle(type)) +
          "</strong><small>" +
          (Object.hasOwn(counts, type)
            ? displayNumber(counts[type]) + " files"
            : "Browse files") +
          "</small></span></a>",
      )
      .join("") +
    "</div></section>"
  );
}
function libraryTitle(view, params) {
  if (view === "drive")
    return params.get("type") ? cleanTitle(params.get("type")) : "All files";
  return (
    {
      search: "Matching records",
      inbox: "Messages",
      chat: "Messages",
      calendar: "Events",
      network: "Directory",
      recordings: "All recordings",
    }[view] || "Records"
  );
}
function renderActions(view) {
  const allowLayout = ["drive", "search", "inbox"].includes(view);
  return (
    '<div class="tools"><button class="btn" type="button" id="open-filters">' +
    icon("filter") +
    "Filters</button>" +
    (allowLayout
      ? '<div class="layout-switch" aria-label="Record layout"><button type="button" class="icon-button" data-layout="list" aria-label="List view" aria-pressed="' +
        (state.layout === "list") +
        '">' +
        icon("list") +
        '</button><button class="icon-button" type="button" data-layout="grid" aria-label="Grid view" aria-pressed="' +
        (state.layout === "grid") +
        '">' +
        icon("grid") +
        "</button></div>"
      : "") +
    "</div>"
  );
}
function chipHTML(params, view) {
  return Object.keys(filterNames)
    .filter((key) => params.get(key))
    .map((key) => {
      const values = Object.fromEntries(params);
      delete values[key];
      delete values.offset;
      delete values.view;
      return (
        '<a data-app class="chip" aria-label="Remove ' +
        esc(filterNames[key] + ": " + params.get(key)) +
        '" href="' +
        esc(pathFor(view, values)) +
        '">' +
        esc(filterNames[key] + " · " + params.get(key)) +
        ' <span aria-hidden="true">×</span></a>'
      );
    })
    .join("");
}
function row(record, view) {
  return (
    '<a class="record-row" data-app href="' +
    targetRecord(record.id) +
    '"><span class="record-name">' +
    fileIcon(record) +
    "<span><strong>" +
    esc(record.title) +
    "</strong><small>" +
    esc(
      view === "search" && record.description
        ? record.description
        : summary(record),
    ) +
    '</small></span></span><span><span class="tag">' +
    esc(category(record)) +
    '</span></span><span class="fileformat">' +
    esc(record.format || "—") +
    '</span><span class="rowchev">' +
    icon("right") +
    "</span></a>"
  );
}
function gridCard(record) {
  return (
    '<a data-app class="grid-card" href="' +
    targetRecord(record.id) +
    '">' +
    fileIcon(record) +
    "<strong>" +
    esc(record.title) +
    '</strong><span class="tag">' +
    esc(category(record)) +
    "</span><small>" +
    esc([record.format, summary(record)].filter(Boolean).join(" · ")) +
    "</small></a>"
  );
}
function correspondence(record, view) {
  const actor = record.sender || record.participant || "Sender unavailable";
  return (
    '<a data-app class="conversation" href="' +
    targetRecord(record.id) +
    '">' +
    fileIcon({ ...record, kind: view === "chat" ? "chat" : "email" }) +
    '<div class="conversation-main"><div class="meta-row"><strong>' +
    esc(actor) +
    "</strong><time>" +
    esc(dateText(record.date)) +
    "</time></div><h3>" +
    esc(record.title) +
    "</h3>" +
    (record.description ? "<p>" + esc(record.description) + "</p>" : "") +
    "</div></a>"
  );
}
function calendarEvent(record) {
  const m = String(record.date || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  const cal = m
    ? '<div class="date-block"><small>' +
      esc(
        new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString("en-US", {
          month: "short",
        }),
      ) +
      "</small><strong>" +
      Number(m[3]) +
      "</strong></div>"
    : fileIcon({ kind: "event" });
  return (
    '<a class="calendar-event" data-app href="' +
    targetRecord(record.id) +
    '">' +
    cal +
    '<div class="conversation-main"><span class="secondary">' +
    esc(
      [dateText(record.date), record.status || record.event_status]
        .filter(Boolean)
        .join(" · "),
    ) +
    "</span><h3>" +
    esc(record.title) +
    "</h3><p>" +
    esc(record.description || "") +
    "</p></div></a>"
  );
}
function chatChannels(params) {
  const channels = state.meta?.chat_sources || [];
  return (
    '<div class="channel-bar"><label for="chat-source">' +
    icon("chat") +
    'Chat export</label><select id="chat-source"><option value="">All exports</option>' +
    channels
      .map(
        (c) =>
          '<option value="' +
          esc(c.id) +
          '"' +
          (params.get("source_id") === c.id ? " selected" : "") +
          ">" +
          esc(c.title) +
          " · " +
          esc(c.id) +
          " (" +
          displayNumber(c.count) +
          ")</option>",
      )
      .join("") +
    "</select></div>"
  );
}
function chatTimeline(records) {
  let group = "",
    html = "";
  for (const msg of records) {
    const key = msg.source_id + "|" + msg.date;
    if (key !== group) {
      html +=
        '<div class="chat-day"><a data-app href="' +
        targetRecord(msg.source_id) +
        '">' +
        icon("chat") +
        esc(msg.source) +
        "</a><time>" +
        esc(dateText(msg.date) || "Undated") +
        "</time></div>";
      group = key;
    }
    const name = msg.sender || "Sender unavailable",
      initials = msg.sender
        ? msg.sender
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .filter((_, i, parts) => i === 0 || i === parts.length - 1)
            .map((n) => n[0])
            .join("")
        : "?";
    const hue = [...name].reduce((n, c) => n + c.codePointAt(0), 0) % 4;
    const time =
      String(msg.sent_at || "")
        .split("T")[1]
        ?.slice(0, 5) || "";
    html +=
      '<article class="chat-message"><span aria-hidden="true" class="avatar avatar-' +
      hue +
      '">' +
      esc(initials) +
      '</span><div><div class="chat-author"><strong>' +
      esc(name) +
      '</strong><a data-app title="Open cited message" href="' +
      targetRecord(msg.id) +
      '">' +
      esc(time) +
      (msg.page ? " · p. " + esc(msg.page) : "") +
      '</a></div><a class="chat-content" data-app href="' +
      targetRecord(msg.id) +
      '">' +
      esc(msg.description || msg.title) +
      "</a></div></article>";
  }
  return '<div class="chat-timeline">' + html + "</div>";
}
function searchResult(record) {
  const derived = record.id !== record.source_id;
  const kinds = {
    email: "Email message",
    chat: "Chat message",
    event: "Calendar event",
    recording: "Recording",
  };
  const label = derived
    ? kinds[record.kind] || "Extracted record"
    : record.kind === "recording"
      ? "Recording"
      : "Source file";
  const args = record.match_passage_id ? { p: record.match_passage_id } : {};
  const text = String(record.match_text || record.description || "")
    .replace(/\s+/g, " ")
    .trim();
  const q = currentParams().get("q") || "",
    tokens = q
      .replace(/"/g, "")
      .toLocaleLowerCase()
      .split(/\s+/)
      .filter(Boolean);
  let snippet = text;
  if (text.length > 300) {
    const hits = tokens
        .map((t) => text.toLocaleLowerCase().indexOf(t))
        .filter((v) => v >= 0),
      start = hits.length ? Math.max(0, Math.min(...hits) - 85) : 0;
    snippet =
      (start ? "…" : "") +
      text.slice(start, start + 270).trim() +
      (start + 270 < text.length ? "…" : "");
  }
  return (
    '<a class="search-result" data-app href="' +
    targetRecord(record.id, args) +
    '">' +
    fileIcon(record) +
    '<div><div class="result-kind">' +
    esc(label) +
    "<span>" +
    esc(
      [
        record.format,
        record.match_locator || record.locator,
        dateText(record.date),
      ]
        .filter(Boolean)
        .join(" · "),
    ) +
    "</span></div><h3>" +
    esc(record.title) +
    "</h3>" +
    (snippet ? "<p>" + esc(snippet) + "</p>" : "") +
    "</div></a>"
  );
}
function recordList(records, view) {
  if (view === "search")
    return (
      '<div class="' +
      (state.layout === "grid" ? "search-grid" : "result-list") +
      '">' +
      records.map(searchResult).join("") +
      "</div>"
    );
  if (view === "chat") return chatTimeline(records);
  if (state.layout === "grid" && ["drive", "search", "inbox"].includes(view))
    return (
      '<div class="record-grid">' + records.map(gridCard).join("") + "</div>"
    );
  if (view === "inbox")
    return (
      '<div class="list">' +
      records.map((r) => correspondence(r, view)).join("") +
      "</div>"
    );
  if (view === "calendar")
    return (
      '<div class="list">' + records.map(calendarEvent).join("") + "</div>"
    );
  if (view === "recordings")
    return (
      '<div class="record-grid video-grid">' +
      records
        .map(
          (r) =>
            '<a data-app class="video-card" href="' +
            targetRecord(r.id) +
            '"><div class="media-tile">' +
            (localAsset(r.poster_url)
              ? '<img alt="" loading="lazy" src="' +
                esc(localAsset(r.poster_url)) +
                '">'
              : "") +
            icon("play") +
            "</div><h3>" +
            esc(r.title) +
            '</h3><span class="secondary">' +
            esc([r.format, summary(r)].filter(Boolean).join(" · ")) +
            "</span></a>",
        )
        .join("") +
      "</div>"
    );
  if (view === "network")
    return (
      '<div class="record-grid">' +
      records
        .map(
          (r) =>
            '<a data-app class="entity-card" href="' +
            targetRecord(r.id) +
            '">' +
            fileIcon(r) +
            "<h3>" +
            esc(r.title) +
            '</h3><span class="secondary">' +
            esc(r.description || category(r)) +
            "</span></a>",
        )
        .join("") +
      "</div>"
    );
  return (
    '<div class="list"><div class="list-heading" aria-hidden="true"><span>Name</span><span>Type</span><span>Format</span><span></span></div>' +
    records.map((r) => row(r, view)).join("") +
    "</div>"
  );
}
function emptySection(view, hasFilters) {
  const title = hasFilters
    ? "No matching records"
    : {
        inbox: "No reconstructed emails",
        chat: "No reconstructed conversations",
        calendar: "No documented events indexed",
        recordings: "No recordings indexed",
        network: "No sourced connections indexed",
      }[view] || "No records indexed";
  const detail = hasFilters
    ? "Try another search term or clear the current filters."
    : "You can still inspect the source files in Drive.";
  return (
    '<div class="empty">' +
    icon("archive") +
    "<div><h3>" +
    title +
    "</h3><p>" +
    detail +
    '</p><a class="btn" data-app href="' +
    (hasFilters && view !== "search" ? pathFor(view) : "/") +
    '">' +
    (hasFilters && view !== "search" ? "Clear filters" : "Open Drive") +
    "</a></div></div>"
  );
}
function renderListing(data, view, params) {
  const list = data.records || [],
    n = Number(data.total) || 0,
    offset = Math.max(0, parseInt(params.get("offset"), 10) || 0);
  let title = views[view][1],
    desc = views[view][2];
  if (view === "search" && params.get("q"))
    desc = "Results for “" + params.get("q") + "”";
  const intro =
    view === "drive"
      ? archiveHero() + folderSection(params)
      : '<section class="view-intro"><div class="eyebrow">' +
        icon(view) +
        "USAID Files</div><h1>" +
        esc(title) +
        "</h1><p>" +
        esc(desc) +
        "</p></section>";
  const hasFilters = Boolean(
    params.get("q") || Object.keys(filterNames).some((key) => params.has(key)),
  );
  function pageUrl(next) {
    const values = Object.fromEntries(params);
    delete values.view;
    values.offset = next || "";
    return esc(pathFor(view, values));
  }
  const pages =
    '<div class="load-status"><span>' +
    displayNumber(offset + 1) +
    "–" +
    displayNumber(offset + list.length) +
    " of " +
    displayNumber(n) +
    '</span><div class="pager">' +
    (offset
      ? '<a data-app class="icon-button" href="' +
        pageUrl(Math.max(0, offset - pageSize)) +
        '" aria-label="Previous page">' +
        icon("left") +
        "</a>"
      : '<button class="icon-button" disabled aria-label="Previous page">' +
        icon("left") +
        "</button>") +
    (offset + list.length < n
      ? '<a data-app class="icon-button" href="' +
        pageUrl(offset + pageSize) +
        '" aria-label="Next page">' +
        icon("right") +
        "</a>"
      : '<button class="icon-button" disabled aria-label="Next page">' +
        icon("right") +
        "</button>") +
    "</div></div>";
  $("#content").innerHTML =
    intro +
    (view === "chat" ? chatChannels(params) : "") +
    '<section class="library"><div class="library-title"><div class="title-with-count"><h2>' +
    esc(libraryTitle(view, params)) +
    '</h2><span class="count">' +
    displayNumber(n) +
    "</span></div>" +
    renderActions(view) +
    '</div><div class="filter-chips">' +
    chipHTML(params, view) +
    "</div>" +
    (list.length
      ? recordList(list, view) + pages
      : emptySection(view, hasFilters)) +
    "</section>";
  const canvas = $(".blueprint");
  state.observer?.disconnect();
  if (canvas) {
    drawBox(canvas);
    state.observer = new ResizeObserver(() => drawBox(canvas));
    state.observer.observe(canvas);
  }
}

function relatedMarkup(record) {
  const rel = record.relationships || [],
    entity = record.kind === "entity";
  const related = rel
    .map((r) => {
      const cite = r.evidence_record_id || r.id,
        args = r.passage_id ? { p: r.passage_id } : {};
      return (
        '<div class="relation-item"><div><a data-app href="' +
        targetRecord(r.id) +
        '">' +
        esc(r.title) +
        '</a><div class="secondary">' +
        esc([r.description, r.basis].filter(Boolean).join(" · ")) +
        "</div></div>" +
        (r.passage_id
          ? '<a class="citation" data-app href="' +
            targetRecord(cite, args) +
            '" title="Inspect supporting passage">' +
            icon("chain") +
            "Evidence</a>"
          : "") +
        "</div>"
      );
    })
    .join("");
  const entities = new Map();
  for (const e of record.entities || []) {
    if (!entities.has(e.id)) entities.set(e.id, e);
  }
  const linked = [...entities.values()]
    .map(
      (e) =>
        '<a class="entity-chip" data-app href="' +
        targetRecord(e.id) +
        '">' +
        icon(e.kind === "person" ? "person" : "institution") +
        esc(e.name) +
        "</a>",
    )
    .join("");
  const threads = (record.thread || [])
    .map(
      (r) =>
        '<a data-app href="' +
        targetRecord(r.id) +
        '">' +
        icon("mail") +
        "<span>" +
        esc(r.title) +
        '<small class="secondary">' +
        esc(
          [
            r.sender,
            r.sent_at?.replace("T", " ") || dateText(r.date),
            r.timezone,
          ]
            .filter(Boolean)
            .join(" · "),
        ) +
        "</small></span></a>",
    )
    .join("");
  const att = (record.attachments || [])
    .map(
      (r) =>
        '<div class="relation-item">' +
        (r.source_id
          ? '<a data-app href="' +
            targetRecord(r.source_id) +
            '">' +
            esc(r.label) +
            "</a>"
          : "<span>" + esc(r.label) + "</span>") +
        (r.passage_id
          ? '<a data-app class="citation" href="' +
            targetRecord(r.evidence_record_id || record.source_id, {
              p: r.passage_id,
            }) +
            '">' +
            icon("chain") +
            "Evidence</a>"
          : "") +
        "</div>",
    )
    .join("");
  const occurrences = (record.occurrences || [])
    .map(
      (o) =>
        '<a data-app href="' +
        targetRecord(o.source_id, { p: o.source_passage_id }) +
        '">' +
        icon("pages") +
        "<span>" +
        esc(o.title) +
        '<small class="secondary">Page ' +
        esc(o.page) +
        "</small></span></a>",
    )
    .join("");
  return (
    (threads
      ? '<section><div class="reader-section-head"><h2>Messages in this export</h2></div><div class="related-list">' +
        threads +
        "</div></section>"
      : "") +
    (att
      ? '<section><div class="reader-section-head"><h2>Referenced attachments</h2></div><div class="relation-list">' +
        att +
        "</div></section>"
      : "") +
    (related
      ? '<section><div class="reader-section-head"><h2>' +
        (entity ? "Documented connections" : "Related records") +
        '</h2></div><div class="relation-list">' +
        related +
        "</div></section>"
      : "") +
    (linked
      ? '<section><div class="reader-section-head"><h2>People and organizations</h2></div><div class="entity-chips">' +
        linked +
        "</div></section>"
      : "") +
    (occurrences
      ? '<section><div class="reader-section-head"><h2>Source appearances</h2></div><div class="related-list">' +
        occurrences +
        "</div></section>"
      : "")
  );
}
function markedText(text, params, pid) {
  const a = Number(params.get("a")),
    b = Number(params.get("b"));
  const chars = Array.from(text);
  if (
    params.get("p") !== pid ||
    !params.has("a") ||
    !params.has("b") ||
    !Number.isInteger(a) ||
    !Number.isInteger(b) ||
    a < 0 ||
    a >= b ||
    b > chars.length
  )
    return esc(text);
  return (
    esc(chars.slice(0, a).join("")) +
    "<mark>" +
    esc(chars.slice(a, b).join("")) +
    "</mark>" +
    esc(chars.slice(b).join(""))
  );
}
function seekTime(seconds, scroll = false) {
  const media = $("#media");
  if (!media) return;
  const seek = () => {
    media.currentTime = Number(seconds);
    if (scroll) media.scrollIntoView({ block: "center" });
  };
  if (media.readyState > 0) seek();
  else media.addEventListener("loadedmetadata", seek, { once: true });
}
function passageMarkup(p, params, isMedia) {
  const locator = p.locator || "Source passage";
  const stamp =
    isMedia && p.start_seconds != null
      ? '<button class="seek" type="button" data-seek="' +
        Number(p.start_seconds) +
        '">' +
        icon("play") +
        esc(locator) +
        "</button>"
      : "<strong>" + esc(locator) + "</strong>";
  return (
    '<article id="passage-' +
    esc(p.id) +
    '" data-pid="' +
    esc(p.id) +
    '" class="passage' +
    (params.get("p") === p.id ? " focused" : "") +
    '"><div class="passage-head">' +
    stamp +
    '<button data-share-p="' +
    esc(p.id) +
    '" type="button" aria-label="Share ' +
    esc(locator) +
    '">' +
    icon("share") +
    'Share</button></div><div class="passage-body"><div class="passage-text">' +
    (p.text
      ? markedText(p.text, params, p.id)
      : "OCR found no readable text on this page.") +
    "</div></div></article>"
  );
}
function displayPassages(record, params) {
  const all = record.passages || [],
    isMedia =
      record.kind === "recording" || all.some((p) => p.start_seconds != null);
  if (!all.length || record.kind === "entity") return;
  const requested = all.find((p) => p.id === params.get("p"));
  const pages = [
    ...new Set(all.filter((p) => p.page != null).map((p) => p.page)),
  ];
  const selPage =
    Number($("#page-select")?.value) || requested?.page || pages[0];
  const term = ($("#passage-find")?.value || "").trim().toLocaleLowerCase();
  const shown = all.filter(
    (p) =>
      (!pages.length || p.page === selPage) &&
      (!term || (p.text || "").toLocaleLowerCase().includes(term)),
  );
  const image = localAsset(shown.find((p) => p.image_url)?.image_url);
  const preserved = external(record.source_mirror_url);
  const pageLink =
    !image && record.format === "PDF" && preserved && selPage
      ? '<a class="btn" target="_blank" rel="noopener noreferrer" href="' +
        esc(preserved + "#page=" + selPage) +
        '">' +
        icon("external") +
        "Open original at page " +
        esc(selPage) +
        "</a>"
      : "";
  $("#passages").innerHTML = shown.length
    ? '<div class="' +
      (image ? "reader-columns" : "reader-single") +
      '"><div class="text-column">' +
      (record.format === "PDF"
        ? '<div class="column-label">Extracted text · OCR</div><p class="ocr-note">OCR can misread words, change reading order, or omit the position of a redaction. Compare the source page before quoting.</p>'
        : "") +
      shown.map((p) => passageMarkup(p, params, isMedia)).join("") +
      pageLink +
      "</div>" +
      (image
        ? '<div class="image-column"><div class="column-label">Source page</div><a href="' +
          esc(image) +
          '" target="_blank" rel="noopener"><img alt="Rendered source page ' +
          esc(selPage) +
          '" loading="lazy" src="' +
          esc(image) +
          '"></a></div>'
        : "") +
      "</div>"
    : '<div class="empty"><div><h3>No matching passages</h3><p>Try a shorter phrase.</p></div></div>';
}
function displaySheet(record, name) {
  const cells = (record.cells || []).filter((c) => c.sheet === name);
  const rows = new Map(),
    columns = new Set();
  for (const cell of cells) {
    const addr = cell.address.match(/^([A-Z]+)([0-9]+)$/);
    if (!addr) continue;
    const [, col, num] = addr;
    columns.add(col);
    if (!rows.has(num)) rows.set(num, new Map());
    rows.get(num).set(col, cell);
  }
  const ordered = [...columns].sort(
    (a, b) => a.length - b.length || a.localeCompare(b),
  );
  $("#sheet-body").innerHTML =
    '<table><thead><tr><th scope="col">Row</th>' +
    ordered.map((col) => '<th scope="col">' + esc(col) + "</th>").join("") +
    "</tr></thead><tbody>" +
    [...rows]
      .sort(([a], [b]) => a - b)
      .map(
        ([row, data]) =>
          '<tr><th scope="row">' +
          esc(row) +
          "</th>" +
          ordered
            .map((col) => {
              const cell = data.get(col);
              return (
                "<td>" +
                (cell
                  ? '<a data-app href="' +
                    targetRecord(record.id, { p: cell.passage_id }) +
                    '" title="' +
                    esc(cell.address) +
                    '">' +
                    esc(cell.value) +
                    "</a>"
                  : "") +
                "</td>"
              );
            })
            .join("") +
          "</tr>",
      )
      .join("") +
    "</tbody></table>";
}
function sheetMarkup(record, selected) {
  const sheets = [...new Set((record.cells || []).map((c) => c.sheet))];
  if (!sheets.length) return "";
  const sheet =
    (record.cells || []).find((c) => c.passage_id === selected?.id)?.sheet ||
    sheets[0];
  return (
    '<details class="spreadsheet" ' +
    (selected ? "" : "open") +
    '><summary>Spreadsheet preview</summary><label>Worksheet <select id="sheet-select">' +
    sheets
      .map(
        (s) =>
          "<option" +
          (s === sheet ? " selected" : "") +
          ">" +
          esc(s) +
          "</option>",
      )
      .join("") +
    '</select></label><div id="sheet-body" class="sheet-scroll"></div></details>'
  );
}
function captionAt(record, seconds) {
  return (record.passages || []).findLast(
    (cue) =>
      cue.start_seconds != null &&
      cue.start_seconds <= seconds &&
      seconds < cue.time_end,
  );
}

function updatePlayerContext(record, seconds) {
  const cue = captionAt(record, seconds);
  $("#player-time").textContent = formatTimestamp(seconds);
  $("#player-caption").textContent = cue?.text || "No caption at this time.";
}

function renderRecord(record, params) {
  const isEntity = record.kind === "entity",
    media = localAsset(record.media_url),
    p = record.passages || [];
  const rawTime = params.has("t") ? Number(params.get("t")) : null;
  const exactTime =
    media && rawTime !== null && Number.isFinite(rawTime) && rawTime >= 0
      ? rawTime
      : null;
  const selected = p.find((item) => item.id === params.get("p")),
    pages = [
      ...new Set(
        p.filter((item) => item.page != null).map((item) => item.page),
      ),
    ];
  const back =
    state.lastList === "/" && !isEntity
      ? "/"
      : isEntity && state.lastList === "/"
        ? pathFor("network")
        : state.lastList;
  const backView = (() => {
    const v = new URL(back, location.origin).searchParams.get("view");
    return views[v || "drive"]?.[0] || "Drive";
  })();
  const status = record.status;
  const sourceLink = external(record.source_url);
  const badge = category(record);
  const evidenceStatus =
    status &&
    !["Source document", "Source excerpt", "Released recording"].includes(
      status,
    )
      ? '<span class="evidence-status">' + esc(status) + "</span>"
      : "";
  const metadata = [
    record.institution,
    record.date ? dateText(record.date) : "",
    record.format,
    record.pages
      ? record.pages + (record.pages === 1 ? " page" : " pages")
      : "",
    record.locator,
  ].filter(Boolean);
  const sender = (record.participants || []).find((a) => a.role === "sender");
  function actor(text, role) {
    if (!text) return "";
    const people = (record.participants || []).filter(
      (person) => person.role === role,
    );
    const chunks = [];
    let remaining = String(text);
    while (remaining) {
      const matches = people
        .map((person) => ({ person, index: remaining.indexOf(person.name) }))
        .filter((match) => match.person.name && match.index >= 0)
        .sort(
          (a, b) =>
            a.index - b.index || b.person.name.length - a.person.name.length,
        );
      if (!matches.length) {
        chunks.push(esc(remaining));
        break;
      }
      const { person, index } = matches[0];
      chunks.push(
        esc(remaining.slice(0, index)),
        '<a data-app href="' +
          targetRecord(person.id) +
          '">' +
          esc(person.name) +
          "</a>",
      );
      remaining = remaining.slice(index + person.name.length);
    }
    return chunks.join("");
  }
  const sent = record.sender || sender?.name,
    recipient =
      record.recipient_text ||
      (record.participants || [])
        .filter((person) => person.role === "recipient")
        .map((person) => person.name)
        .join(", ");
  const actors =
    (sent ? "<dt>From</dt><dd>" + actor(sent, "sender") + "</dd>" : "") +
    (recipient
      ? "<dt>Recipients</dt><dd>" + actor(recipient, "recipient") + "</dd>"
      : "") +
    (record.sent_at
      ? "<dt>Sent</dt><dd>" +
        esc([record.sent_at, record.timezone].filter(Boolean).join(" ")) +
        "</dd>"
      : "");
  const original =
    record.source_id && record.source_id !== record.id
      ? '<a data-app class="btn" href="' +
        targetRecord(record.source_id) +
        '">' +
        icon("pages") +
        "Source file</a>"
      : "";
  const controls =
    pages.length > 1
      ? '<label class="page-picker">Page <select id="page-select" aria-label="Select source page">' +
        pages
          .map(
            (n) =>
              '<option value="' +
              Number(n) +
              '"' +
              ((selected?.page || pages[0]) === n ? " selected" : "") +
              ">" +
              Number(n) +
              " of " +
              (record.pages || pages.length) +
              "</option>",
          )
          .join("") +
        "</select></label>"
      : "";
  const finder =
    record.kind === "recording" && p.length
      ? '<p class="caption-note">Mirror-supplied captions · wording unverified</p><label class="transcript-search">' +
        icon("search") +
        '<input type="search" id="passage-find" placeholder="Find in transcript" aria-label="Find in transcript"></label>'
      : "";
  const meta = isEntity
    ? '<div class="reader-meta">' + esc(record.description) + "</div>"
    : '<div class="reader-meta">' +
      evidenceStatus +
      metadata.map((v) => "<span>" + esc(v) + "</span>").join("") +
      "</div>";
  const sourceDetails = isEntity
    ? ""
    : '<details class="source-details"><summary>Source details</summary><dl class="detail-list"><dt>Source file</dt><dd>' +
      esc(record.filename || record.source) +
      "</dd>" +
      (record.sha256
        ? '<dt>SHA-256</dt><dd class="mono digest">' +
          esc(record.sha256) +
          "</dd>"
        : "") +
      (status ? "<dt>Record status</dt><dd>" + esc(status) + "</dd>" : "") +
      (external(record.source_mirror_url)
        ? '<dt>Preserved copy</dt><dd><a target="_blank" rel="noopener noreferrer" href="' +
          esc(external(record.source_mirror_url)) +
          '">Original file on Internet Archive</a></dd>'
        : "") +
      "</dl></details>";
  const sourceText =
    record.kind === "recording"
      ? "Transcript"
      : record.kind === "email"
        ? "Message"
        : record.kind === "chat"
          ? "Conversation"
          : "Source passages";
  $("#content").innerHTML =
    '<article class="reader"><a data-app class="reader-back" href="' +
    esc(back) +
    '">' +
    icon("left") +
    "Back to " +
    esc(backView) +
    '</a><div class="reader-top">' +
    fileIcon(record) +
    '<div class="reader-title"><div class="eyebrow">' +
    esc(badge || "Source record") +
    "</div><h1>" +
    esc(record.title) +
    "</h1>" +
    meta +
    "</div></div>" +
    (actors ? '<dl class="detail-list headers">' + actors + "</dl>" : "") +
    '<div class="reader-actions"><button type="button" class="btn primary" data-share-record>' +
    icon("share") +
    (isEntity ? "Share link" : "Share evidence") +
    "</button>" +
    original +
    (sourceLink
      ? '<a class="btn" href="' +
        esc(sourceLink) +
        '" target="_blank" rel="noopener noreferrer">' +
        icon("external") +
        "Official source</a>"
      : "") +
    "</div>" +
    sourceDetails +
    sheetMarkup(record, selected) +
    (media
      ? '<video id="media" controls playsinline preload="metadata" ' +
        (localAsset(record.poster_url)
          ? 'poster="' + esc(localAsset(record.poster_url)) + '" '
          : "") +
        'src="' +
        esc(media) +
        '"></video><div class="player-bar"><span class="mono" id="player-time"></span><span id="player-caption"></span><button type="button" class="btn" id="share-moment">' +
        icon("share") +
        "Share current moment</button></div>"
      : "") +
    (media && record.playback_note
      ? '<p class="caption-note">' + esc(record.playback_note) + "</p>"
      : "") +
    (p.length
      ? '<section><div class="reader-section-head"><h2>' +
        sourceText +
        "</h2>" +
        controls +
        "</div>" +
        finder +
        '<div id="passages"></div></section>'
      : isEntity
        ? ""
        : '<section class="empty"><div><h3>No public passages available</h3><p>Use the source link to inspect this record.</p></div></section>') +
    relatedMarkup(record) +
    "</article>";
  if ($("#sheet-select")) displaySheet(record, $("#sheet-select").value);
  displayPassages(record, params);
  if (media) {
    const player = $("#media"),
      start = exactTime ?? selected?.start_seconds ?? 0;
    updatePlayerContext(record, start);
    player.addEventListener("timeupdate", () =>
      updatePlayerContext(record, player.currentTime),
    );
    if (start > 0) seekTime(start);
    if (exactTime !== null)
      requestAnimationFrame(() => player.scrollIntoView({ block: "center" }));
  }
  if (selected)
    requestAnimationFrame(() =>
      document
        .getElementById("passage-" + selected.id)
        ?.scrollIntoView({ block: "start" }),
    );
}
function openFilters() {
  const params = currentParams(),
    view = getView();
  const selects = Object.keys(filterNames)
    .filter((k) => !["from", "to"].includes(k))
    .map((k) => {
      const vals = state.meta?.facets?.[k] || [];
      return (
        '<div class="filter-field"><label for="filter-' +
        k +
        '">' +
        filterNames[k] +
        '</label><select id="filter-' +
        k +
        '" name="' +
        k +
        '"><option value="">All ' +
        {
          type: "types",
          organization: "organizations",
          participant: "participants",
          program: "programs",
        }[k] +
        "</option>" +
        vals
          .map(
            (v) =>
              '<option value="' +
              esc(v) +
              '"' +
              (params.get(k) === v ? " selected" : "") +
              ">" +
              esc(v) +
              "</option>",
          )
          .join("") +
        "</select></div>"
      );
    })
    .join("");
  const dates = ["from", "to"]
    .map(
      (k) =>
        '<div class="filter-field"><label for="filter-' +
        k +
        '">' +
        filterNames[k] +
        ' date</label><input type="date" name="' +
        k +
        '" id="filter-' +
        k +
        '" value="' +
        esc(params.get(k) || "") +
        '"></div>',
    )
    .join("");
  const orders = {
    title: "Title A–Z",
    newest: "Newest first",
    oldest: "Oldest first",
  };
  const sorting =
    '<div class="filter-field"><label for="filter-sort">Order</label><select name="sort" id="filter-sort"><option value="">' +
    (view === "search" ? "Relevance" : "Collection order") +
    "</option>" +
    Object.entries(orders)
      .map(
        ([v, name]) =>
          '<option value="' +
          v +
          '"' +
          (params.get("sort") === v ? " selected" : "") +
          ">" +
          name +
          "</option>",
      )
      .join("") +
    "</select></div>";
  $("#filter-fields").innerHTML =
    view === "network"
      ? '<div class="filter-field"><label for="entity-name">Name</label><input type="text" name="q" id="entity-name" value="' +
        esc(params.get("q") || "") +
        '"></div>'
      : selects + '<div class="date-fields">' + dates + "</div>" + sorting;
  $("#filters-dialog").showModal();
}
function openInfo() {
  const c = state.meta?.coverage || {};
  const rows = [
    ["Source files", c.sources],
    ["Files with SHA-256 hashes", c.with_hash],
    ["Processed pages", c.pages],
    ["Citable passages", c.passages],
  ].filter(([, v]) => Number.isInteger(v));
  $("#info-body").innerHTML =
    '<p class="dialog-copy">Aidroom organizes the public USAID Files release into a searchable workspace. Each reconstructed record links to its supporting source.</p><dl class="detail-list">' +
    rows
      .map(
        ([label, val]) =>
          "<dt>" + label + "</dt><dd>" + displayNumber(val) + "</dd>",
      )
      .join("") +
    '</dl><a class="btn" href="https://www.usaid.gov/" target="_blank" rel="noopener noreferrer">' +
    icon("external") +
    'Official USAID collection</a> <a class="btn" href="/api/v1" target="_blank" rel="noopener">Agent API</a>';
  $("#info-dialog").showModal();
}
function selectionOffsets() {
  const selection = window.getSelection();
  if (!selection?.rangeCount || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0),
    node =
      range.startContainer.nodeType === 1
        ? range.startContainer
        : range.startContainer.parentElement;
  const text = node?.closest(".passage-text");
  if (!text || !text.contains(range.endContainer)) return null;
  const before = range.cloneRange();
  before.selectNodeContents(text);
  before.setEnd(range.startContainer, range.startOffset);
  const value = range.toString();
  if (!value.trim()) return null;
  const a = Array.from(before.toString()).length,
    b = a + Array.from(value).length;
  return { p: text.closest("[data-pid]").dataset.pid, a, b };
}
function shareRecord(pid, seconds) {
  const record = state.record;
  if (!record) return;
  let params = {},
    quote = "",
    sel = selectionOffsets() || state.pointerSelection;
  state.pointerSelection = null;
  const requested = currentParams();
  if (Number.isFinite(seconds))
    params = { t: Math.floor(seconds * 1000) / 1000 };
  else if (sel && (!pid || sel.p === pid)) params = sel;
  else if (pid) params = { p: pid };
  else if (requested.has("p")) {
    for (const key of ["p", "a", "b"])
      if (requested.has(key)) params[key] = requested.get(key);
  } else if (requested.has("t")) params.t = requested.get("t");
  const passage =
    params.t != null
      ? captionAt(record, Number(params.t))
      : (record.passages || []).find((p) => p.id === params.p);
  if (passage) {
    const full = Array.from(passage.text || "");
    quote = (
      Object.hasOwn(params, "a")
        ? full.slice(Number(params.a), Number(params.b))
        : full
    ).join("");
  }
  const url = targetRecord(record.id, params),
    qs = new URLSearchParams(params),
    card =
      "/card/" +
      encodeURIComponent(record.id) +
      ".png" +
      (qs.size ? "?" + qs : "");
  qs.set("download", "1");
  state.shareURL = new URL(url, location.origin).href;
  const isEntity = record.kind === "entity";
  $("#share-title").textContent = isEntity
    ? "Share directory entry"
    : "Share evidence";
  $("#share-body").innerHTML =
    (isEntity
      ? ""
      : '<img class="share-preview" alt="Evidence card preview" src="' +
        esc(card) +
        '">') +
    (quote
      ? '<blockquote class="share-quote">' +
        esc(quote.length > 350 ? quote.slice(0, 350) + "…" : quote) +
        "</blockquote>"
      : "") +
    '<label for="share-address">Permanent link</label><input type="text" readonly id="share-address" value="' +
    esc(state.shareURL) +
    '"><div class="share-actions"><button id="copy-link" type="button" class="btn primary">' +
    icon("chain") +
    "Copy link</button>" +
    (!isEntity
      ? '<a class="btn" download href="/card/' +
        encodeURIComponent(record.id) +
        ".png?" +
        esc(qs.toString()) +
        '">' +
        icon("download") +
        "Download card</a>"
      : "") +
    "</div>";
  $("#share-dialog").showModal();
}
async function copyLink() {
  try {
    await navigator.clipboard.writeText(state.shareURL);
    $("#copy-link").textContent = "Link copied";
  } catch {
    const box = $("#share-address");
    box.focus();
    box.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {}
    $("#copy-link").textContent = copied
      ? "Link copied"
      : "Select and copy the link";
  }
}
async function getJSON(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok)
    throw new Error(
      response.status === 404
        ? "This record could not be found."
        : response.status === 503
          ? "The archive index is being prepared."
          : "The archive could not load this request.",
    );
  return response.json();
}
async function render() {
  const v = ++state.version;
  state.controller?.abort();
  state.controller = new AbortController();
  state.observer?.disconnect();
  const sig = state.controller.signal,
    params = currentParams(),
    isRecord = location.pathname.startsWith("/r/"),
    view = getView();
  state.record = null;
  state.list = null;
  $("#content").setAttribute("aria-busy", "true");
  navigation(isRecord ? "record" : view);
  $("#search-input").value = isRecord ? "" : params.get("q") || "";
  try {
    const apiParams = new URLSearchParams(params);
    apiParams.set("view", view);
    apiParams.set("limit", String(pageSize));
    const recID = isRecord
      ? decodeURIComponent(location.pathname.slice(3))
      : "";
    const [meta, data] = await Promise.all([
      state.meta || getJSON("/api/meta", sig),
      getJSON(
        isRecord
          ? "/api/records/" + encodeURIComponent(recID)
          : "/api/records?" + apiParams.toString(),
        sig,
      ),
    ]);
    if (v !== state.version) return;
    state.meta = meta;
    navigation(isRecord ? "record" : view);
    if (isRecord) {
      state.record = data;
      document.title = data.title + " · Aidroom";
      renderRecord(data, params);
    } else {
      state.list = data;
      state.lastList = location.pathname + location.search;
      document.title = views[view][0] + " · Aidroom";
      renderListing(data, view, params);
    }
  } catch (e) {
    if (v !== state.version || e.name === "AbortError") return;
    $("#content").innerHTML =
      '<section class="error-state">' +
      icon("archive") +
      "<div><h2>Archive unavailable</h2><p>" +
      esc(e.message) +
      '</p><button class="btn" type="button" id="retry">Retry</button></div></section>';
  } finally {
    if (v === state.version) $("#content").removeAttribute("aria-busy");
  }
}
function toggleMenu(open) {
  const compact = matchMedia("(max-width:690px)").matches;
  $("#sidebar").inert = compact && !open;
  document.body.classList.toggle("nav-open", open && compact);
  $("#menu").setAttribute("aria-expanded", String(open));
}
function navigate(href) {
  toggleMenu(false);
  if (location.pathname + location.search !== href)
    history.pushState({}, "", href);
  scrollTo(0, 0);
  render();
}
function setup() {
  toggleMenu(false);
  matchMedia("(max-width:690px)").addEventListener("change", () =>
    toggleMenu(false),
  );
  $("#collection-info").innerHTML = icon("info") + "Collection details";
  $("#source-seal").innerHTML = icon("institution");
  $("#out-icon").innerHTML = icon("external");
  $("#menu").innerHTML = icon("menu");
  $("#bread-icon").innerHTML = icon("workspace");
  $("#search-icon").innerHTML = icon("search");
  $("#search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("#search-input").value.trim();
    navigate(q ? pathFor("search", { q }) : "/");
    $("#search-input").blur();
  });
  $("#filters-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const params = Object.fromEntries(currentParams()),
      form = Object.fromEntries(new FormData(e.currentTarget));
    const from = $("#filter-from"),
      to = $("#filter-to");
    if (from && to && from.value && to.value && from.value > to.value) {
      to.setCustomValidity("Choose an end date on or after the start date.");
      to.reportValidity();
      return;
    }
    delete params.view;
    delete params.offset;
    $("#filters-dialog").close();
    navigate(pathFor(getView(), { ...params, ...form }));
  });
  $("#filters-form").addEventListener("input", () =>
    $("#filter-to")?.setCustomValidity(""),
  );
  document.addEventListener("change", (e) => {
    if (e.target.id === "chat-source") {
      const v = Object.fromEntries(currentParams());
      delete v.view;
      delete v.offset;
      v.source_id = e.target.value;
      navigate(pathFor("chat", v));
      return;
    }
    if (e.target.id === "sheet-select" && state.record) {
      displaySheet(state.record, e.target.value);
      return;
    }
    if (e.target.id === "page-select" && state.record) {
      const match = state.record.passages.find(
        (p) => p.page === Number(e.target.value),
      );
      if (match) {
        history.pushState(
          {},
          "",
          targetRecord(state.record.id, { p: match.id }),
        );
        displayPassages(state.record, currentParams());
      }
    }
  });
  document.addEventListener("input", (e) => {
    if (e.target.id === "passage-find")
      displayPassages(state.record, currentParams());
  });
  document.addEventListener("pointerdown", (e) => {
    if (e.target.closest("[data-share-p],[data-share-record]"))
      state.pointerSelection = selectionOffsets();
  });
  document.addEventListener("selectionchange", () => {
    if (!state.record) return;
    const chosen = selectionOffsets();
    for (const button of $$("[data-share-p].selected-quote")) {
      if (button.dataset.shareP !== chosen?.p) {
        button.classList.remove("selected-quote");
        button.innerHTML = icon("share") + "Share";
      }
    }
    if (chosen) {
      const box = document.getElementById("passage-" + chosen.p),
        button = box?.querySelector("[data-share-p]");
      if (button && !button.classList.contains("selected-quote")) {
        button.classList.add("selected-quote");
        button.innerHTML = icon("share") + "Share selection";
      }
    }
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-app]");
    if (
      a &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      !e.altKey &&
      e.button === 0
    ) {
      e.preventDefault();
      let path = a.pathname + a.search;

      navigate(path);
      return;
    }
    const el = e.target.closest("button");
    if (!el) {
      if (e.target instanceof HTMLDialogElement) e.target.close();
      return;
    }
    if (el.dataset.close) {
      document.getElementById(el.dataset.close)?.close();
      return;
    }
    if (el.hasAttribute("data-layout")) {
      state.layout = el.dataset.layout;
      try {
        localStorage.setItem("aidroom-layout", state.layout);
      } catch {}
      if (state.list) renderListing(state.list, getView(), currentParams());
      return;
    }
    if (el.hasAttribute("data-share-p")) {
      shareRecord(el.dataset.shareP);
      return;
    }
    if (el.hasAttribute("data-share-record")) {
      shareRecord();
      return;
    }
    if (el.hasAttribute("data-seek")) {
      seekTime(el.dataset.seek, true);
      return;
    }
    switch (el.id) {
      case "share-moment":
        shareRecord(null, $("#media").currentTime);
        break;
      case "menu":
        toggleMenu(true);
        break;
      case "scrim":
        toggleMenu(false);
        break;
      case "collection-info":
        toggleMenu(false);
        openInfo();
        break;
      case "open-filters":
        openFilters();
        break;
      case "retry":
        render();
        break;
      case "copy-link":
        copyLink();
        break;
      case "reset-filters":
        for (const field of $$("#filter-fields input,#filter-fields select"))
          field.value = "";
        break;
    }
  });
  document.addEventListener("keydown", (e) => {
    const field = e.target.closest(
      "input,textarea,select,[contenteditable=true]",
    );
    if (
      !document.querySelector("dialog[open]") &&
      ((e.key === "/" && !field) ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k"))
    ) {
      e.preventDefault();
      $("#search-input").focus();
      $("#search-input").select();
    }
    if (e.key === "Escape") toggleMenu(false);
  });
  window.addEventListener("popstate", () => {
    toggleMenu(false);
    render();
  });
  render();
}
setup();
