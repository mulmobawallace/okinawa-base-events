// ============================================================
// 画面を作るプログラム（ふだんは触らなくてOK）
// イベントの追加・変更は events.js を編集してください。
// ============================================================

const listEl = document.getElementById("event-list");
const countEl = document.getElementById("count");
const baseSelect = document.getElementById("filter-base");
const typeSelect = document.getElementById("filter-type");
const pastCheck = document.getElementById("show-past");

// 今日の日付（"2026-10-16" の形）
const today = new Date().toLocaleDateString("sv-SE");

// "2026-11-14" → "11月14日(土)"
function formatDate(str) {
  const d = new Date(str + "T00:00:00");
  const week = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getMonth() + 1}月${d.getDate()}日(${week})`;
}

function formatRange(ev) {
  // 日程未発表のときは「2027年4月ごろ」のような目安だけを表示する
  if (ev.status === "日程未発表") return `${esc(ev.expected)}（日程未発表）`;
  const year = ev.startDate.slice(0, 4) + "年";
  if (ev.startDate === ev.endDate) return year + formatDate(ev.startDate);
  return year + formatDate(ev.startDate) + "〜" + formatDate(ev.endDate);
}

// HTMLとして危ない文字を無害化する
function esc(text) {
  return String(text ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

// 絞り込み用のプルダウンにイベントから選択肢を入れる
function fillOptions(select, key, extra = []) {
  const values = [...new Set([...extra, ...EVENTS.map((ev) => ev[key])])].sort();
  for (const v of values) {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  }
}

function row(label, value) {
  return value ? `<dt>${label}</dt><dd>${esc(value)}</dd>` : "";
}

// 基地名から地図ページへのリンクを作る（bases.js にない基地は文字だけ）
function baseLink(name) {
  const base = BASES.find((b) => b.name === name);
  if (!base) return esc(name);
  return `<a class="base-link" href="map.html?base=${base.id}#map">${esc(name)}</a>`;
}

// チケットの半券に出す日付（例：DEC / 6 / SUN、日程未発表なら 2027 / APR / ごろ）
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const WEEKS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function stubHtml(ev) {
  const s = new Date(ev.startDate + "T00:00:00");
  const e = new Date(ev.endDate + "T00:00:00");
  let top, big, bot, botClass = "";
  if (ev.status === "日程未発表") {
    top = s.getFullYear();
    big = MONTHS[s.getMonth()];
    bot = "ごろ";
    botClass = "ja";
  } else {
    const sameMonth = s.getMonth() === e.getMonth();
    top = sameMonth ? MONTHS[s.getMonth()] : `${MONTHS[s.getMonth()]}–${MONTHS[e.getMonth()]}`;
    big = ev.startDate === ev.endDate ? s.getDate() : `${s.getDate()}–${e.getDate()}`;
    bot = ev.startDate === ev.endDate ? WEEKS[s.getDay()] : s.getFullYear();
  }
  const long = String(big).length > 3 ? " is-long" : "";
  return `
      <div class="ticket-stub" aria-hidden="true">
        <span class="stub-top">${top}</span>
        <span class="stub-big${long}">${big}</span>
        <span class="stub-bot ${botClass}">${bot}</span>
      </div>`;
}

function renderCard(ev, i) {
  const isPast = ev.endDate < today;
  const statusLabel = isPast ? "終了" : ev.status;
  const link = ev.sourceUrl && ev.sourceUrl !== "#"
    ? `<a href="${esc(ev.sourceUrl)}" target="_blank" rel="noopener">公式情報を見る</a>`
    : "公式情報リンク未設定";

  const isTBD = ev.status === "日程未発表";
  const tbdNote = isTBD
    ? `<p class="tbd-note">正式な日程はまだ発表されていません。昨年の開催時期をもとにした目安です。</p>`
    : "";
  // 中止・延期はスタンプで目立たせる
  const isStamp = !isPast && (ev.status === "中止" || ev.status === "延期");
  const statusHtml = isStamp
    ? `<span class="stamp">${esc(ev.status)}</span>`
    : `<span class="status status-${esc(statusLabel)}">${esc(statusLabel)}</span>`;

  return `
    <article class="ticket ${isPast ? "past" : ""} ${isTBD ? "tbd" : ""}" style="--i:${i}">
      <div class="ticket-main">
        <div class="ticket-meta">
          <span class="chip">${esc(ev.type)}</span>
          <span>📍 ${baseLink(ev.base)}</span>
          ${isStamp ? "" : statusHtml}
        </div>
        <h3>${esc(ev.title)}</h3>
        <p class="when">${formatRange(ev)}${isTBD || !ev.time ? "" : "　" + esc(ev.time)}</p>
      ${tbdNote}
      <p class="summary">${esc(ev.summary)}</p>
      <details>
        <summary>入場方法・持ち物などの詳細</summary>
        <dl>
          ${row("入場条件", ev.entry)}
          ${row("ゲート", ev.gate)}
          ${row("持ち物", ev.bring)}
          ${row("持込禁止", ev.banned)}
          ${row("駐車場", ev.parking)}
          ${row("料金", ev.fee)}
        </dl>
      </details>
      <div class="source">${link}（最終確認：${esc(ev.checkedAt)}）</div>
      </div>
      ${stubHtml(ev)}
      ${isStamp ? statusHtml : ""}
    </article>`;
}

function render() {
  const base = baseSelect.value;
  const type = typeSelect.value;
  const showPast = pastCheck.checked;

  const items = EVENTS
    .filter((ev) => !base || ev.base === base)
    .filter((ev) => !type || ev.type === type)
    .filter((ev) => showPast || ev.endDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  countEl.textContent = `${items.length} EVENTS ／ ${items.length}件のイベント`;
  listEl.innerHTML = items.length
    ? items.map(renderCard).join("")
    : `<p class="empty">条件に合うイベントはありません。</p>`;
}

fillOptions(baseSelect, "base", BASES.map((b) => b.name));
fillOptions(typeSelect, "type");

// 地図ページから index.html?base=嘉手納基地 のように来たら、その基地で絞り込む
const baseParam = new URLSearchParams(location.search).get("base");
if (baseParam && [...baseSelect.options].some((o) => o.value === baseParam)) {
  baseSelect.value = baseParam;
}

[baseSelect, typeSelect, pastCheck].forEach((el) => el.addEventListener("change", render));
render();
