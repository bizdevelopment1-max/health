/* ============================================================
   Health Intelligence Dashboard — sample data
   현실적인 예시 데이터(실제 회사/이슈 기반). 라이브 피드 아님.
   plain script → window.DASH
   ============================================================ */
(function () {
  "use strict";

  // ---- Categories -------------------------------------------------
  const CATEGORIES = [
    { id: "device", ko: "디바이스 헬스", en: "Device-based Health", accent: "#1428A0", accentSoft: "#E8ECFA", desc: "웨어러블·링·밴드 기반 생체 데이터 플랫폼" },
    { id: "ai", ko: "AI 네이티브 헬스", en: "AI Native Health", accent: "#7A38D6", accentSoft: "#F0E9FB", desc: "파운데이션 모델 기반 헬스 에이전트·코칭" },
    { id: "startup", ko: "체중·피트니스 스타트업", en: "Weight & Fitness Startups", accent: "#0E8F6E", accentSoft: "#E2F4EE", desc: "칼로리·체중관리·운동추천 버티컬" },
  ];

  // ---- Companies --------------------------------------------------
  // valAsof / metricAsof = 발표·집계 기준 시점 ('YY.M → "'YY.M월 기준")
  const COMPANIES = [
    // Device
    { cat: "device", name: "Apple", unit: "Health · Watch", valuation: "공개(상장)", valAsof: "26.5", funding: "Public", metric: "Health 활성 사용자", value: "210M+", metricAsof: "25.10", trend: +4.2, note: "Watch·Health 앱 생태계 락인, AI 트렌드 요약 도입", url: "https://www.apple.com/newsroom/" },
    { cat: "device", name: "Fitbit (Google)", unit: "Wearables", valuation: "$2.1B 인수", valAsof: "21.1", funding: "Public", metric: "월 활성 사용자", value: "38M", metricAsof: "25.9", trend: -2.1, note: "Pixel Watch로 통합, 독립 앱 단계적 종료", url: "https://blog.google/products/fitbit/" },
    { cat: "device", name: "Garmin", unit: "Fitness · Outdoor", valuation: "$33B 시총", valAsof: "26.5", funding: "Public", metric: "피트니스 매출(FY)", value: "$1.8B", metricAsof: "25.12", trend: +9.4, note: "프리미엄 멀티스포츠 강세, 웨어러블 시장 상회", url: "https://www.garmin.com/en-US/newsroom/" },
    { cat: "device", name: "Oura", unit: "Smart Ring", valuation: "$5.2B", valAsof: "26.6", funding: "Series D $200M", metric: "누적 링 판매", value: "5.5M", metricAsof: "26.5", trend: +18.0, note: "혈당·대사(metabolic) 플랫폼으로 확장", url: "https://ouraring.com/blog" },
    { cat: "device", name: "Whoop", unit: "Recovery Band", valuation: "$3.6B", valAsof: "24.5", funding: "Series F", metric: "구독 ARPU", value: "$239/yr", metricAsof: "26.6", trend: +6.8, note: "Whoop 5.0, 심전도·혈압 FDA 승인으로 의료 등급화", url: "https://www.whoop.com/thelocker/" },
    // AI native
    { cat: "ai", name: "OpenAI Health", unit: "Health Agent", valuation: "비공개", valAsof: "—", funding: "내부 투자", metric: "헬스 파일럿", value: "Beta", metricAsof: "26.6", trend: +0, note: "개인 헬스 어시스턴트 채용·파트너십 확대 정황", url: "https://openai.com/news/" },
    { cat: "ai", name: "Anthropic Claude", unit: "Clinical · Wellness", valuation: "비공개", valAsof: "—", funding: "Enterprise", metric: "헬스 API 채택", value: "확대", metricAsof: "26.6", trend: +0, note: "클로드 기반 임상 문서화·코칭 워크로드 파일럿", url: "https://www.anthropic.com/news" },
    { cat: "ai", name: "Amazon Health", unit: "One Medical · Pharmacy", valuation: "$3.9B 인수", valAsof: "23.2", funding: "Public", metric: "One Medical 회원", value: "1M+", metricAsof: "25.12", trend: +12.5, note: "One Medical에 AI 트리아지 결합, 가상 진료 가속", url: "https://www.aboutamazon.com/news/health" },
    // Startups
    { cat: "startup", name: "MyFitnessPal", unit: "Cal AI 인수", valuation: "$1.5B", valAsof: "20.10", funding: "PE 보유", metric: "등록 사용자", value: "200M+", metricAsof: "26.5", trend: +5.3, note: "Cal AI 인수로 사진 기반 비전 칼로리 기록 전면 적용", url: "https://www.myfitnesspal.com/blog" },
    { cat: "startup", name: "Noom", unit: "Behavioral Weight", valuation: "$3.7B", valAsof: "21.5", funding: "Series F", metric: "유료 구독", value: "수백만", metricAsof: "25.12", trend: -3.4, note: "표준 다이어트 앱 둔화 속 GLP-1 원격의료로 전환", url: "https://www.noom.com/blog/" },
    { cat: "startup", name: "Snapcalorie", unit: "Photo Calorie AI", valuation: "Seed 단계", valAsof: "23.7", funding: "Seed $2M", metric: "추정 정확도", value: "업계최고", metricAsof: "26.6", trend: +0, note: "구글 출신 창업, 사진 한 장으로 칼로리 추정", url: "https://www.snapcalorie.com/" },
    { cat: "startup", name: "Calm", unit: "Sleep · Mental", valuation: "$2B", valAsof: "19.12", funding: "Series C", metric: "다운로드", value: "150M+", metricAsof: "25.12", trend: +1.9, note: "임상 검증 정신건강 서비스로 무게중심 이동", url: "https://www.calm.com/blog" },
    { cat: "startup", name: "Flo Health", unit: "Women's Health", valuation: "$1B+", valAsof: "24.7", funding: "Series C $200M", metric: "월 활성 사용자", value: "70M", metricAsof: "26.6", trend: +14.2, note: "유럽 femtech 유니콘, 美 갱년기 시장 진출", url: "https://flo.health/about-us/press" },
    { cat: "startup", name: "AllTrails", unit: "Outdoor Activity", valuation: "$1B+", valAsof: "23.3", funding: "PE", metric: "등록 사용자", value: "65M", metricAsof: "26.4", trend: +11.0, note: "6,500만 가입자 대상 AI 트레일 추천 출시", url: "https://www.alltrails.com/press" },
    { cat: "startup", name: "Peloton", unit: "Connected Fitness", valuation: "공개(상장)", valAsof: "26.5", funding: "Public", metric: "Connected 구독", value: "2.9M", metricAsof: "26.3", trend: -1.2, note: "구조조정 후 흑자 전환 시도, 콘텐츠 구독 강화", url: "https://www.onepeloton.com/press" },
    { cat: "startup", name: "Finch", unit: "Self-care Pet", valuation: "Series A", valAsof: "22.2", funding: "Series A", metric: "DAU 리텐션", value: "상위권", metricAsof: "26.5", trend: +7.5, note: "게이미피케이션 셀프케어로 Z세대 리텐션 강세", url: "https://finchcare.com/" },
    { cat: "startup", name: "Strava", unit: "Activity Social", valuation: "$1.5B", valAsof: "20.11", funding: "Series F", metric: "등록 사용자", value: "150M", metricAsof: "26.5", trend: +8.1, note: "활동 이력 기반 AI 코치 'Athlete Intelligence' 출시", url: "https://press.strava.com/" },
    { cat: "startup", name: "Ladder", unit: "Strength Coaching", valuation: "Series B", valAsof: "24.9", funding: "Series B", metric: "구독 성장", value: "고성장", metricAsof: "26.5", trend: +22.0, note: "근력 프로그램 구독 모델, 시리즈B 마감 임박", url: "https://www.joinladder.com/" },
  ];

  // ---- Articles (한국어 헤드라인 + 요약, 날짜별 누적) ----------------
  const ARTICLES = [
    // 2026-06-10 (오늘)
    { date: "2026-06-10", cat: "ai", source: "Bloomberg", title: "오픈AI, 소비자 헬스팀 조용히 확대… 핏빗 출신 임상 인력 영입", summary: "개인 헬스 어시스턴트 출시를 겨냥한 채용·파트너십 정황이 포착됐다.", tag: "Hiring", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-10", cat: "device", source: "The Verge", title: "오우라, 새 대사 플랫폼으로 링에서 연속 혈당 인사이트 제공", summary: "수면·심박을 넘어 메타볼릭 헬스로 스마트링 경쟁 영역을 확장한다.", tag: "Product", url: "https://www.theverge.com/health" },
    { date: "2026-06-10", cat: "startup", source: "TechCrunch", title: "마이피트니스팔, Cal AI 사진 칼로리 기록을 2억 사용자에 전면 적용", summary: "사진 한 장으로 식단을 기록하는 비전 AI를 기본 기능으로 통합했다.", tag: "Launch", url: "https://techcrunch.com/" },
    { date: "2026-06-10", cat: "device", source: "ZDNet Korea", title: "삼성헬스, 갤럭시 워치 신제품 앞두고 AI 코칭 대폭 강화", summary: "수면·운동 데이터 기반 개인화 코칭과 헬스 에이전트 기능을 예고했다.", tag: "Product", url: "https://www.zdnet.co.kr/" },

    // 2026-06-09
    { date: "2026-06-09", cat: "ai", source: "Reuters", title: "앤스로픽, 클로드 기반 임상 문서화 美 3개 병원과 파일럿", summary: "진료 기록 자동화·요약 워크로드를 규제 환경에서 실증한다.", tag: "Enterprise", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },
    { date: "2026-06-09", cat: "device", source: "CNBC", title: "Whoop 5.0, 심전도·혈압 인사이트로 FDA 승인 획득", summary: "소비자 웨어러블이 의료 등급 지표 영역으로 진입하는 신호탄.", tag: "Regulatory", url: "https://www.cnbc.com/health-and-science/" },
    { date: "2026-06-09", cat: "startup", source: "Axios", title: "눔, 표준 다이어트 앱 둔화 속 GLP-1 원격의료로 무게중심 이동", summary: "행동 변화 코칭과 비만 치료제 처방을 결합하는 모델로 전환 중.", tag: "Strategy", url: "https://www.axios.com/" },
    { date: "2026-06-09", cat: "startup", source: "매일경제", title: "국내 체중관리 앱, GLP-1 처방 연계 서비스 잇따라 출시", summary: "원격의료·약 배송과 결합한 디지털 체중관리 경쟁이 본격화됐다.", tag: "Market", url: "https://www.mk.co.kr/" },

    // 2026-06-08
    { date: "2026-06-08", cat: "ai", source: "WSJ", title: "아마존, One Medical에 AI 트리아지 결합… 가상 진료 속도 개선", summary: "증상 분류를 AI가 선처리해 의료진 연결 시간을 단축한다.", tag: "Product", url: "https://www.wsj.com/health" },
    { date: "2026-06-08", cat: "startup", source: "TechCrunch", title: "스냅칼로리, 사진 기반 칼로리 추정 고도화 위해 시리즈A 유치", summary: "구글 출신 창업팀이 이미지 인식 정확도를 핵심 경쟁력으로 내세운다.", tag: "Funding", url: "https://techcrunch.com/" },
    { date: "2026-06-08", cat: "device", source: "9to5Google", title: "핏빗, 픽셀 통합 심화… 독립 앱 시대 사실상 종료 신호", summary: "구글 생태계로의 흡수가 가속되며 별도 핏빗 경험이 축소된다.", tag: "Analysis", url: "https://9to5google.com/guides/fitbit/" },
    { date: "2026-06-08", cat: "ai", source: "전자신문", title: "빅테크 헬스 경쟁의 핵심은 'AI 헬스 에이전트' 레이어 장악", summary: "디바이스·앱 위에서 사용자를 조율하는 에이전트 주도권 싸움이 부상.", tag: "Analysis", url: "https://www.etnews.com/" },

    // 2026-06-06
    { date: "2026-06-06", cat: "startup", source: "Forbes", title: "플로 헬스, 월 7천만 사용자 돌파… 美 갱년기 시장 정조준", summary: "femtech 유니콘이 생애주기 전반으로 제품 범위를 넓힌다.", tag: "Growth", url: "https://www.forbes.com/health/" },
    { date: "2026-06-06", cat: "device", source: "DC Rainmaker", title: "가민, 프리미엄 멀티스포츠 라인업으로 웨어러블 시장 상회 성장", summary: "고가 스포츠워치 수요가 견조하며 피트니스 매출을 견인했다.", tag: "Market", url: "https://www.dcrainmaker.com/" },
    { date: "2026-06-06", cat: "startup", source: "The Information", title: "스트라바, 활동 이력 기반 AI 코치 'Athlete Intelligence' 출시", summary: "누적 운동 데이터를 해석해 개인화 훈련 인사이트를 제공한다.", tag: "Product", url: "https://www.theinformation.com/" },

    // 2026-06-05
    { date: "2026-06-05", cat: "ai", source: "STAT News", title: "파운데이션 모델 헬스 에이전트, 데모 넘어 규제 파일럿 단계로", summary: "데모 수준을 벗어나 임상·규제 환경에서의 실증이 시작됐다.", tag: "Trend", url: "https://www.statnews.com/" },
    { date: "2026-06-05", cat: "device", source: "Wareable", title: "애플 헬스, 워치·아이폰 전반에 AI 트렌드 요약 기능 추가", summary: "흩어진 건강 지표를 AI가 요약해 변화 추이를 제시한다.", tag: "Product", url: "https://www.wareable.com/" },
    { date: "2026-06-05", cat: "startup", source: "한국경제", title: "운동 앱들, AI 개인화 추천 경쟁 본격화", summary: "추천·코칭 품질이 구독 유지율을 가르는 핵심 변수로 떠올랐다.", tag: "Trend", url: "https://www.hankyung.com/" },

    // 2026-06-04
    { date: "2026-06-04", cat: "startup", source: "TechCrunch", title: "올트레일스, 6,500만 가입자 대상 AI 트레일 추천 출시", summary: "위치·난이도·날씨를 반영한 맞춤 트레일 추천을 선보였다.", tag: "Launch", url: "https://techcrunch.com/" },
    { date: "2026-06-04", cat: "ai", source: "CNBC", title: "구글·아마존·MS, 헬스 AI 인프라 투자 가속", summary: "클라우드·모델 사업자들이 헬스 데이터 워크로드 선점에 나섰다.", tag: "Analysis", url: "https://www.cnbc.com/health-and-science/" },
    { date: "2026-06-04", cat: "device", source: "ZDNet Korea", title: "스마트링 경쟁 격화… 삼성·오우라 3파전 본격화", summary: "반지형 웨어러블 시장이 빠르게 커지며 신규 진입이 잇따른다.", tag: "Market", url: "https://www.zdnet.co.kr/" },

    // 2026-06-03
    { date: "2026-06-03", cat: "device", source: "Bloomberg", title: "오우라, 52억 달러 밸류에이션에 투자 유치… 스마트링 경쟁 가열", summary: "대규모 투자로 대사·여성건강 등 신규 지표 확장에 속도를 낸다.", tag: "Funding", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-03", cat: "startup", source: "Axios", title: "캄·헤드스페이스, 임상 검증 정신건강 서비스로 전환", summary: "명상 앱들이 근거 기반 디지털 치료제 영역으로 이동하고 있다.", tag: "Strategy", url: "https://www.axios.com/" },
    { date: "2026-06-03", cat: "ai", source: "Reuters", title: "2분기 AI 네이티브 헬스 스타트업에 사상 최대 자본 유입", summary: "AI 우선 헬스 기업이 디바이스 스타트업 대비 2배 자금을 끌어모았다.", tag: "Funding", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },

    // 2026-06-02
    { date: "2026-06-02", cat: "ai", source: "The Verge", title: "삼성헬스, 차기 갤럭시 워치 앞두고 AI 코칭 확장", summary: "온디바이스 AI를 활용한 실시간 코칭 강화가 예고됐다.", tag: "Product", url: "https://www.theverge.com/health" },
    { date: "2026-06-02", cat: "startup", source: "매일경제", title: "펠로톤, 구조조정 후 흑자 전환 시도… 콘텐츠 구독 강화", summary: "하드웨어 의존을 낮추고 구독·앱 매출 비중을 끌어올린다.", tag: "Earnings", url: "https://www.mk.co.kr/" },
    { date: "2026-06-02", cat: "device", source: "CNBC", title: "웨어러블 RPM(원격환자모니터링) 시장, 연 14.7% 성장 전망", summary: "만성질환 관리 수요로 웨어러블 기반 원격 모니터링이 확대된다.", tag: "Market", url: "https://www.cnbc.com/health-and-science/" },

    // 2026-05-30
    { date: "2026-05-30", cat: "ai", source: "J.P. Morgan", title: "GLP-1 + 디지털 코칭, 새로운 체중관리 스택으로 부상", summary: "비만 치료제와 행동 코칭의 결합이 시장 표준으로 자리잡고 있다.", tag: "Report", url: "https://www.jpmorgan.com/insights" },
    { date: "2026-05-30", cat: "startup", source: "TechCrunch", title: "핀치, 게이미피케이션 셀프케어로 Z세대 리텐션 1위", summary: "정서 관리 루틴을 게임처럼 설계해 높은 재방문율을 기록했다.", tag: "Growth", url: "https://techcrunch.com/" },
    { date: "2026-05-30", cat: "device", source: "Garmin Newsroom", title: "가민, 피트니스 매출 18억 달러… 전년비 9.4% 성장", summary: "프리미엄 라인 호조로 피트니스 부문 견조한 성장세를 이어갔다.", tag: "Earnings", url: "https://www.garmin.com/en-US/newsroom/" },

    // 2026-05-28
    { date: "2026-05-28", cat: "startup", source: "Forbes", title: "GLP-1 시대, 다이어트 앱 비즈니스 모델 재편 가속", summary: "단순 칼로리 추적에서 치료제 연계·코칭으로 가치사슬이 이동한다.", tag: "Analysis", url: "https://www.forbes.com/health/" },
    { date: "2026-05-28", cat: "ai", source: "ZDNet Korea", title: "국내 병원, 생성형 AI 임상 문서화 도입 확대", summary: "진료 요약·기록 자동화로 의료진 업무 부담을 줄이려는 시도가 늘었다.", tag: "Enterprise", url: "https://www.zdnet.co.kr/" },
    { date: "2026-05-28", cat: "device", source: "Wareable", title: "Whoop, 구독 ARPU 상승… 의료 등급 지표로 차별화", summary: "회복·수면 분석에 의료 등급 데이터를 더해 객단가를 높였다.", tag: "Product", url: "https://www.wareable.com/" },

    // 2026-05-27
    { date: "2026-05-27", cat: "startup", source: "매일경제", title: "래더, 근력 코칭 구독 고성장… 시리즈B 마감 임박", summary: "근력 운동 프로그램 구독 모델이 빠르게 가입자를 늘리고 있다.", tag: "Funding", url: "https://www.mk.co.kr/" },
    { date: "2026-05-27", cat: "ai", source: "Bloomberg", title: "오픈AI, 헬스 데이터 파트너십 확대 모색", summary: "양질의 헬스 데이터 확보를 위한 제휴 전략이 거론된다.", tag: "Strategy", url: "https://www.bloomberg.com/technology" },
    { date: "2026-05-27", cat: "startup", source: "TechCrunch", title: "MZ세대 칼로리 관리, 사진 한 장으로… 비전 AI 경쟁 가열", summary: "촬영만으로 식단을 기록하는 비전 AI 앱들이 빠르게 늘고 있다.", tag: "Trend", url: "https://techcrunch.com/" },

    // 2026-05-26
    { date: "2026-05-26", cat: "device", source: "한국경제", title: "애플워치, 헬스 생태계 락인으로 2억 사용자 유지", summary: "기기·서비스 통합으로 강력한 사용자 고착 효과를 이어가고 있다.", tag: "Market", url: "https://www.hankyung.com/" },
    { date: "2026-05-26", cat: "startup", source: "Axios", title: "존재감 키우는 femtech… 플로·클루 글로벌 확장", summary: "여성건강 앱들이 데이터·규제 신뢰를 앞세워 시장을 넓힌다.", tag: "Growth", url: "https://www.axios.com/" },
    { date: "2026-05-26", cat: "ai", source: "Reuters", title: "헬스 AI 규제 가이드라인, 美·EU 동시 정비 착수", summary: "안전성·책임 소재를 둘러싼 규제 프레임워크 정비가 시작됐다.", tag: "Regulatory", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },
  ];

  // ---- Analyst & market reports ----------------------------------
  const REPORTS = [
    { house: "Morgan Stanley", type: "Securities", date: "2026-06-09", title: "Digital Health 2026: AI 에이전트가 웨어러블 해자를 재편한다", figure: "TAM $660B (2030E)", rating: "Overweight", url: "https://www.morganstanley.com/ideas" },
    { house: "Goldman Sachs", type: "Securities", date: "2026-06-06", title: "웨어러블 & RPM — 프리미엄 하드웨어 vs. AI 소프트웨어 마진", figure: "웨어러블 CAGR 14.7%", rating: "Neutral", url: "https://www.goldmansachs.com/insights" },
    { house: "CB Insights", type: "Market", date: "2026-06-05", title: "State of Digital Health Q2'26 — 펀딩·엑시트 동향", figure: "Q2 $8.2B 조달", rating: "Report", url: "https://www.cbinsights.com/research/" },
    { house: "Rock Health", type: "Market", date: "2026-06-04", title: "AI 네이티브 헬스 펀딩, 디바이스 스타트업의 2배", figure: "딜 62% AI 주도", rating: "Report", url: "https://rockhealth.com/insights/" },
    { house: "Grand View Research", type: "Market", date: "2026-06-02", title: "mHealth 앱 시장 — 체중·피트니스 버티컬 전망", figure: "$32B (2028E)", rating: "Report", url: "https://www.grandviewresearch.com/" },
    { house: "J.P. Morgan", type: "Securities", date: "2026-05-30", title: "GLP-1 + 디지털 코칭: 새로운 체중관리 스택", figure: "참여도 +38% YoY", rating: "Overweight", url: "https://www.jpmorgan.com/insights" },
    { house: "삼성증권", type: "Securities", date: "2026-05-28", title: "디지털 헬스케어 — 국내외 플랫폼 경쟁 구도 점검", figure: "국내 시장 +21% YoY", rating: "Buy", url: "https://www.samsungpop.com/" },
    { house: "한국투자증권", type: "Securities", date: "2026-05-26", title: "웨어러블·femtech 밸류체인과 투자 포인트", figure: "femtech CAGR 16%", rating: "Buy", url: "https://www.truefriend.com/" },
  ];

  // ---- Chart data -------------------------------------------------
  const MARKET_GROWTH = [
    { year: "2021", size: 211, growth: 14 },
    { year: "2022", size: 245, growth: 16 },
    { year: "2023", size: 288, growth: 18 },
    { year: "2024", size: 340, growth: 18 },
    { year: "2025", size: 405, growth: 19 },
    { year: "2026E", size: 486, growth: 20 },
    { year: "2027E", size: 583, growth: 20 },
  ];

  const FUNDING = [
    { name: "Oura", value: 5.2, cat: "device" },
    { name: "Noom", value: 3.7, cat: "startup" },
    { name: "Whoop", value: 3.6, cat: "device" },
    { name: "Fitbit", value: 2.1, cat: "device" },
    { name: "Calm", value: 2.0, cat: "startup" },
    { name: "Strava", value: 1.5, cat: "startup" },
    { name: "MyFitnessPal", value: 1.5, cat: "startup" },
    { name: "Flo", value: 1.0, cat: "startup" },
  ];

  const SHARE = [
    { cat: "device", label: "디바이스 헬스", value: 34 },
    { cat: "ai", label: "AI 네이티브", value: 38 },
    { cat: "startup", label: "체중·피트니스", value: 28 },
  ];

  const USERS = [
    { name: "Apple Health", value: 210, cat: "device" },
    { name: "MyFitnessPal", value: 200, cat: "startup" },
    { name: "Strava", value: 150, cat: "startup" },
    { name: "Calm", value: 150, cat: "startup" },
    { name: "Flo", value: 70, cat: "startup" },
    { name: "AllTrails", value: 65, cat: "startup" },
    { name: "Fitbit", value: 38, cat: "device" },
  ];

  // ---- KPI strip --------------------------------------------------
  const KPIS = [
    { label: "디지털 헬스 시장 (2026E)", value: "$486B", delta: +20.0, sub: "YoY 성장률", fill: 0.74 },
    { label: "Q2 글로벌 펀딩", value: "$8.2B", delta: +12.4, sub: "전분기 대비", fill: 0.62 },
    { label: "AI-네이티브 딜 비중", value: "62%", delta: +9.0, sub: "디바이스 대비 2:1", fill: 0.62 },
    { label: "웨어러블 CAGR", value: "14.7%", delta: +1.3, sub: "2026–2030", fill: 0.74 },
    { label: "추적 기업 수", value: "18", delta: 0, sub: "3개 카테고리", fill: 0.9 },
    { label: "신규 기사 (오늘)", value: "4", delta: +33.0, sub: "전일 대비", fill: 0.67 },
  ];

  window.DASH = { CATEGORIES, COMPANIES, ARTICLES, REPORTS, MARKET_GROWTH, FUNDING, SHARE, USERS, KPIS };
})();
