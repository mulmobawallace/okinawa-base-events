// ============================================================
// イベントデータ
// 新しいイベントを追加するときは、{ ... } のかたまりを1つコピーして
// 中身を書きかえてください。かたまりの間は「,」（カンマ）で区切ります。
//
// 書き方の例（項目の意味）：
//   type: 祭り / フリマ / オープンハウス / その他
//   status: 予定 / 中止 / 延期 / 日程未発表
//   startDate / endDate: "2027-04-11" のように 年-月-日
//   sourceUrl: 情報元（公式ページ）のURL、checkedAt: 最後に公式情報を確認した日
// ============================================================

const EVENTS = [
  // ---- ここから「日程未発表」のイベント ----
  // 正式発表されたら startDate/endDate に本当の日付を入れ、status を "予定" に変える
  {
    id: "2027-hansen",
    title: "キャンプ・ハンセン・フェスティバル",
    type: "祭り",
    base: "キャンプ・ハンセン",
    status: "日程未発表",
    expected: "2027年2月ごろ",           // 画面に表示する目安
    startDate: "2027-02-01",        // 並び順用：目安の月の初日
    endDate: "2027-02-28",          // 目安の月の末日（過ぎると「終了」扱い）
    time: "",
    gate: "",
    entry: "発表後に追記します。",
    bring: "写真付き身分証（例年必要）",
    banned: "",
    parking: "",
    fee: "",
    summary: "2026年は2月14・15日に開催。",
    sourceUrl: "https://www.okinawa.usmc-mccs.org/dining-entertainment/entertainment-events/festivals",
    checkedAt: "2026-10-26"
  },
  {
    id: "2027-schwab",
    title: "キャンプ・シュワブ・フェスティバル",
    type: "祭り",
    base: "キャンプ・シュワブ",
    status: "日程未発表",
    expected: "2027年3月ごろ",           // 画面に表示する目安
    startDate: "2027-03-01",        // 並び順用：目安の月の初日
    endDate: "2027-03-31",          // 目安の月の末日（過ぎると「終了」扱い）
    time: "",
    gate: "",
    entry: "発表後に追記します。",
    bring: "写真付き身分証（例年必要）",
    banned: "",
    parking: "",
    fee: "",
    summary: "2026年は3月28日に開催。",
    sourceUrl: "https://www.okinawa.usmc-mccs.org/dining-entertainment/entertainment-events/festivals",
    checkedAt: "2026-10-26"
  },
  {
    id: "2027-americafest",
    title: "嘉手納アメリカフェスト",
    type: "オープンハウス",
    base: "嘉手納基地",
    status: "日程未発表",
    expected: "2027年4月ごろ",           // 画面に表示する目安
    startDate: "2027-04-01",        // 並び順用：目安の月の初日
    endDate: "2027-04-30",          // 目安の月の末日（過ぎると「終了」扱い）
    time: "",
    gate: "",
    entry: "発表後に追記します。",
    bring: "写真付き身分証（例年必要）",
    banned: "",
    parking: "",
    fee: "",
    summary: "2026年は4月11・12日に開催。航空機の展示が人気の大型イベント。",
    sourceUrl: "https://www.kadena.af.mil/",
    checkedAt: "2026-10-16"
  },
  {
    id: "2027-whitebeach",
    title: "ホワイトビーチ・フェスティバル",
    type: "祭り",
    base: "ホワイトビーチ",
    status: "日程未発表",
    expected: "2027年4月ごろ",
    startDate: "2027-04-01",
    endDate: "2027-04-30",
    time: "",
    gate: "",
    entry: "発表後に追記します。",
    bring: "写真付き身分証（2026年は身分証の提示と手荷物検査あり）",
    banned: "",
    parking: "",
    fee: "",
    summary: "米海軍と海上自衛隊の共催。2026年は4月25・26日に開催され、一般公開。艦船の見学（できる場合のみ）や展示、屋台など。",
    sourceUrl: "https://www.dvidshub.net/news/562834/cfao-and-jmsdf-host-white-beach-festival-2026",
    checkedAt: "2026-10-26"
  },
  {
    id: "2027-courtney",
    title: "キャンプ・コートニー・フェスティバル",
    type: "祭り",
    base: "キャンプ・コートニー",
    status: "日程未発表",
    expected: "2027年4月ごろ",           // 画面に表示する目安
    startDate: "2027-04-01",        // 並び順用：目安の月の初日
    endDate: "2027-04-30",          // 目安の月の末日（過ぎると「終了」扱い）
    time: "",
    gate: "",
    entry: "発表後に追記します。",
    bring: "写真付き身分証（例年必要）",
    banned: "",
    parking: "",
    fee: "",
    summary: "2026年は4月18日に開催。",
    sourceUrl: "https://www.okinawa.usmc-mccs.org/dining-entertainment/entertainment-events/festivals",
    checkedAt: "2026-10-26"
  },
  {
    id: "2027-flightline",
    title: "普天間フライトラインフェア",
    type: "オープンハウス",
    base: "普天間飛行場",
    status: "日程未発表",
    expected: "2027年5月ごろ",           // 画面に表示する目安
    startDate: "2027-05-01",        // 並び順用：目安の月の初日
    endDate: "2027-05-31",          // 目安の月の末日（過ぎると「終了」扱い）
    time: "",
    gate: "",
    entry: "発表後に追記します。",
    bring: "写真付き身分証（例年必要）",
    banned: "",
    parking: "",
    fee: "",
    summary: "2026年は5月9・10日に開催。",
    sourceUrl: "https://www.okinawa.usmc-mccs.org/dining-entertainment/entertainment-events/festivals",
    checkedAt: "2026-10-26"
  },
  {
    id: "2027-kinser",
    title: "キャンプ・キンザー・フェスティバル",
    type: "祭り",
    base: "キャンプ・キンザー",
    status: "日程未発表",
    expected: "2027年6月ごろ",           // 画面に表示する目安
    startDate: "2027-06-01",        // 並び順用：目安の月の初日
    endDate: "2027-06-30",          // 目安の月の末日（過ぎると「終了」扱い）
    time: "",
    gate: "",
    entry: "発表後に追記します。",
    bring: "写真付き身分証（例年必要）",
    banned: "",
    parking: "",
    fee: "",
    summary: "2026年は6月13・14日に開催。",
    sourceUrl: "https://www.okinawa.usmc-mccs.org/dining-entertainment/entertainment-events/festivals",
    checkedAt: "2026-10-26"
  },
  {
    id: "2027-foster",
    title: "フォスター・フェスティバル",
    type: "祭り",
    base: "キャンプ・フォスター",
    status: "日程未発表",
    expected: "2027年7月ごろ",           // 画面に表示する目安
    startDate: "2027-07-01",        // 並び順用：目安の月の初日
    endDate: "2027-07-31",          // 目安の月の末日（過ぎると「終了」扱い）
    time: "",
    gate: "",
    entry: "発表後に追記します。",
    bring: "写真付き身分証（例年必要）",
    banned: "",
    parking: "",
    fee: "",
    summary: "2026年は7月4・5日（米国独立記念日）に開催。",
    sourceUrl: "https://www.okinawa.usmc-mccs.org/dining-entertainment/entertainment-events/festivals",
    checkedAt: "2026-10-26"
  },
  {
    id: "2026-comiccon",
    title: "コミコン沖縄",
    type: "その他",
    base: "キャンプ・フォスター",
    status: "予定",
    startDate: "2026-12-06",
    endDate: "2026-12-06",
    time: "10:00〜17:00",
    gate: "",
    entry: "日本国籍の方・米国籍の方・DoD IDカード保持者が対象。その他の国籍の方はキャンプ・バトラー基地パス事務所（098-970-7519）に要問い合わせ。",
    bring: "",
    banned: "",
    parking: "日本人・SOFA以外の方は国道58号沿いのキャンプ・フォスター・フリーマーケット駐車場を利用。",
    fee: "無料（入場券不要）。早期入場などが付く有料の「ゴールドパス」もあり。",
    summary: "キャンプ・フォスターのフィールドハウス、コミュニティセンターなど複数会場で開かれるポップカルチャーのイベント。来場者バッジは先着順で無料配布。",
    sourceUrl: "https://www.okinawa.usmc-mccs.org/dining-entertainment/entertainment-events/comic-con",
    checkedAt: "2026-10-26"
  }
];
