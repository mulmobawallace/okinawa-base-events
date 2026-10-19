// ============================================================
// 基地のデータ（地図ページとイベント一覧で使います）
// name は events.js の base と同じ書き方にしてください。
// lat / lng（緯度・経度）は基地のおおよその中心です。ゲートの位置ではありません。
// ============================================================

const BASES = [
  {
    id: "kadena",
    name: "嘉手納基地",
    otherNames: "Kadena Air Base（カデナ）",
    area: "嘉手納町・沖縄市・北谷町",
    lat: 26.3556, lng: 127.7676,
    fromAirport: "那覇空港から車で約45分〜1時間",
    nearby: "道の駅かでな（展望台から基地が見えます）",
    description: "極東最大級の米空軍基地。大型の祭りでは航空機の展示が見られます。"
  },
  {
    id: "foster",
    name: "キャンプ・フォスター",
    otherNames: "キャンプ瑞慶覧（ずけらん）／Camp Foster",
    area: "北谷町・北中城村・宜野湾市・沖縄市",
    lat: 26.2985, lng: 127.7720,
    fromAirport: "那覇空港から車で約40分",
    nearby: "美浜アメリカンビレッジ（車で約10分）、イオンモール沖縄ライカム",
    description: "海兵隊の司令部がある基地。国道330号・58号沿いに広がっています。"
  },
  {
    id: "futenma",
    name: "普天間飛行場",
    otherNames: "MCAS Futenma（フテンマ）",
    area: "宜野湾市",
    lat: 26.2742, lng: 127.7556,
    fromAirport: "那覇空港から車で約30分",
    nearby: "嘉数高台公園（展望台から飛行場が見えます）",
    description: "宜野湾市の中心にある海兵隊の飛行場。"
  },
  {
    id: "kinser",
    name: "キャンプ・キンザー",
    otherNames: "牧港補給地区（まきみなと）／Camp Kinser",
    area: "浦添市",
    lat: 26.2620, lng: 127.7140,
    fromAirport: "那覇空港から車で約20分",
    nearby: "港川外人住宅街（カフェ・雑貨店が集まるエリア）",
    description: "国道58号沿い、那覇から一番近い基地です。"
  },
  {
    id: "courtney",
    name: "キャンプ・コートニー",
    otherNames: "Camp Courtney",
    area: "うるま市",
    lat: 26.3930, lng: 127.8570,
    fromAirport: "那覇空港から車で約1時間",
    nearby: "海中道路（車で約20分）",
    description: "うるま市の東海岸にある海兵隊の基地。"
  },
  {
    id: "hansen",
    name: "キャンプ・ハンセン",
    otherNames: "Camp Hansen",
    area: "金武町など",
    lat: 26.4570, lng: 127.9170,
    fromAirport: "那覇空港から車で約1時間10分",
    nearby: "金武町新開地（タコライス発祥の地）",
    description: "沖縄本島中部・金武町にある海兵隊の基地。"
  },
  {
    id: "schwab",
    name: "キャンプ・シュワブ",
    otherNames: "Camp Schwab",
    area: "名護市（辺野古）",
    lat: 26.5250, lng: 128.0450,
    fromAirport: "那覇空港から車で約1時間20分",
    nearby: "道の駅許田（車で約20分）",
    description: "名護市の東海岸・辺野古にある海兵隊の基地。"
  },
  {
    id: "whitebeach",
    name: "ホワイトビーチ",
    otherNames: "ホワイトビーチ地区／White Beach Naval Facility",
    area: "うるま市（勝連半島）",
    lat: 26.3020, lng: 127.9060,
    fromAirport: "那覇空港から車で約1時間",
    nearby: "海中道路（車で約15分）、勝連城跡（車で約10分）",
    description: "うるま市・勝連半島の先にある米海軍の港湾施設。海上自衛隊の基地もとなりにあります。"
  }
];
