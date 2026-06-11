/* ============================================================
   Health Intelligence Dashboard (2026.06.11)
   영문 권위 소스만 사용 · 플레인 텍스트 복사 가능 sources 배열
   ============================================================ */
(function () {
  "use strict";

  const CATEGORIES = [
    { id: "device", ko: "디바이스 헬스", en: "Device-based Health", accent: "#1428A0", accentSoft: "#E8ECFA", desc: "웨어러블·링·밴드 기반 생체 데이터 플랫폼" },
    { id: "ai", ko: "AI 네이티브 헬스", en: "AI Native Health", accent: "#7A38D6", accentSoft: "#F0E9FB", desc: "파운데이션 모델 기반 헬스 에이전트·코칭" },
    { id: "startup", ko: "체중·피트니스 스타트업", en: "Weight & Fitness Startups", accent: "#0E8F6E", accentSoft: "#E2F4EE", desc: "칼로리·체중관리·운동추천 버티컬" },
  ];

  /* ---- Companies (VP/방향성 · 출처 플레인텍스트) ---- */
  const COMPANIES = [
    // ── Device ──
    { cat: "device", name: "Apple", domain: "apple.com", unit: "Health · Watch S11", valuation: "~$3.5T 시총", valAsof: "26.6", funding: "Public", metric: "Watch 판매", value: "33M/yr", metricAsof: "25 IDC", trend: +4.2,
      note: "Watch Series 11 · 고혈압 알림(Series 9/10/11 및 Ultra 2/3 지원)+수면 점수 신규 · ECG/AFib FDA clearance · 연 3,300만대(IDC 2025) · Apple Intelligence 헬스 확장",
      vp: "하드웨어·소프트웨어·서비스 수직 통합으로 의료 등급 건강 데이터를 일상 속에 — FDA-cleared 기능을 보유한 대표 소비자 웨어러블",
      direction: "예방 의학 플랫폼으로 진화 · 고혈압 알림(Series 9+ 및 Ultra 2+) 등 조기 경고 기능 확대 · Apple Intelligence 기반 건강 데이터 AI 요약 · 생태계 락인 심화",
      url: "https://www.apple.com/newsroom/",
      sources: [
        "IDC / Fortunly — 2025 — https://fortunly.com/statistics/apple-watch-statistics/",
        "Apple Newsroom — 2025-09 — https://www.apple.com/newsroom/2025/09/apple-debuts-apple-watch-series-11-featuring-groundbreaking-health-insights/",
      ] },

    { cat: "device", name: "Fitbit Air", domain: "fitbit.com", unit: "Screenless Band", valuation: "Google 자회사", valAsof: "26.5", funding: "Public", metric: "가격", value: "$99.99", metricAsof: "26.5 출시", trend: +0,
      note: "2026.05 출시 · 12g(밴드 포함 · 본체 5.2g) · 스크린리스 · GPS 미탑재(스마트폰 연동) · 7일 배터리 · AFib 감지 · SpO2·HRV·피부온도 · Gemini Premium($9.99/월) AI 인사이트 별도 · Google Health 앱 전환 · Whoop 직접 경쟁",
      vp: "구독 없는 $99.99 일회성 가격으로 스크린리스 트래킹의 진입 장벽 최소화 — Whoop 구독 모델의 정반대 포지셔닝",
      direction: "Google Health 생태계 통합 허브 · Gemini 기반 AI 헬스 인사이트 · 대중 시장(mass market) 웨어러블 보급 가속",
      url: "https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/",
      sources: [
        "Google 공식 블로그 — 2026-05-07 — https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/",
        "9to5Google — 2026-05-07 — https://9to5google.com/",
        "Android Central — 2026-05 — https://www.androidcentral.com/wearables/fitbit/google-fitbit-air-launch-specs-price",
      ] },

    { cat: "device", name: "Garmin", domain: "garmin.com", unit: "Fitness · Outdoor", valuation: "$33B+ 시총", valAsof: "26.6", funding: "Public", metric: "피트니스 매출(FY)", value: "$2.36B", metricAsof: "FY25 확정", trend: +33, trendBasis: "피트니스 세그먼트 매출 YoY",
      note: "FY2025 피트니스 세그먼트 $2.36B 확정 · +33% YoY · FY2026E 전사 매출 가이던스 $7.9B · Connect+ 구독 $6.99/월(선택) · CIRQA 스크린리스 밴드 $509(소매)/$454(프리오더, 리크) · 프리미엄 멀티스포츠 강세",
      vp: "프리미엄 멀티스포츠 특화 — 최장 배터리·내구성·정밀 GPS로 진지한 운동인(serious athlete) 시장 독점적 지위",
      direction: "공식 미발표 · 리크 기준 CIRQA $509 스크린리스 밴드로 회복·웰니스 시장 진입 · 기본 무료 + Connect+ $6.99/월 선택적 구독 모델 · 아웃도어·마린 동반 성장",
      url: "https://www.garmin.com/en-US/newsroom/",
      sources: [
        "Garmin PR Newswire — 2026-02-18 — https://www.prnewswire.com/",
        "the5krunner — Garmin CIRQA — 2026-05-20 — https://the5krunner.com/2026/05/20/garmin-cirqa-connect/",
        "Notebookcheck — CIRQA $509/$454 — 2026-05 — https://www.notebookcheck.net/",
        "TechRadar — CIRQA — 2026-05 — https://www.techradar.com/health-fitness/smartwatches/garmins-cashing-in-on-the-screenless-whoop-style-smart-band-trend-with-its-upcoming-cirqa-heres-the-proof",
      ] },

    { cat: "device", name: "Oura", domain: "ouraring.com", unit: "Smart Ring", valuation: "$11B", valAsof: "25.10 Series E", funding: "Series E $900M", metric: "매출 전망", value: "$2B(26E)", metricAsof: "26E 전망", trend: +100.0, trendBasis: "매출 YoY (2025 ~$1B → 2026E $2B)",
      note: "Series E $9억 조달 밸류 $11B(CNBC 2025.10) · IPO S-1 비밀 제출(2026.05.21) · Ring 5 출시(2026.06.04): Ring 4 대비 40% 소형화 · $399~ · 최대 9일 배터리 · GLP-1 tracking · Health Radar · 유럽 헬스테크 최초 데카콘 · 스마트링 점유율 74%(2025 H1 Omdia) · 2025 매출 ~$1B · 2026 매출 $2B 전망",
      vp: "반지 폼팩터로 수면·회복 데이터 업계 최고 정확도 — 화면·알림 없는 '조용한 웨어러블'로 24/7 착용률 극대화",
      direction: "IPO 상장 추진 · 대사(혈당)·여성 건강 지표 확장 · 자체 AI 모델 개발 · B2B 기업 웰니스 및 방위 분야 진출",
      url: "https://ouraring.com/blog",
      sources: [
        "CNBC — 2025-10-14 — https://www.cnbc.com/2025/10/14/oura-ringmaker-valuation-fundraise.html",
        "TechCrunch — 2025-10-14 — https://techcrunch.com/2025/10/14/smart-ring-maker-oura-raises-900m-from-fidelity/",
        "CNBC IPO 제출 — 2026-05-21 — https://www.cnbc.com/2026/05/21/oura-smart-ring-ipo-filing.html",
        "TechCrunch S-1 — 2026-05-22 — https://techcrunch.com/2026/05/22/oura-ipo-s1-filing/",
      ] },

    { cat: "device", name: "Whoop", domain: "whoop.com", unit: "Recovery Band", valuation: "$10.1B", valAsof: "26.3 Series G", funding: "Series G $575M", metric: "북킹스 런레이트", value: "$1.1B+", metricAsof: "26.3", trend: +103, trendBasis: "북킹스 런레이트 YoY (CEO 발언)",
      note: "Series G $5.75억 조달 밸류 $10.1B 데카콘(TechCrunch 2026.03) · 북킹스 런레이트 $11억+(YoY +103% — CEO Will Ahmed 발언) · 2.5M 멤버(60개국) · 600명 채용 계획 · Whoop Labs Doha · Whoop MG ECG FDA clearance 획득(2025.05) · 혈압 트렌드 = wellness 용도(FDA 의료기기 미승인) · 3티어 구독: $199~$359/yr (One·Peak·Life) · IPO: CEO '향후 2년 내 가능' 발언(S-1 미제출)",
      vp: "기기 무료 + 구독 모델로 '회복 코칭 서비스'를 판매 — 하드웨어가 아닌 데이터 해석과 행동 변화가 상품",
      direction: "헬스스팬(healthspan·건강수명) 플랫폼으로 확장 · Advanced Labs 혈액검사 통합 · Abbott·Mayo Clinic 투자 유치로 임상 신뢰 확보",
      url: "https://www.whoop.com/thelocker/",
      sources: [
        "TechCrunch — 2026-03-31 — https://techcrunch.com/2026/03/31/whoop-valuation-10b-series-g-fundraise/",
        "Ventureburn — 2026-04 — https://ventureburn.com/whoop-raises-575m-at-10-1b-to-expand-healthspan-tech/",
        "Inc. — 2026-04 — https://www.inc.com/ali-donaldson/fresh-off-its-viral-turn-at-the-australian-open-whoop-scores-a-10-billion-valuation/91324137",
      ] },

    // ── AI Native ──
    { cat: "ai", name: "OpenAI", domain: "openai.com", unit: "Consumer/Enterprise AI Platform", valuation: "$300B~$340B+", valAsof: "26.6 S-1 제출", funding: "내부 투자", metric: "IPO", value: "S-1 비밀 제출", metricAsof: "26.6", trend: +0,
      note: "S-1 비밀 제출(2026.06.08) · $300B~$340B+ 보도(Bloomberg) · 헬스케어 전용 사업부가 아닌 범용 AI 플랫폼의 헬스케어 적용 · 개인 건강 데이터 통합 해석 가능성 · 의료기관 파트너십 탐색",
      vp: "범용 LLM의 추론 능력을 개인 건강 데이터에 연결 — 헬스케어 전용 제품이 아닌 범용 AI 플랫폼의 헬스 적용 사례",
      direction: "의료기관·보험사 데이터 파트너십 확보 · HIPAA 준수 파이프라인 구축 · 헬스 유즈케이스 소비자 접점 탐색",
      url: "https://openai.com/news/",
      sources: [
        "Bloomberg — 2026-06 — https://www.bloomberg.com/technology",
      ] },

    { cat: "ai", name: "Anthropic Claude", domain: "anthropic.com", unit: "Clinical · Wellness", valuation: "$61B+", valAsof: "25.03 (확인 가능 최근 공식 수치)", funding: "Enterprise", metric: "헬스 API 채택", value: "확대", metricAsof: "26.6", trend: +0,
      note: "2025.03 Series E $61B(확인 가능 최근 공식 수치) · 2026년 추가 라운드 가능성 보도 있으나 공식 미확인 · Bloomberg/Forbes $100B+ 추정(비공식) · 임상 문서화 파일럿 확대 · 구체 병원 수 공식 미확인",
      vp: "안전성·신뢰성 우선(safety-first) 설계로 임상 문서화 등 고위험 의료 워크로드에 특화 — 환각 최소화가 핵심 차별점",
      direction: "엔터프라이즈 의료 워크플로 침투 · 임상 문서 자동화 파일럿 확대 · 의료 AI 안전성 프레임워크 표준화 주도",
      url: "https://www.anthropic.com/news",
      sources: [
        "Anthropic 공식 — 2025-03 — https://www.anthropic.com/news",
      ] },

    { cat: "ai", name: "Amazon Health", domain: "amazon.com", unit: "One Medical · Pharmacy", valuation: "$3.9B 인수", valAsof: "23.2", funding: "Public", metric: "One Medical 회원", value: "1M+", metricAsof: "25.12", trend: +12.5,
      note: "AI 트리아지 + Amazon Pharmacy 통합 · Alexa+ 의료 기능 출시 · 가상 진료 속도 개선",
      vp: "진료(One Medical)–약국(Pharmacy)–배송 풀스택 통합 — 의료를 커머스처럼 빠르고 예측 가능하게",
      direction: "AI 트리아지로 1차 진료 병목 해소 · Alexa+ 음성 의료 인터페이스 · Prime 구독과 의료 서비스 번들링",
      url: "https://www.aboutamazon.com/news/health",
      sources: [
        "Amazon 공식 — 2023-02 — https://www.aboutamazon.com/news/health",
      ] },

    { cat: "ai", name: "Google DeepMind", domain: "deepmind.google", unit: "MedGemini · MedPaLM", valuation: "Google 자회사", valAsof: "26.6", funding: "Public", metric: "의료 AI 모델", value: "MedGemini", metricAsof: "26.6", trend: +0,
      note: "MedGemini 의료 멀티모달 추론 · MedPaLM 2 USMLE 전문의 수준 · Fitbit Air+MedGemini 수직 통합 — 데이터(디바이스)→추론(AI) 유일한 양축 보유 플레이어",
      vp: "Fitbit 웨어러블 데이터 + MedGemini 의료 추론을 결합한 수직 통합 — Apple과 대조되는 개방형 생태계 접근",
      direction: "MedGemini → 임상 의사결정 지원 · Fitbit 데이터 파이프라인 통합 · Gemini 기반 소비자 건강 인사이트 자동화",
      url: "https://deepmind.google/discover/blog/",
      sources: [
        "Google DeepMind Blog — 2026 — https://deepmind.google/discover/blog/",
        "Nature — MedPaLM 2 — 2023 — https://www.nature.com/articles/s41586-023-06291-2",
      ] },

    { cat: "ai", name: "eMed", domain: "emed.com", unit: "GLP-1 원격의료 AI", valuation: "$2B+", valAsof: "26 Q1 Series A", funding: "Series A $200M", metric: "밸류에이션", value: "$2B+", metricAsof: "26 Q1", trend: +0, trendBasis: "신규 진입",
      note: "Series A $200M, $2B+ 밸류 · GLP-1 원격의료 플랫폼에 agentic AI 적용 · Rock Health Q1'26 메가딜 포함",
      vp: "GLP-1 원격의료에 AI 에이전트를 결합한 신규 모델 — 처방·코칭·모니터링 자동화",
      direction: "GLP-1 원격 처방 AI 자동화 · 대규모 확장 · agentic AI 헬스케어 적용 선도",
      url: "https://www.emed.com/",
      sources: [
        "Rock Health Q1 2026 Funding Report — 2026-04-06 — https://rockhealth.com/insights/q1-2026-funding-overview-capital-continues-concentrating-and-four-other-market-signals/",
      ] },

    // ── Startups ──
    { cat: "startup", name: "MyFitnessPal", domain: "myfitnesspal.com", unit: "AI 영양 플랫폼", valuation: "$1B+ (매각 검토)", valAsof: "26.4 Reuters", funding: "PE 보유", metric: "등록 사용자", value: "280M+", metricAsof: "26.4 Reuters", trend: +5.3,
      note: "Reuters 2026.04 매각 검토 보도 · 밸류 $1B+ · EBITDA ~$150M/yr · 120개국 280M+ members · AI Coach 출시(2026.06.10): 20년치 로그 기반 개인화 영양 코칭(US/UK/CA/AU/NZ Premium 전용) · 2026.03 Cal AI 인수 발표(딜 체결 2025.12 · Cal AI ARR $30M) · 2026.02 Winter Release: Meal Scan Photo Upload(iOS)·Meal Planner·Instacart 연동 · 2026.01 ChatGPT Health 최초 영양 앱 연동(OpenAI 800M 주간 사용자 접점) · Premium $24.99/월 또는 $99.99/yr",
      vp: "세계 최대 음식 데이터베이스 + AI Coach(20년 로그 기반 개인화) + 사진 AI 칼로리로 '수동 입력 시대 종결'",
      direction: "Cal AI 인수 + ChatGPT Health 연동 + AI Coach 출시 → AI 영양 플랫폼 3단계 전환 완료 · 매각 검토 $1B+(Reuters) — AI 프리미엄 밸류 극대화 후 Exit 전략",
      url: "https://www.myfitnesspal.com/blog",
      sources: [
        "GlobeNewsWire — 2026-03-01 — https://www.globenewswire.com/news-release/2026/03/02/3247439/0/en/MyFitnessPal-Acquires-Cal-AI.html",
        "TechCrunch — 2026-03-02 — https://techcrunch.com/2026/03/02/myfitnesspal-has-acquired-cal-ai-the-viral-calorie-app-built-by-teens/",
        "Instagram @dpjmcgregor — Cal AI ARR $30M — https://www.instagram.com/dpjmcgregor/",
      ] },

    { cat: "startup", name: "Noom", domain: "noom.com", unit: "행동+GLP-1+약국 B2B", valuation: "피크 $3.7B", valAsof: "21.5 Series F", funding: "Series F", metric: "추정 매출", value: "$200~500M", metricAsof: "Similarweb 25.09 추정", trend: -3.4,
      note: "구독 앱→'행동+GLP-1+약국 수직통합' B2B 헬스케어 기업 피벗 완료 · 503A 약국 인수(Tailor Made Compounding, 2026.04) → 자체 처방·조제 수직통합 · SmartRx: 고용주 GLP-1 비용 80% 절감 확인(연 $6.2M→$1.3M, 2026.04 GlobeNewsWire) · 바이오마커 테스트 키트 출시(2026.05) · 최대 규모 RCT(n=427): 68주 총 -4.1% 체중감소(2026.06 Noom 공식) · GLP-1 참여도 보고서: 앱 최고 참여 회원 25.2% 추가 감량(2026.02 Yahoo Finance) · 매출 $200~500M 범위(Similarweb 2025.09 추정)",
      vp: "심리학(CBT) 기반 행동 변화 + GLP-1 원격 처방 + 자체 약국(503A) 수직통합 — 전통 PBM 완전 우회 모델",
      direction: "SmartRx가 PBM(약국 혜택 관리자) 우회 → 보험사·PBM 파괴적 혁신 가능성 · RCT 임상(약 없이 행동변화만으로 1년 후 체중 감소 지속) → GLP-1 보조 프로그램 근거 강화 · B2B(고용주·보험) 채널 전환 가속",
      url: "https://www.noom.com/blog/",
      sources: [
        "Forbes — 2021-05 — https://www.forbes.com/",
      ] },

    { cat: "startup", name: "Calm", domain: "calm.com", unit: "Sleep · Mental", valuation: "피크 $2B", valAsof: "19.12", funding: "Series C", metric: "다운로드 추이", value: "-61%", metricAsof: "18→24 Statista", trend: -8.0,
      note: "다운로드 하락세(-61%, 2018→2024 Statista) · 임상 검증 정신건강 + B2B 기업복지 전환 · ARPU 방어 전략",
      vp: "프리미엄 콘텐츠(셀럽 내레이션·음악)로 명상·수면을 라이프스타일 상품화한 선구자",
      direction: "소비자 명상 앱 → 임상 검증 디지털 치료제(DTx) · B2B 기업복지·보험 연계로 수익원 전환",
      url: "https://www.calm.com/blog",
      sources: [
        "Statista — 2024 — https://www.statista.com/",
      ] },

    { cat: "startup", name: "Flo Health", domain: "flo.health", unit: "Women's Health", valuation: "$1B+", valAsof: "24.7", funding: "Series C $200M", metric: "월 활성 사용자", value: "77M", metricAsof: "26.3 NetNewsLedger", trend: +14.2,
      note: "MAU 7,700만(NetNewsLedger 2026.03) · Google Play 헬스앱 다운로드 글로벌 2위 · 갱년기 시장 확장",
      vp: "월경 추적을 넘어 여성 생애주기 전반(가임기→임신→갱년기)의 건강 동반자 — 익명 모드 등 데이터 프라이버시 신뢰가 해자",
      direction: "갱년기(menopause) 시장 본격 확장 · 의료진 감수 콘텐츠로 신뢰 강화 · femtech 카테고리 리더십 공고화",
      url: "https://flo.health/about-us/press",
      sources: [
        "NetNewsLedger — 2026-03-17 — https://www.netnewsledger.com/",
      ] },

    { cat: "startup", name: "AllTrails", domain: "alltrails.com", unit: "Outdoor Activity", valuation: "$1B+", valAsof: "23.3", funding: "PE", metric: "등록 사용자", value: "65M", metricAsof: "26.4", trend: +11.0,
      note: "AI 트레일 추천 출시 · 아웃도어 앱 최고 성장률 · 위치·난이도·날씨 반영 맞춤 추천",
      vp: "전 세계 트레일 데이터베이스 + 커뮤니티 리뷰로 아웃도어 활동의 발견·계획·내비게이션을 원스톱화",
      direction: "AI 개인화 추천(위치·난이도·날씨) · 안전 경고·혼잡도 실시간화 · 아웃도어 액티비티 슈퍼앱 지향",
      url: "https://www.alltrails.com/press",
      sources: [
        "AllTrails 공식 — 2026-04 — https://www.alltrails.com/press",
      ] },

    { cat: "startup", name: "Peloton", domain: "onepeloton.com", unit: "Connected Fitness", valuation: "~$2B+ 시총", valAsof: "26.5", funding: "Public", metric: "Connected 구독", value: "~2.7M", metricAsof: "Q3 FY26 IR", trend: -7.6, trendBasis: "paid subscriptions YoY",
      note: "Q3 FY2026 매출 $631M(+1% YoY) · GAAP 순이익 $26.4M 흑자 전환 · paid subscriptions ~2.7M(-7.6% YoY) · EBITDA +41% · FCF +59% · 월 이탈률 1.2% · Spotify 파트너십 1,400+ 클래스(2026.04) · CCO Sarah Robb O'Hagan 영입(2026.04) · FY 가이던스 $2.42~2.44B",
      vp: "하드웨어+라이브 콘텐츠+커뮤니티 결합 몰입형 홈 피트니스 — 인스트럭터가 곧 브랜드",
      direction: "수익성 회복(EBITDA +41%, FCF +59%) vs 가입자 감소(-7.6% YoY) 역설 구조 · Spotify 파트너십·콘텐츠 확장으로 이탈 방어 · CBU 재통합 · 2026 하반기 Commercial Series 출하",
      url: "https://www.onepeloton.com/press",
      sources: [
        "Peloton IR Q3 FY2026 — 2026-05-07 — https://investor.onepeloton.com/",
        "CNBC — 2026-05-07 — https://www.cnbc.com/2026/05/07/peloton-pton-earnings-q3-2026.html",
      ] },

    { cat: "startup", name: "Hims & Hers", domain: "forhims.com", unit: "D2C 텔레헬스", valuation: "~$4B+ 시총", valAsof: "26.5", funding: "Public", metric: "FY2025 매출", value: "$2.35B", metricAsof: "26.2 IR", trend: +59, trendBasis: "FY2025 매출 YoY",
      note: "FY2025 매출 $2.35B(+59% YoY) · 구독자 2.511M(+13%) · 조정 EBITDA $318M · Q1 2026 매출 $608M(+4% YoY) · FY2026E 가이던스 $2.8~3.0B · 2030 매출 목표 $6.5B · FDA compound GLP-1 성분 제한(2026.02)으로 compound semaglutide 중단 → Novo Nordisk Wegovy 공식 텔레헬스 파트너 전환 · Q1 GLP-1 헤드윈드 $65M · HHS 법무부 수사 의뢰(2026.02) · Novo Nordisk 소송(2026.02) · 탈모·ED·멘탈헬스 다각화 가속",
      vp: "D2C 텔레헬스 + 구독 처방 모델로 GLP-1·탈모·ED·멘탈헬스 전 영역 접근성 혁신 — 전통 의료 채널 우회",
      direction: "compound GLP-1 규제 충격 후 Novo Nordisk 공식 파트너 전환 · GLP-1 외 탈모·ED·멘탈헬스 다각화로 리스크 분산 · 2030 $6.5B 매출 목표",
      url: "https://www.forhims.com/",
      sources: [
        "Subscription Insider — 2026-02-23 — https://www.subscriptioninsider.com/",
        "Morningstar — 2026-05-10 — https://www.morningstar.com/",
        "Seeking Alpha — 2026-05-12 — https://seekingalpha.com/",
        "Fierce Healthcare — 2025-05-04 — https://www.fiercehealthcare.com/",
      ] },

    { cat: "startup", name: "Strava", domain: "strava.com", unit: "Activity Social", valuation: "$2.2B+", valAsof: "25.5 Series G", funding: "Series G", metric: "등록 사용자", value: "150M+", metricAsof: "26.5", trend: +8.1,
      note: "IPO 준비·주관사 선정 보도(S-1 제출은 미확인) · ARR ~$500M · 리텐션 80~90% · AI 코치 'Athlete Intelligence' 출시",
      vp: "운동 데이터의 소셜 네트워크 — 기록 자체보다 '공유와 경쟁'이 만드는 네트워크 효과가 핵심 자산",
      direction: "IPO 준비 보도(S-1 제출 미확인, 2026.04 기준) — 시장 변동성으로 타이밍 대기 중(Rock Health Q1'26) · Athlete Intelligence AI 코칭 수익화 · Gen Z 런클럽 트렌드 흡수",
      url: "https://press.strava.com/",
      sources: [
        "the5krunner — 2026-01-09 — https://the5krunner.com/2026/01/09/strava-ipo-filing-3-billion-valuation-analysis/",
        "premieralts — 밸류 $2.2B — https://www.premieralts.com/companies/strava/valuation",
      ] },

    { cat: "startup", name: "Finch", domain: "finchcare.com", unit: "Self-care Pet", valuation: "Series A", valAsof: "22.2", funding: "Series A", metric: "DAU 리텐션", value: "상위권", metricAsof: "26.5", trend: +7.5,
      note: "Gen Z 셀프케어 앱 최고 리텐션 · 게이미피케이션 + 정신건강",
      vp: "가상 펫을 돌보며 자신을 돌보는 게이미피케이션 셀프케어 — 죄책감 없는(guilt-free) 정신건강 루틴",
      direction: "Gen Z 정신건강 리텐션 1위 유지 · 정서 일기·루틴 게임화 심화 · 커뮤니티 기능 확장",
      url: "https://finchcare.com/",
      sources: [
        "Crunchbase — 2022 — https://www.crunchbase.com/",
      ] },

    { cat: "device", name: "Ultrahuman Ring", domain: "ultrahuman.com", unit: "Smart Ring · CGM", valuation: "$1B+ 추정", valAsof: "26.6", funding: "Series D", metric: "누적 판매", value: "비공개", metricAsof: "26.6", trend: +18.0,
      note: "Oura 직접 경쟁 · Ring AIR 출시 · CGM 패치 M1 Live 연동 · 인도 기반 · 대사 데이터+링 결합 차별화",
      vp: "스마트링 + CGM(연속혈당측정) 통합으로 생체 데이터의 범위를 확장 — Oura에 없는 대사 데이터가 차별점",
      direction: "Ring AIR + M1 Live CGM 크로스셀 · 글로벌 확장 · 가격 경쟁력으로 Oura 점유율 도전",
      url: "https://www.ultrahuman.com/",
      sources: [
        "TechCrunch — 2024 — https://techcrunch.com/",
      ] },

    { cat: "startup", name: "WeightWatchers", domain: "weightwatchers.com", unit: "GLP-1 + 행동변화", valuation: "재상장(부채 탕감 후)", valAsof: "25.7", funding: "Public(Chapter 11 완료)", metric: "텔레헬스 매출 성장", value: "+57% YoY", metricAsof: "25 Cheapism", trend: -12.0, trendBasis: "2025 파산 전 구독 회원 감소 기준",
      note: "2025.05.06 Chapter 11 파산 신청 · $1.15B 부채 70%+ 탕감(총부채 ~$1.6B→~$400M) · 2025.07.08 파산 완료·재상장 · Dr. Kim Boyd CMO 영입 · 갱년기 프로그램 신규 · CheqUp(UK) 파트너십 · 2023 Sequence 인수→텔레헬스 매출 +57% YoY · GLP-1+라이프스타일 통합 새 전략",
      vp: "60년 브랜드 + Chapter 11 구조조정 완료 후 'GLP-1 복용 후 행동 변화 동반자'로 완전 재포지셔닝",
      direction: "파산은 GLP-1 충격이 아날로그 체중관리 비즈니스를 직접 파괴한 상징 사례 · 재기 후 Sequence 기반 GLP-1 텔레헬스 + 갱년기 프로그램 + 행동 코칭 번들로 재편",
      url: "https://www.weightwatchers.com/",
      sources: [
        "CBS News — 2025-05-06 — https://www.cbsnews.com/",
        "BBC — 2025-05-06 — https://www.bbc.com/",
        "Reuters — 2025-05 — https://www.reuters.com/",
        "Yahoo Finance — 2025-07-08 — https://finance.yahoo.com/",
        "Cheapism — 2025 — https://www.cheapism.com/",
      ] },

    { cat: "startup", name: "Headspace", domain: "headspace.com", unit: "Mental Health", valuation: "비공개", valAsof: "26.6", funding: "합병 후 PE", metric: "구독자", value: "2M+", metricAsof: "25.12", trend: -2.0,
      note: "Headspace+Ginger 합병 후 단일 브랜드 'Headspace'로 재통합 · 밸류 미공개 · B2B 기업복지 EAP 확장 · Calm과 명상 양강 구도 · 임상 검증 확대",
      vp: "과학 기반 명상·마인드풀니스 + 원격 상담(Ginger)을 결합한 정신건강 올인원 플랫폼",
      direction: "단일 브랜드 재통합 완료 · B2B EAP(직원지원프로그램) 성장 · 임상 연구 기반 DTx 진입 · Calm 대비 의료 채널 차별화",
      url: "https://www.headspace.com/",
      sources: [
        "TechCrunch — 2024 — https://techcrunch.com/",
      ] },

    { cat: "startup", name: "Ladder", domain: "joinladder.com", unit: "Strength Coaching", valuation: "Series B", valAsof: "24.9", funding: "Series B", metric: "구독 성장", value: "고성장", metricAsof: "26.5", trend: +22.0,
      note: "근력 코칭 구독 + AI 맞춤 계획 · 헬스케어 구독 성장률 최고 수준",
      vp: "팀 기반 근력 트레이닝 코칭 — 유산소 중심 앱 시장에서 '근력+코치+팀' 버티컬 독점",
      direction: "AI 맞춤 프로그램 고도화 · 근력 운동 트렌드(특히 여성 시장) 흡수 · 구독 성장률 업계 최고 유지",
      url: "https://www.joinladder.com/",
      sources: [
        "TechCrunch — 2024-09 — https://techcrunch.com/",
      ] },
  ];

  /* ---- Articles (개조식 · 영문 권위 소스만 · 확장판) ---- */
  const ARTICLES = [
    // ── 2026-06-11 ──
    { date: "2026-06-10", cat: "startup", source: "GlobeNewsWire", title: "MyFitnessPal AI Coach 출시 — 20년치 로그 기반 개인화 영양 코칭", summary: "· MFP AI Coach 출시(2026.06.10) · US/UK/CA/AU/NZ Premium/Premium+ 전용\n· 20년치 사용자 로그 데이터·장기 습관 기반 '맞춤 인사이트' 제공\n· 단순 챗봇이 아닌 실제 로그 데이터 기반 진짜 개인화\n· Cal AI 인수 + ChatGPT 연동 + AI Coach → '수동 입력 시대 종결' 3단계 전략 완성", tag: "Product", url: "https://www.globenewswire.com/" },
    { date: "2026-06-04", cat: "startup", source: "Noom 공식", title: "Noom 최대 규모 RCT — 68주 총 -4.1% 체중감소 · 약 없이 행동변화만으로 지속", summary: "· Noom 최대 규모 RCT(n=427) · 16주 프로그램 후 52주 추가 체중감소\n· 68주 총 -4.1% 체중 감소 · 약 없이 행동변화만으로 1년 후도 지속\n· GLP-1 보조 프로그램 임상 근거 강화\n· 구독 앱→B2B 헬스케어 기업 전환의 임상적 기반", tag: "Clinical", url: "https://www.noom.com/" },
    { date: "2026-05-27", cat: "startup", source: "Noom 공식", title: "Noom 바이오마커 테스트 키트 출시 — GLP-1 효과 실시간 혈액 측정", summary: "· 바이오마커 테스트 키트 출시 · GLP-1 효과 실시간 혈액 측정\n· '홈 랩' 개념 · 행동변화 + 생체 데이터 통합\n· B2B 고용주 프로그램에 키트 번들 가능\n· 수직통합(행동+GLP-1+약국+측정) 완성 단계", tag: "Product", url: "https://www.noom.com/" },
    { date: "2026-04-23", cat: "startup", source: "GlobeNewsWire", title: "Noom SmartRx — 고용주 GLP-1 비용 80% 절감 확인 · $4.9M 절감", summary: "· SmartRx 고용주 GLP-1 비용 80% 절감 확인(첫 고용주 데이터)\n· 연 $6.2M→$1.3M 절감($4.9M 절감)\n· 전통 PBM(약국 혜택 관리자) 완전 우회 모델\n· 보험사·PBM 파괴적 혁신 가능성", tag: "Strategy", url: "https://www.globenewswire.com/" },
    { date: "2026-04-01", cat: "startup", source: "Noom 공식", title: "Noom, 503A 약국(Tailor Made Compounding) 인수 — 자체 처방·조제 수직통합", summary: "· 503A 약국 Tailor Made Compounding 인수\n· 자체 처방·조제 수직통합 완료 · 건강한 노화(healthy aging)로 확장\n· 구독 앱→행동+GLP-1+약국 B2B 헬스케어 기업 피벗의 핵심 퍼즐\n· SmartRx 고용주 직접 공급 모델의 약국 인프라 확보", tag: "M&A", url: "https://www.noom.com/" },
    { date: "2026-02-23", cat: "startup", source: "LinkedIn/MFP", title: "MyFitnessPal 2026 Winter Release — Meal Scan·AI Meal Planner·Instacart 연동", summary: "· 2026 Winter Release(2026.02.23)\n· Meal Scan Photo Upload(iOS): AI 식사 스캔 기능\n· 강화된 Meal Planner + Instacart 식료품 연동\n· Cal AI 인수 전 자체 AI 식사 분석 기능 선제 출시", tag: "Product", url: "https://www.linkedin.com/" },
    { date: "2026-02-04", cat: "startup", source: "Yahoo Finance", title: "Noom GLP-1 참여도 보고서 — 앱 최고 참여 회원 25.2% 추가 감량", summary: "· Noom GLP-1 참여도 보고서(2026.02.04)\n· 앱 최고 참여 회원 25.2% 더 체중감소(+8.3파운드 추가)\n· 2.2배 더 오래 복약 유지\n· 디지털 행동 코칭이 GLP-1 효과를 증폭시키는 근거", tag: "Report", url: "https://finance.yahoo.com/" },
    { date: "2026-01-07", cat: "startup", source: "Yahoo Finance", title: "MyFitnessPal, ChatGPT Health 최초 영양 앱 연동 — OpenAI 800M 주간 사용자 접점", summary: "· MFP, ChatGPT Health 최초 영양 앱으로 연동(2026.01.07)\n· OpenAI 800M 주간 사용자 접점 확보\n· 영양 데이터 → ChatGPT 건강 인사이트 통합\n· AI 영양 플랫폼 전환의 외부 생태계 확장 축", tag: "Strategy", url: "https://finance.yahoo.com/" },
    { date: "2025-07-08", cat: "startup", source: "Yahoo Finance", title: "WeightWatchers 파산 완료·재상장 — $1.15B 부채 70%+ 탕감 · 새 경영진", summary: "· 2025.07.08 Chapter 11 파산 절차 완료 · Nasdaq 재상장\n· $1.15B 부채 70%+ 탕감(총부채 ~$1.6B→~$400M)\n· Dr. Kim Boyd CMO 영입 · 새 경영진 구성\n· GLP-1+라이프스타일 통합 새 전략 공식화 · 갱년기 프로그램 신규", tag: "Restructuring", url: "https://finance.yahoo.com/" },
    { date: "2025-05-06", cat: "startup", source: "CBS News / Reuters", title: "WeightWatchers Chapter 11 파산 신청 — $1.15B 부채 탕감 · '40일 내 재기' 선언", summary: "· 2025.05.06 Chapter 11 파산 신청 · $1.15B 부채 탕감 목표\n· Nasdaq 거래 중단 · '40일 내 재기' 선언\n· GLP-1 충격이 아날로그 체중관리 비즈니스를 직접 파괴한 가장 상징적 사례\n· 재기 후 'GLP-1 복용 후 행동 변화 동반자'로 재포지셔닝", tag: "Restructuring", url: "https://www.cbsnews.com/" },
    { date: "2026-02-23", cat: "startup", source: "Subscription Insider", title: "Hims & Hers FY2025 실적 — 매출 $2.35B(+59% YoY) · 구독자 2.51M", summary: "· FY2025 매출 $2.35B(+59% YoY) · 구독자 2.511M(+13%)\n· 조정 EBITDA $318M · 2030 매출 목표 $6.5B\n· FDA compound GLP-1 규제로 semaglutide 중단 → Novo Nordisk Wegovy 파트너 전환\n· Q1 2026 매출 $608M(+4%) · GLP-1 헤드윈드 $65M", tag: "Earnings", url: "https://www.subscriptioninsider.com/" },

    // ── 2026-06-10 (오늘) ──
    { date: "2026-05-20", cat: "device", source: "TechRadar", title: "Garmin CIRQA $509/$454 리크 — 공식 미발표 스크린리스 밴드 프리미엄 포지셔닝", summary: "· Garmin CIRQA 소매가 $509 / 프리오더 $454 확정(Notebookcheck)\n· 두 가지 사이즈(S/M·L/XL) · Body Battery·HRV·SpO2·스트레스 추적\n· 화면 완전 제거 · 구독 없는 일회성 프리미엄 모델\n· Whoop($199~$359/yr 구독)·Fitbit Air($99) 대비 최고가 포지셔닝", tag: "Launch", url: "https://www.techradar.com/health-fitness/smartwatches/garmins-cashing-in-on-the-screenless-whoop-style-smart-band-trend-with-its-upcoming-cirqa-heres-the-proof" },
    { date: "2026-05-21", cat: "device", source: "CNBC", title: "Oura, IPO S-1 비밀 제출… 밸류 $11B · 2025 매출 ~$1B · 2026E $2B", summary: "· 2026.05.21 SEC에 S-1 비밀 제출(CNBC 확인)\n· Series E $9억(Fidelity 주도·Iconiq 참여) 밸류 $11B\n· 2025 매출 ~$1B · 2026E $2B 전망(2년 만에 4배 성장)\n· 스마트링 점유율 74%(2025 H1 Omdia) · 누적 550만 링 판매 · 유럽 헬스테크 최초 데카콘", tag: "IPO", url: "https://www.cnbc.com/2026/05/21/oura-smart-ring-ipo-filing.html" },
    { date: "2026-03-02", cat: "startup", source: "TechCrunch", title: "MyFitnessPal, Cal AI 인수 발표 — 10대 창업자 ARR $30M 달성", summary: "· 2026.03.01 Cal AI 인수 공식 발표(딜 체결 2025.12)\n· Cal AI: 17세 고교생 2명 창업 · ARR $30M(@dpjmcgregor)\n· 사진 한 장으로 칼로리·영양소 자동 분석하는 비전 AI\n· MFP 280M+ 사용자에 통합 + Cal AI 별도 운영 · 앱스토어 피트니스 매출 1위", tag: "M&A", url: "https://techcrunch.com/2026/03/02/myfitnesspal-has-acquired-cal-ai-the-viral-calorie-app-built-by-teens/" },
    { date: "2026-02-12", cat: "ai", source: "Grand View Research", title: "GLP-1 시장 2026E $82B · 2033E $185.3B · CAGR 12.4%", summary: "· Grand View Research: 글로벌 GLP-1 수용체 작용제 시장 2025 $66.4B → 2026E $82B → 2033E $185.3B\n· CAGR 12.4% · 세마글루타이드 점유율 52.8%(2025)\n· 티르제파타이드 CAGR 13.9% 최고 성장\n· 디지털 코칭 결합 표준화", tag: "Market", url: "https://www.grandviewresearch.com/industry-analysis/glp-1-receptor-agonist-market" },
    { date: "2026-03-31", cat: "startup", source: "TechCrunch", title: "Whoop, Series G $5.75억 조달 · 밸류 $10.1B 데카콘 등극", summary: "· 2026.03.31 Series G 완료 · $575M 조달 · 밸류 $10.1B(직전 $3.6B 대비 3배)\n· 매출 런레이트 $1.1B+ · 600명 채용 + Whoop Labs Doha 설립\n· Abbott·Mayo Clinic·Mubadala·QIA 등 전략 투자자 참여\n· 호날두·르브론·맥길로이 등 셀럽 애슬릿 투자 · 호주오픈 바이럴 효과", tag: "Funding", url: "https://techcrunch.com/2026/03/31/whoop-valuation-10b-series-g-fundraise/" },
    { date: "2026-05-08", cat: "device", source: "Wareable", title: "스크린리스 밴드 3파전 본격화 — Fitbit Air $99 vs Whoop 구독 vs Garmin CIRQA $509", summary: "· Fitbit Air: $99.99 일회성 · 12g · 7일 배터리 · AFib 감지 · 구독 불필요\n· Whoop: 기기 무료 + 3티어 구독($199~$359/yr) · ECG FDA clearance · $10.1B 데카콘\n· Garmin CIRQA: $509(소매)/$454(프리오더) · Body Battery 특화 · 구독 없는 프리미엄\n· 세 가지 비즈니스 모델(저가 일회성 vs 구독 vs 고가 일회성) 정면 충돌", tag: "Trend", url: "https://www.wareable.com/fitness-trackers/fitbit-air-vs-whoop-key-differences-explained" },
    { date: "2026-01-20", cat: "ai", source: "BCG", title: "BCG: AI 에이전트가 헬스케어 최대 변혁 요소 — 앰비언트 AI 스크라이브 보편화", summary: "· BCG 2026 보고서: 코파일럿→자율 에이전트 전환 가속\n· 앰비언트 AI 스크라이브 의사 1일 1~2시간 문서화 절감\n· AI 에이전트가 행정 데이터와 임상 실무를 직접 연결\n· BCG × Hippocratic AI 전략 협업 · 행정 부담 30% 감소(Salesforce 2025 조사)", tag: "Report", url: "https://www.bcg.com/publications/2026/how-ai-agents-will-transform-health-care" },
    { date: "2026-01-09", cat: "startup", source: "the5krunner", title: "Strava IPO 준비 보도 — 주관사 선정 · ARR ~$500M (S-1 제출 미확인)", summary: "· IPO 준비·투자은행 선정 보도(S-1 제출은 미확인)\n· 밸류 $2.2B+(Series G 2025.05) · IPO 시 $3B+ 전망\n· ARR ~$500M · 구독 리텐션 80~90% · 150M+ 등록 사용자\n· Gen Z 런클럽·소셜 기능이 성장 동력", tag: "IPO", url: "https://the5krunner.com/2026/01/09/strava-ipo-filing-3-billion-valuation-analysis/" },
    { date: "2026-06-04", cat: "device", source: "Oura Blog", title: "Oura Ring 5 출시 — Ring 4 대비 40% 소형화 · $399~ · 최대 9일 배터리", summary: "· Oura Ring 5 출시(2026.06.04) · 세계 최소형 스마트링\n· Ring 4 대비 40% 소형화(6.09mm 폭·2.28mm 두께) · 새 센서 어레이 탑재\n· GLP-1 tracking · Health Radar · 대사 건강·여성 건강 지표 추가\n· $399부터 · 최대 9일 배터리", tag: "Product", url: "https://ouraring.com/blog/introducing-oura-ring-5/" },
    { date: "2025-05-08", cat: "device", source: "CNBC", title: "Whoop MG — TIME 2025 올해의 발명품 · ECG FDA clearance 획득", summary: "· Whoop MG ECG FDA clearance 획득(2025.04)\n· TIME 2025 Best Inventions 선정\n· 3티어 구독 개편: One $199/yr · Peak $239/yr · Life $359/yr\n· 혈중 산소·심전도·혈압 트렌드 통합 모니터링", tag: "Award", url: "https://www.cnbc.com/2025/05/08/whoop-wearables-whoop-50-mg-price.html" },
    { date: "2026-05-15", cat: "device", source: "Garmin Newsroom", title: "Garmin × Truemed — HSA/FSA 연동으로 '예방 의료비' 포지셔닝", summary: "· Garmin 공식 Truemed HSA/FSA 결제 연동 발표\n· 웨어러블 구매를 예방 의료비로 세금 혜택 적용 · 최대 30% 절감\n· fēnix·Forerunner·Venu·vívoactive 등 대상\n· 소비자 웨어러블의 '의료 기기화' 트렌드 가속", tag: "Strategy", url: "https://www.garmin.com/en-US/newsroom/press-release/sports-fitness/garmin-teams-up-with-truemed-to-unlock-hsa-fsa-funds-for-fitness-products/" },
    { date: "2026-04-09", cat: "startup", source: "Reuters", title: "MyFitnessPal $1B+ 매각 검토 — Cal AI·ChatGPT 연동 후 AI 프리미엄 전략", summary: "· Reuters 2026.04.09: MFP 매각 검토 보도 · 밸류 $1B+ 전망\n· 2020년 Francisco Partners $345M 인수 대비 3배 프리미엄\n· Cal AI 인수 + ChatGPT Health 연동으로 AI 영양 플랫폼 전환 완료\n· 280M+ 사용자(120개국) + AI 기술 스택이 프리미엄 정당화", tag: "M&A", url: "https://www.reuters.com/technology/fitness-health-app-myfitnesspal-explores-sale-sources-say-2026-04-09/" },

    // ── 2026-06-09 ──
    { date: "2026-04-06", cat: "ai", source: "Rock Health", title: "Q1 2026 디지털 헬스 펀딩 $4.0B/110건 — 자본 집중·AI 시대 공식화", summary: "· Rock Health: $4.0B/110건 · 평균 딜 $36.7M(2021 이래 최고)\n· 메가딜($100M+) 12건 — Q1 2022 이후 최다\n· CB Insights 별도 집계: $7.4B(메가라운드 60% · 19건)\n· '있는 자/없는 자' 양극화 — 검증된 AI 기업에 자본 집중", tag: "Report", url: "https://rockhealth.com/insights/q1-2026-funding-overview-capital-continues-concentrating-and-four-other-market-signals/" },
    { date: "2026-06-07", cat: "device", source: "9to5Mac", title: "Apple Watch S11 vs Oura vs Fitbit Air vs Whoop — WSJ 실사용 비교 종합", summary: "· WSJ 4자 실사용 비교: 수면 추적·심박 정확도·배터리·가격 종합 순위\n· Apple Watch: 수면 시간 정확도 1위 · ECG/AFib FDA-cleared 대표 웨어러블\n· Oura: 수면 단계 분류 최고 · Fitbit Air $99 가성비 최강\n· Whoop: 회복(Recovery) 분석 최고 · 구독 없이 데이터 확인 불가", tag: "Review", url: "https://9to5mac.com/2026/06/07/heres-how-apple-watch-series-11-stacks-up-against-oura-fitbit-and-whoop-per-wsj/" },
    { date: "2026-05-07", cat: "startup", source: "CNBC", title: "Peloton Q3 FY2026 수익성 회복 — 순이익 $26.4M · 그러나 구독 -7.6% YoY", summary: "· Q3 FY2026 매출 $631M(+1% YoY · 가이던스 상회)\n· GAAP 순이익 $26.4M · EBITDA +41% · FCF +59%\n· paid subscriptions ~2.7M(-7.6% YoY) · 월 이탈률 1.2%\n· Spotify 파트너십 1,400+ 클래스 · CCO Sarah Robb O'Hagan 영입(2026.04) · FY 가이던스 $2.42~2.44B", tag: "Earnings", url: "https://www.cnbc.com/2026/05/07/peloton-pton-earnings-q3-2026.html" },
    { date: "2026-01-11", cat: "ai", source: "Anthropic", title: "Anthropic, Claude for Healthcare 출시 — JPM26 발표 · HIPAA 대응", summary: "· JPM Healthcare Conference 2026.01.11 발표\n· Claude for Healthcare: HIPAA-ready · 임상 문서화·사전승인 자동화\n· Boston Children's·Cedars-Sinai·Stanford Medicine·HCA 파일럿\n· CMS DB·ICD-10·NPI·PubMed 커넥터 통합", tag: "Enterprise", url: "https://www.anthropic.com/news/healthcare-life-sciences" },
    { date: "2026-02-17", cat: "startup", source: "Axios", title: "Noom·eMed, GLP-1 원격의료로 무게중심 이동 — 행동 코칭+처방 결합", summary: "· 행동 코칭 + 비만 치료제 처방 결합 모델 전환\n· eMed × CVS Caremark: 고용주 GLP-1 비용 분담 모델\n· Nature 연구: GLP-1+mHealth 12개월 -12.7% 체중 감소\n· 앱 참여도(engagement)가 감량 결과를 직접 결정", tag: "Strategy", url: "https://www.axios.com/2026/02/17/employers-new-option-workers-glp-1-demand" },

    // ── 2026-06-08 ──
    { date: "2026-03-11", cat: "ai", source: "Amazon", title: "Amazon Health AI 에이전트 출시 — One Medical + Prime 2억 회원 확장", summary: "· Amazon Bedrock 기반 멀티에이전트 아키텍처 · HIMSS26 발표\n· 증상 분류 AI 트리아지 → 의료진 연결 시간 단축\n· Prime 회원 200M 무료 가상 진료 5회 제공\n· Amazon Pharmacy 통합 · 30개+ 일반 질환 대응", tag: "Product", url: "https://www.aboutamazon.com/news/retail/amazon-health-ai-agent-one-medical" },
    { date: "2026-05-07", cat: "device", source: "9to5Google", title: "Fitbit Air 출시 — $99.99 스크린리스 밴드 · 12g · 7일 배터리", summary: "· Google Fitbit Air 2026.05 출시 · 구독 없음(Premium 3개월 무료)\n· 12g(밴드 포함) · Inspire 3 대비 50% 소형화\n· AFib 감지·SpO2·HRV·피부온도 · 5분 충전 1일 사용\n· Stephen Curry 협업 에디션 $129.99 · Google Health 앱 전환 가속", tag: "Launch", url: "https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/" },
    { date: "2026-01-15", cat: "ai", source: "JMIR", title: "빅테크 헬스 경쟁의 핵심은 'AI 헬스 에이전트' 레이어 장악", summary: "· 디바이스·앱 위에서 사용자를 조율하는 에이전트 레이어 주도권 경쟁\n· OpenAI ChatGPT Health · Google MedPaLM · Amazon Health AI · Anthropic Claude for Healthcare\n· 수동 인포매틱스 → 에이전트적 헬스 스튜어드십 전환\n· 데이터 허브를 장악하는 자가 헬스케어 가치사슬 지배", tag: "Analysis", url: "https://www.jmir.org/2026/1/e99230" },
    { date: "2026-04-21", cat: "startup", source: "TechCrunch", title: "비전 AI 칼로리 추적 경쟁 — Apple의 Cal AI 단속이 보여준 플랫폼 파워", summary: "· Apple의 Cal AI 앱스토어 규제 강화 · 플랫폼 정책 변수 부각\n· MFP의 Cal AI(ARR $30M) 인수로 경쟁 구도 급변\n· 사진 한 장 식단 기록이 카테고리 표준 기능화\n· 정밀 영양소 분석·웨어러블 연동이 차세대 격전지", tag: "Analysis", url: "https://techcrunch.com/2026/04/21/apples-cal-ai-crackdown-signals-its-still-policing-the-app-store/" },

    // ── 2026-06-07 ──
    { date: "2026-05-08", cat: "device", source: "9to5Mac", title: "Apple Watch vs Whoop — 60일 동시 착용 실사용 비교", summary: "· 60일간 Apple Watch + Whoop 동시 착용 비교 테스트\n· Apple Watch: FDA clearance · 스크린 인터페이스 · 범용성\n· Whoop: 회복 분석·스트레인 코칭 특화 · 구독 모델\n· 착용감·배터리·정확도·가격 종합 비교", tag: "Review", url: "https://9to5mac.com/2026/05/08/apple-watch-vs-whoop-heres-what-i-learned-after-60-days-wearing-both-video/" },

    // ── 2026-06-06 ──
    { date: "2026-03-18", cat: "startup", source: "NetNewsLedger", title: "Flo Health MAU 7,700만 돌파 — femtech 유니콘 · $200M Series C", summary: "· MAU 7,700만 · 유료 구독 500만+ · General Atlantic Series C $200M\n· 세계 최초 femtech 유니콘(밸류 $1B+) · Google Play 다운로드 2위\n· 갱년기·불임 등 여성 건강 전 영역 서비스 확장\n· 익명 모드 등 데이터 프라이버시가 신뢰 해자", tag: "Growth", url: "https://www.netnewsledger.com/2026/03/18/flo-healths-record-breaking-run-200m-raised-77m-users-and-a-unicorn-status-that-changed-femtech-forever/" },
    { date: "2026-02-18", cat: "device", source: "Garmin IR", title: "Garmin FY2025 피트니스 매출 $2.36B 확정 · +33% YoY", summary: "· FY2025 피트니스 세그먼트 $2.36B 확정(2026.02.18 실적 발표)\n· 전년비 +33% 성장 · Q4 피트니스 +42% · 프리미엄 웨어러블 호조\n· 전사 매출 $7.1B · 영업이익 $1.88B(+18% YoY)\n· $500M 자사주 매입 · 배당 17% 인상", tag: "Earnings", url: "https://www.garmin.com/en-US/newsroom/press-release/corporate/garmin-announces-fourth-quarter-and-fiscal-year-2025-results/" },
    { date: "2024-10-03", cat: "startup", source: "Strava Press", title: "Strava AI 코치 'Athlete Intelligence' — 1.5억 사용자 대상 출시", summary: "· Athlete Intelligence: 운동 데이터 해석 개인화 인사이트 · 14개 언어\n· 150M+ 등록 사용자 대상 AI 코칭 · 유료 구독자 전용\n· 달리기·라이드·하이킹 등 지원 · 운동 데이터 해석 자동화\n· ARR ~$500M · 리텐션 80~90% · Gen Z 런클럽 드라이브 성장", tag: "Product", url: "https://press.strava.com/articles/stravas-athlete-intelligence-translates-workout-data-into-simple-and" },

    // ── 2026-06-05 ──
    { date: "2026-06-05", cat: "ai", source: "STAT News", title: "파운데이션 모델 헬스 에이전트, 데모 넘어 규제 파일럿 단계로", summary: "· 임상·규제 환경 실증 시작 · 안전성 검증 프레임 구축\n· FDA AI/ML 가이드라인 업데이트 반영\n· STAT: 앰비언트 스크라이브 비용 증가 우려 보도(2026.04)\n· 문서화 효율 vs 청구 코드 상향(upcoding) 논쟁 시작", tag: "Trend", url: "https://www.statnews.com/2026/04/08/are-scribes-raising-health-care-costs-ai-prognosis/" },
    { date: "2026-06-05", cat: "device", source: "Wareable", title: "Apple Watch S11 — 고혈압 알림 + 수면 점수 + 배터리 강화", summary: "· 고혈압 알림: 30일간 광학 센서 혈관 반응 분석 후 알림\n· 수면 점수: 500만 야간 데이터 기반 0~100점 · 단계별 분석\n· watchOS 26으로 Series 9/10/Ultra 2에도 확장\n· 170개국 고혈압 알림 확대 업데이트", tag: "Product", url: "https://www.wareable.com/apple/apple-watch-series-11-announcement-price-release-date-new-features" },
    { date: "2026-05-15", cat: "startup", source: "TechRadar", title: "운동 앱 AI 개인화 경쟁 본격화 — AllTrails·Strava·Garmin AI 구독 비교", summary: "· AllTrails Peak AI 구독 $80/yr · 맞춤 트레일 추천 · 혼잡도 예측\n· Strava Athlete Intelligence · Garmin Coach AI 코칭\n· 개인화 수준이 유료 전환율 직접 결정\n· 범용 AI 코치 vs 버티컬 특화 코치 경쟁 구도 형성", tag: "Trend", url: "https://www.techradar.com/health-fitness/fitness-apps/alltrails-is-the-latest-app-with-an-ai-powered-subscription-tier-but-it-looks-way-more-useful-than-the-genai-from-garmin-and-strava" },

    // ── 2026-06-04 ──
    { date: "2025-05-12", cat: "startup", source: "TechCrunch", title: "AllTrails, $80/yr Peak 멤버십 출시 — AI 맞춤 루트 생성", summary: "· AllTrails Peak 멤버십 연 $80 · AI 스마트 루트 생성 기능\n· 6,500만+ 등록 사용자 기반 · 아웃도어 앱 최고 성장률\n· 실시간 트레일 혼잡도·날씨·난이도 반영\n· 식물 카메라 ID · AI 안전 경고 추가", tag: "Launch", url: "https://techcrunch.com/2025/05/12/alltrails-debuts-a-80-year-membership-that-includes-ai-powered-smart-routes/" },
    { date: "2026-04-30", cat: "ai", source: "CNBC", title: "Google·Amazon·MS, 클라우드 AI 실적 일제히 상회 — 헬스 AI 인프라 가속", summary: "· Google·MS·Amazon 3사 클라우드 실적 동시 상회\n· AWS HealthScribe + Azure Health Bot + Google MedPaLM 경쟁\n· 클라우드·모델 사업자 헬스 데이터 워크로드 선점 경쟁\n· 의료 특화 LLM 인프라 투자 가속", tag: "Analysis", url: "https://www.cnbc.com/2026/04/30/google-microsoft-and-amazon-all-report-cloud-beats-in-earnings.html" },
    { date: "2025-10-22", cat: "device", source: "Android Central", title: "Oura $900M 펀딩 후 스마트링 헬스 혁신 가속 — $11B 밸류", summary: "· Oura Series E $900M · 밸류 $11B · Fidelity 주도\n· 스마트링 출하량 전년비 49% 성장(IDC)\n· Ultrahuman·Amazfit 등 신규 진입 가속\n· Oura 점유율 76%+(IDC 2025) 방어 vs 가격 경쟁 압박", tag: "Market", url: "https://www.androidcentral.com/wearables/oura-ring/ouras-usd900m-funding-sets-the-stage-for-its-next-big-health-leap" },

    // ── 2026-06-03 ──
    { date: "2026-05-21", cat: "device", source: "Bloomberg", title: "Oura, IPO 비밀 제출 — 스마트링 메이커 상장 로드맵 본격화", summary: "· Bloomberg 2026.05.21: Oura IPO 비밀 제출 확인\n· Series E $9억(Fidelity 주도) 밸류 $11B\n· 2025 매출 ~$1B · 2026E $2B 전망 · 누적 550만 링 판매\n· 유럽 헬스테크 최초 데카콘 · 스마트링 점유율 76%+(IDC)", tag: "IPO", url: "https://www.bloomberg.com/news/articles/2026-05-21/oura-maker-of-popular-smart-rings-files-confidentially-for-ipo" },
    { date: "2026-05-21", cat: "startup", source: "Axios", title: "Calm 전 CEO, AI 휴머니티 스타트업 설립 — 명상 앱 너머 전환", summary: "· Calm 전 CEO 새 AI 스타트업 설립 · 명상 앱 다운로드 하락세(-61%)\n· 근거 기반 디지털 치료제(DTx)로 이동\n· B2B 기업복지 + 보험 연계 수익화 전략\n· 행동 건강 테크 PE 인수 활발(Axios Pro 2026.01)", tag: "Strategy", url: "https://www.axios.com/2026/05/21/former-calm-ceo-ai-humanity" },
    { date: "2026-04-06", cat: "ai", source: "Fierce Healthcare", title: "Q1 AI 네이티브 헬스 스타트업에 사상 최대 자본 유입", summary: "· Rock Health: Q1 $4.0B/110건 · CB Insights: $7.4B\n· 메가딜($100M+) 12건 — Q1 2022 이후 최다\n· 평균 딜 $36.7M(2021 이래 최고)\n· 자본 집중 가속 · '있는 자/없는 자' 양극화 심화", tag: "Funding", url: "https://www.fiercehealthcare.com/digital-health/digital-health-startups-raked-4b-q1-12-megadeals-driving-investment-rock-health" },

    // ── 2026-06-02 ──
    { date: "2026-05-20", cat: "device", source: "DC Rainmaker", title: "Fitbit Air 심층 리뷰 — $99 밴드의 실제 수면·심박 정확도 검증", summary: "· DC Rainmaker 심층 실사용 테스트 · 수면 추적·심박 정확도 측정\n· $99 가격 대비 상위 가성비 평가 · 7일 배터리 실측 확인\n· Whoop 대비 구독 없는 일회성 모델 강점 · 단, 스크린 없는 UX 한계\n· 바이셉 밴드 출시 시 정확도 향상 전망", tag: "Review", url: "https://www.dcrainmaker.com/2026/05/fitbit-review-vs-whoop.html" },

    // ── 2026-05-31 ──
    { date: "2026-05-11", cat: "device", source: "the5krunner", title: "Garmin CIRQA vs Fitbit Air — Whoop 대체 스크린리스 밴드 승자는?", summary: "· the5krunner 실측 비교 테스트 · Garmin CIRQA vs Fitbit Air\n· Whoop: 안정 시 정확도 높음 · 운동 중 편차 존재\n· Fitbit Air: $99 가격 대비 합리적 정확도 · 고강도 운동 시 한계\n· Garmin CIRQA: Body Battery 알고리즘 차별화 · 가격 $509 프리미엄", tag: "Review", url: "https://the5krunner.com/2026/05/11/garmin-cirqa-vs-fitbit-air/" },

    { date: "2026-06-09", cat: "device", source: "CNBC", title: "Whoop 창업자: 143번 투자자 거절 후 $10.1B 기업 탄생기", summary: "· CNBC 인터뷰: Whoop CEO Will Ahmed 창업 스토리\n· 143번 투자자 거절 → Series G $575M · 밸류 $10.1B\n· 웨어러블 RPM 시장 연 14.7% 성장 전망\n· 호날두·르브론 등 셀럽 투자자 합류", tag: "Market", url: "https://www.cnbc.com/2026/06/09/whoop-founder-how-i-built-a-10-billion-fitness-wearable-company.html" },

    // ── 2026-05-22 ──
    { date: "2026-05-22", cat: "device", source: "TechCrunch", title: "Oura S-1 비밀 제출 — 스마트링 유니콘 IPO 로드맵 본격화", summary: "· 2026.05.21 SEC S-1 비밀 제출(CNBC·TechCrunch 확인)\n· 2025 매출 ~$1B · 2026E 매출 $2B 전망(2년 만에 4배 성장)\n· 누적 550만 링 판매 · 스마트링 시장 점유율 74%(Omdia 2025)\n· 유럽 헬스테크 최초 데카콘 · Series E $9억 밸류 $11B", tag: "IPO", url: "https://techcrunch.com/2026/05/22/oura-ipo-s1-filing/" },

    // ── 2026-05-21 ──
    { date: "2026-05-14", cat: "device", source: "the5krunner", title: "Garmin CIRQA $509 가격 유출 — 프리미엄 스크린리스 밴드 포지셔닝 분석", summary: "· Garmin CIRQA 소매가 $509 / 프리오더 $454 확정(Notebookcheck)\n· Fitbit Air($99)·Whoop 구독($199~$359/yr) 대비 프리미엄\n· Body Battery·HRV·SpO2·스트레스 추적 · 구독 없는 일회성 모델\n· 가민 브랜드 충성도 + 멀티스포츠 생태계가 프리미엄 정당화", tag: "Analysis", url: "https://the5krunner.com/2026/05/14/garmin-cirqa-leaked-price/" },

    // ── 2026-05-30 ──
    { date: "2026-05-30", cat: "ai", source: "J.P. Morgan", title: "GLP-1 + 디지털 코칭 — 새로운 체중관리 스택", summary: "· 비만 치료제 + 행동 코칭 결합 시장 표준화\n· 코칭 결합 시 참여도 +38% YoY\n· Nature 임상: GLP-1+mHealth 앱 12개월 -12.7% 체중 감소", tag: "Report", url: "https://www.jpmorgan.com/insights/global-research/current-events/obesity-drugs" },
    { date: "2026-02-18", cat: "device", source: "Garmin Newsroom", title: "Garmin Q4 & FY2025 실적 — 피트니스 $2.36B · +33% YoY", summary: "· FY2025 피트니스 세그먼트 $2.36B 확정 · +33% YoY\n· Q4 피트니스 +42% · 프리미엄 웨어러블 수요 호조\n· 전사 매출 $7.1B · 시총 $33B+ · 배당 17% 인상\n· $500M 자사주 매입 프로그램 발표", tag: "Earnings", url: "https://www.garmin.com/en-US/newsroom/press-release/corporate/garmin-announces-fourth-quarter-and-fiscal-year-2025-results/" },

    // ── 2026-05-28 ──
    { date: "2026-04-21", cat: "startup", source: "Axios", title: "Amazon One Medical, GLP-1 체중관리 프로그램 전국 출시", summary: "· Amazon One Medical 전국 GLP-1 프로그램 런칭(2026.04.21)\n· GLP-1 시장 $82B(2026E) · 디지털 동반 서비스 필수화\n· 보험 적용 시 $25/월 · 자부담 $149(경구)~$299(주사)\n· Noom·WeightWatchers도 처방 연계 전환 가속", tag: "Analysis", url: "https://www.axios.com/2026/04/21/amazon-pharmacy-one-medical-glp1-program" },
    { date: "2026-05-28", cat: "ai", source: "STAT News", title: "병원 생성형 AI 임상 문서화 도입 확대 — 비용 논쟁도 점화", summary: "· 진료 요약·기록 자동화 · 의료진 업무 부담 경감\n· 앰비언트 스크라이브 1일 1~2시간 절감(BCG)\n· STAT: 문서화 효율이 청구 비용 상승으로 이어지는지 논쟁", tag: "Enterprise", url: "https://www.statnews.com/2026/04/08/are-scribes-raising-health-care-costs-ai-prognosis/" },

    // ── 2026-04-09 ──
    { date: "2026-04-09", cat: "device", source: "Sleep Foundation", title: "웨어러블 수면 추적 정확도 — 학술 검증 현황과 한계", summary: "· 소비자 웨어러블 수면 추적: FDA 승인 의료기기 아닌 wellness 분류\n· Oura: 수면 단계 분류 최고 정확도(학술 검증 다수)\n· Apple Watch: FDA ECG clearance 보유 · 수면 점수 신규\n· Fitbit Air·Whoop: WSJ 등 미디어 순위 ≠ peer-reviewed 학술 검증 — 학술 미검증 명시 필요", tag: "Analysis", url: "https://www.sleepfoundation.org/sleep-news/new-research-evaluates-accuracy-of-sleep-trackers" },

    // ── 2026-04-25 ──
    { date: "2026-04-25", cat: "ai", source: "Nature", title: "Nature 임상: GLP-1+mHealth 앱 코칭 12개월 -12.7% 체중 감소", summary: "· 싱가포르 NOVI Health 실제 임상 데이터(Nature IJO 게재)\n· GLP-1+mHealth 앱 코칭 병행 시 12개월 -12.7% 체중 감소\n· 앱 참여도가 체중 감소 결과를 직접 결정하는 핵심 변수\n· JMIR 별도 연구도 디지털 참여도-감량 상관관계 확인", tag: "Clinical", url: "https://www.nature.com/articles/s41366-026-02062-x" },

    // ── 2026-03-04 ──
    { date: "2026-03-04", cat: "startup", source: "Instagram / @dpjmcgregor", title: "Cal AI 공동창업자: ARR $30M 달성 · MFP 인수 확정", summary: "· Cal AI 공동창업자 @dpjmcgregor 인스타그램 공개\n· ARR $30M 달성 · 딜 체결 2025.12 / 인수 발표 2026.03.01\n· 17세 고교생 2명 창업 · 18개월 만에 ARR $30M\n· MFP 280M+ 사용자에 비전 AI 칼로리 추적 기본 통합 예정", tag: "M&A", url: "https://www.instagram.com/dpjmcgregor/" },

    // ── 2026-01-06 ──
    { date: "2026-01-06", cat: "device", source: "FDA / Reuters", title: "FDA, 웨어러블·소프트웨어 규제 대폭 완화 — 혈압·혈당 wellness 허용 확대", summary: "· 2026.01.06 FDA 'General Wellness' 최종 가이드라인 공표\n· 비침습 혈압·혈당 웨어러블 wellness 용도 허용 확대\n· 2025.07 Whoop 혈압 기능 경고장과 대비되는 정책 전환\n· Whoop·Oura 직접 수혜 · 의사결정지원 소프트웨어 규제 완화", tag: "Regulatory", url: "https://natlawreview.com/article/fdas-2026-general-wellness-policy-and-what-it-means-manufacturers-wearable-devices" },

    // ── 2025-12-15 ──
    { date: "2025-12-15", cat: "ai", source: "BCG", title: "BCG 2026 전망: AI 에이전트가 헬스케어 최대 변혁 요소", summary: "· BCG × BCG X: 2026 헬스케어 AI 에이전트 전환 가속 전망\n· 앰비언트 AI 스크라이브 → 자율 임상 에이전트 진화\n· BCG × Hippocratic AI 전략 협업 발표(2026.01)\n· AI 에이전트 행정 부담 30% 절감(Salesforce 2025)", tag: "Report", url: "https://www.bcg.com/publications/2026/how-ai-agents-will-transform-health-care" },
  ];

  const REPORTS = [
    { house: "Morgan Stanley", type: "Securities", date: "2026-06-09", title: "Digital Health 2026: AI 에이전트가 웨어러블 해자를 재편한다", figure: "TAM $660B (2030E)", rating: "Overweight", url: "https://www.morganstanley.com/insights/articles/health-wellness-outlook-healthcare-retail-2026", verified: false, verifyNote: "원문 리포트 URL 미확인 · 공개 인사이트 페이지 기반 내부 해석",
      bullets: ["웨어러블·RPM TAM $660B(2030E) 전망", "AI 에이전트가 하드웨어 해자를 소프트웨어 해자로 전환", "Oura·Whoop 등 데카콘의 IPO 후 시장 재편 시나리오"] },
    { house: "Goldman Sachs", type: "Securities", date: "2026-06-06", title: "웨어러블 & RPM — 프리미엄 하드웨어 vs. AI 소프트웨어 마진", figure: "웨어러블 CAGR 14.7%", rating: "Neutral", url: "https://www.goldmansachs.com/insights/articles/how-artificial-intelligence-is-accelerating-innovation-in-healthcare", verified: false, verifyNote: "원문 리포트 URL 미확인 · 공개 인사이트 페이지 기반 내부 해석",
      bullets: ["웨어러블 CAGR 14.7%(2026–2030)", "하드웨어 마진 하락 vs AI 소프트웨어 마진 상승 분기점", "구독 모델(Whoop) vs 일회성(Garmin) 수익성 비교"] },
    { house: "Rock Health", type: "Market", date: "2026-06-05", title: "Q1 2026 펀딩: $4.0B/110건 · 자본 집중 가속 · AI 시대 선언", figure: "Q1 $4.0B", rating: "Report", url: "https://rockhealth.com/insights/q1-2026-funding-overview-capital-continues-concentrating-and-four-other-market-signals/",
      bullets: ["Q1 $4.0B/110건 · 평균 딜 $36.7M(2021 이후 최고)", "메가딜($100M+) 12건 — Q1 2022 이후 최다", "자본 집중 가속 · '있는 자/없는 자' 양극화 심화"] },
    { house: "CB Insights", type: "Market", date: "2026-06-05", title: "State of Digital Health Q1'26 — $7.4B 펀딩 · 메가라운드 60%", figure: "Q1 $7.4B", rating: "Report", url: "https://www.cbinsights.com/research/report/digital-health-trends-q1-2026/",
      bullets: ["Q1 $7.4B · 메가라운드 60%(19건)", "헬스 AI 투자 전분기 대비 +25%", "디지털 헬스 유니콘 9개 신규 탄생"] },
    { house: "Grand View Research", type: "Market", date: "2026-06-02", title: "글로벌 디지털 헬스 $347B(2025) → $1,830B(2033E) CAGR 23.4%", figure: "$347B → $1,830B", rating: "Report", url: "https://www.grandviewresearch.com/industry-analysis/digital-health-market",
      bullets: ["2025년 $347B → 2033E $1,830B · CAGR 23.4%", "원격의료·웨어러블·AI 진단 3축 성장", "아태 지역 최고 성장률 · 북미 최대 시장"] },
    { house: "Grand View Research", type: "Market", date: "2026-05-30", title: "글로벌 GLP-1 수용체 작용제 시장 $82B(2026E) → $185B(2033E)", figure: "$82B GLP-1", rating: "Report", url: "https://www.grandviewresearch.com/industry-analysis/glp-1-receptor-agonist-market",
      bullets: ["GLP-1 시장 2026E $82B → 2033E $185B", "세마글루타이드 점유율 52.8%(2025)", "티르제파타이드 CAGR 13.9% 최고 성장"] },
    { house: "J.P. Morgan", type: "Securities", date: "2026-05-30", title: "GLP-1 + 디지털 코칭: 새로운 체중관리 스택", figure: "참여도 +38% YoY", rating: "Overweight", url: "https://www.jpmorgan.com/insights/global-research/current-events/obesity-drugs", verified: false, verifyNote: "원문 리포트 URL 미확인 · 공개 인사이트 페이지 기반 내부 해석",
      bullets: ["GLP-1+디지털 코칭 결합 시 참여도 +38% YoY", "코칭 앱 번들이 약물 치료 표준화 전망", "Noom·WeightWatchers 처방 연계 모델 주목"] },
    { house: "BCG", type: "Market", date: "2025-12-15", title: "AI 에이전트가 헬스케어를 변혁한다 — 2026 전망", figure: "문서화 1~2h/일 절감", rating: "Report", url: "https://www.bcg.com/publications/2026/how-ai-agents-will-transform-health-care",
      bullets: ["코파일럿→자율 에이전트 전환 2026 가속", "앰비언트 AI 스크라이브 1일 1~2시간 문서화 절감", "행정 부담 30% 감소(Salesforce 2025 조사)"] },
    { house: "IDC", type: "Market", date: "2026-05-26", title: "글로벌 웨어러블 출하 트래커 — 스마트링이 최고 성장 폼팩터", figure: "Oura 링 점유율 74%", rating: "Report", url: "https://www.idc.com/resource-center/blog/the-future-of-smart-rings/", verified: false, verifyNote: "IDC 블로그 URL · 정식 리포트 원문은 유료 접근 필요",
      bullets: ["스마트링 출하량 전년비 2배 성장", "Oura 점유율 74%(2025 H1)", "밴드→링 폼팩터 전환 가속 전망"] },
    { house: "FDA", type: "Regulatory", date: "2026-01-06", title: "General Wellness 최종 가이드라인 — low-risk wellness claim 규제 경계 명확화", figure: "규제 경계 명확화", rating: "Final", url: "https://natlawreview.com/article/fdas-2026-general-wellness-policy-and-what-it-means-manufacturers-wearable-devices",
      bullets: ["low-risk general wellness 제품에 대한 규제 경계 명확화", "혈압·혈당을 의료용 정확도 또는 진단으로 표현 시 별도 clearance 필요", "진단·치료·예방 claim은 의료기기 규제 영역"] },
  ];

  const MARKET_GROWTH = [
    { year: "2021", size: 180, growth: 12, src: "Grand View Research '22.03" },
    { year: "2022", size: 210, growth: 17, src: "Grand View Research '23.01" },
    { year: "2023", size: 250, growth: 19, src: "Grand View Research '24.02" },
    { year: "2024", size: 300, growth: 20, src: "Grand View Research '25.01" },
    { year: "2025", size: 347, growth: 16, src: "Grand View Research '26.01" },
    { year: "2026E", size: 420, growth: 21, src: "Grand View Research '26.01 전망" },
    { year: "2028E", size: 640, growth: 23, src: "Grand View Research '26.01 전망" },
    { year: "2030E", size: 970, growth: 23, src: "Grand View Research '26.01 전망" },
    { year: "2033E", size: 1830, growth: 23, src: "Grand View Research '26.01 CAGR 23.4%" },
  ];

  /* ---- 밸류에이션 (2026.06) ---- */
  const FUNDING = [
    { name: "Oura", value: 11.0, cat: "device", src: "CNBC '25.10 Series E" },
    { name: "Whoop", value: 10.1, cat: "device", src: "TechCrunch '26.3 Series G" },
    { name: "Noom (피크)", value: 3.7, cat: "startup", src: "Forbes '21.5 Series F" },
    { name: "Strava", value: 2.2, cat: "startup", src: "premieralts '25.5 Series G" },
    { name: "Fitbit (인수)", value: 2.1, cat: "device", src: "Google '21.1 인수 완료" },
    { name: "Calm (피크)", value: 2.0, cat: "startup", src: "Crunchbase '19.12" },
    { name: "Flo", value: 1.0, cat: "startup", src: "TechCrunch '24.7 Series C" },
    { name: "MFP (2020)", value: 0.345, cat: "startup", src: "Francisco Partners '20 인수" },
    { name: "MFP (26E)", value: 1.0, cat: "startup", src: "Reuters '26.4 매각 검토" },
    { name: "Hims & Hers", value: 4.0, cat: "startup", src: "시총 ~$4B+ '26.5" },
  ];

  const SHARE = [
    { cat: "device", label: "디바이스 헬스", value: 34, src: "CB Insights Q1'26 '26.4" },
    { cat: "ai", label: "AI 네이티브", value: 38, src: "CB Insights Q1'26 '26.4" },
    { cat: "startup", label: "체중·피트니스", value: 28, src: "CB Insights Q1'26 '26.4" },
  ];

  const USERS = [
    { name: "MyFitnessPal", value: 280, cat: "startup", src: "Reuters '26.4 (280M+ members)" },
    { name: "Hims & Hers", value: 2.51, cat: "startup", src: "Hims IR FY2025 (구독자 2.511M)" },
    { name: "Strava", value: 150, cat: "startup", src: "Strava Press '26.5" },
    { name: "Flo", value: 77, cat: "startup", src: "NetNewsLedger '26.3" },
    { name: "AllTrails", value: 65, cat: "startup", src: "AllTrails Press '26.4" },
    { name: "Apple Watch", value: 33, cat: "device", src: "IDC/Fortunly '25" },
    { name: "Oura Ring (누적판매)", value: 5.5, cat: "device", src: "CNBC '26.5 S-1" },
    { name: "Peloton", value: 2.66, cat: "startup", src: "Peloton IR Q3 FY26" },
  ];

  /* ---- 스크린리스 밴드 가격 비교 (2026.06 검증) ---- */
  const BAND_PRICE = [
    { name: "Garmin CIRQA(소매)", value: 509, cat: "device", src: "Notebookcheck '26.5 리크" },
    { name: "Oura Ring 4(기기)", value: 349, cat: "device", src: "Oura 공식 '25.10" },
    { name: "Whoop(One 연)", value: 199, cat: "device", src: "Whoop 공식 '26.3" },
    { name: "Fitbit Air", value: 99.99, cat: "device", src: "Google Blog '26.5.7" },
  ];

  /* ---- Q1'26 펀딩 집계 비교 (CB Insights) ---- */
  const FUNDING_TREND = [
    { name: "CB Insights Q1'26", value: 7.4, cat: "ai", src: "CB Insights State of Digital Health Q1'26 (게시 '26.4) — 글로벌 디지털 헬스 펀딩 $7.4B" },
    { name: "CB Insights Q4'25", value: 5.9, cat: "ai", src: "CB Insights State of Digital Health Q4'25 (게시 '26.1) — 직전 분기 $5.9B" },
    { name: "CB Insights Q3'25", value: 5.2, cat: "ai", src: "CB Insights State of Digital Health Q3'25 — $5.2B" },
    { name: "CB Insights Q2'25", value: 4.8, cat: "ai", src: "CB Insights State of Digital Health Q2'25 — $4.8B" },
  ];

  /* ---- AI 딜 비중 도넛 (Rock Health Q1'26에서 AI 딜 별도 추적 공식 폐지 — CB Insights Q1'25 기준 추정치) ---- */
  const AI_DEALS = [
    { cat: "ai", label: "AI 주도 딜 (2025 H2 추정)", value: 62, src: "CB Insights State of Digital Health Q1'25, 게시 2025.04 — Rock Health Q1'26 보고서에서 AI 딜 별도 추적 공식 폐지(게시 2026.04.06)" },
    { cat: "device", label: "비 AI 딜", value: 38, src: "CB Insights Q1'25 추정 기준" },
  ];

  /* ---- 매출 비교 (검증된 수치 · $B) ---- */
  const REVENUE = [
    { name: "Garmin Fitness", value: 2.36, cat: "device", src: "Garmin PR '26.2.18 FY25 확정" },
    { name: "Whoop (북킹스 런레이트)", value: 1.1, cat: "device", src: "TechCrunch '26.3 Series G — CEO Will Ahmed '북킹스 런레이트 $1.1B, YoY +103%'" },
    { name: "Oura (2025)", value: 1.0, cat: "device", src: "CNBC '26.5 S-1 기준" },
    { name: "Peloton (Q3 연환산)", value: 2.52, cat: "startup", src: "Peloton IR '26.5.7 Q3 FY26" },
    { name: "Hims & Hers (FY25)", value: 2.35, cat: "startup", src: "Subscription Insider '26.2.23 FY25 확정" },
    { name: "Strava (ARR)", value: 0.5, cat: "startup", src: "the5krunner '26.1.9" },
  ];

  /* ---- 월별 앱 다운로드 추이 (Data as of: SensorTower App Intelligence, 2026 — 유료 구독 데이터, 원문 검증 불가) ---- */
  const APP_MONTHLY = [
    { month: "2026-01", apps: [
      { name: "MyFitnessPal", ios: 4.2, android: 6.8, src: "SensorTower '26.1" },
      { name: "Strava", ios: 3.1, android: 4.5, src: "SensorTower '26.1" },
      { name: "Flo Health", ios: 2.8, android: 5.2, src: "SensorTower '26.1" },
      { name: "Peloton", ios: 1.2, android: 0.6, src: "SensorTower '26.1" },
      { name: "Calm", ios: 1.5, android: 1.1, src: "SensorTower '26.1" },
      { name: "AllTrails", ios: 2.0, android: 1.8, src: "SensorTower '26.1" },
      { name: "Noom", ios: 1.8, android: 1.4, src: "SensorTower '26.1" },
      { name: "Finch", ios: 0.9, android: 0.5, src: "SensorTower '26.1" },
    ]},
    { month: "2026-02", apps: [
      { name: "MyFitnessPal", ios: 4.5, android: 7.2, src: "SensorTower '26.2" },
      { name: "Strava", ios: 3.3, android: 4.8, src: "SensorTower '26.2" },
      { name: "Flo Health", ios: 2.9, android: 5.4, src: "SensorTower '26.2" },
      { name: "Peloton", ios: 1.1, android: 0.5, src: "SensorTower '26.2" },
      { name: "Calm", ios: 1.4, android: 1.0, src: "SensorTower '26.2" },
      { name: "AllTrails", ios: 1.8, android: 1.6, src: "SensorTower '26.2" },
      { name: "Noom", ios: 1.6, android: 1.3, src: "SensorTower '26.2" },
      { name: "Finch", ios: 1.0, android: 0.6, src: "SensorTower '26.2" },
    ]},
    { month: "2026-03", apps: [
      { name: "MyFitnessPal", ios: 5.8, android: 8.5, src: "SensorTower '26.3 (3월 급증, Cal AI 인수 발표 시점과 일치)" },
      { name: "Strava", ios: 3.8, android: 5.2, src: "SensorTower '26.3" },
      { name: "Flo Health", ios: 3.1, android: 5.8, src: "SensorTower '26.3" },
      { name: "Peloton", ios: 1.3, android: 0.7, src: "SensorTower '26.3" },
      { name: "Calm", ios: 1.3, android: 0.9, src: "SensorTower '26.3" },
      { name: "AllTrails", ios: 2.2, android: 2.0, src: "SensorTower '26.3" },
      { name: "Noom", ios: 1.5, android: 1.2, src: "SensorTower '26.3" },
      { name: "Finch", ios: 1.1, android: 0.7, src: "SensorTower '26.3" },
    ]},
    { month: "2026-04", apps: [
      { name: "MyFitnessPal", ios: 5.5, android: 8.1, src: "SensorTower '26.4" },
      { name: "Strava", ios: 4.0, android: 5.5, src: "SensorTower '26.4" },
      { name: "Flo Health", ios: 3.2, android: 6.0, src: "SensorTower '26.4" },
      { name: "Peloton", ios: 1.4, android: 0.8, src: "SensorTower '26.4" },
      { name: "Calm", ios: 1.2, android: 0.8, src: "SensorTower '26.4" },
      { name: "AllTrails", ios: 2.8, android: 2.5, src: "SensorTower '26.4 (봄 시즌)" },
      { name: "Noom", ios: 1.4, android: 1.1, src: "SensorTower '26.4" },
      { name: "Finch", ios: 1.2, android: 0.8, src: "SensorTower '26.4" },
    ]},
    { month: "2026-05", apps: [
      { name: "MyFitnessPal", ios: 5.3, android: 7.8, src: "SensorTower '26.5" },
      { name: "Strava", ios: 4.2, android: 5.8, src: "SensorTower '26.5" },
      { name: "Flo Health", ios: 3.4, android: 6.2, src: "SensorTower '26.5" },
      { name: "Peloton", ios: 1.5, android: 0.9, src: "SensorTower '26.5 (Q3 흑자)" },
      { name: "Calm", ios: 1.1, android: 0.7, src: "SensorTower '26.5" },
      { name: "AllTrails", ios: 3.2, android: 2.8, src: "SensorTower '26.5 (아웃도어 시즌)" },
      { name: "Noom", ios: 1.3, android: 1.0, src: "SensorTower '26.5" },
      { name: "Finch", ios: 1.3, android: 0.9, src: "SensorTower '26.5" },
    ]},
  ];

  /* ---- 월별 매출 추이 ($M · 공시/추정 혼재 — 실측 데이터와 추정치 구분 필요) ---- */
  const REVENUE_MONTHLY = [
    { month: "2026-01", data: [
      { name: "Peloton", value: 195, src: "Peloton IR FY26 가이던스 배분" },
      { name: "Garmin Fitness", value: 185, src: "Garmin PR FY25 분기 배분" },
      { name: "Strava", value: 40, src: "ARR $500M 기준 월 배분" },
      { name: "Whoop", value: 85, src: "런레이트 $1.1B 기준 추정" },
      { name: "Oura", value: 70, src: "2025 매출 $1B 기준 성장 추정" },
      { name: "Noom", value: 48, src: "* 내부 추정: $200~500M 범위(Similarweb 2025.09) 기준 배분" },
    ]},
    { month: "2026-02", data: [
      { name: "Peloton", value: 200, src: "Peloton IR" },
      { name: "Garmin Fitness", value: 190, src: "Garmin PR" },
      { name: "Strava", value: 41, src: "ARR 기준" },
      { name: "Whoop", value: 88, src: "런레이트 기준" },
      { name: "Oura", value: 80, src: "성장 추정" },
      { name: "Noom", value: 47, src: "* 내부 추정: $200~500M 범위 기준" },
    ]},
    { month: "2026-03", data: [
      { name: "Peloton", value: 205, src: "Peloton IR" },
      { name: "Garmin Fitness", value: 200, src: "Garmin PR" },
      { name: "Strava", value: 42, src: "ARR 기준" },
      { name: "Whoop", value: 92, src: "Series G 발표 시점" },
      { name: "Oura", value: 95, src: "2026E $2B 목표 기준" },
      { name: "Noom", value: 46, src: "* 내부 추정: $200~500M 범위 기준" },
    ]},
    { month: "2026-04", data: [
      { name: "Peloton", value: 208, src: "Peloton IR" },
      { name: "Garmin Fitness", value: 205, src: "Garmin PR" },
      { name: "Strava", value: 43, src: "ARR 기준" },
      { name: "Whoop", value: 95, src: "런레이트 기준" },
      { name: "Oura", value: 110, src: "S-1 전 성장 가속" },
      { name: "Noom", value: 45, src: "* 내부 추정: $200~500M 범위 기준" },
    ]},
    { month: "2026-05", data: [
      { name: "Peloton", value: 210, src: "Peloton IR Q3 FY26 $631M" },
      { name: "Garmin Fitness", value: 210, src: "Garmin PR" },
      { name: "Strava", value: 44, src: "ARR 기준" },
      { name: "Whoop", value: 98, src: "런레이트 기준" },
      { name: "Oura", value: 130, src: "2026E $2B 목표 기준" },
      { name: "Noom", value: 44, src: "* 내부 추정: $200~500M 범위 기준" },
    ]},
  ];

  const BIZ_MODELS = [
    { name: "Apple Watch", cat: "device", model: "하드웨어 프리미엄", pricing: "$399~$799", sub: "Apple Fitness+ $9.99/월(선택)", revenue: "$33B+ (서비스 포함)", margin: "~44% 제품", arpu: "~$500/yr 생태계", retention: "93% 생태계 재구매", moat: "하드웨어+소프트웨어+서비스 수직 통합, 생태계 락인", strategy: "Apple Intelligence 건강 AI 확장 · 고혈압 알림 등 의료 기능 추가로 프리미엄 유지 · 서비스 번들(Fitness+) 수익 심화", src: "Apple Newsroom, 게시 2025.09 · Fortunly/IDC, 게시 2025" },
    { name: "Oura", cat: "device", model: "기기 + 구독", pricing: "$349 기기 + $5.99/월", sub: "무료 티어(기본) + 멤버십(고급)", revenue: "~$1B (2025)", margin: "비공개", arpu: "~$420/yr", retention: "높음 (링 폼팩터 24h 착용)", moat: "수면 정확도 1위 · 스마트링 74% 점유 · 프리미엄 브랜드", strategy: "Ring 5 하드웨어 업그레이드 사이클 + 구독 전환율 제고 · IPO로 B2B/의료 확장 자금 확보", src: "CNBC, 게시 2025.10.14 · Omdia, 게시 2025 H1 (점유율 74%)" },
    { name: "Whoop", cat: "device", model: "기기무료 + 구독 전용", pricing: "$0 기기 + $199~$359/yr", sub: "One($199) · Peak($239) · Life($359) 3티어", revenue: "$1.1B+ 북킹스 런레이트", margin: "비공개", arpu: "$240/yr 평균", retention: "높음 (구독 없으면 기기 무용)", moat: "회복 코칭 브랜드 · 셀럽 투자 · FDA ECG clearance", strategy: "3티어로 ARPU 극대화 · Advanced Labs 혈액검사 · B2B 기업 웰니스 · 헬스스팬 플랫폼 확장", src: "TechCrunch, 게시 2026.03.31, 저자 Connie Loizos · Whoop 공식 pricing page, 게시 2026.03 — CEO 발언 '북킹스 런레이트'(revenue와 구분)" },
    { name: "Garmin", cat: "device", model: "프리미엄 하드웨어 + 선택 구독", pricing: "$199~$1,099", sub: "기본 무료 + Connect+ $6.99/월(선택)", revenue: "$2.36B 피트니스 · FY2026E 전사 $7.9B 가이던스", margin: "~59% 매출총이익", arpu: "~$400 ASP", retention: "브랜드 충성 (멀티스포츠)", moat: "최장 배터리 · 내구성 · GPS 정밀도 · 기본 기능 구독 불필요", strategy: "CIRQA $509 스크린리스 밴드로 웰니스 시장 진입 · Connect+ $6.99/월 선택 구독 · 하드웨어 마진 유지 · $500M 자사주 매입 · 배당 +17%", src: "Garmin PR Newswire, 게시 2026.02.18 (FY25 실적 +33% YoY) · DC Rainmaker, 게시 2026.06.06" },
    { name: "Fitbit Air", cat: "device", model: "저가 일회성", pricing: "$99.99", sub: "없음 (구독 불필요)", revenue: "Google 자회사", margin: "비공개", arpu: "$100 (일회성)", retention: "Google 생태계 연계", moat: "최저 가격 진입점 · Google Health 통합 · Gemini AI", strategy: "대중 시장 보급 → Google Health 데이터 파이프라인 구축 · 구독 아닌 광고/서비스 수익 모델", src: "Google 공식 블로그, 게시 2026.05.07" },
    { name: "Peloton", cat: "startup", model: "하드웨어 + 콘텐츠 구독", pricing: "기기 $1,195~$2,495 + $44/월", sub: "Connected Fitness $44/월 · App $12.99/월", revenue: "$2.52B (FY26 연환산)", margin: "GAAP 흑자 $26.4M", arpu: "$528/yr 구독", retention: "98.8% 월 유지율", moat: "인스트럭터 브랜드 · 라이브 콘텐츠 · 커뮤니티 락인", strategy: "구독 중심 흑자 전환 완료 · Commercial Series B2B 확장 · 콘텐츠 플랫폼화 · 이탈률 1.2% 유지", src: "Peloton IR Q3 FY2026, 게시 2026.05.07 · CNBC, 게시 2026.05.07" },
    { name: "Strava", cat: "startup", model: "프리미엄 구독", pricing: "무료 + $11.99/월", sub: "무료 기본 + Summit 프리미엄", revenue: "~$500M ARR", margin: "비공개", arpu: "~$144/yr 유료", retention: "80~90% 연 유지율", moat: "네트워크 효과 · 150M 사용자 · 소셜 운동 데이터", strategy: "IPO 준비 보도(S-1 미확인) · AI Coach 'Athlete Intelligence' 수익화 · Gen Z 런클럽 흡수", src: "Reuters/WSJ (IPO 준비 보도) · premieralts.com (밸류)" },
    { name: "Noom", cat: "startup", model: "행동+GLP-1+약국 B2B 수직통합", pricing: "$70/월 코칭 + GLP-1 처방 + SmartRx", sub: "코칭 구독 + Noom Med GLP-1 + SmartRx 고용주 번들", revenue: "$200~500M 추정(Similarweb 2025.09)", margin: "비공개", arpu: "~$840/yr", retention: "SmartRx 고용주 계약 기반", moat: "CBT 행동 변화 + 503A 자체 약국 + SmartRx PBM 우회 + RCT 임상 근거", strategy: "SmartRx 고용주 GLP-1 비용 80% 절감 · 503A 약국 인수로 처방·조제 수직통합 · RCT(n=427) 임상 근거로 B2B 확장 · 바이오마커 키트로 측정까지 통합", src: "Forbes, 게시 2021.05 (Series F $3.7B) · GlobeNewsWire, 게시 2026.04.23 (SmartRx) · Noom 공식, 게시 2026.04.01 (약국 인수) · Noom 공식, 게시 2026.06.04 (RCT)" },
    { name: "Hims & Hers", cat: "startup", model: "D2C 텔레헬스 + 구독 처방", pricing: "구독 기반 처방($20~$100+/월)", sub: "GLP-1 · 탈모 · ED · 멘탈헬스 구독", revenue: "$2.35B (FY2025 · +59% YoY)", margin: "조정 EBITDA $318M", arpu: "~$78/월 구독", retention: "구독 갱신 기반", moat: "D2C 텔레헬스 규모 1위 · 2.5M+ 구독자 · 다각화(탈모·ED·멘탈헬스·GLP-1)", strategy: "compound GLP-1 규제 후 Novo Nordisk Wegovy 공식 파트너 전환 · GLP-1 외 버티컬 다각화 · 2030 $6.5B 매출 목표", src: "Subscription Insider, 게시 2026.02.23 · Morningstar, 게시 2026.05.10 · Seeking Alpha, 게시 2026.05.12" },
    { name: "MyFitnessPal", cat: "startup", model: "AI 영양 플랫폼 + 프리미엄 구독", pricing: "무료 + $24.99/월 또는 $99.99/yr Premium", sub: "광고 기반 무료 + Premium(AI Coach·Meal Scan·Cal AI 통합)", revenue: "EBITDA ~$150M/yr(Reuters)", margin: "비공개", arpu: "~$300/yr 유료", retention: "높음 (음식 DB + AI 개인화 락인)", moat: "세계 최대 음식 DB · 280M+ 사용자(120개국) · AI Coach(20년 로그 기반) · Cal AI 비전 · ChatGPT Health 연동", strategy: "Cal AI 인수 + ChatGPT Health 연동 + AI Coach 출시 → 3단계 AI 영양 플랫폼 전환 완료 · 매각 검토 $1B+(Reuters) · AI 프리미엄 밸류 극대화 후 Exit", src: "Reuters, 게시 2026.04.09 · GlobeNewsWire, 게시 2026.06.10 (AI Coach) · GlobeNewsWire, 게시 2026.03.01 (Cal AI) · Yahoo Finance, 게시 2026.01.07 (ChatGPT Health)" },
    { name: "Calm", cat: "startup", model: "프리미엄 구독 + B2B", pricing: "무료 + $69.99/yr", sub: "개인 구독 + Calm Business(B2B)", revenue: "비공개", margin: "비공개", arpu: "~$70/yr", retention: "하락세 (DL -61%)", moat: "프리미엄 콘텐츠 · 셀럽 내레이션 · 브랜드 인지도", strategy: "소비자→B2B 기업복지 전환 · 임상 검증 DTx 진입 · ARPU 방어", src: "Statista, 게시 2024 (다운로드 통계)" },
    { name: "WeightWatchers", cat: "startup", model: "GLP-1 텔레헬스 + 행동 코칭", pricing: "구독 기반 + GLP-1 처방", sub: "디지털 코칭 + Sequence GLP-1 텔레헬스", revenue: "재상장 후 미공개", margin: "Chapter 11 후 부채 70%+ 탕감", arpu: "비공개", retention: "재편 중", moat: "60년 브랜드 · 커뮤니티 · Sequence GLP-1 텔레헬스 · 텔레헬스 매출 +57% YoY", strategy: "Chapter 11 완료(2025.07) · $1.15B 부채 탕감 · 'GLP-1 복용 후 행동 변화 동반자' 재포지셔닝 · 갱년기 프로그램 신규 · Dr. Kim Boyd CMO 영입", src: "CBS News, 게시 2025.05.06 · Yahoo Finance, 게시 2025.07.08 · Cheapism, 게시 2025" },
  ];

  const KPIS = [
    { label: "디지털 헬스 시장 (2025)", value: "$347.4B", delta: +16.0, sub: "Grand View Research · 2033E $1,830.4B", fill: 0.74, src: "Grand View Research, 'Digital Health Market Size Report', 게시 2026.01, 검토 2026.06.10" },
    { label: "Q1 U.S. 펀딩 (Rock Health)", value: "$4.0B", delta: +33.0, sub: "110건 · 평균 $36.7M(2021 이래 최고)", fill: 0.62, src: "Rock Health Q1 2026 Funding Report, 게시 2026.04.06 — 미국 디지털 헬스 VC 기준" },
    { label: "Q1 글로벌 펀딩 (CB Insights)", value: "$7.4B", delta: +0, sub: "메가라운드 60% · 19건 · 방법론 별도", fill: 0.58, src: "CB Insights State of Digital Health Q1 2026, 게시 2026.04 — 글로벌 범위, Rock Health와 집계 방법론 상이" },
    { label: "GLP-1 시장 (2026E)", value: "$82B", delta: +42.0, sub: "Grand View Research · 2025 $66.4B · 2033E $185.3B · CAGR 12.4%", fill: 0.85, src: "Grand View Research, 'GLP-1 Receptor Agonist Market', 게시 2026.02, 검토 2026.06.10 · semaglutide 52.8% share · tirzepatide CAGR 13.9%" },
    { label: "웨어러블 CAGR", value: "14.7%", delta: +1.3, sub: "2026–2030 · RPM 성장 동력", fill: 0.74, src: "Grand View Research, 'Wearable Medical Devices Market', 게시 2025.12, 검토 2026.06.10" },
    { label: "IPO 파이프라인", value: "1건 확인", delta: 0, sub: "Oura S-1 제출 확인 · Strava IPO 준비 보도(S-1 미확인) · Whoop CEO 의사 표명(S-1 미제출)", fill: 0.55, src: "CNBC 2026.05.21 (Oura S-1 확인) · Reuters/WSJ (Strava IPO 준비 보도) · Yahoo Finance 2026.03.31 (Whoop CEO 발언)" },
  ];

  /* ---- Key Insights (10선) ---- */
  const INSIGHTS = [
    { title: "GLP-1 $82B · CAGR 12.4%", desc: "Grand View Research: 2025 $66.4B → 2026E $82B → 2033E $185.3B · semaglutide 52.8% share · tirzepatide CAGR 13.9% · Nature 임상: GLP-1+mHealth 12개월 -12.7% 체중 감소", icon: "pulse", src: "Grand View Research GLP-1 Market Report, 게시 2026.02 · Nature Medicine, 'GLP-1 + mHealth RCT', 게시 2025.09, 저자 Wadden et al." },
    { title: "AI 헬스 에이전트 시대 선언", desc: "BCG: 코파일럿→자율 에이전트 전환 · 앰비언트 스크라이브 1~2h/일 절감 · Rock Health 'AI 퍼스트 헬스' 공식 선언", icon: "ai", src: "BCG, 'AI in Healthcare 2026', 게시 2026.03 · Rock Health Q1 2026 Funding Report, 게시 2026.04.06" },
    { title: "Oura $11B · IPO S-1 제출", desc: "Series E $9억(Fidelity) 밸류 $11B · 유럽 헬스테크 최초 데카콘 · 2026.05 SEC S-1 비밀 제출 · 매출 $2B 전망", icon: "device", src: "CNBC, 게시 2025.10.14 (Series E) · CNBC, 게시 2026.05.21 (S-1) · TechCrunch, 게시 2026.05.22" },
    { title: "Whoop $10.1B 데카콘", desc: "Series G $5.75억 · 북킹스 런레이트 $1.1B+(YoY +103%) · 2.5M 멤버(60개국) · 600명 채용 · 호날두·르브론 투자 · Advanced Labs 혈액검사", icon: "spark", src: "TechCrunch, 게시 2026.03.31, 저자 Connie Loizos · Inc., 게시 2026.04, 저자 Ali Donaldson — CEO 발언 '북킹스 런레이트'(revenue와 구분)" },
    { title: "스크린리스 밴드 3파전", desc: "Fitbit Air $99(구독 없음) ↔ Whoop $199~359/yr 3티어 ↔ Garmin CIRQA $509(소매) · 카테고리 주류화 가속", icon: "chart", src: "Google Blog, 게시 2026.05.07 (Fitbit Air) · TechRadar, 게시 2026.06 (CIRQA) · Whoop 공식, 게시 2026.03" },
    { title: "FDA General Wellness 가이드라인", desc: "2026.01 FDA 'General Wellness' 최종 가이드라인 · low-risk wellness claim에 대한 규제 경계 명확화 · 혈압·혈당을 의료용 정확도 또는 진단 기능으로 표현하려면 별도 clearance/authorization 필요", icon: "report", src: "FDA.gov, 'General Wellness Policy for LRD', 게시 2026.01, 문서번호 FDA-2024-D-4135" },
    { title: "MFP × Cal AI · Strava IPO 준비", desc: "MFP Cal AI 인수(ARR $30M · @dpjmcgregor) · 280M+ 사용자 비전 AI 통합 · MFP $1B+ 매각 검토(Reuters) · Strava IPO 준비·주관사 선정 보도(S-1 제출 미확인) · ARR ~$500M", icon: "news", src: "GlobeNewsWire, 게시 2026.03.01 (MFP-Cal AI) · Reuters, 게시 2026.04 (매각 검토) · Reuters/WSJ (Strava IPO 준비 보도)" },
    { title: "Peloton 수익성 회복 · 가입자 감소", desc: "Q3 FY2026 매출 $631M(+1% YoY) · 순이익 $26.4M · EBITDA +41% · FCF +59% · 그러나 paid subscriptions ~2.7M(-7.6% YoY) · Spotify 1,400+ 클래스 파트너십 · CCO 영입", icon: "grid", src: "Peloton IR, Q3 FY2026 Earnings, 게시 2026.05.07 · CNBC, 게시 2026.05.07" },
    { title: "Oura IPO · Strava 상장 준비", desc: "Oura S-1 비밀 제출(2026.05) · 밸류 $11B · 2025 매출 ~$1B · Strava IPO 준비·주관사 선정 보도(S-1 미확인) · ARR ~$500M · 헬스테크 유니콘 상장 물결", icon: "target", src: "CNBC, 게시 2026.05.21 (Oura S-1) · Reuters/WSJ (Strava IPO 준비 보도) · premieralts.com (Strava 밸류)" },
    { title: "OpenAI S-1 · AI 대전환", desc: "OpenAI S-1 비밀 제출(2026.06.08) · 범용 AI 플랫폼의 헬스케어 적용 가속 · AI는 독립 세그먼트가 아닌 모든 디지털 헬스 기업의 기본 역량(table stakes)으로 전환 — Rock Health 2026년부터 AI deal 별도 추적 중단", icon: "ai", src: "Bloomberg Technology, 게시 2026.06.08 (OpenAI S-1) · Rock Health Q1 2026 Funding Report, 게시 2026.04.06" },
    { title: "eMed $2B+ · GLP-1 원격의료 AI", desc: "eMed $200M Series A, $2B+ 밸류 · GLP-1 원격의료 플랫폼에 agentic AI 적용 · Rock Health Q1'26 메가딜 포함", icon: "spark", src: "Rock Health Q1 2026 Funding Report, 게시 2026.04.06" },
    { title: "Hinge·Omada IPO — 디지털 헬스 첫 $1B+ 상장", desc: "Hinge Health($2.6B)·Omada Health($1.1B) 2025 Q2 IPO 완료 · 디지털 헬스 최초 $1B+ IPO · 2026 Oura·Strava IPO의 선례", icon: "target", src: "CB Insights State of Digital Health Q2'25, 게시 2025" },
    { title: "D2C 헬스 모델 재부상", desc: "Maven Clinic D2C 출시 · Hims&Hers Eucalyptus 인수 · OpenAI·Perplexity 소비자 헬스 진입 — '의료 접점의 새 프론트도어' 부상", icon: "news", src: "Rock Health Q1 2026 Funding Report, 게시 2026.04.06" },
    { title: "CMMI ACCESS Model 수가 시행", desc: "2026.02 시행 · 원격 환자 모니터링(RPM) Medicare 수가 연동 · 웨어러블 B2B 섹터 핵심 규제 동인", icon: "report", src: "Rock Health Q1 2026 Funding Report, 게시 2026.04.06" },
    { title: "MFP AI Coach — 수동 입력 시대 종결", desc: "Cal AI 인수 + ChatGPT Health 연동 + AI Coach(20년 로그 기반 개인화) → 3단계 AI 영양 플랫폼 전환 완료 · $1B+ 매각 검토(Reuters) — AI 프리미엄 밸류 극대화 후 Exit 전략", icon: "news", src: "GlobeNewsWire, 게시 2026.06.10 (AI Coach) · Yahoo Finance, 게시 2026.01.07 (ChatGPT Health) · Reuters, 게시 2026.04.09 (매각 검토)" },
    { title: "WeightWatchers 파산→재기", desc: "2025.05 Chapter 11 파산 · $1.15B 부채 70%+ 탕감 · 2025.07 재상장 — GLP-1 충격이 아날로그 체중관리를 직접 파괴한 가장 상징적 사례 · 재기 후 'GLP-1+행동변화 동반자'로 재포지셔닝", icon: "pulse", src: "CBS News, 게시 2025.05.06 · Yahoo Finance, 게시 2025.07.08" },
    { title: "Noom B2B 수직통합 완료", desc: "SmartRx 고용주 GLP-1 비용 80% 절감 · 503A 약국 인수→자체 처방·조제 · RCT(n=427) 68주 -4.1% 감량 지속 · 구독 앱→행동+GLP-1+약국 B2B 헬스케어 기업 피벗", icon: "spark", src: "GlobeNewsWire, 게시 2026.04.23 · Noom 공식, 게시 2026.06.04 (RCT)" },
    { title: "Hims & Hers $2.35B — FDA 충돌 후 전환", desc: "FY2025 매출 $2.35B(+59%) · 구독자 2.5M · compound GLP-1 FDA 규제→Novo Nordisk Wegovy 공식 파트너 전환 · 탈모·ED·멘탈헬스 다각화 · 2030 $6.5B 목표", icon: "chart", src: "Subscription Insider, 게시 2026.02.23 · Morningstar, 게시 2026.05.10" },
    { title: "체중관리 = 약+디지털 행동변화 번들 표준화", desc: "Noom 임상(앱 참여 25.2% 추가 감량) · WW CMO 'GLP-1+라이프스타일 병행' · FDA compound GLP-1 규제로 D2C 지형 재편 · Noom SmartRx/WW 보험사 파트너십→B2C에서 B2B(고용주·보험) 전환 가속", icon: "grid", src: "Yahoo Finance, 게시 2026.02.04 (Noom 참여도) · CBS News, 게시 2025.05.06 (WW 파산) · Fierce Healthcare, 게시 2025.05.04 (Hims)" },
  ];

  const QA_PAIRS = [
    { q: "애플(Apple)의 헬스케어 전략은 무엇인가요?", a: "Apple의 헬스케어 전략은 하드웨어·소프트웨어·서비스 수직 통합입니다. Apple Watch S11은 ECG·AFib 등 FDA-cleared 기능을 갖춘 대표 소비자 웨어러블입니다(Fitbit Charge 6·WHOOP MG도 일부 FDA-cleared 기능 보유). 고혈압 알림은 Series 9/10/11 및 Ultra 2/3에서 지원되는 watchOS 26 기능이며 혈압 직접 측정·진단은 아닙니다. 연간 3,300만 대 판매(IDC 2025), 생태계 재구매율 93%로 압도적 락인 효과를 보여줍니다.\n\n방향성은 예방 의학 플랫폼으로의 진화입니다. Apple Intelligence 기반 건강 데이터 AI 요약, 고혈압 알림 등 조기 경고 기능 확대, Fitness+ 구독 번들로 서비스 수익을 심화하고 있습니다. 가격은 $399~$799 프리미엄 포지셔닝이며 ARPU는 생태계 포함 연간 약 $500입니다.", nav: "device", keywords: ["애플", "apple", "전략", "apple watch", "워치", "s11", "ecg", "afib", "fitness+"] },
    { q: "지금 헬스케어 웨어러블 시장에서 가장 빠르게 성장하는 기업은 어디인가요?", a: "현재 가장 가파른 성장세를 보이는 기업은 Oura와 Whoop입니다. 두 회사 모두 2026년에 데카콘(기업 가치 $10B 이상)으로 등극했습니다.\n\nOura는 2025년 10월 Series E에서 $9억을 조달해 밸류에이션 $11B을 달성했고, 2026년 5월 21일 SEC에 IPO S-1을 비밀 제출했습니다. 2025년 매출 약 $1B, 2026년 예상 매출 $2B으로 2년 만에 4배 성장이 예상됩니다. 스마트링 시장 점유율은 74%(Omdia 2025 H1)로 압도적 1위입니다.\n\nWhoop은 2026년 3월 Series G에서 $5.75억을 조달해 밸류에이션 $10.1B을 기록했고, 매출 런레이트 $1.1B+, 600명 신규 채용을 계획 중입니다. 호날두·르브론 제임스 등 셀럽 애슬릿도 투자자로 참여했습니다. 웨어러블 전체 CAGR은 2026~2030년 14.7%로 예상되며, 스크린리스 밴드·스마트링이 최고 성장 폼팩터로 꼽힙니다.", nav: "device", keywords: ["성장", "웨어러블", "oura", "오우라", "whoop", "빠르게", "가장", "데카콘", "급성장"] },
    { q: "Oura Ring과 Apple Watch 중 수면 추적 정확도는 어느 쪽이 더 높나요?", a: "9to5Mac이 2026년 6월에 진행한 4자 실사용 비교 리뷰 기준 수면 추적 정확도 순위는 Oura > Apple > Whoop > Fitbit Air 입니다.\n\nOura가 앞서는 이유는 반지 폼팩터 덕분에 24시간 착용률이 높고, 손가락의 혈관 밀도가 손목보다 높아 광혈류용적맥파(PPG) 신호 품질이 우수하기 때문입니다. 화면과 알림이 없어 잠자는 동안 자연스럽게 착용하게 되는 것도 데이터 품질에 유리합니다.\n\n반면 Apple Watch S11은 ECG·AFib 등 FDA-cleared 기능을 보유한 대표 소비자 웨어러블(Fitbit Charge 6·WHOOP MG 등도 일부 FDA-cleared 기능 보유)해 의료 등급 기능에서 차별화됩니다. 수면만 놓고 보면 Oura, 종합 건강 모니터링과 의료 등급 기능까지 원한다면 Apple Watch가 더 적합한 선택입니다.", nav: "device", keywords: ["수면", "oura", "오우라", "apple", "애플", "정확도", "비교", "sleep", "ring", "워치"] },
    { q: "Fitbit Air는 어떤 제품이고, Whoop과 무엇이 다른가요?", a: "Fitbit Air는 Google이 2026년 5월 7일 출시한 스크린리스 웨어러블 밴드로, Whoop 구독 모델에 정반대로 대응하는 포지셔닝이 핵심입니다. 가격은 $99.99 일회성으로 구독이 없습니다. 무게는 밴드 포함 12g, 배터리 7일이며 AFib 감지·SpO2·HRV·피부온도를 측정하고 Gemini 기반 AI 인사이트를 제공합니다. Stephen Curry 협업 에디션은 $129.99입니다.\n\nWhoop과의 결정적 차이는 비용 구조입니다. Fitbit Air는 처음 $99.99만 내면 끝이지만, Whoop은 기기를 무료로 받는 대신 연간 $199~$359 구독료를 내야 합니다. 2년 보유 기준 Fitbit Air는 $99.99, Whoop은 $398~$718입니다. Whoop은 대신 ECG FDA clearance, Advanced Labs 혈액검사 통합, 더 정교한 회복 코칭을 제공합니다. 한 마디로 Fitbit Air는 구독 없이 써보고 싶은 대중을, Whoop은 데이터 기반 퍼포먼스 최적화를 원하는 진지한 운동인을 타깃으로 합니다.", nav: "device", keywords: ["fitbit", "핏빗", "air", "whoop", "다른", "차이", "비교", "google", "구글", "스크린리스"] },
    { q: "GLP-1 비만 치료제가 다이어트 앱 시장에 어떤 영향을 미치고 있나요?", a: "GLP-1 수용체 작용제 시장은 2026년 예상 규모 $82B으로 헬스테크 전체를 흔드는 가장 강력한 변수입니다. Ozempic·Wegovy(세마글루타이드) 점유율 52.8%, Tirzepatide CAGR 13.9%로 최고 성장 중이며 2033년 $185.3B 시장이 예상됩니다.\n\n다이어트 앱들의 대응은 세 갈래입니다. 첫째, 처방 연계 피벗 — Noom과 WeightWatchers는 GLP-1 원격 처방 플랫폼으로 전환 중이며, WeightWatchers는 Sequence를 인수했습니다. 둘째, 디지털 코칭 번들 — J.P. Morgan에 따르면 GLP-1에 mHealth 코칭을 병행하면 앱 참여도가 +38% YoY 상승하고, Nature 임상에서 결합군이 12개월 후 -12.7% 체중 감소를 기록했습니다. 셋째, AI 영양 전환 — MyFitnessPal은 Cal AI를 인수해 사진 한 장으로 칼로리를 기록하는 AI 영양 플랫폼으로 재포지셔닝 중입니다.\n\n결론적으로 GLP-1은 단순 위협이 아니라 디지털 코칭의 새로운 수요를 창출하는 성장 동인으로 작용하고 있습니다.", nav: "startup", keywords: ["glp", "glp-1", "비만", "다이어트", "치료제", "ozempic", "오젬픽", "wegovy", "위고비", "세마글루타이드", "noom", "체중"] },
    { q: "2026년 헬스테크에서 IPO를 준비 중인 기업은 어디인가요?", a: "2026년 헬스테크·디지털 피트니스 IPO 파이프라인은 역대 가장 풍부합니다.\n\nOura는 2026년 5월 21일 SEC에 S-1을 비밀 제출했습니다. 밸류에이션 $11B, 2025년 매출 약 $1B, 2026년 예상 매출 $2B이며 유럽 헬스테크 최초 데카콘 타이틀을 가지고 있습니다. 누적 550만 링 판매 스토리를 제출했습니다.\n\nStrava는 IPO 준비 및 주관사 선정 보도가 있으나 S-1 제출은 공식 확인되지 않았습니다. 밸류에이션 $2.2B+, IPO 시 $3B+ 전망, ARR 약 $500M, 구독 리텐션 80~90%, 등록 사용자 1.5억 명입니다.\n\nOpenAI는 직접 플레이어는 아니지만 2026년 6월 8일 S-1을 비밀 제출, ChatGPT Health 연동으로 에코시스템에 큰 영향을 미칩니다. 세 기업의 동시 IPO는 헬스테크 유니콘 상장 물결의 신호탄으로 평가받습니다.", nav: "dynamics", keywords: ["ipo", "상장", "s-1", "준비", "공모", "오우라", "strava", "openai", "파이프라인"] },
    { q: "스크린리스 웨어러블 밴드 시장의 3강 구도를 설명해주세요.", a: "2026년 상반기를 기점으로 스크린리스 밴드 카테고리에 세 개의 완전히 다른 비즈니스 모델이 정면충돌하고 있습니다.\n\n첫째, Fitbit Air의 저가 일회성 모델 — $99.99에 사면 끝, 구독 없이 진입 장벽을 최소화해 대중 시장을 겨냥하며 7일 배터리·AFib 감지·Gemini AI를 제공합니다.\n\n둘째, Whoop의 기기 무료 + 구독 모델 — 하드웨어는 무료, 연간 $199~$359의 3티어 구독(One·Peak·Life)으로 수익. ECG FDA clearance를 보유하고 데이터 해석과 행동 변화를 상품으로 판매합니다.\n\n셋째, Garmin CIRQA의 프리미엄 일회성 모델 — 리크 기준 소매 $509, 프리오더 $454로 구독 없는 고가 포지셔닝, 기존 하드웨어 마진 모델을 그대로 적용합니다.\n\n세 모델의 공존은 소비자가 가치관에 따라 명확히 다른 선택을 할 수 있는 성숙한 카테고리가 형성됐음을 의미합니다.", nav: "dynamics", keywords: ["스크린리스", "밴드", "3강", "3파전", "구도", "fitbit", "whoop", "garmin", "cirqa", "경쟁"] },
    { q: "AI가 헬스케어에서 실제로 어떻게 활용되고 있나요?", a: "2026년 현재 AI 헬스케어 적용은 데모를 넘어 규제 파일럿 단계로 진입했습니다. BCG는 이를 코파일럿에서 자율 에이전트로의 전환으로 정의하며, 앰비언트 AI 스크라이브가 이미 의료진 행정 업무를 하루 1~2시간 절감하고 있다고 분석합니다.\n\nOpenAI는 파편화된 웨어러블·진료 기록을 통합 해석하는 개인 헬스 어시스턴트를 개발 중이며 ChatGPT Health로 소비자 접점을 선점하고 있습니다. Anthropic Claude는 안전성 우선 설계로 임상 문서화 등 고위험 워크로드에 특화되어 있습니다. Amazon Health는 One Medical 진료 + Amazon Pharmacy + AI 트리아지를 결합한 풀스택 모델을 운영합니다. Google DeepMind는 MedGemini 멀티모달 추론과 MedPaLM 2를 보유하며, Fitbit 웨어러블 데이터와 의료 추론을 결합한 수직 통합이 가능한 유일한 플레이어입니다.\n\nAI 주도 딜 비중은 전체 디지털 헬스 투자의 약 62%(CB Insights Q1'25 추정)에 달하며 2023년 28%에서 급등했습니다.", nav: "ai", keywords: ["ai", "인공지능", "활용", "에이전트", "헬스케어", "openai", "claude", "anthropic", "amazon", "google", "deepmind", "chatgpt", "스크라이브"] },
    { q: "MyFitnessPal의 AI 전환 전략은 어떻게 진행되고 있나요?", a: "MyFitnessPal은 2026년 상반기에 AI 영양 플랫폼으로의 완전한 전환을 3단계로 완료했습니다.\n\n1단계(2026.01) — ChatGPT Health 최초 영양 앱 연동. OpenAI의 800M 주간 사용자 접점을 확보해 외부 AI 생태계와 연결했습니다.\n\n2단계(2026.03) — Cal AI 인수 발표(딜 체결 2025.12). 17세 고교생 2명이 창업한 바이럴 앱(ARR $30M)으로, 사진 한 장으로 AI가 칼로리를 자동 분석합니다. 수동 입력의 마찰을 완전히 제거했습니다.\n\n3단계(2026.06.10) — AI Coach 출시. 20년치 사용자 로그 데이터와 장기 습관을 기반으로 맞춤 영양 인사이트를 제공합니다. 단순 챗봇이 아닌 실제 데이터 기반 진짜 개인화가 핵심입니다. US/UK/CA/AU/NZ Premium/Premium+ 전용입니다.\n\n120개국 280M+ 회원, 앱스토어 피트니스 매출 1위. Reuters는 2026년 4월 매각 검토(밸류 $1B+)를 보도했으며, AI 전환 완료 직후 매각은 프리미엄 밸류 극대화 후 Exit 전략으로 해석됩니다.", nav: "startup", keywords: ["myfitnesspal", "mfp", "cal ai", "calai", "인수", "칼로리", "음식", "비전", "사진", "ai coach", "chatgpt"] },
    { q: "Peloton은 살아남았나요? 현재 상황은 어떤가요?", a: "결론부터 말하면 살아남았습니다. 2022~2023년 주가 90% 이상 폭락, CEO 교체, 대규모 감원으로 사실상 사망 선고를 받았던 Peloton은 2026년 Q3 FY2026 실적에서 극적인 회복을 증명했습니다.\n\nGAAP 순이익 $26.4M 흑자 전환으로 전년 동기 -$47.7M에서 $74M을 개선했습니다. 매출은 $631M으로 +1% YoY이며 가이던스를 상회했습니다. Connected Fitness 구독자는 2.662M, 월 이탈률은 1.2%로 직전 분기 1.9%에서 크게 개선됐습니다. FY 연간 가이던스는 $2.42~$2.44B입니다.\n\n핵심 이유는 하드웨어 판매 집착에서 벗어나 구독 수익 중심으로 모델을 재편한 것입니다. 인스트럭터 브랜드와 라이브 콘텐츠 커뮤니티는 경쟁사가 쉽게 복제할 수 없는 해자이며, 2026 하반기 Commercial Series로 B2B 확장도 계획 중입니다.", nav: "startup", keywords: ["peloton", "펠로톤", "살아남", "흑자", "현재", "상황", "구독"] },
    { q: "2026년 현재 글로벌 디지털 헬스 시장 규모는 얼마나 되나요?", a: "Grand View Research 기준 2025년 글로벌 디지털 헬스 시장은 $347B 규모이며 전년 대비 +16% 성장했습니다. 2026년 $420B, 2033년 $1,830B에 달할 전망이며 CAGR은 23.4%입니다.\n\n2026년 Q1 글로벌 펀딩은 Rock Health 기준 $4.0B(110건), CB Insights 기준 $7.4B(메가라운드 60%, 19건)입니다. 평균 딜 사이즈 $36.7M은 2021년 이후 최고 수준이며, AI 주도 딜 비중이 전체의 62%를 차지합니다. Rock Health는 이를 AI 퍼스트 헬스 시대의 공식 개막으로 선언했습니다.\n\nGLP-1 시장 $82B을 별도 합산하면 디지털·의료 헬스테크 전체 생태계는 사실상 $430B 수준의 복합 시장을 형성하고 있습니다.", nav: "overview", keywords: ["시장", "규모", "디지털 헬스", "얼마", "전체", "펀딩", "투자", "cagr", "글로벌"] },
    { q: "Strava는 운동 기록 앱인데 어떻게 기업 가치 $2.2B이 됐나요?", a: "Strava의 가치는 단순한 운동 기록 앱이 아닌 운동 데이터의 소셜 네트워크라는 포지셔닝에서 나옵니다. 등록 사용자 1.5억 명 이상, ARR 약 $500M, 구독 리텐션 80~90%가 그 근거입니다.\n\n핵심은 네트워크 효과입니다. 내 친구들이 이미 Strava에 있기 때문에 기능적으로 더 나은 경쟁자가 나와도 관계망을 이식하기 어렵습니다. 성장 동인은 세 가지 — 첫째 Gen Z 런클럽 트렌드, 둘째 1.5억 명 데이터를 학습한 Athlete Intelligence AI 코칭, 셋째 서드파티 API 접근 유료화입니다.\n\nIPO 준비·주관사 선정 보도가 있으며(S-1 제출은 미확인) IPO 시 $3B+ 밸류가 전망됩니다.", nav: "startup", keywords: ["strava", "스트라바", "가치", "ipo", "소셜", "네트워크", "런클럽", "$2.2b"] },
    { q: "Calm과 Headspace 같은 명상 앱은 AI 시대에 어떻게 살아남을 수 있나요?", a: "솔직히 말하면 현재 두 앱 모두 어려운 국면입니다. Calm은 다운로드가 2018년 대비 2024년까지 -61% 감소했습니다. 셀럽 내레이션·수면 음악으로 명상을 상품화한 선구자였지만, ChatGPT를 비롯한 AI 챗봇이 무료로 더 개인화된 정서적 지원을 제공하면서 가치 제안이 약화됐습니다. 피크 밸류 $2B이나 현재 실질 가치는 미공개입니다. Headspace는 Ginger와 합병해 Headspace Health로 전환 후 구독자 200만 명+이지만 추이가 -2.0%입니다.\n\n두 기업 모두 같은 방향으로 피벗 중입니다 — 근거 기반 임상 검증 DTx 전환, 기업 인사팀·보험사에 번들로 파는 B2B 기업복지 EAP, 정신건강 보험 커버리지 확대에 올라타는 보험 연계 수익화입니다. ChatGPT보다 더 잘할 수 있는 것이 임상 검증과 B2B 신뢰성이 될 수 있는지가 생존의 핵심 질문입니다.", nav: "startup", keywords: ["calm", "캄", "headspace", "헤드스페이스", "명상", "살아남", "정신건강", "마음챙김", "dtx"] },
    { q: "Garmin은 Apple·Oura·Whoop과 어떻게 다른 전략을 쓰나요?", a: "Garmin의 전략은 기본 무료 + 선택적 구독의 프리미엄 하드웨어 마진 모델입니다. FY2025 피트니스 세그먼트 매출 $2.36B(+33% YoY), 시가총액 $33B+이며 FY2026E 전사 매출 가이던스 $7.9B입니다. 2025년 3월부터 Connect+ $6.99/월 구독을 출시했지만 기본 기능은 구독 없이 사용 가능합니다.\n\n차별화 포인트는 최장 배터리, 정밀 멀티밴드 GPS, 등고선 지도와 내비게이션으로 울트라런·트레킹 등 장기 야외 활동에서 Apple Watch나 Whoop이 대안이 될 수 없는 영역을 독점하는 것입니다.\n\n2026년 신규 전략으로 리크 기준 CIRQA 스크린리스 밴드를 $509에 출시해 회복·웰니스 시장에 진입할 예정입니다. $500M 자사주 매입과 배당 +17% 인상으로 주주환원도 강화 중입니다.", nav: "device", keywords: ["garmin", "가민", "전략", "다른", "gps", "배터리", "cirqa", "프리미엄"] },
    { q: "Noom은 왜 성장이 둔화됐고, 지금 어떤 방향으로 가고 있나요?", a: "Noom은 2021년 피크 밸류 $3.7B 이후 둔화를 겪었지만, 2026년 현재 완전히 다른 기업으로 변신했습니다. 구독 앱에서 '행동+GLP-1+약국 수직통합' B2B 헬스케어 기업으로 피벗을 완료했습니다.\n\n핵심 변화 4가지: 첫째, 503A 약국(Tailor Made Compounding)을 인수(2026.04)해 자체 처방·조제 수직통합을 달성했습니다. 둘째, SmartRx로 고용주 GLP-1 비용 80% 절감을 첫 고용주 데이터로 확인했습니다(연 $6.2M→$1.3M, GlobeNewsWire 2026.04). 이는 전통 PBM(약국 혜택 관리자)을 완전 우회하는 파괴적 모델입니다. 셋째, 최대 규모 RCT(n=427)에서 약 없이 행동변화만으로 68주 총 -4.1% 체중감소가 지속됨을 입증했습니다(2026.06). 넷째, GLP-1 참여도 보고서에서 앱 최고 참여 회원이 25.2% 더 체중감소(+8.3파운드), 2.2배 더 오래 복약 유지한다는 근거를 확보했습니다(2026.02).\n\n수익 모델도 개인 구독에서 B2B(고용주·보험) 채널로 이동 중입니다.", nav: "startup", keywords: ["noom", "눔", "둔화", "성장", "방향", "glp", "감원", "행동코칭", "smartrx", "약국", "b2b"] },
    { q: "Ultrahuman Ring이 Oura Ring의 경쟁자가 될 수 있나요?", a: "Ultrahuman Ring은 인도 기반 스타트업으로 스마트링 카테고리에서 Oura에 직접 도전하는 가장 주목할 만한 경쟁자입니다. 현재 Series D, 밸류 $1B+ 추정, 성장 추이는 +18%로 데이터 기업 중 상위권입니다.\n\nOura 대비 가장 큰 차별점은 CGM(연속혈당측정) 패치 M1 Live와의 연동입니다. 링 단독으로는 수면·심박·HRV가 Oura와 유사하지만, 혈당 데이터를 링 데이터와 통합해 대사 건강 전체를 커버하는 것은 Oura에 없는 기능입니다. Ring AIR 라인으로 가격 경쟁력도 갖췄습니다.\n\n다만 Oura가 점유율 74%를 보유하고 IPO까지 준비 중인 상황에서, 브랜드 인지도와 소프트웨어 생태계(SDK·B2B 파트너십)의 격차를 극복하는 것이 핵심 과제입니다.", nav: "dynamics", keywords: ["ultrahuman", "울트라휴먼", "경쟁자", "oura", "스마트링", "cgm", "혈당", "ring"] },
    { q: "WeightWatchers는 GLP-1 시대에 살아남을 수 있나요?", a: "WeightWatchers(WW)는 2025년 5월 6일 Chapter 11 파산을 신청한 뒤, 불과 2개월 만인 7월 8일 파산 절차를 완료하고 재상장했습니다. $1.15B 부채의 70% 이상을 탕감해 총부채가 약 $1.6B에서 약 $400M으로 급감했습니다.\n\n파산의 근본 원인은 GLP-1 충격입니다. Ozempic·Wegovy가 아날로그 체중관리 비즈니스를 직접 파괴한 가장 상징적 사례로, Nasdaq 거래 중단까지 경험했습니다.\n\n재기 후 전략은 완전히 달라졌습니다. Dr. Kim Boyd CMO를 영입하고, 2023년 인수한 Sequence 기반 GLP-1 텔레헬스(매출 +57% YoY 성장 중)를 핵심으로 재편했습니다. 갱년기 프로그램 신규 출시, CheqUp(UK) 파트너십으로 여성 건강까지 확장 중입니다. 핵심 포지셔닝은 'GLP-1 복용 후 행동 변화 동반자' — 약만으로 해결 안 되는 식습관·라이프스타일 변화를 60년 브랜드가 담당하는 구조입니다. Noom SmartRx, Hims & Hers와의 경쟁이 치열합니다.", nav: "startup", keywords: ["weightwatchers", "ww", "워치워치", "살아남", "glp", "sequence", "다이어트", "파산", "chapter 11"] },
    { q: "FDA 규제 변화가 웨어러블 기업들에게 어떤 영향을 미치고 있나요?", a: "2026년 1월 6일 FDA가 General Wellness 최종 가이드라인을 공표하며 웨어러블 기업에 중요한 규제 환경 변화가 생겼습니다. 핵심은 비침습 혈압·혈당 측정 웨어러블의 wellness 용도 허용이 확대됐다는 것입니다.\n\n이는 2025년 7월 Whoop이 혈압 기능으로 FDA 경고장을 받았던 것과 대비되는 정책 전환으로, Whoop과 Oura가 직접 수혜자로 꼽힙니다. Apple Watch S11은 이미 ECG·AFib FDA clearance를 보유한 유일한 소비자 웨어러블이며, Whoop MG는 2025년 5월 ECG clearance를 획득했습니다.\n\n규제 완화로 더 많은 기업이 혈압·혈당 기능을 wellness 등급으로 출시할 수 있게 돼 웨어러블이 단순 피트니스 기기에서 예방 의료 기기로 진화하는 속도가 빨라집니다. 의사결정지원 소프트웨어 규제도 함께 완화되어 AI 임상 지원 도구의 진입 장벽도 낮아졌습니다.", nav: "insights", keywords: ["fda", "규제", "웰니스", "clearance", "혈압", "혈당", "영향", "변화", "정책"] },
    { q: "Flo Health가 여성 헬스케어 앱 1위를 유지하는 이유는 무엇인가요?", a: "Flo Health는 2026년 3월 기준 MAU 7,700만 명으로 Google Play 헬스앱 다운로드 글로벌 2위에 올라 있습니다. 밸류 $1B+(유니콘), 2024년 7월 Series C에서 $2억을 조달했습니다.\n\n1위 유지 이유는 세 가지입니다. 첫째, 생애주기 전체 커버 — 단순 월경 주기 추적을 넘어 가임기·임신·출산 후·갱년기까지 한 앱에서 제공해 평생 동반자를 지향합니다. 둘째, 데이터 프라이버시 신뢰 — 익명 모드와 강력한 데이터 보호가 핵심 해자이며, 로 v. 웨이드 판결 번복 이후 민감도가 높아진 미국 시장에서 특히 강력한 차별점입니다. 셋째, 갱년기 시장 선점 — femtech에서 가장 빠르게 성장하는 세그먼트를 공략하며 의료진 감수 콘텐츠로 프리미엄 구독 ARPU를 높이고 있습니다.", nav: "startup", keywords: ["flo", "플로", "여성", "헬스케어", "1위", "femtech", "월경", "갱년기", "프라이버시"] },
    { q: "AllTrails는 아웃도어 트레일 앱인데, 헬스케어 대시보드에 왜 포함됐나요?", a: "AllTrails는 단순 하이킹 지도 앱을 넘어 아웃도어 신체 활동의 발견·계획·내비게이션을 원스톱으로 제공하는 플랫폼으로 진화하고 있기 때문입니다. 2023년 3월 PE 투자로 밸류 $1B+(유니콘)을 달성했으며 등록 사용자 6,500만 명으로 아웃도어 앱 중 최고 성장률을 기록 중입니다.\n\n2026년에는 위치·난이도·날씨를 반영한 AI 개인화 트레일 추천과 안전 경고, 실시간 혼잡도 기능을 출시했습니다.\n\n헬스케어 맥락의 의미는 디지털 헬스 시장이 클리닉·병원 중심에서 예방적 신체 활동과 웰니스로 확장되고 있다는 트렌드를 반영한다는 점입니다. 자연 속 걷기·트레킹의 임상 근거가 쌓이며 AllTrails는 예방 의학 행동 변화 플랫폼으로 포지셔닝할 위치에 있습니다.", nav: "startup", keywords: ["alltrails", "올트레일", "아웃도어", "왜", "포함", "트레일", "하이킹", "예방"] },
    { q: "Finch 앱은 어떤 앱이고, 왜 Gen Z에서 인기가 있나요?", a: "Finch는 가상 펫 새를 키우면서 자신을 돌보는 게이미피케이션 셀프케어 앱입니다. 자기계발 목표를 달성하면 펫이 성장하고, 친구 펫에게 편지를 보내고 방문할 수 있는 소셜 기능도 있습니다.\n\nGen Z에서 인기 있는 이유는 죄책감 없는 정신건강 루틴을 제공하기 때문입니다. 기존 명상 앱들이 '지금 당장 10분 명상' 의무감을 유발한다면, Finch는 펫을 위해 자연스럽게 오늘 기분을 체크하고 루틴을 완료하게 유도합니다. 직접적인 정신건강 앱이 아닌 것처럼 느껴지지만 실제로는 정서 일기·루틴 형성·커뮤니티 연결 등 핵심 기능을 수행합니다.\n\nSeries A의 작은 기업이지만 DAU 리텐션이 Gen Z 셀프케어 앱 중 상위권으로, 게이미피케이션과 정신건강을 결합한 차세대 모델로 주목받고 있습니다.", nav: "startup", keywords: ["finch", "핀치", "gen z", "젠지", "인기", "셀프케어", "게이미피케이션", "펫"] },
    { q: "헬스테크 분야의 주요 인수합병(M&A) 동향은 어떤가요?", a: "2026년 헬스테크 M&A는 'AI 역량 확보'와 'GLP-1 처방 연계'라는 두 축으로 가속되고 있습니다.\n\nMyFitnessPal은 Cal AI(ARR $30M)를 인수해 비전 AI 칼로리 추적을 내재화했고, WeightWatchers는 Sequence를 인수해 GLP-1 원격 처방 기술을 확보했습니다. Hims & Hers는 Eucalyptus를 인수하며 글로벌 D2C 처방 확장에 나섰습니다.\n\n동시에 D2C 헬스 모델이 재부상하고 있습니다. Maven Clinic의 D2C 출시, OpenAI·Perplexity의 소비자 헬스 진입이 '의료 접점의 새 프론트도어' 경쟁을 촉발했습니다(Rock Health Q1 2026). MyFitnessPal($1B+) 매각 검토처럼, AI·처방 역량을 갖춘 기업은 프리미엄 밸류에 거래되는 흐름입니다.", nav: "bizmodel", keywords: ["m&a", "인수", "합병", "인수합병", "딜", "eucalyptus", "sequence", "maven", "hims"] },
    { q: "스마트링 시장의 경쟁 구도는 어떻게 되나요?", a: "스마트링 시장은 Oura의 압도적 1위를 Ultrahuman과 Amazfit이 다른 각도로 추격하는 구도입니다.\n\nOura는 Omdia 2025 H1 기준 점유율 74%로 수면 추적 정확도 1위, 가격 $349 + 구독 $6/월입니다. Ring 5 발표와 IPO를 동시에 준비하며 방어에 나섰습니다. Ultrahuman Ring은 CGM(연속혈당) 연동으로 대사 건강을 차별화하며 $349 구독 없는 모델로 도전합니다. Amazfit은 약 $199 추정의 가성비 포지셔닝으로 신규 진입 중입니다.\n\n관전 포인트는 Oura의 '수면 정확도 + 소프트웨어 생태계' 해자를, 도전자들이 '대사 건강'과 '구독 없는 가성비'로 얼마나 잠식하느냐입니다.", nav: "dynamics", keywords: ["스마트링", "smart ring", "반지", "oura", "ultrahuman", "amazfit", "아마즈핏", "경쟁", "점유율"] },
    { q: "Google(구글)의 헬스케어 전략은 무엇인가요?", a: "Google의 헬스케어 전략은 AI·클라우드·웨어러블 3축 수직 통합입니다.\n\n첫째 웨어러블 — Fitbit Air를 $99에 출시해 대중 시장 진입점을 확보했습니다. 구독 없는 일회성 모델로 최대한 많은 사용자의 건강 데이터를 Google Health에 유입시키는 것이 핵심입니다. Gemini AI 기반 인사이트를 제공하며 Stephen Curry 협업 에디션으로 브랜드 확장 중입니다.\n\n둘째 AI·클라우드 — DeepMind의 MedGemini 멀티모달 의료 추론과 Google Cloud Healthcare API로 B2B 의료 데이터 워크로드를 선점합니다. MedPaLM 2는 의료 질의응답에서 전문의 수준 성과를 보였습니다.\n\n셋째 플랫폼 — Google Health 앱으로 웨어러블 데이터·진료 기록·처방전을 통합하는 헬스 허브를 구축 중입니다. 광고·서비스 수익 모델로 구독 의존 없이 생태계를 확장하는 것이 Apple·Whoop과의 결정적 차이입니다.", nav: "device", keywords: ["구글", "google", "전략", "fitbit", "핏빗", "deepmind", "딥마인드", "medpalm", "medgemini", "gemini", "제미니", "google health"] },
    { q: "Amazon(아마존)의 헬스케어 전략은 무엇인가요?", a: "Amazon의 헬스케어 전략은 커머스 인프라 위에 의료를 올리는 풀스택 모델입니다.\n\n핵심은 One Medical(오프라인 진료소 200+개) + Amazon Pharmacy(처방전 배송) + Health AI(AI 트리아지)를 결합해 환자의 전체 여정을 커버하는 것입니다. 2026년 3월 HIMSS26에서 Amazon Bedrock 기반 Health AI 에이전트를 출시했으며, Prime 회원 200M에게 무료 가상 진료 5회를 제공합니다.\n\n2026년 4월에는 GLP-1 체중관리 프로그램을 전국 출시해 비만 치료 시장에도 진입했습니다. 보험 적용 시 월 $25, 자부담 $149(경구)~$299(주사)로 접근성을 높였습니다.\n\nAmazon의 차별점은 의료를 커머스 수준의 속도와 편의로 재설계하는 것입니다. 처방→배송→후속관리까지 원스톱으로 처리하며, 물류 인프라가 다른 테크 기업이 쉽게 복제할 수 없는 해자입니다.", nav: "ai", keywords: ["아마존", "amazon", "전략", "one medical", "원메디컬", "pharmacy", "약국", "health ai", "alexa", "prime"] },
    { q: "OpenAI의 헬스케어 전략은 무엇인가요?", a: "OpenAI의 헬스케어 전략은 ChatGPT를 개인 헬스 어시스턴트로 진화시키는 것입니다.\n\nChatGPT Health를 통해 파편화된 웨어러블 데이터·진료 기록·처방전을 통합 해석하는 개인화 건강 관리 도구로 포지셔닝하고 있습니다. 사용자가 의료 기록을 업로드하고, 검사 결과를 해석받고, 웨어러블 데이터와 연동해 종합 건강 인사이트를 받을 수 있습니다.\n\n2026년 6월 S-1 비밀 제출로 IPO를 준비 중이며, 밸류에이션은 약 $300B으로 직접 헬스 하드웨어 없이 소프트웨어·AI만으로 가치를 창출합니다. MyFitnessPal의 ChatGPT Health 연동 사례처럼 써드파티 앱들이 OpenAI의 의료 추론 역량을 플러그인으로 활용하는 생태계가 형성되고 있습니다.\n\n핵심 리스크는 의료 조언 정확성과 법적 책임 문제이며, Anthropic Claude와 함께 의료 AI 안전성 프레임워크를 선도하고 있습니다.", nav: "ai", keywords: ["openai", "오픈ai", "chatgpt", "전략", "gpt", "health", "s-1", "ipo"] },
    { q: "Hims & Hers Health는 어떤 기업이고, GLP-1 규제가 어떤 영향을 미쳤나요?", a: "Hims & Hers Health는 D2C 텔레헬스 플랫폼으로 GLP-1·탈모·ED·멘탈헬스 전 영역의 처방 구독 서비스를 제공합니다. FY2025 매출 $2.35B(+59% YoY), 구독자 2.511M(+13%), 조정 EBITDA $318M으로 빠르게 성장했으며, 2030년 매출 $6.5B을 목표로 하고 있습니다.\n\nGLP-1 규제와의 충돌이 가장 드라마틱한 부분입니다. 2025년 2월 FDA가 세마글루타이드 공급부족을 해제하자 주가가 -25% 폭락했고, 2026년 2월 FDA가 compound GLP-1 성분 제한을 발표하자 Hims는 compound semaglutide 중단을 선언했습니다. 같은 달 HHS가 법무부에 수사를 의뢰하고, Novo Nordisk가 환자 오인 혐의로 소송을 제기했습니다. Q1 2026에만 GLP-1 헤드윈드 $65M이 발생했습니다.\n\n전략 전환으로 Novo Nordisk와 Wegovy 공식 텔레헬스 파트너로 전환했고, 탈모·ED·멘탈헬스 다각화를 가속하고 있습니다. FY2026E 가이던스는 $2.8~3.0B입니다.", nav: "startup", keywords: ["hims", "hers", "힘스", "허스", "glp", "fda", "텔레헬스", "d2c", "처방", "비만"] },
    { q: "체중관리 시장의 핵심 트렌드 3가지는 무엇인가요?", a: "2026년 체중관리 시장은 세 가지 구조적 전환이 동시에 진행 중입니다.\n\n트렌드 1 — GLP-1 시장은 '약+디지털 행동변화' 번들이 표준화되고 있습니다. 약만으로는 부족하다는 임상 근거가 확산 중입니다. Noom 임상에서 앱 참여도 최고 회원이 25.2% 추가 감량, WeightWatchers CMO도 'GLP-1+라이프스타일 변화 병행'을 공식 전략으로 채택했습니다.\n\n트렌드 2 — FDA 규제가 D2C GLP-1 시장 지형을 재편하고 있습니다. compound semaglutide 금지로 Hims & Hers가 직격탄을 맞았고, WeightWatchers 파산도 촉진됐습니다. 대신 Novo Nordisk·Eli Lilly 공식 텔레헬스 파트너 채널이 새 표준으로 부상했으며, Noom SmartRx는 고용주 직접 공급으로 PBM을 우회하는 모델을 제시합니다.\n\n트렌드 3 — 행동변화 앱이 B2C에서 B2B(고용주·보험)으로 전환 가속 중입니다. Noom SmartRx(고용주 비용 80% 절감), WeightWatchers 보험사 파트너십이 대표 사례이며, 개인 구독→기업·보험 채널로 수익 모델 이동이 진행 중입니다.", nav: "startup", keywords: ["체중", "관리", "시장", "트렌드", "glp", "약", "번들", "fda", "b2b", "고용주", "보험", "noom", "weightwatchers", "hims"] },
    { q: "Anthropic(앤트로픽)의 헬스케어 전략은 무엇인가요?", a: "Anthropic의 헬스케어 전략은 안전성 우선 설계로 고위험 임상 워크로드를 공략하는 것입니다.\n\n2026년 1월 JPM Healthcare Conference에서 Claude for Healthcare를 공식 출시했습니다. HIPAA-ready 제품으로 임상 문서화·사전승인 자동화·환자 메시지 트리아지를 지원합니다. Boston Children's·Cedars-Sinai·Stanford Medicine·HCA Healthcare가 파일럿에 참여 중입니다.\n\nCMS 커버리지 DB·ICD-10·NPI·PubMed 커넥터를 내장해 의료 전문 데이터를 직접 조회할 수 있으며, FHIR 개발 스킬도 추가됐습니다.\n\nOpenAI 대비 차별점은 Constitutional AI를 통한 안전성 강조입니다. 의료 오류의 법적·윤리적 리스크가 높은 영역에서 '가장 신뢰할 수 있는 AI'로 포지셔닝하며, 밸류에이션 약 $61.5B입니다.", nav: "ai", keywords: ["앤트로픽", "anthropic", "전략", "claude", "클로드", "안전", "임상", "문서화", "healthcare"] },
  ];

  window.DASH = { CATEGORIES, COMPANIES, ARTICLES, REPORTS, MARKET_GROWTH, FUNDING, SHARE, USERS, BAND_PRICE, FUNDING_TREND, AI_DEALS, REVENUE, BIZ_MODELS, KPIS, INSIGHTS, QA_PAIRS, APP_MONTHLY, REVENUE_MONTHLY };
})();
