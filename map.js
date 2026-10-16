// ============================================================
// 地図ページのプログラム（ふだんは触らなくてOK）
// 基地の追加・変更は bases.js を編集してください。
// ============================================================

const today = new Date().toLocaleDateString("sv-SE");

function esc(text) {
  return String(text ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

// その基地で今後あるイベントの数
function upcomingCount(base) {
  return EVENTS.filter((ev) => ev.base === base.name && ev.endDate >= today).length;
}

function eventsLink(base) {
  return "index.html?base=" + encodeURIComponent(base.name) + "#events";
}

function googleMapsLink(base) {
  return `https://www.google.com/maps/search/?api=1&query=${base.lat},${base.lng}`;
}

function baseInfoHtml(base) {
  const n = upcomingCount(base);
  return `
    <h3>${esc(base.name)}</h3>
    <p class="small">${esc(base.otherNames)}</p>
    <dl>
      <dt>場所</dt><dd>${esc(base.area)}</dd>
      <dt>アクセス</dt><dd>${esc(base.fromAirport)}</dd>
      <dt>近くの観光地</dt><dd>${esc(base.nearby)}</dd>
    </dl>
    <p>${esc(base.description)}</p>
    <p class="links">
      <a href="${eventsLink(base)}">この基地のイベントを見る（${n}件）</a>
      <a href="${googleMapsLink(base)}" target="_blank" rel="noopener">Googleマップで開く</a>
    </p>`;
}

// --- 地図 ---
const map = L.map("map", { scrollWheelZoom: false }).setView([26.34, 127.80], 11);
// 国土地理院の地図（日本語表記・無料。出典の表示が利用条件）
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル</a>'
}).addTo(map);

const markers = {};
for (const base of BASES) {
  markers[base.id] = L.marker([base.lat, base.lng])
    .addTo(map)
    .bindTooltip(base.name, { permanent: true, direction: "top", offset: [-15, -12], className: "base-label" })
    .bindPopup(`<div class="popup">${baseInfoHtml(base)}</div>`);
}

// すべての基地が入るように地図の範囲を合わせる（基地を増やしても自動で調整）
map.fitBounds(BASES.map((b) => [b.lat, b.lng]), { paddingTopLeft: [60, 90], paddingBottomRight: [60, 30], animate: false });

// --- 地図の下の一覧 ---
document.getElementById("base-list").innerHTML = BASES.map((base) => `
  <article class="card" id="${base.id}">
    ${baseInfoHtml(base)}
  </article>`).join("");

function focusBase(id) {
  const base = BASES.find((b) => b.id === id);
  if (!base) return;
  map.setView([base.lat, base.lng], 13);
  markers[id].openPopup();
}
// map.html?base=foster のように開かれたら、その基地を表示する
const param = new URLSearchParams(location.search).get("base");
if (param) focusBase(param);
