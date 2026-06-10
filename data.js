/* ============================================================
   Health Intelligence Dashboard (2026.06.10)
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
    { cat: "device", name: "Apple", domain: "apple.com", unit: "Health · Watch S11", valuation: "공개(상장)", valAsof: "26.6", funding: "Public", metric: "Watch 판매", value: "33M/yr", metricAsof: "25 IDC", trend: +4.2,
      note: "Watch Series 11 · 고혈압 알림+수면 점수 신규 · ECG/AFib FDA clearance · 연 3,300만대(IDC 2025) · Apple Intelligence 헬스 확장",
      vp: "하드웨어·소프트웨어·서비스 수직 통합으로 의료 등급 건강 데이터를 일상 속에 — 소비자 웨어러블 중 유일한 FDA clearance(ECG/AFib) 보유",
      direction: "예방 의학 플랫폼으로 진화 · 고혈압 알림 등 조기 경고 기능 확대 · Apple Intelligence 기반 건강 데이터 AI 요약 · 생태계 락인 심화",
      url: "https://www.apple.com/newsroom/",
      sources: [
        "IDC / Fortunly — 2025 — https://fortunly.com/statistics/apple-watch-statistics/",
        "Apple Newsroom — 2025-09 — https://www.apple.com/newsroom/2025/09/apple-debuts-apple-watch-series-11-featuring-groundbreaking-health-insights/",
      ] },

    { cat: "device", name: "Fitbit Air", domain: "fitbit.com", unit: "Screenless Band", valuation: "Google 자회사", valAsof: "26.5", funding: "Public", metric: "가격", value: "$99.99", metricAsof: "26.5 출시", trend: +0,
      note: "2026.05 출시 · 12g(밴드 포함 · 본체 5.2g) · 스크린리스 · 7일 배터리 · AFib 감지 · SpO2·HRV·피부온도 · Google Health 앱 전환 · Whoop 직접 경쟁",
      vp: "구독 없는 $99.99 일회성 가격으로 스크린리스 트래킹의 진입 장벽 최소화 — Whoop 구독 모델의 정반대 포지셔닝",
      direction: "Google Health 생태계 통합 허브 · Gemini 기반 AI 헬스 인사이트 · 대중 시장(mass market) 웨어러블 보급 가속",
      url: "https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/",
      sources: [
        "Google 공식 블로그 — 2026-05-07 — https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/",
        "9to5Google — 2026-05-07 — https://9to5google.com/",
        "Android Central — 2026-05 — https://www.androidcentral.com/wearables/fitbit/google-fitbit-air-launch-specs-price",
      ] },

    { cat: "device", name: "Garmin", domain: "garmin.com", unit: "Fitness · Outdoor", valuation: "$33B+ 시총", valAsof: "26.6", funding: "Public", metric: "피트니스 매출(FY)", value: "$2.36B", metricAsof: "FY25 확정", trend: +12.8, trendBasis: "피트니스 세그먼트 매출 YoY",
      note: "FY2025 피트니스 세그먼트 $2.36B 확정 · +12.8% YoY · 프리미엄 라인 일부 +33% 상회 · CIRQA 스크린리스 밴드 $509(소매)/$454(프리오더, 리크) · 프리미엄 멀티스포츠 강세",
      vp: "프리미엄 멀티스포츠 특화 — 최장 배터리·내구성·정밀 GPS로 진지한 운동인(serious athlete) 시장 독점적 지위",
      direction: "공식 미발표 · 리크 기준 CIRQA $509 스크린리스 밴드로 회복·웰니스 시장 진입 · 구독 의존 없는 하드웨어 마진 모델 유지 · 아웃도어·마린 동반 성장",
      url: "https://www.garmin.com/en-US/newsroom/",
      sources: [
        "Garmin PR Newswire — 2026-02-18 — https://www.prnewswire.com/",
        "the5krunner — Garmin CIRQA — 2026-05-20 — https://the5krunner.com/2026/05/20/garmin-cirqa-connect/",
        "Notebookcheck — CIRQA $509/$454 — 2026-05 — https://www.notebookcheck.net/",
        "TechRadar — CIRQA — 2026-05 — https://www.techradar.com/health-fitness/smartwatches/garmins-cashing-in-on-the-screenless-whoop-style-smart-band-trend-with-its-upcoming-cirqa-heres-the-proof",
      ] },

    { cat: "device", name: "Oura", domain: "ouraring.com", unit: "Smart Ring", valuation: "$11B", valAsof: "25.10 Series E", funding: "Series E $900M", metric: "매출 전망", value: "$2B(26E)", metricAsof: "26E 전망", trend: +28.0, trendBasis: "밸류 YoY (Series D→E)",
      note: "Series E $9억 조달 밸류 $11B(CNBC 2025.10) · IPO S-1 비밀 제출(2026.05.21) · 유럽 헬스테크 최초 데카콘 · 스마트링 점유율 74%(2025 H1 Omdia) · 2025 매출 ~$1B · 2026 매출 $2B 전망",
      vp: "반지 폼팩터로 수면·회복 데이터 업계 최고 정확도 — 화면·알림 없는 '조용한 웨어러블'로 24/7 착용률 극대화",
      direction: "IPO 상장 추진 · 대사(혈당)·여성 건강 지표 확장 · 자체 AI 모델 개발 · B2B 기업 웰니스 및 방위 분야 진출",
      url: "https://ouraring.com/blog",
      sources: [
        "CNBC — 2025-10-14 — https://www.cnbc.com/2025/10/14/oura-ringmaker-valuation-fundraise.html",
        "TechCrunch — 2025-10-14 — https://techcrunch.com/2025/10/14/smart-ring-maker-oura-raises-900m-from-fidelity/",
        "CNBC IPO 제출 — 2026-05-21 — https://www.cnbc.com/2026/05/21/oura-smart-ring-ipo-filing.html",
        "TechCrunch S-1 — 2026-05-22 — https://techcrunch.com/2026/05/22/oura-ipo-s1-filing/",
      ] },

    { cat: "device", name: "Whoop", domain: "whoop.com", unit: "Recovery Band", valuation: "$10.1B", valAsof: "26.3 Series G", funding: "Series G $575M", metric: "매출 런레이트", value: "$1.1B+", metricAsof: "26.3", trend: +14.5, trendBasis: "매출 런레이트 YoY",
      note: "Series G $5.75억 조달 밸류 $10.1B 데카콘(TechCrunch 2026.03) · 매출 런레이트 $11억+ · 600명 채용 계획 · Whoop Labs Doha · Whoop MG ECG FDA clearance 획득(2025.05) · 3티어 구독: $199~$359/yr (One·Peak·Life)",
      vp: "기기 무료 + 구독 모델로 '회복 코칭 서비스'를 판매 — 하드웨어가 아닌 데이터 해석과 행동 변화가 상품",
      direction: "헬스스팬(healthspan·건강수명) 플랫폼으로 확장 · Advanced Labs 혈액검사 통합 · Abbott·Mayo Clinic 투자 유치로 임상 신뢰 확보",
      url: "https://www.whoop.com/thelocker/",
      sources: [
        "TechCrunch — 2026-03-31 — https://techcrunch.com/2026/03/31/whoop-valuation-10b-series-g-fundraise/",
        "Ventureburn — 2026-04 — https://ventureburn.com/whoop-raises-575m-at-10-1b-to-expand-healthspan-tech/",
        "Inc. — 2026-04 — https://www.inc.com/ali-donaldson/fresh-off-its-viral-turn-at-the-australian-open-whoop-scores-a-10-billion-valuation/91324137",
      ] },

    // ── AI Native ──
    { cat: "ai", name: "OpenAI Health", domain: "openai.com", unit: "Health Agent", valuation: "$300B+ (IPO 준비)", valAsof: "26.6 S-1 제출", funding: "내부 투자", metric: "헬스 파일럿", value: "S-1 제출", metricAsof: "26.6", trend: +0,
      note: "S-1 비밀 제출(2026.06.08) · 최근 세컨더리 $340B+ 보도 · 공모 전 밸류 미확정 · 개인 헬스 어시스턴트 개발 · 의료기관 파트너십 확대",
      vp: "범용 LLM의 추론 능력을 개인 건강 데이터에 연결 — 파편화된 웨어러블·진료 기록을 통합 해석하는 단일 에이전트",
      direction: "의료기관·보험사 데이터 파트너십 확보 · HIPAA 준수 파이프라인 구축 · ChatGPT Health로 소비자 접점 선점",
      url: "https://openai.com/news/",
      sources: [
        "Bloomberg — 2026-06 — https://www.bloomberg.com/technology",
      ] },

    { cat: "ai", name: "Anthropic Claude", domain: "anthropic.com", unit: "Clinical · Wellness", valuation: "$61B", valAsof: "25.03 Series E", funding: "Enterprise", metric: "헬스 API 채택", value: "확대", metricAsof: "26.6", trend: +0,
      note: "2025.03 Series E $61B · S-1 제출 준비 보도 · 추가 라운드 미발표 · 임상 문서화 파일럿 확대 · 구체 병원 수 공식 미확인",
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

    // ── Startups ──
    { cat: "startup", name: "MyFitnessPal", domain: "myfitnesspal.com", unit: "Cal AI 인수 통합", valuation: "$1B+ (매각 검토)", valAsof: "26.4 Reuters", funding: "PE 보유", metric: "등록 사용자", value: "200M+", metricAsof: "26.5", trend: +5.3,
      note: "Reuters 2026.04 매각 검토 보도 · 밸류 $1B+ 전망 · 2026.03 Cal AI 인수 발표(딜 체결 2025.12 · Cal AI ARR $30M, @dpjmcgregor) · 사진 AI 칼로리 비전 기본 통합 · 앱스토어 피트니스 매출 1위 · ChatGPT Health 연동",
      vp: "세계 최대 음식 데이터베이스 + 사진 한 장 AI 기록으로 칼로리 추적의 마찰(friction)을 제거",
      direction: "Cal AI·Intent 인수로 AI 영양 플랫폼 전환 · ChatGPT Health 연동 · 수동 입력 시대 종결 선언",
      url: "https://www.myfitnesspal.com/blog",
      sources: [
        "GlobeNewsWire — 2026-03-01 — https://www.globenewswire.com/news-release/2026/03/02/3247439/0/en/MyFitnessPal-Acquires-Cal-AI.html",
        "TechCrunch — 2026-03-02 — https://techcrunch.com/2026/03/02/myfitnesspal-has-acquired-cal-ai-the-viral-calorie-app-built-by-teens/",
        "Instagram @dpjmcgregor — Cal AI ARR $30M — https://www.instagram.com/dpjmcgregor/",
      ] },

    { cat: "startup", name: "Noom", domain: "noom.com", unit: "Behavioral Weight", valuation: "피크 $3.7B", valAsof: "21.5 Series F", funding: "Series F", metric: "유료 구독", value: "수백만", metricAsof: "25.12", trend: -3.4,
      note: "GLP-1 원격의료 병행 · 2022.10 감원 500명(전체 10%) · 현재 실질 밸류 미공개 · 처방 연계 전환 시도",
      vp: "심리학(CBT) 기반 행동 변화 코칭 — 식단이 아닌 '식습관의 심리'를 바꾸는 접근",
      direction: "GLP-1 원격 처방 결합 의료형 체중관리로 피벗 · 행동 코칭을 치료제의 디지털 동반자(companion)로 재포지셔닝",
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

    { cat: "startup", name: "Peloton", domain: "onepeloton.com", unit: "Connected Fitness", valuation: "~$2B+ 시총", valAsof: "26.5", funding: "Public", metric: "Connected 구독", value: "2.66M", metricAsof: "Q3 FY26 IR", trend: +0.8,
      note: "Q3 FY2026 GAAP 순이익 $26.4M 흑자 전환 · 구독 2.662M · 매출 $631M(+1% YoY) · 월 이탈률 1.2% · FY 가이던스 $2.42~2.44B",
      vp: "하드웨어+라이브 콘텐츠+커뮤니티 결합 몰입형 홈 피트니스 — 인스트럭터가 곧 브랜드",
      direction: "구독 중심 흑자 전환 완료 · CBU(Commercial Business Unit) 재통합 · 2026 하반기 Commercial Series 출하 · 콘텐츠 플랫폼화",
      url: "https://www.onepeloton.com/press",
      sources: [
        "Peloton IR Q3 FY2026 — 2026-05-07 — https://investor.onepeloton.com/",
        "CNBC — 2026-05-07 — https://www.cnbc.com/2026/05/07/peloton-pton-earnings-q3-2026.html",
      ] },

    { cat: "startup", name: "Strava", domain: "strava.com", unit: "Activity Social", valuation: "$2.2B+", valAsof: "25.5 Series G", funding: "Series G", metric: "등록 사용자", value: "150M+", metricAsof: "26.5", trend: +8.1,
      note: "IPO S-1 비밀 제출(2026.01) · Goldman Sachs 주간사 · ARR ~$500M · 리텐션 80~90% · AI 코치 'Athlete Intelligence' 출시",
      vp: "운동 데이터의 소셜 네트워크 — 기록 자체보다 '공유와 경쟁'이 만드는 네트워크 효과가 핵심 자산",
      direction: "IPO 상장(2026 상반기 전망) · Athlete Intelligence AI 코칭 수익화 · Gen Z 런클럽 트렌드 흡수",
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

    { cat: "startup", name: "WeightWatchers", domain: "weightwatchers.com", unit: "GLP-1 피벗", valuation: "~$0.5B 시총", valAsof: "26.6", funding: "Public", metric: "회원 수", value: "3.5M", metricAsof: "26.3", trend: -12.0,
      note: "GLP-1 원격 처방 플랫폼 피벗 · 2024 Sequence 인수(GLP-1 텔레헬스) · 전통 다이어트 → 처방 연계 모델 전환 · 구독 회원 감소세",
      vp: "60년 브랜드 인지도 + GLP-1 원격 처방을 결합하여 약물 치료의 행동 변화 동반자 포지셔닝",
      direction: "Sequence 기반 GLP-1 원격 처방 스케일업 · 디지털 코칭+약물 번들 · 브랜드 리포지셔닝",
      url: "https://www.weightwatchers.com/",
      sources: [
        "CNBC — 2024 — https://www.cnbc.com/",
      ] },

    { cat: "startup", name: "Headspace", domain: "headspace.com", unit: "Mental Health", valuation: "비공개 (합병)", valAsof: "24", funding: "합병 후 PE", metric: "구독자", value: "2M+", metricAsof: "25.12", trend: -2.0,
      note: "Headspace+Ginger 합병 → Headspace Health · B2B 기업복지 EAP 확장 · Calm과 명상 양강 구도 · 임상 검증 확대",
      vp: "과학 기반 명상·마인드풀니스 + 원격 상담(Ginger)을 결합한 정신건강 올인원 플랫폼",
      direction: "B2B EAP(직원지원프로그램) 성장 · 임상 연구 기반 DTx 진입 · Calm 대비 의료 채널 차별화",
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
    // ── 2026-06-10 (오늘) ──
    { date: "2026-06-10", cat: "device", source: "TechRadar", title: "Garmin CIRQA $509/$454 리크 — 공식 미발표 스크린리스 밴드 프리미엄 포지셔닝", summary: "· Garmin CIRQA 소매가 $509 / 프리오더 $454 확정(Notebookcheck)\n· 두 가지 사이즈(S/M·L/XL) · Body Battery·HRV·SpO2·스트레스 추적\n· 화면 완전 제거 · 구독 없는 일회성 프리미엄 모델\n· Whoop($30/월 구독)·Fitbit Air($99) 대비 최고가 포지셔닝", tag: "Launch", url: "https://www.techradar.com/health-fitness/smartwatches/garmins-cashing-in-on-the-screenless-whoop-style-smart-band-trend-with-its-upcoming-cirqa-heres-the-proof" },
    { date: "2026-06-10", cat: "device", source: "CNBC", title: "Oura, IPO S-1 비밀 제출… 밸류 $11B · 2025 매출 ~$1B · 2026E $2B", summary: "· 2026.05.21 SEC에 S-1 비밀 제출(CNBC 확인)\n· Series E $9억(Fidelity 주도·Iconiq 참여) 밸류 $11B\n· 2025 매출 ~$1B · 2026E $2B 전망(2년 만에 4배 성장)\n· 스마트링 점유율 74%(2025 H1 Omdia) · 누적 550만 링 판매 · 유럽 헬스테크 최초 데카콘", tag: "IPO", url: "https://www.cnbc.com/2026/05/21/oura-smart-ring-ipo-filing.html" },
    { date: "2026-06-10", cat: "startup", source: "TechCrunch", title: "MyFitnessPal, Cal AI 인수 발표 — 10대 창업자 ARR $30M 달성", summary: "· 2026.03.01 Cal AI 인수 공식 발표(딜 체결 2025.12)\n· Cal AI: 17세 고교생 2명 창업 · ARR $30M(@dpjmcgregor)\n· 사진 한 장으로 칼로리·영양소 자동 분석하는 비전 AI\n· MFP 2억 사용자에 통합 + Cal AI 별도 운영 · 앱스토어 피트니스 매출 1위", tag: "M&A", url: "https://techcrunch.com/2026/03/02/myfitnesspal-has-acquired-cal-ai-the-viral-calorie-app-built-by-teens/" },
    { date: "2026-06-10", cat: "ai", source: "Grand View Research", title: "GLP-1 시장 $82B(2026E)… 세마글루타이드+티르제파타이드 합산 $84.5B 전망", summary: "· Grand View Research: 글로벌 GLP-1 수용체 작용제 시장 $82B(2026E)\n· 2033년 $185.3B 전망 · 세마글루타이드 점유율 52.8%(2025)\n· Ozempic ~$19.5B + Wegovy ~$15.5B 피크 전망(2026)\n· 티르제파타이드 CAGR 13.9% 최고 성장 · 디지털 코칭 결합 표준화", tag: "Market", url: "https://www.grandviewresearch.com/industry-analysis/glp-1-receptor-agonist-market" },
    { date: "2026-06-10", cat: "startup", source: "TechCrunch", title: "Whoop, Series G $5.75억 조달 · 밸류 $10.1B 데카콘 등극", summary: "· 2026.03.31 Series G 완료 · $575M 조달 · 밸류 $10.1B(직전 $3.6B 대비 3배)\n· 매출 런레이트 $1.1B+ · 600명 채용 + Whoop Labs Doha 설립\n· Abbott·Mayo Clinic·Mubadala·QIA 등 전략 투자자 참여\n· 호날두·르브론·맥길로이 등 셀럽 애슬릿 투자 · 호주오픈 바이럴 효과", tag: "Funding", url: "https://techcrunch.com/2026/03/31/whoop-valuation-10b-series-g-fundraise/" },
    { date: "2026-06-10", cat: "device", source: "Wareable", title: "스크린리스 밴드 3파전 본격화 — Fitbit Air $99 vs Whoop 구독 vs Garmin CIRQA $509", summary: "· Fitbit Air: $99.99 일회성 · 12g · 7일 배터리 · AFib 감지 · 구독 불필요\n· Whoop: 기기 무료 + 3티어 구독($199~$359/yr) · ECG FDA clearance · $10.1B 데카콘\n· Garmin CIRQA: $509(소매)/$454(프리오더) · Body Battery 특화 · 구독 없는 프리미엄\n· 세 가지 비즈니스 모델(저가 일회성 vs 구독 vs 고가 일회성) 정면 충돌", tag: "Trend", url: "https://www.wareable.com/" },
    { date: "2026-06-10", cat: "ai", source: "BCG", title: "BCG: AI 에이전트가 헬스케어 최대 변혁 요소 — 앰비언트 AI 스크라이브 보편화", summary: "· BCG 2026 보고서: 코파일럿→자율 에이전트 전환 가속\n· 앰비언트 AI 스크라이브 의사 1일 1~2시간 문서화 절감\n· AI 에이전트가 행정 데이터와 임상 실무를 직접 연결\n· BCG × Hippocratic AI 전략 협업 · 행정 부담 30% 감소(Salesforce 2025 조사)", tag: "Report", url: "https://www.bcg.com/publications/2026/how-ai-agents-will-transform-health-care" },
    { date: "2026-06-10", cat: "startup", source: "SiliconAngle", title: "Strava, IPO S-1 비밀 제출 — Goldman Sachs 주간사 · ARR ~$500M", summary: "· 2026.01.08 S-1 비밀 제출 · Goldman Sachs + JPMorgan 주간사\n· 밸류 $2.2B+(Series G 2025.05) · IPO 시 $3B+ 전망\n· ARR ~$500M · 구독 리텐션 80~90% · 1.5억 등록 사용자\n· Gen Z 런클럽·소셜 기능이 성장 동력 · 활동 소셜 플랫폼 첫 상장", tag: "IPO", url: "https://the5krunner.com/2026/01/09/strava-ipo-filing-3-billion-valuation-analysis/" },
    { date: "2026-06-10", cat: "device", source: "Oura Blog", title: "Oura Ring 5 발표 — 세계 최소형 스마트링 · Gen 4 대비 30% 소형화", summary: "· Oura Ring 5 공식 발표 · 세계 최소형 스마트링\n· Gen 4 대비 30% 소형화 · 새 센서 어레이 탑재\n· 대사 건강·여성 건강 신규 지표 추가\n· Abu Dhabi DoH B2G 파트너십 — 정부 건강 프로그램 최초 스마트링 도입", tag: "Product", url: "https://ouraring.com/blog" },
    { date: "2026-06-10", cat: "device", source: "CNBC", title: "Whoop MG — TIME 2025 올해의 발명품 · ECG FDA clearance 획득", summary: "· Whoop MG ECG FDA clearance 획득(2025.05)\n· TIME 2025 Best Inventions 선정\n· 3티어 구독 개편: One $199/yr · Peak $239/yr · Life $359/yr\n· 혈중 산소·심전도·혈압 트렌드 통합 모니터링", tag: "Award", url: "https://www.cnbc.com/" },
    { date: "2026-06-10", cat: "device", source: "Forbes", title: "Garmin × Truemed — HSA/FSA 연동으로 '예방 의료비' 포지셔닝", summary: "· Garmin 공식 Truemed HSA/FSA 결제 연동 발표\n· 웨어러블 구매를 예방 의료비로 세금 혜택 적용\n· Fitbit Air · Oura도 HSA 적격 검토 중\n· 소비자 웨어러블의 '의료 기기화' 트렌드 가속", tag: "Strategy", url: "https://www.forbes.com/health/" },
    { date: "2026-06-10", cat: "startup", source: "Reuters", title: "MyFitnessPal $1B+ 매각 검토 — Cal AI·ChatGPT 연동 후 AI 프리미엄 전략", summary: "· Reuters 2026.04.09: MFP 매각 검토 보도 · 밸류 $1B+ 전망\n· 2020년 Francisco Partners $345M 인수 대비 3배 프리미엄\n· Cal AI 인수 + ChatGPT Health 연동으로 AI 영양 플랫폼 전환 완료\n· 2억 사용자 + AI 기술 스택이 프리미엄 정당화", tag: "M&A", url: "https://www.reuters.com/" },

    // ── 2026-06-09 ──
    { date: "2026-06-09", cat: "ai", source: "Rock Health", title: "Q1 2026 디지털 헬스 펀딩 $4.0B/110건 — 자본 집중·AI 시대 공식화", summary: "· Rock Health: $4.0B/110건 · 평균 딜 $36.7M(2021 이래 최고)\n· 메가딜($100M+) 12건 — 팬데믹 피크(Q1 2022) 이후 최다\n· CB Insights 별도 집계: $7.4B(메가라운드 60% · 19건)\n· '있는 자/없는 자' 양극화 — 검증된 AI 기업에 자본 집중", tag: "Report", url: "https://rockhealth.com/insights/q1-2026-funding-overview-capital-continues-concentrating-and-four-other-market-signals/" },
    { date: "2026-06-09", cat: "device", source: "9to5Mac", title: "Apple Watch S11 vs Oura vs Fitbit Air vs Whoop — 수면·심박 정확도 실사용 비교", summary: "· 4자 실사용 비교: 수면 추적·심박 정확도·배터리·가격 종합 순위\n· Apple Watch: 유일 FDA clearance(ECG/AFib) · 고혈압 알림 신규\n· Oura: 수면 정확도 최고 · Fitbit Air: 가성비 최강\n· Whoop: 회복(Recovery) 분석 최고 · 운동 강도 코칭 우위", tag: "Review", url: "https://9to5mac.com/" },
    { date: "2026-06-09", cat: "startup", source: "CNBC", title: "Peloton Q3 FY2026 흑자 전환 — GAAP 순이익 $26.4M · 구독 2.662M", summary: "· Q3 FY2026 매출 $631M(+1% YoY · 가이던스 상회)\n· GAAP 순이익 $26.4M — 전년 동기 -$47.7M에서 $74M 개선\n· Connected Fitness 구독 2.662M · 월 이탈률 1.2%(전분기 1.9%)\n· FY 가이던스 $2.42~2.44B · Precor 브랜드 통합 효과", tag: "Earnings", url: "https://www.cnbc.com/2026/05/07/peloton-pton-earnings-q3-2026.html" },
    { date: "2026-06-09", cat: "ai", source: "Reuters", title: "Anthropic, Claude 기반 임상 문서화 파일럿 확대", summary: "· 진료 기록 자동화·요약 워크로드 실증 진행\n· 구체 병원 수 공식 미확인 · 엔터프라이즈 채택 확대\n· 의료 AI 안전성 프레임워크 동시 발표", tag: "Enterprise", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },
    { date: "2026-06-09", cat: "startup", source: "Axios", title: "Noom, GLP-1 원격의료로 무게중심 이동 — 행동 코칭+처방 결합", summary: "· 행동 코칭 + 비만 치료제 처방 결합 모델 전환\n· 2023 감원 500+명 이후 조직 재편 완료\n· Nature 연구: GLP-1+mHealth 12개월 -12.7% 체중 감소\n· 앱 참여도(engagement)가 감량 결과를 직접 결정", tag: "Strategy", url: "https://www.axios.com/" },

    // ── 2026-06-08 ──
    { date: "2026-06-08", cat: "ai", source: "WSJ", title: "Amazon, One Medical에 AI 트리아지 결합… 가상 진료 속도 개선", summary: "· 증상 분류 AI 선처리 → 의료진 연결 시간 단축\n· Alexa+ 의료 기능 출시 · Amazon Pharmacy 통합\n· One Medical 회원 100만+ 기반 확장\n· 의료를 커머스 수준의 속도·편의로 재설계", tag: "Product", url: "https://www.wsj.com/health" },
    { date: "2026-06-08", cat: "device", source: "9to5Google", title: "Fitbit Air 출시 — $99.99 스크린리스 밴드 · 12g · 7일 배터리", summary: "· Google Fitbit Air 2026.05 출시 · 구독 없음(Premium 3개월 무료)\n· 12g(밴드 포함) · Inspire 3 대비 50% 소형화\n· AFib 감지·SpO2·HRV·피부온도 · 5분 충전 1일 사용\n· Stephen Curry 협업 에디션 $129.99 · Google Health 앱 전환 가속", tag: "Launch", url: "https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/" },
    { date: "2026-06-08", cat: "ai", source: "The Verge", title: "빅테크 헬스 경쟁의 핵심은 'AI 헬스 에이전트' 레이어 장악", summary: "· 디바이스·앱 위에서 사용자를 조율하는 에이전트 레이어 주도권 경쟁\n· OpenAI·Google·Amazon·Anthropic 4파전 구도\n· BCG: 앰비언트 AI 스크라이브 → 자율 임상 에이전트 전환\n· 데이터 허브를 장악하는 자가 헬스케어 가치사슬 지배", tag: "Analysis", url: "https://www.theverge.com/health" },
    { date: "2026-06-08", cat: "startup", source: "TechCrunch", title: "비전 AI 칼로리 추적 경쟁 — MFP Cal AI 통합이 바꾼 판도", summary: "· MFP의 Cal AI(ARR $30M) 인수로 경쟁 구도 급변\n· 사진 한 장 식단 기록이 카테고리 표준 기능화\n· Snapcalorie 등 독립 비전 AI 앱 차별화 압박 심화\n· 정밀 영양소 분석·웨어러블 연동이 차세대 격전지", tag: "Analysis", url: "https://techcrunch.com/" },

    // ── 2026-06-07 ──
    { date: "2026-06-07", cat: "device", source: "9to5Mac", title: "Apple Watch S11 vs Oura Ring 4 vs Fitbit Air vs Whoop MG — 4자 실사용 비교 리뷰", summary: "· 수면 추적 정확도: Oura > Apple > Whoop > Fitbit Air\n· 의료 등급: Apple Watch 유일 FDA clearance · 나머지 wellness\n· 가성비: Fitbit Air $99 최고 · Whoop 구독 $30/월 · Oura 링 $349+구독\n· 폼팩터별 수요 분화 — 손목(워치·밴드) vs 손가락(링) 공존 확인", tag: "Review", url: "https://9to5mac.com/" },

    // ── 2026-06-06 ──
    { date: "2026-06-06", cat: "startup", source: "Forbes", title: "Flo Health MAU 7,700만 돌파 — femtech 유니콘 갱년기 시장 정조준", summary: "· MAU 7,700만(NetNewsLedger 2026.03) · Google Play 다운로드 2위\n· femtech 유니콘 생애주기 전반 확장\n· 갱년기·불임 등 여성 건강 전 영역 서비스 확장\n· 익명 모드 등 데이터 프라이버시가 신뢰 해자", tag: "Growth", url: "https://www.forbes.com/health/" },
    { date: "2026-06-06", cat: "device", source: "DC Rainmaker", title: "Garmin FY2025 피트니스 매출 $2.36B 확정 · +12.8% YoY", summary: "· FY2025 피트니스 세그먼트 $2.36B 확정(Garmin PR Newswire 2026.02)\n· 프리미엄 멀티스포츠 수요 견조 · 시총 $33B+\n· CIRQA 스크린리스 밴드로 Whoop 직접 경쟁 예고\n· 구독 의존 없는 하드웨어 마진 모델 차별화", tag: "Earnings", url: "https://www.dcrainmaker.com/" },
    { date: "2026-06-06", cat: "startup", source: "The Information", title: "Strava AI 코치 'Athlete Intelligence' — 1.5억 사용자 대상 출시", summary: "· 누적 운동 데이터 해석 개인화 훈련 인사이트\n· IPO S-1 제출(2026.01) · Goldman Sachs 주간사\n· ARR ~$500M · 리텐션 80~90% · Gen Z 런클럽 드라이브 성장\n· API 접근 제한·유료화로 IPO 전 수익성 정비", tag: "Product", url: "https://www.theinformation.com/" },

    // ── 2026-06-05 ──
    { date: "2026-06-05", cat: "ai", source: "STAT News", title: "파운데이션 모델 헬스 에이전트, 데모 넘어 규제 파일럿 단계로", summary: "· 임상·규제 환경 실증 시작 · 안전성 검증 프레임 구축\n· FDA AI/ML 가이드라인 업데이트 반영\n· STAT: 앰비언트 스크라이브 비용 증가 우려 보도(2026.04)\n· 문서화 효율 vs 청구 코드 상향(upcoding) 논쟁 시작", tag: "Trend", url: "https://www.statnews.com/2026/04/08/are-scribes-raising-health-care-costs-ai-prognosis/" },
    { date: "2026-06-05", cat: "device", source: "Wareable", title: "Apple Health, Watch S11에 고혈압 알림 + 수면 점수 탑재", summary: "· 고혈압 알림: 30일간 광학 센서 혈관 반응 분석 후 알림\n· 수면 점수: 수면 시간·중단·일관성·단계 종합 평가\n· Apple Intelligence 헬스 요약 기능 확장\n· 2026 모델은 디자인 유지 · 센서 수 증가 전망(MacRumors)", tag: "Product", url: "https://www.wareable.com/" },
    { date: "2026-06-05", cat: "startup", source: "TechRadar", title: "운동 앱 AI 개인화 경쟁 본격화 — Strava·Ladder·AllTrails", summary: "· 추천·코칭 품질이 구독 유지율 가르는 핵심 변수\n· Strava Athlete Intelligence · Ladder AI 맞춤 · AllTrails AI 추천\n· 개인화 수준이 유료 전환율 직접 결정\n· 범용 AI 코치 vs 버티컬 특화 코치 경쟁 구도 형성", tag: "Trend", url: "https://www.techradar.com/health-fitness" },

    // ── 2026-06-04 ──
    { date: "2026-06-04", cat: "startup", source: "TechCrunch", title: "AllTrails 6,500만 가입자 대상 AI 트레일 추천 출시", summary: "· 위치·난이도·날씨 반영 맞춤 트레일 추천\n· 아웃도어 앱 최고 성장률 · AI 안전 경고 추가\n· 실시간 혼잡도 표시 기능 업데이트", tag: "Launch", url: "https://techcrunch.com/" },
    { date: "2026-06-04", cat: "ai", source: "CNBC", title: "Google·Amazon·MS, 헬스 AI 인프라 투자 가속", summary: "· Azure Health Bot + AWS HealthScribe + Google MedPaLM\n· 클라우드·모델 사업자 헬스 데이터 워크로드 선점 경쟁\n· 의료 특화 LLM 인프라 구축 가속", tag: "Analysis", url: "https://www.cnbc.com/health-and-science/" },
    { date: "2026-06-04", cat: "device", source: "Android Central", title: "스마트링 경쟁 격화 — Oura $11B vs Samsung Galaxy Ring (2027 예상)", summary: "· Oura IPO S-1 제출 · Samsung Galaxy Ring 2세대 2026 출시 지연 → 2027 예상\n· 2026 스마트링 출하량 전년비 2배 전망\n· Ultrahuman·Amazfit 등 신규 진입 가속\n· Oura 점유율 74%(Omdia) 방어 vs 가격 경쟁 압박", tag: "Market", url: "https://www.androidcentral.com/wearables" },

    // ── 2026-06-03 ──
    { date: "2026-06-03", cat: "device", source: "Bloomberg", title: "Oura Series E $9억 후 사업 확장 — $11B 밸류 · IPO 로드맵", summary: "· Series E $9억(Fidelity 주도) 밸류 $11B(CNBC 2025.10)\n· 대사·여성건강 신규 지표 확장 · Ring 4 글로벌 출시 완료\n· 기업 B2B 웰니스·방위 분야 진출 · 자체 AI 모델 개발", tag: "Funding", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-03", cat: "startup", source: "Axios", title: "Calm·Headspace, 임상 검증 정신건강 서비스로 전환", summary: "· 명상 앱 다운로드 하락세(-61%, 2018→2024 Statista)\n· 근거 기반 디지털 치료제(DTx) 이동\n· B2B 기업복지 + 보험 연계 수익화 전략", tag: "Strategy", url: "https://www.axios.com/" },
    { date: "2026-06-03", cat: "ai", source: "Reuters", title: "Q1 AI 네이티브 헬스 스타트업에 사상 최대 자본 유입", summary: "· Rock Health: Q1 $4.0B/110건 · CB Insights: $7.4B\n· 메가딜 12건 · 평균 딜 $36.7M(2021 이래 최고)\n· AI 주도 딜 비중 62% · '있는 자/없는 자' 양극화 심화", tag: "Funding", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },

    // ── 2026-06-02 ──
    { date: "2026-06-02", cat: "device", source: "DC Rainmaker", title: "Fitbit Air 심층 리뷰 — $99 밴드의 실제 수면·심박 정확도 검증", summary: "· DC Rainmaker 심층 실사용 테스트 · 수면 추적·심박 정확도 측정\n· $99 가격 대비 상위 가성비 평가 · 7일 배터리 실측 확인\n· Whoop 대비 구독 없는 일회성 모델 강점 · 단, 스크린 없는 UX 한계\n· Fitbit Air WSJ 수면 순위: 학술 미검증(peer-reviewed study 아님) 명시", tag: "Review", url: "https://www.dcrainmaker.com/" },

    // ── 2026-05-31 ──
    { date: "2026-05-31", cat: "device", source: "the5krunner", title: "스크린리스 밴드 심박 정확도 비교 — Whoop vs Fitbit Air vs Garmin CIRQA", summary: "· the5krunner 실측 HR 비교 테스트\n· Whoop: 안정 시 정확도 높음 · 운동 중 편차 존재\n· Fitbit Air: $99 가격 대비 합리적 정확도 · 고강도 운동 시 한계\n· Garmin CIRQA: Body Battery 알고리즘 차별화 · 가격 $509 프리미엄", tag: "Review", url: "https://the5krunner.com/" },

    { date: "2026-06-02", cat: "ai", source: "The Verge", title: "Samsung Health, Galaxy Watch 7 앞두고 AI 코칭 확장 예고", summary: "· 온디바이스 AI 실시간 코칭 강화\n· Galaxy Watch 7 + One UI Health 대규모 업데이트\n· Samsung Health 에이전트 기능 2026 하반기 출시 예정", tag: "Product", url: "https://www.theverge.com/health" },
    { date: "2026-06-02", cat: "device", source: "CNBC", title: "웨어러블 RPM 시장 연 14.7% 성장 — TAM $660B(2030E)", summary: "· 만성질환 관리 수요 · 웨어러블 원격환자모니터링 확대\n· 2026~2030 CAGR 14.7% · TAM $660B(2030E)\n· 보험 적용 범위 확대가 성장 핵심 동력", tag: "Market", url: "https://www.cnbc.com/health-and-science/" },

    // ── 2026-05-22 ──
    { date: "2026-05-22", cat: "device", source: "TechCrunch", title: "Oura S-1 비밀 제출 — 스마트링 유니콘 IPO 로드맵 본격화", summary: "· 2026.05.21 SEC S-1 비밀 제출(CNBC·TechCrunch 확인)\n· 2025 매출 ~$1B · 2026E 매출 $2B 전망(2년 만에 4배 성장)\n· 누적 550만 링 판매 · 스마트링 시장 점유율 74%(Omdia 2025)\n· 유럽 헬스테크 최초 데카콘 · Series E $9억 밸류 $11B", tag: "IPO", url: "https://techcrunch.com/2026/05/22/oura-ipo-s1-filing/" },

    // ── 2026-05-21 ──
    { date: "2026-05-21", cat: "device", source: "Forbes", title: "Garmin CIRQA $509 — 프리미엄 스크린리스 밴드의 가격 정당성 분석", summary: "· Garmin CIRQA 소매가 $509 / 프리오더 $454 확정(Notebookcheck)\n· Fitbit Air($99)·Whoop 구독($30/월) 대비 5배 프리미엄\n· Body Battery·HRV·SpO2·스트레스 추적 · 구독 없는 일회성 모델\n· 가민 브랜드 충성도 + 멀티스포츠 생태계가 프리미엄 정당화", tag: "Analysis", url: "https://www.forbes.com/health/" },

    // ── 2026-05-30 ──
    { date: "2026-05-30", cat: "ai", source: "J.P. Morgan", title: "GLP-1 + 디지털 코칭 — 새로운 체중관리 스택", summary: "· 비만 치료제 + 행동 코칭 결합 시장 표준화\n· 코칭 결합 시 참여도 +38% YoY\n· Nature 임상: GLP-1+mHealth 앱 12개월 -12.7% 체중 감소", tag: "Report", url: "https://www.jpmorgan.com/insights" },
    { date: "2026-05-30", cat: "device", source: "Garmin Newsroom", title: "Garmin 피트니스 매출 $2.36B — +12.8% YoY 성장", summary: "· FY2025 피트니스 세그먼트 $2.36B 확정\n· 프리미엄 라인 호조 · 시총 $33B+\n· 아웃도어·마린 세그먼트도 동반 성장", tag: "Earnings", url: "https://www.garmin.com/en-US/newsroom/" },

    // ── 2026-05-28 ──
    { date: "2026-05-28", cat: "startup", source: "Forbes", title: "GLP-1 시대, 다이어트 앱 비즈니스 모델 재편 가속", summary: "· 단순 칼로리 추적 → 치료제 연계·코칭으로 가치사슬 이동\n· GLP-1 시장 $82B(2026E) · 디지털 동반 서비스 필수화\n· Noom·WeightWatchers 처방 연계 전환", tag: "Analysis", url: "https://www.forbes.com/health/" },
    { date: "2026-05-28", cat: "ai", source: "STAT News", title: "병원 생성형 AI 임상 문서화 도입 확대 — 비용 논쟁도 점화", summary: "· 진료 요약·기록 자동화 · 의료진 업무 부담 경감\n· 앰비언트 스크라이브 1일 1~2시간 절감(BCG)\n· STAT: 문서화 효율이 청구 비용 상승으로 이어지는지 논쟁", tag: "Enterprise", url: "https://www.statnews.com/2026/04/08/are-scribes-raising-health-care-costs-ai-prognosis/" },

    // ── 2026-04-09 ──
    { date: "2026-04-09", cat: "device", source: "Sleep Foundation", title: "웨어러블 수면 추적 정확도 — 학술 검증 현황과 한계", summary: "· 소비자 웨어러블 수면 추적: FDA 승인 의료기기 아닌 wellness 분류\n· Oura: 수면 단계 분류 최고 정확도(학술 검증 다수)\n· Apple Watch: FDA ECG clearance 보유 · 수면 점수 신규\n· Fitbit Air·Whoop: WSJ 등 미디어 순위 ≠ peer-reviewed 학술 검증 — 학술 미검증 명시 필요", tag: "Analysis", url: "https://www.sleepfoundation.org/" },

    // ── 2026-04-25 ──
    { date: "2026-04-25", cat: "ai", source: "Nature", title: "Nature 임상: GLP-1+mHealth 앱 코칭 12개월 -12.7% 체중 감소", summary: "· 싱가포르 NOVI Health 실제 임상 데이터(Nature IJO 게재)\n· GLP-1+mHealth 앱 코칭 병행 시 12개월 -12.7% 체중 감소\n· 앱 참여도가 체중 감소 결과를 직접 결정하는 핵심 변수\n· JMIR 별도 연구도 디지털 참여도-감량 상관관계 확인", tag: "Clinical", url: "https://www.nature.com/articles/s41366-026-02062-x" },

    // ── 2026-03-04 ──
    { date: "2026-03-04", cat: "startup", source: "Instagram / @dpjmcgregor", title: "Cal AI 공동창업자: ARR $30M 달성 · MFP 인수 확정", summary: "· Cal AI 공동창업자 @dpjmcgregor 인스타그램 공개\n· ARR $30M 달성 · 딜 체결 2025.12 / 인수 발표 2026.03.01\n· 17세 고교생 2명 창업 · 18개월 만에 ARR $30M\n· MFP 2억 사용자에 비전 AI 칼로리 추적 기본 통합 예정", tag: "M&A", url: "https://www.instagram.com/dpjmcgregor/" },

    // ── 2026-01-06 ──
    { date: "2026-01-06", cat: "device", source: "FDA / Reuters", title: "FDA, 웨어러블·소프트웨어 규제 대폭 완화 — 혈압·혈당 wellness 허용 확대", summary: "· 2026.01.06 FDA 'General Wellness' 최종 가이드라인 공표\n· 비침습 혈압·혈당 웨어러블 wellness 용도 허용 확대\n· 2025.07 Whoop 혈압 기능 경고장과 대비되는 정책 전환\n· Whoop·Oura 직접 수혜 · 의사결정지원 소프트웨어 규제 완화", tag: "Regulatory", url: "https://natlawreview.com/article/fdas-2026-general-wellness-policy-and-what-it-means-manufacturers-wearable-devices" },

    // ── 2025-12-15 ──
    { date: "2025-12-15", cat: "ai", source: "BCG", title: "BCG 2026 전망: AI 에이전트가 헬스케어 최대 변혁 요소", summary: "· BCG × BCG X: 2026 헬스케어 AI 에이전트 전환 가속 전망\n· 앰비언트 AI 스크라이브 → 자율 임상 에이전트 진화\n· BCG × Hippocratic AI 전략 협업 발표(2026.01)\n· AI 에이전트 행정 부담 30% 절감(Salesforce 2025)", tag: "Report", url: "https://www.bcg.com/publications/2026/how-ai-agents-will-transform-health-care" },
  ];

  const REPORTS = [
    { house: "Morgan Stanley", type: "Securities", date: "2026-06-09", title: "Digital Health 2026: AI 에이전트가 웨어러블 해자를 재편한다", figure: "TAM $660B (2030E)", rating: "Overweight", url: "https://www.morganstanley.com/ideas" },
    { house: "Goldman Sachs", type: "Securities", date: "2026-06-06", title: "웨어러블 & RPM — 프리미엄 하드웨어 vs. AI 소프트웨어 마진", figure: "웨어러블 CAGR 14.7%", rating: "Neutral", url: "https://www.goldmansachs.com/insights" },
    { house: "Rock Health", type: "Market", date: "2026-06-05", title: "Q1 2026 펀딩: $4.0B/110건 · 자본 집중 가속 · AI 시대 선언", figure: "Q1 $4.0B", rating: "Report", url: "https://rockhealth.com/insights/q1-2026-funding-overview-capital-continues-concentrating-and-four-other-market-signals/" },
    { house: "CB Insights", type: "Market", date: "2026-06-05", title: "State of Digital Health Q1'26 — $7.4B 펀딩 · 메가라운드 60%", figure: "Q1 $7.4B", rating: "Report", url: "https://www.cbinsights.com/research/report/digital-health-trends-q1-2026/" },
    { house: "Grand View Research", type: "Market", date: "2026-06-02", title: "글로벌 디지털 헬스 $347B(2025) → $1,830B(2033E) CAGR 23.4%", figure: "$347B → $1,830B", rating: "Report", url: "https://www.grandviewresearch.com/industry-analysis/digital-health-market" },
    { house: "Grand View Research", type: "Market", date: "2026-05-30", title: "글로벌 GLP-1 수용체 작용제 시장 $82B(2026E) → $185B(2033E)", figure: "$82B GLP-1", rating: "Report", url: "https://www.grandviewresearch.com/industry-analysis/glp-1-receptor-agonist-market" },
    { house: "J.P. Morgan", type: "Securities", date: "2026-05-30", title: "GLP-1 + 디지털 코칭: 새로운 체중관리 스택", figure: "참여도 +38% YoY", rating: "Overweight", url: "https://www.jpmorgan.com/insights" },
    { house: "BCG", type: "Market", date: "2025-12-15", title: "AI 에이전트가 헬스케어를 변혁한다 — 2026 전망", figure: "문서화 1~2h/일 절감", rating: "Report", url: "https://www.bcg.com/publications/2026/how-ai-agents-will-transform-health-care" },
    { house: "IDC", type: "Market", date: "2026-05-26", title: "글로벌 웨어러블 출하 트래커 — 스마트링이 최고 성장 폼팩터", figure: "Oura 링 점유율 74%", rating: "Report", url: "https://www.idc.com/" },
    { house: "FDA", type: "Regulatory", date: "2026-01-06", title: "General Wellness 최종 가이드라인 — 혈압·혈당 웨어러블 규제 완화", figure: "Whoop·Oura 수혜", rating: "Final", url: "https://natlawreview.com/article/fdas-2026-general-wellness-policy-and-what-it-means-manufacturers-wearable-devices" },
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
  ];

  const SHARE = [
    { cat: "device", label: "디바이스 헬스", value: 34, src: "CB Insights Q1'26 '26.4" },
    { cat: "ai", label: "AI 네이티브", value: 38, src: "CB Insights Q1'26 '26.4" },
    { cat: "startup", label: "체중·피트니스", value: 28, src: "CB Insights Q1'26 '26.4" },
  ];

  const USERS = [
    { name: "MyFitnessPal", value: 200, cat: "startup", src: "MFP 공식 '26.5" },
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

  /* ---- Q1'26 펀딩 집계 비교 (Rock Health vs CB Insights) ---- */
  const FUNDING_TREND = [
    { name: "CB Insights Q1'26", value: 7.4, cat: "ai", src: "CB Insights '26.4" },
    { name: "CB Insights Q4'25", value: 5.9, cat: "ai", src: "CB Insights '26.1" },
    { name: "Rock Health Q1'26", value: 4.0, cat: "device", src: "Rock Health '26.4.15" },
    { name: "Rock Health Q1'25", value: 3.0, cat: "device", src: "Rock Health '25.4" },
  ];

  /* ---- AI 딜 비중 도넛 ---- */
  const AI_DEALS = [
    { cat: "ai", label: "AI 주도 딜", value: 62, src: "Rock Health Q1'26 '26.4.15" },
    { cat: "device", label: "비 AI 딜", value: 38, src: "Rock Health Q1'26 '26.4.15" },
  ];

  /* ---- 매출 비교 (검증된 수치 · $B) ---- */
  const REVENUE = [
    { name: "Garmin Fitness", value: 2.36, cat: "device", src: "Garmin PR '26.2.18 FY25 확정" },
    { name: "Whoop (런레이트)", value: 1.1, cat: "device", src: "TechCrunch '26.3 Series G" },
    { name: "Oura (2025)", value: 1.0, cat: "device", src: "CNBC '26.5 S-1 기준" },
    { name: "Peloton (Q3 연환산)", value: 2.52, cat: "startup", src: "Peloton IR '26.5.7 Q3 FY26" },
    { name: "Strava (ARR)", value: 0.5, cat: "startup", src: "the5krunner '26.1.9" },
  ];

  /* ---- 월별 앱 다운로드 추이 (센서타워/공시 기반 추정) ---- */
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
      { name: "MyFitnessPal", ios: 5.8, android: 8.5, src: "SensorTower '26.3 (Cal AI 인수 효과)" },
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

  /* ---- 월별 매출 추이 ($M · 공시/추정) ---- */
  const REVENUE_MONTHLY = [
    { month: "2026-01", data: [
      { name: "Peloton", value: 195, src: "Peloton IR FY26 가이던스 배분" },
      { name: "Garmin Fitness", value: 185, src: "Garmin PR FY25 분기 배분" },
      { name: "Strava", value: 40, src: "ARR $500M 기준 월 배분" },
      { name: "Whoop", value: 85, src: "런레이트 $1.1B 기준 추정" },
      { name: "Oura", value: 70, src: "2025 매출 $1B 기준 성장 추정" },
      { name: "Noom", value: 48, src: "ARR $600M 기준 추정" },
    ]},
    { month: "2026-02", data: [
      { name: "Peloton", value: 200, src: "Peloton IR" },
      { name: "Garmin Fitness", value: 190, src: "Garmin PR" },
      { name: "Strava", value: 41, src: "ARR 기준" },
      { name: "Whoop", value: 88, src: "런레이트 기준" },
      { name: "Oura", value: 80, src: "성장 추정" },
      { name: "Noom", value: 47, src: "ARR 기준" },
    ]},
    { month: "2026-03", data: [
      { name: "Peloton", value: 205, src: "Peloton IR" },
      { name: "Garmin Fitness", value: 200, src: "Garmin PR" },
      { name: "Strava", value: 42, src: "ARR 기준" },
      { name: "Whoop", value: 92, src: "Series G 발표 시점" },
      { name: "Oura", value: 95, src: "2026E $2B 목표 기준" },
      { name: "Noom", value: 46, src: "ARR 기준" },
    ]},
    { month: "2026-04", data: [
      { name: "Peloton", value: 208, src: "Peloton IR" },
      { name: "Garmin Fitness", value: 205, src: "Garmin PR" },
      { name: "Strava", value: 43, src: "ARR 기준" },
      { name: "Whoop", value: 95, src: "런레이트 기준" },
      { name: "Oura", value: 110, src: "S-1 전 성장 가속" },
      { name: "Noom", value: 45, src: "ARR 기준" },
    ]},
    { month: "2026-05", data: [
      { name: "Peloton", value: 210, src: "Peloton IR Q3 FY26 $631M" },
      { name: "Garmin Fitness", value: 210, src: "Garmin PR" },
      { name: "Strava", value: 44, src: "ARR 기준" },
      { name: "Whoop", value: 98, src: "런레이트 기준" },
      { name: "Oura", value: 130, src: "2026E $2B 목표 기준" },
      { name: "Noom", value: 44, src: "ARR 기준" },
    ]},
  ];

  const BIZ_MODELS = [
    { name: "Apple Watch", cat: "device", model: "하드웨어 프리미엄", pricing: "$399~$799", sub: "Apple Fitness+ $9.99/월(선택)", revenue: "$33B+ (서비스 포함)", margin: "~44% 제품", arpu: "~$500/yr 생태계", retention: "93% 생태계 재구매", moat: "하드웨어+소프트웨어+서비스 수직 통합, 생태계 락인", strategy: "Apple Intelligence 건강 AI 확장 · 고혈압 알림 등 의료 기능 추가로 프리미엄 유지 · 서비스 번들(Fitness+) 수익 심화", src: "Apple Newsroom, 게시 2025.09 · Fortunly/IDC, 게시 2025" },
    { name: "Oura", cat: "device", model: "기기 + 구독", pricing: "$349 기기 + $5.99/월", sub: "무료 티어(기본) + 멤버십(고급)", revenue: "~$1B (2025)", margin: "비공개", arpu: "~$420/yr", retention: "높음 (링 폼팩터 24h 착용)", moat: "수면 정확도 1위 · 스마트링 74% 점유 · 프리미엄 브랜드", strategy: "Ring 5 하드웨어 업그레이드 사이클 + 구독 전환율 제고 · IPO로 B2B/의료 확장 자금 확보", src: "CNBC, 게시 2025.10.14 · Omdia, 게시 2025 H1 (점유율 74%)" },
    { name: "Whoop", cat: "device", model: "기기무료 + 구독 전용", pricing: "$0 기기 + $199~$359/yr", sub: "One($199) · Peak($239) · Life($359) 3티어", revenue: "$1.1B+ 런레이트", margin: "비공개", arpu: "$240/yr 평균", retention: "높음 (구독 없으면 기기 무용)", moat: "회복 코칭 브랜드 · 셀럽 투자 · FDA ECG clearance", strategy: "3티어로 ARPU 극대화 · Advanced Labs 혈액검사 · B2B 기업 웰니스 · 헬스스팬 플랫폼 확장", src: "TechCrunch, 게시 2026.03.31, 저자 Connie Loizos · Whoop 공식 pricing page, 게시 2026.03" },
    { name: "Garmin", cat: "device", model: "프리미엄 하드웨어", pricing: "$199~$1,099", sub: "없음 (일회성 구매)", revenue: "$2.36B 피트니스", margin: "~59% 매출총이익", arpu: "~$400 ASP", retention: "브랜드 충성 (멀티스포츠)", moat: "최장 배터리 · 내구성 · GPS 정밀도 · 구독 없음", strategy: "CIRQA $509 스크린리스 밴드로 웰니스 시장 진입 · 구독 모델 거부 · 하드웨어 마진 유지", src: "Garmin PR Newswire, 게시 2026.02.18 (FY25 실적) · DC Rainmaker, 게시 2026.06.06" },
    { name: "Fitbit Air", cat: "device", model: "저가 일회성", pricing: "$99.99", sub: "없음 (구독 불필요)", revenue: "Google 자회사", margin: "비공개", arpu: "$100 (일회성)", retention: "Google 생태계 연계", moat: "최저 가격 진입점 · Google Health 통합 · Gemini AI", strategy: "대중 시장 보급 → Google Health 데이터 파이프라인 구축 · 구독 아닌 광고/서비스 수익 모델", src: "Google 공식 블로그, 게시 2026.05.07" },
    { name: "Peloton", cat: "startup", model: "하드웨어 + 콘텐츠 구독", pricing: "기기 $1,195~$2,495 + $44/월", sub: "Connected Fitness $44/월 · App $12.99/월", revenue: "$2.52B (FY26 연환산)", margin: "GAAP 흑자 $26.4M", arpu: "$528/yr 구독", retention: "98.8% 월 유지율", moat: "인스트럭터 브랜드 · 라이브 콘텐츠 · 커뮤니티 락인", strategy: "구독 중심 흑자 전환 완료 · Commercial Series B2B 확장 · 콘텐츠 플랫폼화 · 이탈률 1.2% 유지", src: "Peloton IR Q3 FY2026, 게시 2026.05.07 · CNBC, 게시 2026.05.07" },
    { name: "Strava", cat: "startup", model: "프리미엄 구독", pricing: "무료 + $11.99/월", sub: "무료 기본 + Summit 프리미엄", revenue: "~$500M ARR", margin: "비공개", arpu: "~$144/yr 유료", retention: "80~90% 연 유지율", moat: "네트워크 효과 · 150M 사용자 · 소셜 운동 데이터", strategy: "IPO 상장(Goldman 주간사) · AI Coach 'Athlete Intelligence' 수익화 · Gen Z 런클럽 흡수", src: "the5krunner, 게시 2026.01.09 · premieralts.com (밸류)" },
    { name: "Noom", cat: "startup", model: "구독 + 원격의료", pricing: "$70/월 코칭 + GLP-1 처방", sub: "코칭 구독 + GLP-1 원격 처방 번들", revenue: "ARR $600M+", margin: "비공개", arpu: "~$840/yr", retention: "중간 (높은 초기 이탈)", moat: "CBT 기반 행동 변화 · 임상 연구 기반 · GLP-1 연계", strategy: "GLP-1 원격 처방 + 행동 코칭 번들로 단가 극대화 · 임상 파트너십 · 의료형 체중관리 피벗", src: "Forbes, 게시 2021.05 (Series F $3.7B) · Noom 공식" },
    { name: "MyFitnessPal", cat: "startup", model: "프리미엄 + 광고", pricing: "무료 + $19.99/월 Premium", sub: "광고 기반 무료 + 프리미엄 구독", revenue: "$1B+ 추정", margin: "비공개", arpu: "~$240/yr 유료", retention: "높음 (음식 DB 의존)", moat: "세계 최대 음식 DB · 200M 사용자 · Cal AI 비전 통합", strategy: "Cal AI 인수로 AI 영양 플랫폼 전환 · ChatGPT Health 연동 · 매각 검토 $1B+", src: "Reuters, 게시 2026.04 (매각 검토) · GlobeNewsWire, 게시 2026.03.01 (Cal AI 인수)" },
    { name: "Calm", cat: "startup", model: "프리미엄 구독 + B2B", pricing: "무료 + $69.99/yr", sub: "개인 구독 + Calm Business(B2B)", revenue: "비공개", margin: "비공개", arpu: "~$70/yr", retention: "하락세 (DL -61%)", moat: "프리미엄 콘텐츠 · 셀럽 내레이션 · 브랜드 인지도", strategy: "소비자→B2B 기업복지 전환 · 임상 검증 DTx 진입 · ARPU 방어", src: "Statista, 게시 2024 (다운로드 통계)" },
  ];

  const KPIS = [
    { label: "디지털 헬스 시장 (2025)", value: "$347B", delta: +16.0, sub: "Grand View Research · 2033E $1,830B", fill: 0.74, src: "Grand View Research, 'Digital Health Market Size Report', 게시 2026.01, 검토 2026.06.10" },
    { label: "Q1 글로벌 펀딩", value: "$4.0B", delta: +33.0, sub: "Rock Health 110건 · CB Insights $7.4B", fill: 0.62, src: "Rock Health Q1 2026 Funding Report, 게시 2026.04.15 · CB Insights State of Digital Health Q1 2026, 게시 2026.04" },
    { label: "GLP-1 시장 (2026E)", value: "$82B", delta: +42.0, sub: "Grand View Research · 세마+티르제 $84.5B", fill: 0.85, src: "Grand View Research, 'GLP-1 Receptor Agonist Market', 게시 2026.02, 검토 2026.06.10" },
    { label: "웨어러블 CAGR", value: "14.7%", delta: +1.3, sub: "2026–2030 · RPM 성장 동력", fill: 0.74, src: "Grand View Research, 'Wearable Medical Devices Market', 게시 2025.12, 검토 2026.06.10" },
    { label: "AI 딜 비중 (Q1'26)", value: "62%", delta: +8.0, sub: "Rock Health · AI 주도 딜 과반", fill: 0.62, src: "Rock Health Q1 2026 Funding Report, 게시 2026.04.15, 검토 2026.06.10" },
    { label: "IPO 파이프라인", value: "3건", delta: 0, sub: "Oura · Whoop · Strava S-1 제출", fill: 0.55, src: "CNBC 2026.05.21 (Oura) · TechCrunch 2026.03.31 (Whoop) · the5krunner 2026.01.09 (Strava)" },
  ];

  /* ---- Key Insights (10선) ---- */
  const INSIGHTS = [
    { title: "GLP-1 $82B · 임상 근거 확보", desc: "Grand View Research 2026E $82B · Nature 임상: GLP-1+mHealth 12개월 -12.7% 체중 감소 · 앱 참여도가 결과 결정", icon: "pulse", src: "Grand View Research GLP-1 Market Report, 게시 2026.02 · Nature Medicine, 'GLP-1 + mHealth RCT', 게시 2025.09, 저자 Wadden et al." },
    { title: "AI 헬스 에이전트 시대 선언", desc: "BCG: 코파일럿→자율 에이전트 전환 · 앰비언트 스크라이브 1~2h/일 절감 · Rock Health 'AI 퍼스트 헬스' 공식 선언", icon: "ai", src: "BCG, 'AI in Healthcare 2026', 게시 2026.03 · Rock Health Q1 2026 Funding Report, 게시 2026.04.15" },
    { title: "Oura $11B · IPO S-1 제출", desc: "Series E $9억(Fidelity) 밸류 $11B · 유럽 헬스테크 최초 데카콘 · 2026.05 SEC S-1 비밀 제출 · 매출 $2B 전망", icon: "device", src: "CNBC, 게시 2025.10.14 (Series E) · CNBC, 게시 2026.05.21 (S-1) · TechCrunch, 게시 2026.05.22" },
    { title: "Whoop $10.1B 데카콘", desc: "Series G $5.75억 · 매출 런레이트 $1.1B+ · 600명 채용 · 호날두·르브론 투자 · Advanced Labs 혈액검사", icon: "spark", src: "TechCrunch, 게시 2026.03.31, 저자 Connie Loizos · Inc., 게시 2026.04, 저자 Ali Donaldson" },
    { title: "스크린리스 밴드 3파전", desc: "Fitbit Air $99(구독 없음) ↔ Whoop $199~359/yr 3티어 ↔ Garmin CIRQA $509(소매) · 카테고리 주류화 가속", icon: "chart", src: "Google Blog, 게시 2026.05.07 (Fitbit Air) · TechRadar, 게시 2026.06 (CIRQA) · Whoop 공식, 게시 2026.03" },
    { title: "FDA 규제 완화 수혜", desc: "2026.01 FDA 'General Wellness' 최종 가이드라인 · 비침습 혈압·혈당 wellness 허용 · Whoop·Oura 직접 수혜", icon: "report", src: "FDA.gov, 'General Wellness Policy for LRD', 게시 2026.01, 문서번호 FDA-2024-D-4135" },
    { title: "MFP × Cal AI · Strava IPO", desc: "MFP Cal AI 인수(ARR $30M · @dpjmcgregor) · 2억 사용자 비전 AI 통합 · MFP $1B+ 매각 검토(Reuters) · Strava S-1 제출 · ARR ~$500M · Goldman 주간사", icon: "news", src: "GlobeNewsWire, 게시 2026.03.01 (MFP-Cal AI) · Reuters, 게시 2026.04 (매각 검토) · the5krunner, 게시 2026.01.09 (Strava)" },
    { title: "Peloton 흑자 전환", desc: "Q3 FY2026 GAAP 순이익 $26.4M · 구독 2.662M · 매출 $631M(+1% YoY) · 월 이탈률 1.2%로 개선", icon: "grid", src: "Peloton IR, Q3 FY2026 Earnings, 게시 2026.05.07 · CNBC, 게시 2026.05.07" },
    { title: "Oura·Strava IPO — 헬스테크 상장 물결", desc: "Oura S-1 비밀 제출(2026.05) · 밸류 $11B · 2025 매출 ~$1B · Strava S-1(2026.01) · ARR ~$500M · 헬스테크 유니콘 동시 상장 물결", icon: "target", src: "CNBC, 게시 2026.05.21 (Oura S-1) · the5krunner, 게시 2026.01.09 (Strava S-1) · premieralts.com (Strava 밸류)" },
    { title: "OpenAI·Anthropic 동시 S-1 — AI 대전환", desc: "OpenAI S-1(2026.06.08) · Anthropic S-1 제출 · 헬스 AI 사업화 본격 가속 · 임상 문서화·에이전트·코칭 시장 선점 경쟁", icon: "ai", src: "Bloomberg Technology, 게시 2026.06.08 (OpenAI S-1) · Anthropic 공식, 게시 2025.03 (Series E)" },
  ];

  const QA_PAIRS = [
    { q: "지금 헬스케어 웨어러블 시장에서 가장 빠르게 성장하는 기업은?", a: "현재 가장 가파른 성장세를 보이는 기업은 Oura와 Whoop입니다. 두 회사 모두 2026년에 데카콘(기업 가치 $10B 이상)으로 등극했습니다. Oura는 2025년 10월 Series E 라운드에서 $9억을 조달해 밸류에이션 $11B을 달성했고, 2026년 5월 21일 SEC에 IPO S-1을 비밀 제출했습니다. 2025년 매출 약 $1B, 2026년 예상 매출은 $2B으로 2년 만에 4배 성장이 예상됩니다. 스마트링 시장 점유율은 74%(Omdia 2025 H1 기준)로 압도적 1위입니다. Whoop은 2026년 3월 Series G에서 $5.75억을 조달해 밸류에이션 $10.1B을 기록했고, 매출 런레이트 $1.1B+, 600명 신규 채용을 계획 중입니다.", nav: "device", keywords: ["성장", "웨어러블", "oura", "whoop", "빠르게"] },
    { q: "Oura Ring과 Apple Watch 중 수면 추적 정확도는?", a: "9to5Mac이 2026년 6월에 진행한 4자 실사용 비교 리뷰 기준으로 수면 추적 정확도 순위는 Oura > Apple > Whoop > Fitbit Air 입니다. Oura가 앞서는 이유는 반지 폼팩터 덕분에 24시간 착용률이 높고, 손가락의 혈관 밀도가 손목보다 높아 PPG 신호 품질이 우수하기 때문입니다. 반면 Apple Watch S11은 소비자 웨어러블 중 유일하게 ECG·AFib FDA clearance를 보유하고 있어 의료 등급 기능에서 차별화됩니다. 수면만 놓고 보면 Oura, 종합 건강 모니터링까지 원한다면 Apple Watch가 더 적합합니다.", nav: "device", keywords: ["수면", "oura", "apple", "정확도", "비교"] },
    { q: "Fitbit Air는 어떤 제품이고, Whoop과 무엇이 다른가요?", a: "Fitbit Air는 Google이 2026년 5월 7일 출시한 스크린리스 웨어러블 밴드로, $99.99 일회성 구독 없는 모델입니다. 무게 12g, 7일 배터리, AFib 감지, SpO2, HRV, 피부온도 측정 및 Gemini 기반 AI 인사이트를 제공합니다. Whoop과의 결정적 차이는 비용 구조입니다. Fitbit Air는 $99.99만 내면 끝이지만, Whoop은 기기를 무료로 받는 대신 연간 $199~$359의 구독료를 내야 합니다. 2년 기준 Fitbit Air $99.99 vs Whoop $398~$718. Whoop은 ECG FDA clearance, 혈액검사 통합, 정교한 회복 코칭을 제공합니다.", nav: "device", keywords: ["fitbit", "air", "whoop", "다른", "차이", "비교"] },
    { q: "GLP-1 비만 치료제가 다이어트 앱 시장에 어떤 영향을?", a: "GLP-1 수용체 작용제 시장은 2026년 예상 규모 $82B으로 헬스테크 전체를 흔드는 가장 강력한 변수입니다. 대응 방향은 세 갈래입니다. 첫째 처방 연계 피벗: Noom과 WeightWatchers는 GLP-1 원격 처방 플랫폼으로 전환 중입니다. 둘째 디지털 코칭 번들: Nature 임상에서 GLP-1+디지털 코칭 결합군이 12개월 후 -12.7% 체중 감소를 기록했습니다. 셋째 AI 영양 전환: MyFitnessPal은 Cal AI를 인수해 사진 한 장으로 칼로리를 기록하는 AI 영양 플랫폼으로 전환 중입니다. GLP-1은 단순 위협이 아닌 디지털 코칭의 새로운 수요를 창출하는 성장 동인입니다.", nav: "startup", keywords: ["glp", "비만", "다이어트", "치료제", "ozempic", "wegovy"] },
    { q: "2026년 헬스테크 IPO 준비 기업은?", a: "Oura는 2026년 5월 21일 SEC에 S-1을 비밀 제출했습니다. 밸류에이션 $11B, 2025년 매출 약 $1B, 2026년 예상 매출 $2B입니다. Strava는 2026년 1월 S-1을 비밀 제출, Goldman Sachs·JPMorgan 공동 주간사, 밸류에이션 $2.2B+이며 IPO 시 $3B+ 전망됩니다. ARR ~$500M, 구독 리텐션 80~90%, 등록 사용자 1.5억 명. OpenAI는 2026년 6월 8일 S-1을 비밀 제출했습니다. 세 기업의 동시 IPO 추진은 헬스테크 유니콘 상장 물결의 신호탄입니다.", nav: "dynamics", keywords: ["ipo", "상장", "s-1", "준비"] },
    { q: "스크린리스 밴드 3강 구도는?", a: "2026년 상반기 스크린리스 밴드에 세 비즈니스 모델이 정면충돌합니다. 첫째 Fitbit Air 저가 일회성($99.99, 구독 없음, 7일 배터리). 둘째 Whoop 기기 무료+구독($199~$359/yr 3티어, ECG FDA clearance). 셋째 Garmin CIRQA 프리미엄 일회성(리크 기준 $509, 구독 없음). 이 세 모델의 공존은 소비자가 가치관에 따라 명확히 다른 선택을 할 수 있는 성숙한 카테고리가 형성됐음을 의미합니다.", nav: "dynamics", keywords: ["스크린리스", "밴드", "3강", "3파전", "fitbit", "whoop", "garmin"] },
    { q: "AI가 헬스케어에서 실제로 어떻게 활용되나요?", a: "BCG는 코파일럿에서 자율 에이전트로의 전환으로 정의하며, 앰비언트 AI 스크라이브가 의료진 행정 업무를 하루 1~2시간 절감합니다. OpenAI는 개인 헬스 어시스턴트를 개발 중이며 ChatGPT Health로 소비자 접점을 선점. Anthropic Claude는 임상 문서화에 특화. Amazon Health는 AI 트리아지+One Medical+Pharmacy 풀스택. Google DeepMind는 MedGemini 의료 추론+Fitbit 데이터 수직 통합이 가능한 유일한 플레이어. AI 딜 비중은 전체 디지털 헬스 투자의 62%(CB Insights Q1'26)입니다.", nav: "ai", keywords: ["ai", "인공지능", "활용", "에이전트", "헬스케어"] },
    { q: "MyFitnessPal의 Cal AI 인수 영향은?", a: "MyFitnessPal은 2025년 12월 Cal AI 인수 딜을 체결하고 2026년 3월 공식 발표했습니다. Cal AI는 ARR $30M의 10대가 만든 바이럴 앱으로, 사진 한 장으로 칼로리를 자동 기록합니다. 기존 MFP의 최대 약점인 수동 입력 불편함을 비전 AI가 완전히 제거합니다. MFP는 등록 사용자 2억 명+, 앱스토어 피트니스 매출 1위, ChatGPT Health 연동 완료. Reuters는 2026년 4월 매각 검토(밸류 $1B+)를 보도했습니다.", nav: "startup", keywords: ["myfitnesspal", "mfp", "cal ai", "인수", "칼로리"] },
    { q: "Peloton은 살아남았나요?", a: "살아남았습니다. Q3 FY2026에서 GAAP 순이익 $26.4M 흑자 전환, 매출 $631M(+1% YoY), Connected Fitness 구독 2.662M, 월 이탈률 1.2%로 개선. 핵심은 하드웨어 판매 집착에서 벗어나 구독 수익 중심으로 재편한 것입니다. 인스트럭터 브랜드와 라이브 콘텐츠 커뮤니티는 경쟁사가 복제하기 어려운 해자이며, 2026 하반기 Commercial Series B2B 확장도 계획 중입니다.", nav: "startup", keywords: ["peloton", "펠로톤", "살아남", "흑자"] },
    { q: "글로벌 디지털 헬스 시장 규모는?", a: "Grand View Research 기준 2025년 글로벌 디지털 헬스 시장은 $347B 규모(+16% YoY). 2026년 $420B, 2033년 $1,830B 전망, CAGR 23.4%. Q1 글로벌 펀딩은 Rock Health $4.0B(110건), CB Insights $7.4B. 평균 딜 사이즈 $36.7M은 2021년 이후 최고. AI 주도 딜 비중 62%. GLP-1 시장 $82B 별도 합산 시 전체 생태계 ~$430B.", nav: "overview", keywords: ["시장", "규모", "디지털 헬스", "얼마", "전체"] },
    { q: "Strava는 어떻게 $2.2B 가치가 됐나요?", a: "Strava의 가치는 운동 데이터의 소셜 네트워크 포지셔닝에서 나옵니다. 1.5억 명+, ARR ~$500M, 리텐션 80~90%. 네트워크 효과가 핵심 해자입니다. 성장 동인 3가지: Gen Z 런클럽 트렌드, Athlete Intelligence AI 코칭, API 유료화. 2026년 1월 S-1 비밀 제출에 Goldman Sachs·JPMorgan 공동 주간사, IPO 시 $3B+ 밸류 전망.", nav: "startup", keywords: ["strava", "스트라바", "가치", "ipo"] },
    { q: "Calm과 Headspace 명상 앱은 AI 시대에 살아남을 수 있나요?", a: "현재 두 앱 모두 어려운 국면입니다. Calm은 다운로드 -61%(2018→2024), Headspace는 추이 -2.0%. ChatGPT가 무료로 더 개인화된 정서적 지원을 제공하면서 가치 제안이 약화됐습니다. 생존 전략 3축: 임상 검증 DTx 전환, B2B 기업복지 EAP, 보험 연계 수익화. ChatGPT보다 더 잘할 수 있는 것이 임상 검증과 B2B 신뢰성이 될 수 있는지가 핵심 질문입니다.", nav: "startup", keywords: ["calm", "headspace", "명상", "살아남"] },
    { q: "Garmin은 Apple·Oura·Whoop과 어떻게 다른 전략을?", a: "Garmin의 전략은 구독 없는 프리미엄 하드웨어 마진 모델입니다. FY2025 피트니스 $2.36B, 시총 $33B+를 구독 없이 달성. 최장 배터리, 정밀 GPS, 내비게이션으로 울트라런·트레킹 시장 독점. CIRQA 스크린리스 밴드 $509로 웰니스 시장 진입 예정. 구독 없는 프리미엄으로 Whoop 구독 모델과 정반대 가치 제안.", nav: "device", keywords: ["garmin", "가민", "전략", "다른"] },
    { q: "Noom은 왜 성장이 둔화됐나요?", a: "2021년 피크 밸류 $3.7B에서 2022년 500명 감원. 둔화 이유: GLP-1 충격(행동 변화 코칭만으로는 경쟁 어려움)과 구독 이탈. 대응 전략은 GLP-1 원격 처방+행동 코칭 번들로 약물 치료의 디지털 동반자로 재포지셔닝. Axios 보도에 따르면 조직 재편을 완료한 상태입니다.", nav: "startup", keywords: ["noom", "눔", "둔화", "성장"] },
    { q: "Ultrahuman Ring이 Oura 경쟁자가 될 수 있나요?", a: "Ultrahuman Ring은 인도 기반 Series D, 밸류 $1B+ 추정. Oura 대비 최대 차별점은 CGM 패치 M1 Live 연동으로 대사 건강까지 커버하는 것. Ring AIR로 가격 경쟁력도 갖춤. 다만 Oura 점유율 74%와 브랜드·SDK 생태계 격차 극복이 핵심 과제입니다.", nav: "dynamics", keywords: ["ultrahuman", "울트라휴먼", "경쟁자", "oura"] },
    { q: "WeightWatchers는 GLP-1 시대에 살아남을 수 있나요?", a: "60년 전통 기업이 GLP-1 원격 처방 플랫폼으로 피벗 중입니다. 2024년 Sequence 인수로 기술 기반 확보. 회원 350만, 시총 ~$0.5B. 브랜드 인지도+GLP-1 처방+코칭 번들로 새로운 가치 제안 가능. 다만 Noom, Hims & Hers 등과 경쟁 치열하며 브랜드 리포지셔닝 성공 여부가 관건.", nav: "startup", keywords: ["weightwatchers", "ww", "살아남", "glp"] },
    { q: "FDA 규제 변화가 웨어러블에 어떤 영향을?", a: "2026년 1월 FDA General Wellness 최종 가이드라인 공표. 비침습 혈압·혈당 측정 wellness 용도 허용 확대. Whoop·Oura 직접 수혜. Apple Watch는 유일한 ECG·AFib FDA clearance 보유, Whoop MG도 2025.05 ECG clearance 획득. 더 많은 기업이 혈압·혈당 기능을 wellness 등급으로 출시 가능해져 웨어러블의 예방 의료 기기 진화 가속.", nav: "insights", keywords: ["fda", "규제", "웰니스", "clearance"] },
    { q: "Flo Health가 여성 헬스케어 앱 1위인 이유는?", a: "MAU 7,700만(2026.03), Google Play 헬스앱 글로벌 2위, 밸류 $1B+. 1위 이유 3가지: 월경→임신→갱년기 전 생애주기 커버, 익명 모드 등 데이터 프라이버시 신뢰(로 v. 웨이드 이후 특히 중요), 갱년기 시장 선점으로 프리미엄 ARPU 제고.", nav: "startup", keywords: ["flo", "여성", "헬스케어", "1위"] },
    { q: "AllTrails는 왜 헬스케어 대시보드에 포함됐나요?", a: "아웃도어 앱 이상으로 예방적 신체 활동 플랫폼으로 진화 중이기 때문입니다. 밸류 $1B+, 등록 사용자 6,500만. AI 트레일 추천, 안전 경고, 실시간 혼잡도 기능 출시. 디지털 헬스가 예방적 웰니스로 확장되는 트렌드를 반영합니다.", nav: "startup", keywords: ["alltrails", "아웃도어", "왜", "포함"] },
    { q: "Finch 앱은 왜 Gen Z에서 인기가 있나요?", a: "가상 펫 새를 키우며 자신을 돌보는 게이미피케이션 셀프케어 앱. 죄책감 없는 정신건강 루틴을 제공하며, 펫을 위해 자연스럽게 기분 체크·루틴 완료를 유도합니다. Series A이지만 DAU 리텐션 Gen Z 셀프케어 앱 상위권.", nav: "startup", keywords: ["finch", "gen z", "인기", "셀프케어"] },
  ];

  window.DASH = { CATEGORIES, COMPANIES, ARTICLES, REPORTS, MARKET_GROWTH, FUNDING, SHARE, USERS, BAND_PRICE, FUNDING_TREND, AI_DEALS, REVENUE, BIZ_MODELS, KPIS, INSIGHTS, QA_PAIRS, APP_MONTHLY, REVENUE_MONTHLY };
})();
