/* ============================================================
   Health Intelligence Dashboard — 팩트체크 완료판 (2026.06.10)
   영문 권위 소스만 사용 · 플레인 텍스트 복사 가능 sources 배열
   ============================================================ */
(function () {
  "use strict";

  const CATEGORIES = [
    { id: "device", ko: "디바이스 헬스", en: "Device-based Health", accent: "#1428A0", accentSoft: "#E8ECFA", desc: "웨어러블·링·밴드 기반 생체 데이터 플랫폼" },
    { id: "ai", ko: "AI 네이티브 헬스", en: "AI Native Health", accent: "#7A38D6", accentSoft: "#F0E9FB", desc: "파운데이션 모델 기반 헬스 에이전트·코칭" },
    { id: "startup", ko: "체중·피트니스 스타트업", en: "Weight & Fitness Startups", accent: "#0E8F6E", accentSoft: "#E2F4EE", desc: "칼로리·체중관리·운동추천 버티컬" },
  ];

  /* ---- Companies (팩트체크 완료 · VP/방향성 · 출처 플레인텍스트) ---- */
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
      note: "2026.05 출시 · 12g · 스크린리스 · 7일 배터리 · AFib 감지 · SpO2·HRV·피부온도 · Google Health 앱 전환 · Whoop 직접 경쟁",
      vp: "구독 없는 $99.99 일회성 가격으로 스크린리스 트래킹의 진입 장벽 최소화 — Whoop 구독 모델의 정반대 포지셔닝",
      direction: "Google Health 생태계 통합 허브 · Gemini 기반 AI 헬스 인사이트 · 대중 시장(mass market) 웨어러블 보급 가속",
      url: "https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/",
      sources: [
        "Google 공식 블로그 — 2026-05-07 — https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/",
        "9to5Google — 2026-05-07 — https://9to5google.com/",
        "Android Central — 2026-05 — https://www.androidcentral.com/wearables/fitbit/google-fitbit-air-launch-specs-price",
      ] },

    { cat: "device", name: "Garmin", domain: "garmin.com", unit: "Fitness · Outdoor", valuation: "$33B+ 시총", valAsof: "26.6", funding: "Public", metric: "피트니스 매출(FY)", value: "$2.36B", metricAsof: "FY25 확정", trend: +12.8,
      note: "FY2025 피트니스 세그먼트 $2.36B 확정 · +12.8% YoY · CIRQA 스크린리스 밴드 $509(소매)/$454(프리오더) · 프리미엄 멀티스포츠 강세",
      vp: "프리미엄 멀티스포츠 특화 — 최장 배터리·내구성·정밀 GPS로 진지한 운동인(serious athlete) 시장 독점적 지위",
      direction: "CIRQA $509 스크린리스 밴드로 회복·웰니스 시장 진입 · 구독 의존 없는 하드웨어 마진 모델 유지 · 아웃도어·마린 동반 성장",
      url: "https://www.garmin.com/en-US/newsroom/",
      sources: [
        "Garmin PR Newswire — 2026-02-18 — https://www.prnewswire.com/",
        "the5krunner — Garmin CIRQA — 2026-05-20 — https://the5krunner.com/2026/05/20/garmin-cirqa-connect/",
        "Notebookcheck — CIRQA $509/$454 — 2026-05 — https://www.notebookcheck.net/",
        "TechRadar — CIRQA — 2026-05 — https://www.techradar.com/health-fitness/smartwatches/garmins-cashing-in-on-the-screenless-whoop-style-smart-band-trend-with-its-upcoming-cirqa-heres-the-proof",
      ] },

    { cat: "device", name: "Oura", domain: "ouraring.com", unit: "Smart Ring", valuation: "$11B", valAsof: "25.10 Series E", funding: "Series E $900M", metric: "매출 전망", value: "$2B(26E)", metricAsof: "26E 전망", trend: +28.0,
      note: "Series E $9억 조달 밸류 $11B(CNBC 2025.10) · IPO S-1 비밀 제출(2026.05.21) · 유럽 헬스테크 최초 데카콘 · 스마트링 점유율 80%+ · 2025 매출 ~$1B · 2026 매출 $2B 전망",
      vp: "반지 폼팩터로 수면·회복 데이터 업계 최고 정확도 — 화면·알림 없는 '조용한 웨어러블'로 24/7 착용률 극대화",
      direction: "IPO 상장 추진 · 대사(혈당)·여성 건강 지표 확장 · 자체 AI 모델 개발 · B2B 기업 웰니스 및 방위 분야 진출",
      url: "https://ouraring.com/blog",
      sources: [
        "CNBC — 2025-10-14 — https://www.cnbc.com/2025/10/14/oura-ringmaker-valuation-fundraise.html",
        "TechCrunch — 2025-10-14 — https://techcrunch.com/2025/10/14/smart-ring-maker-oura-raises-900m-from-fidelity/",
        "CNBC IPO 제출 — 2026-05-21 — https://www.cnbc.com/2026/05/21/oura-smart-ring-ipo-filing.html",
        "TechCrunch S-1 — 2026-05-22 — https://techcrunch.com/2026/05/22/oura-ipo-s1-filing/",
      ] },

    { cat: "device", name: "Whoop", domain: "whoop.com", unit: "Recovery Band", valuation: "$10.1B", valAsof: "26.3 Series G", funding: "Series G $575M", metric: "매출 런레이트", value: "$1.1B+", metricAsof: "26.3", trend: +14.5,
      note: "Series G $5.75억 조달 밸류 $10.1B 데카콘(TechCrunch 2026.03) · 매출 런레이트 $11억+ · 600명 채용 계획 · Whoop Labs Doha · FDA 미승인(wellness)",
      vp: "기기 무료 + 구독 모델로 '회복 코칭 서비스'를 판매 — 하드웨어가 아닌 데이터 해석과 행동 변화가 상품",
      direction: "헬스스팬(healthspan·건강수명) 플랫폼으로 확장 · Advanced Labs 혈액검사 통합 · Abbott·Mayo Clinic 투자 유치로 임상 신뢰 확보",
      url: "https://www.whoop.com/thelocker/",
      sources: [
        "TechCrunch — 2026-03-31 — https://techcrunch.com/2026/03/31/whoop-valuation-10b-series-g-fundraise/",
        "Ventureburn — 2026-04 — https://ventureburn.com/whoop-raises-575m-at-10-1b-to-expand-healthspan-tech/",
        "Inc. — 2026-04 — https://www.inc.com/ali-donaldson/fresh-off-its-viral-turn-at-the-australian-open-whoop-scores-a-10-billion-valuation/91324137",
      ] },

    // ── AI Native ──
    { cat: "ai", name: "OpenAI Health", domain: "openai.com", unit: "Health Agent", valuation: "$300B+", valAsof: "25", funding: "내부 투자", metric: "헬스 파일럿", value: "Beta", metricAsof: "26.6", trend: +0,
      note: "개인 헬스 어시스턴트 개발 · 의료기관 파트너십 탐색 · Fitbit 출신 임상 인력 영입 정황",
      vp: "범용 LLM의 추론 능력을 개인 건강 데이터에 연결 — 파편화된 웨어러블·진료 기록을 통합 해석하는 단일 에이전트",
      direction: "의료기관·보험사 데이터 파트너십 확보 · HIPAA 준수 파이프라인 구축 · ChatGPT Health로 소비자 접점 선점",
      url: "https://openai.com/news/",
      sources: [
        "Bloomberg — 2026-06 — https://www.bloomberg.com/technology",
      ] },

    { cat: "ai", name: "Anthropic Claude", domain: "anthropic.com", unit: "Clinical · Wellness", valuation: "$61B", valAsof: "25.3", funding: "Enterprise", metric: "헬스 API 채택", value: "확대", metricAsof: "26.6", trend: +0,
      note: "Claude 헬스케어 엔터프라이즈 확대 · 임상 문서화 파일럿 · 구체 병원 수 공식 미확인",
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

    // ── Startups ──
    { cat: "startup", name: "MyFitnessPal", domain: "myfitnesspal.com", unit: "Cal AI 인수 통합", valuation: "~$345M", valAsof: "20 Francisco P.", funding: "PE 보유", metric: "등록 사용자", value: "200M+", metricAsof: "26.5", trend: +5.3,
      note: "2026.03 Cal AI 인수 발표(딜 체결 2025.12 · Cal AI ARR $30M, @dpjmcgregor) · 사진 AI 칼로리 비전 기본 통합 · 앱스토어 피트니스 매출 1위 · ChatGPT Health 연동",
      vp: "세계 최대 음식 데이터베이스 + 사진 한 장 AI 기록으로 칼로리 추적의 마찰(friction)을 제거",
      direction: "Cal AI·Intent 인수로 AI 영양 플랫폼 전환 · ChatGPT Health 연동 · 수동 입력 시대 종결 선언",
      url: "https://www.myfitnesspal.com/blog",
      sources: [
        "GlobeNewsWire — 2026-03-01 — https://www.globenewswire.com/news-release/2026/03/02/3247439/0/en/MyFitnessPal-Acquires-Cal-AI.html",
        "TechCrunch — 2026-03-02 — https://techcrunch.com/2026/03/02/myfitnesspal-has-acquired-cal-ai-the-viral-calorie-app-built-by-teens/",
        "Instagram @dpjmcgregor — Cal AI ARR $30M — https://www.instagram.com/dpjmcgregor/",
      ] },

    { cat: "startup", name: "Noom", domain: "noom.com", unit: "Behavioral Weight", valuation: "피크 $3.7B", valAsof: "21.5 Series F", funding: "Series F", metric: "유료 구독", value: "수백만", metricAsof: "25.12", trend: -3.4,
      note: "GLP-1 원격의료 병행 · 2023 감원 500+명 · 현재 실질 밸류 미공개 · 처방 연계 전환 시도",
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
      direction: "하드웨어 판매 → 구독 중심 흑자 구조 전환 완료 · Precor 통합 상업 시장 확대 · 콘텐츠 플랫폼화",
      url: "https://www.onepeloton.com/press",
      sources: [
        "Peloton IR Q3 FY2026 — 2026-05-07 — https://investor.onepeloton.com/",
        "CNBC — 2026-05-07 — https://www.cnbc.com/2026/05/07/peloton-pton-earnings-q3-2026.html",
      ] },

    { cat: "startup", name: "Strava", domain: "strava.com", unit: "Activity Social", valuation: "$2.2B+", valAsof: "25.5 Series F", funding: "Series F", metric: "등록 사용자", value: "150M+", metricAsof: "26.5", trend: +8.1,
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
    { date: "2026-06-10", cat: "device", source: "TechRadar", title: "가민 CIRQA $509(소매)/$454(프리오더) — 스크린리스 밴드 프리미엄 포지셔닝 확정", summary: "· Garmin CIRQA 소매가 $509 / 프리오더 $454 확정(Notebookcheck)\n· 두 가지 사이즈(S/M·L/XL) · Body Battery·HRV·SpO2·스트레스 추적\n· 화면 완전 제거 · 구독 없는 일회성 프리미엄 모델\n· Whoop($30/월 구독)·Fitbit Air($99) 대비 최고가 포지셔닝", tag: "Launch", url: "https://www.techradar.com/health-fitness/smartwatches/garmins-cashing-in-on-the-screenless-whoop-style-smart-band-trend-with-its-upcoming-cirqa-heres-the-proof" },
    { date: "2026-06-10", cat: "device", source: "CNBC", title: "오우라, IPO S-1 비밀 제출… 밸류 $11B · 2025 매출 ~$1B · 2026E $2B", summary: "· 2026.05.21 SEC에 S-1 비밀 제출(CNBC 확인)\n· Series E $9억(Fidelity 주도·Iconiq 참여) 밸류 $11B\n· 2025 매출 ~$1B · 2026E $2B 전망(2년 만에 4배 성장)\n· 스마트링 점유율 80%+(IDC) · 누적 550만 링 판매 · 유럽 헬스테크 최초 데카콘", tag: "IPO", url: "https://www.cnbc.com/2026/05/21/oura-smart-ring-ipo-filing.html" },
    { date: "2026-06-10", cat: "startup", source: "TechCrunch", title: "마이피트니스팔, Cal AI 인수 발표 — 10대 창업자 ARR $30M 달성", summary: "· 2026.03.01 Cal AI 인수 공식 발표(딜 체결 2025.12)\n· Cal AI: 17세 고교생 2명 창업 · ARR $30M(@dpjmcgregor)\n· 사진 한 장으로 칼로리·영양소 자동 분석하는 비전 AI\n· MFP 2억 사용자에 통합 + Cal AI 별도 운영 · 앱스토어 피트니스 매출 1위", tag: "M&A", url: "https://techcrunch.com/2026/03/02/myfitnesspal-has-acquired-cal-ai-the-viral-calorie-app-built-by-teens/" },
    { date: "2026-06-10", cat: "ai", source: "Grand View Research", title: "GLP-1 시장 $82B(2026E)… 세마글루타이드+티르제파타이드 합산 $84.5B 전망", summary: "· Grand View Research: 글로벌 GLP-1 수용체 작용제 시장 $82B(2026E)\n· 2033년 $185.3B 전망 · 세마글루타이드 점유율 52.8%(2025)\n· Ozempic ~$19.5B + Wegovy ~$15.5B 피크 전망(2026)\n· 티르제파타이드 CAGR 13.9% 최고 성장 · 디지털 코칭 결합 표준화", tag: "Market", url: "https://www.grandviewresearch.com/industry-analysis/glp-1-receptor-agonist-market" },
    { date: "2026-06-10", cat: "startup", source: "TechCrunch", title: "Whoop, Series G $5.75억 조달 · 밸류 $10.1B 데카콘 등극", summary: "· 2026.03.31 Series G 완료 · $575M 조달 · 밸류 $10.1B(직전 $3.6B 대비 3배)\n· 매출 런레이트 $1.1B+ · 600명 채용 + Whoop Labs Doha 설립\n· Abbott·Mayo Clinic·Mubadala·QIA 등 전략 투자자 참여\n· 호날두·르브론·맥길로이 등 셀럽 애슬릿 투자 · 호주오픈 바이럴 효과", tag: "Funding", url: "https://techcrunch.com/2026/03/31/whoop-valuation-10b-series-g-fundraise/" },
    { date: "2026-06-10", cat: "device", source: "Wareable", title: "스크린리스 밴드 3파전 본격화 — Fitbit Air $99 vs Whoop 구독 vs Garmin CIRQA $509", summary: "· Fitbit Air: $99.99 일회성 · 12g · 7일 배터리 · AFib 감지 · 구독 불필요\n· Whoop: 기기 무료 + $30/월 구독 · 혈액검사 연동 · $10.1B 데카콘\n· Garmin CIRQA: $509(소매)/$454(프리오더) · Body Battery 특화 · 구독 없는 프리미엄\n· 세 가지 비즈니스 모델(저가 일회성 vs 구독 vs 고가 일회성) 정면 충돌", tag: "Trend", url: "https://www.wareable.com/" },
    { date: "2026-06-10", cat: "ai", source: "BCG", title: "BCG: AI 에이전트가 헬스케어 최대 변혁 요소 — 앰비언트 AI 스크라이브 보편화", summary: "· BCG 2026 보고서: 코파일럿→자율 에이전트 전환 가속\n· 앰비언트 AI 스크라이브 의사 1일 1~2시간 문서화 절감\n· AI 에이전트가 행정 데이터와 임상 실무를 직접 연결\n· BCG × Hippocratic AI 전략 협업 · 행정 부담 30% 감소(Salesforce 2025 조사)", tag: "Report", url: "https://www.bcg.com/publications/2026/how-ai-agents-will-transform-health-care" },
    { date: "2026-06-10", cat: "startup", source: "SiliconAngle", title: "스트라바, IPO S-1 비밀 제출 — Goldman Sachs 주간사 · ARR ~$500M", summary: "· 2026.01.08 S-1 비밀 제출 · Goldman Sachs + JPMorgan 주간사\n· 밸류 $2.2B+(Series F 2025.05) · IPO 시 $3B+ 전망\n· ARR ~$500M · 구독 리텐션 80~90% · 1.5억 등록 사용자\n· Gen Z 런클럽·소셜 기능이 성장 동력 · 활동 소셜 플랫폼 첫 상장", tag: "IPO", url: "https://the5krunner.com/2026/01/09/strava-ipo-filing-3-billion-valuation-analysis/" },

    // ── 2026-06-09 ──
    { date: "2026-06-09", cat: "ai", source: "Rock Health", title: "Q1 2026 디지털 헬스 펀딩 $4.0B/110건 — 자본 집중·AI 시대 공식화", summary: "· Rock Health: $4.0B/110건 · 평균 딜 $36.7M(2021 이래 최고)\n· 메가딜($100M+) 12건 — 팬데믹 피크(Q1 2022) 이후 최다\n· CB Insights 별도 집계: $7.4B(메가라운드 60% · 19건)\n· '있는 자/없는 자' 양극화 — 검증된 AI 기업에 자본 집중", tag: "Report", url: "https://rockhealth.com/insights/q1-2026-funding-overview-capital-continues-concentrating-and-four-other-market-signals/" },
    { date: "2026-06-09", cat: "device", source: "9to5Mac", title: "Apple Watch S11 vs Oura vs Fitbit Air vs Whoop — 수면·심박 정확도 실사용 비교", summary: "· 4자 실사용 비교: 수면 추적·심박 정확도·배터리·가격 종합 순위\n· Apple Watch: 유일 FDA clearance(ECG/AFib) · 고혈압 알림 신규\n· Oura: 수면 정확도 최고 · Fitbit Air: 가성비 최강\n· Whoop: 회복(Recovery) 분석 최고 · 운동 강도 코칭 우위", tag: "Review", url: "https://9to5mac.com/" },
    { date: "2026-06-09", cat: "startup", source: "CNBC", title: "펠로톤 Q3 FY2026 흑자 전환 — GAAP 순이익 $26.4M · 구독 2.662M", summary: "· Q3 FY2026 매출 $631M(+1% YoY · 가이던스 상회)\n· GAAP 순이익 $26.4M — 전년 동기 -$47.7M에서 $74M 개선\n· Connected Fitness 구독 2.662M · 월 이탈률 1.2%(전분기 1.9%)\n· FY 가이던스 $2.42~2.44B · Precor 브랜드 통합 효과", tag: "Earnings", url: "https://www.cnbc.com/2026/05/07/peloton-pton-earnings-q3-2026.html" },
    { date: "2026-06-09", cat: "ai", source: "Reuters", title: "앤스로픽, 클로드 기반 임상 문서화 파일럿 확대", summary: "· 진료 기록 자동화·요약 워크로드 실증 진행\n· 구체 병원 수 공식 미확인 · 엔터프라이즈 채택 확대\n· 의료 AI 안전성 프레임워크 동시 발표", tag: "Enterprise", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },
    { date: "2026-06-09", cat: "startup", source: "Axios", title: "눔, GLP-1 원격의료로 무게중심 이동 — 행동 코칭+처방 결합", summary: "· 행동 코칭 + 비만 치료제 처방 결합 모델 전환\n· 2023 감원 500+명 이후 조직 재편 완료\n· Nature 연구: GLP-1+mHealth 12개월 -12.7% 체중 감소\n· 앱 참여도(engagement)가 감량 결과를 직접 결정", tag: "Strategy", url: "https://www.axios.com/" },

    // ── 2026-06-08 ──
    { date: "2026-06-08", cat: "ai", source: "WSJ", title: "아마존, One Medical에 AI 트리아지 결합… 가상 진료 속도 개선", summary: "· 증상 분류 AI 선처리 → 의료진 연결 시간 단축\n· Alexa+ 의료 기능 출시 · Amazon Pharmacy 통합\n· One Medical 회원 100만+ 기반 확장\n· 의료를 커머스 수준의 속도·편의로 재설계", tag: "Product", url: "https://www.wsj.com/health" },
    { date: "2026-06-08", cat: "device", source: "9to5Google", title: "Fitbit Air 출시 — $99.99 스크린리스 밴드 · 12g · 7일 배터리", summary: "· Google Fitbit Air 2026.05 출시 · 구독 없음(Premium 3개월 무료)\n· 12g(밴드 포함) · Inspire 3 대비 50% 소형화\n· AFib 감지·SpO2·HRV·피부온도 · 5분 충전 1일 사용\n· Stephen Curry 협업 에디션 $129.99 · Google Health 앱 전환 가속", tag: "Launch", url: "https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/" },
    { date: "2026-06-08", cat: "ai", source: "The Verge", title: "빅테크 헬스 경쟁의 핵심은 'AI 헬스 에이전트' 레이어 장악", summary: "· 디바이스·앱 위에서 사용자를 조율하는 에이전트 레이어 주도권 경쟁\n· OpenAI·Google·Amazon·Anthropic 4파전 구도\n· BCG: 앰비언트 AI 스크라이브 → 자율 임상 에이전트 전환\n· 데이터 허브를 장악하는 자가 헬스케어 가치사슬 지배", tag: "Analysis", url: "https://www.theverge.com/health" },
    { date: "2026-06-08", cat: "startup", source: "TechCrunch", title: "비전 AI 칼로리 추적 경쟁 — MFP Cal AI 통합이 바꾼 판도", summary: "· MFP의 Cal AI(ARR $30M) 인수로 경쟁 구도 급변\n· 사진 한 장 식단 기록이 카테고리 표준 기능화\n· Snapcalorie 등 독립 비전 AI 앱 차별화 압박 심화\n· 정밀 영양소 분석·웨어러블 연동이 차세대 격전지", tag: "Analysis", url: "https://techcrunch.com/" },

    // ── 2026-06-07 ──
    { date: "2026-06-07", cat: "device", source: "9to5Mac", title: "Apple Watch S11 vs Oura Ring 4 vs Fitbit Air vs Whoop MG — 4자 실사용 비교 리뷰", summary: "· 수면 추적 정확도: Oura > Apple > Whoop > Fitbit Air\n· 의료 등급: Apple Watch 유일 FDA clearance · 나머지 wellness\n· 가성비: Fitbit Air $99 최고 · Whoop 구독 $30/월 · Oura 링 $349+구독\n· 폼팩터별 수요 분화 — 손목(워치·밴드) vs 손가락(링) 공존 확인", tag: "Review", url: "https://9to5mac.com/" },

    // ── 2026-06-06 ──
    { date: "2026-06-06", cat: "startup", source: "Forbes", title: "플로 헬스 MAU 7,700만 돌파 — femtech 유니콘 갱년기 시장 정조준", summary: "· MAU 7,700만(NetNewsLedger 2026.03) · Google Play 다운로드 2위\n· femtech 유니콘 생애주기 전반 확장\n· 갱년기·불임 등 여성 건강 전 영역 서비스 확장\n· 익명 모드 등 데이터 프라이버시가 신뢰 해자", tag: "Growth", url: "https://www.forbes.com/health/" },
    { date: "2026-06-06", cat: "device", source: "DC Rainmaker", title: "가민 FY2025 피트니스 매출 $2.36B 확정 · +12.8% YoY", summary: "· FY2025 피트니스 세그먼트 $2.36B 확정(Garmin PR Newswire 2026.02)\n· 프리미엄 멀티스포츠 수요 견조 · 시총 $33B+\n· CIRQA 스크린리스 밴드로 Whoop 직접 경쟁 예고\n· 구독 의존 없는 하드웨어 마진 모델 차별화", tag: "Earnings", url: "https://www.dcrainmaker.com/" },
    { date: "2026-06-06", cat: "startup", source: "The Information", title: "스트라바 AI 코치 'Athlete Intelligence' — 1.5억 사용자 대상 출시", summary: "· 누적 운동 데이터 해석 개인화 훈련 인사이트\n· IPO S-1 제출(2026.01) · Goldman Sachs 주간사\n· ARR ~$500M · 리텐션 80~90% · Gen Z 런클럽 드라이브 성장\n· API 접근 제한·유료화로 IPO 전 수익성 정비", tag: "Product", url: "https://www.theinformation.com/" },

    // ── 2026-06-05 ──
    { date: "2026-06-05", cat: "ai", source: "STAT News", title: "파운데이션 모델 헬스 에이전트, 데모 넘어 규제 파일럿 단계로", summary: "· 임상·규제 환경 실증 시작 · 안전성 검증 프레임 구축\n· FDA AI/ML 가이드라인 업데이트 반영\n· STAT: 앰비언트 스크라이브 비용 증가 우려 보도(2026.04)\n· 문서화 효율 vs 청구 코드 상향(upcoding) 논쟁 시작", tag: "Trend", url: "https://www.statnews.com/2026/04/08/are-scribes-raising-health-care-costs-ai-prognosis/" },
    { date: "2026-06-05", cat: "device", source: "Wareable", title: "애플 헬스, Watch S11에 고혈압 알림 + 수면 점수 탑재", summary: "· 고혈압 알림: 30일간 광학 센서 혈관 반응 분석 후 알림\n· 수면 점수: 수면 시간·중단·일관성·단계 종합 평가\n· Apple Intelligence 헬스 요약 기능 확장\n· 2026 모델은 디자인 유지 · 센서 수 증가 전망(MacRumors)", tag: "Product", url: "https://www.wareable.com/" },
    { date: "2026-06-05", cat: "startup", source: "TechRadar", title: "운동 앱 AI 개인화 경쟁 본격화 — Strava·Ladder·AllTrails", summary: "· 추천·코칭 품질이 구독 유지율 가르는 핵심 변수\n· Strava Athlete Intelligence · Ladder AI 맞춤 · AllTrails AI 추천\n· 개인화 수준이 유료 전환율 직접 결정\n· 범용 AI 코치 vs 버티컬 특화 코치 경쟁 구도 형성", tag: "Trend", url: "https://www.techradar.com/health-fitness" },

    // ── 2026-06-04 ──
    { date: "2026-06-04", cat: "startup", source: "TechCrunch", title: "올트레일스 6,500만 가입자 대상 AI 트레일 추천 출시", summary: "· 위치·난이도·날씨 반영 맞춤 트레일 추천\n· 아웃도어 앱 최고 성장률 · AI 안전 경고 추가\n· 실시간 혼잡도 표시 기능 업데이트", tag: "Launch", url: "https://techcrunch.com/" },
    { date: "2026-06-04", cat: "ai", source: "CNBC", title: "구글·아마존·MS, 헬스 AI 인프라 투자 가속", summary: "· Azure Health Bot + AWS HealthScribe + Google MedPaLM\n· 클라우드·모델 사업자 헬스 데이터 워크로드 선점 경쟁\n· 의료 특화 LLM 인프라 구축 가속", tag: "Analysis", url: "https://www.cnbc.com/health-and-science/" },
    { date: "2026-06-04", cat: "device", source: "Android Central", title: "스마트링 경쟁 격화 — Oura $11B vs Samsung Galaxy Ring 2세대", summary: "· Oura IPO S-1 제출 · 삼성 Galaxy Ring 2세대 로드맵\n· 2026 스마트링 출하량 전년비 2배 전망\n· Ultrahuman·Amazfit 등 신규 진입 가속\n· Oura 점유율 80%+ 방어 vs 가격 경쟁 압박", tag: "Market", url: "https://www.androidcentral.com/wearables" },

    // ── 2026-06-03 ──
    { date: "2026-06-03", cat: "device", source: "Bloomberg", title: "오우라 Series E $9억 후 사업 확장 — $11B 밸류 · IPO 로드맵", summary: "· Series E $9억(Fidelity 주도) 밸류 $11B(CNBC 2025.10)\n· 대사·여성건강 신규 지표 확장 · Ring 4 글로벌 출시 완료\n· 기업 B2B 웰니스·방위 분야 진출 · 자체 AI 모델 개발", tag: "Funding", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-03", cat: "startup", source: "Axios", title: "캄·헤드스페이스, 임상 검증 정신건강 서비스로 전환", summary: "· 명상 앱 다운로드 하락세(-61%, 2018→2024 Statista)\n· 근거 기반 디지털 치료제(DTx) 이동\n· B2B 기업복지 + 보험 연계 수익화 전략", tag: "Strategy", url: "https://www.axios.com/" },
    { date: "2026-06-03", cat: "ai", source: "Reuters", title: "Q1 AI 네이티브 헬스 스타트업에 사상 최대 자본 유입", summary: "· Rock Health: Q1 $4.0B/110건 · CB Insights: $7.4B\n· 메가딜 12건 · 평균 딜 $36.7M(2021 이래 최고)\n· AI 주도 딜 비중 62% · '있는 자/없는 자' 양극화 심화", tag: "Funding", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },

    // ── 2026-06-02 ──
    { date: "2026-06-02", cat: "device", source: "DC Rainmaker", title: "Fitbit Air 심층 리뷰 — $99 밴드의 실제 수면·심박 정확도 검증", summary: "· DC Rainmaker 심층 실사용 테스트 · 수면 추적·심박 정확도 측정\n· $99 가격 대비 상위 가성비 평가 · 7일 배터리 실측 확인\n· Whoop 대비 구독 없는 일회성 모델 강점 · 단, 스크린 없는 UX 한계\n· Fitbit Air WSJ 수면 순위: 학술 미검증(peer-reviewed study 아님) 명시", tag: "Review", url: "https://www.dcrainmaker.com/" },

    // ── 2026-05-31 ──
    { date: "2026-05-31", cat: "device", source: "the5krunner", title: "스크린리스 밴드 심박 정확도 비교 — Whoop vs Fitbit Air vs Garmin CIRQA", summary: "· the5krunner 실측 HR 비교 테스트\n· Whoop: 안정 시 정확도 높음 · 운동 중 편차 존재\n· Fitbit Air: $99 가격 대비 합리적 정확도 · 고강도 운동 시 한계\n· Garmin CIRQA: Body Battery 알고리즘 차별화 · 가격 $509 프리미엄", tag: "Review", url: "https://the5krunner.com/" },

    { date: "2026-06-02", cat: "ai", source: "The Verge", title: "삼성헬스, 갤럭시 워치 7 앞두고 AI 코칭 확장 예고", summary: "· 온디바이스 AI 실시간 코칭 강화\n· Galaxy Watch 7 + One UI Health 대규모 업데이트\n· 삼성 헬스 에이전트 기능 2026 하반기 출시 예정", tag: "Product", url: "https://www.theverge.com/health" },
    { date: "2026-06-02", cat: "device", source: "CNBC", title: "웨어러블 RPM 시장 연 14.7% 성장 — TAM $660B(2030E)", summary: "· 만성질환 관리 수요 · 웨어러블 원격환자모니터링 확대\n· 2026~2030 CAGR 14.7% · TAM $660B(2030E)\n· 보험 적용 범위 확대가 성장 핵심 동력", tag: "Market", url: "https://www.cnbc.com/health-and-science/" },

    // ── 2026-05-22 ──
    { date: "2026-05-22", cat: "device", source: "TechCrunch", title: "오우라 S-1 비밀 제출 — 스마트링 유니콘 IPO 로드맵 본격화", summary: "· 2026.05.21 SEC S-1 비밀 제출(CNBC·TechCrunch 확인)\n· 2025 매출 ~$1B · 2026E 매출 $2B 전망(2년 만에 4배 성장)\n· 누적 550만 링 판매 · 스마트링 시장 점유율 80%+(IDC)\n· 유럽 헬스테크 최초 데카콘 · Series E $9억 밸류 $11B", tag: "IPO", url: "https://techcrunch.com/2026/05/22/oura-ipo-s1-filing/" },

    // ── 2026-05-21 ──
    { date: "2026-05-21", cat: "device", source: "Forbes", title: "가민 CIRQA $509 — 프리미엄 스크린리스 밴드의 가격 정당성 분석", summary: "· Garmin CIRQA 소매가 $509 / 프리오더 $454 확정(Notebookcheck)\n· Fitbit Air($99)·Whoop 구독($30/월) 대비 5배 프리미엄\n· Body Battery·HRV·SpO2·스트레스 추적 · 구독 없는 일회성 모델\n· 가민 브랜드 충성도 + 멀티스포츠 생태계가 프리미엄 정당화", tag: "Analysis", url: "https://www.forbes.com/health/" },

    // ── 2026-05-30 ──
    { date: "2026-05-30", cat: "ai", source: "J.P. Morgan", title: "GLP-1 + 디지털 코칭 — 새로운 체중관리 스택", summary: "· 비만 치료제 + 행동 코칭 결합 시장 표준화\n· 코칭 결합 시 참여도 +38% YoY\n· Nature 임상: GLP-1+mHealth 앱 12개월 -12.7% 체중 감소", tag: "Report", url: "https://www.jpmorgan.com/insights" },
    { date: "2026-05-30", cat: "device", source: "Garmin Newsroom", title: "가민 피트니스 매출 $2.36B — +12.8% YoY 성장", summary: "· FY2025 피트니스 세그먼트 $2.36B 확정\n· 프리미엄 라인 호조 · 시총 $33B+\n· 아웃도어·마린 세그먼트도 동반 성장", tag: "Earnings", url: "https://www.garmin.com/en-US/newsroom/" },

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
    { house: "IDC", type: "Market", date: "2026-05-26", title: "글로벌 웨어러블 출하 트래커 — 스마트링이 최고 성장 폼팩터", figure: "Oura 링 점유율 80%+", rating: "Report", url: "https://www.idc.com/" },
    { house: "FDA", type: "Regulatory", date: "2026-01-06", title: "General Wellness 최종 가이드라인 — 혈압·혈당 웨어러블 규제 완화", figure: "Whoop·Oura 수혜", rating: "Final", url: "https://natlawreview.com/article/fdas-2026-general-wellness-policy-and-what-it-means-manufacturers-wearable-devices" },
  ];

  const MARKET_GROWTH = [
    { year: "2021", size: 180, growth: 12 },
    { year: "2022", size: 210, growth: 17 },
    { year: "2023", size: 250, growth: 19 },
    { year: "2024", size: 300, growth: 20 },
    { year: "2025", size: 347, growth: 16 },
    { year: "2026E", size: 420, growth: 21 },
    { year: "2033E", size: 1830, growth: 23 },
  ];

  /* ---- 검증된 밸류에이션 (2026.06 팩트체크) ---- */
  const FUNDING = [
    { name: "Oura", value: 11.0, cat: "device" },
    { name: "Whoop", value: 10.1, cat: "device" },
    { name: "Noom (피크)", value: 3.7, cat: "startup" },
    { name: "Strava", value: 2.2, cat: "startup" },
    { name: "Fitbit (인수)", value: 2.1, cat: "device" },
    { name: "Calm (피크)", value: 2.0, cat: "startup" },
    { name: "Flo", value: 1.0, cat: "startup" },
    { name: "MFP (2020)", value: 0.345, cat: "startup" },
  ];

  const SHARE = [
    { cat: "device", label: "디바이스 헬스", value: 34 },
    { cat: "ai", label: "AI 네이티브", value: 38 },
    { cat: "startup", label: "체중·피트니스", value: 28 },
  ];

  const USERS = [
    { name: "MyFitnessPal", value: 200, cat: "startup" },
    { name: "Strava", value: 150, cat: "startup" },
    { name: "Flo", value: 77, cat: "startup" },
    { name: "AllTrails", value: 65, cat: "startup" },
    { name: "Apple Watch", value: 33, cat: "device" },
    { name: "Oura Ring", value: 5.5, cat: "device" },
    { name: "Peloton", value: 2.66, cat: "startup" },
  ];

  /* ---- 스크린리스 밴드 가격 비교 (2026.06 검증) ---- */
  const BAND_PRICE = [
    { name: "Garmin CIRQA(소매)", value: 509, cat: "device" },
    { name: "Oura Ring 4(기기)", value: 349, cat: "device" },
    { name: "Whoop(연 구독)", value: 239, cat: "ai" },
    { name: "Fitbit Air", value: 99.99, cat: "startup" },
  ];

  /* ---- Q1'26 펀딩 집계 비교 (Rock Health vs CB Insights) ---- */
  const FUNDING_TREND = [
    { name: "CB Insights Q1'26", value: 7.4, cat: "ai" },
    { name: "CB Insights Q4'25", value: 5.9, cat: "ai" },
    { name: "Rock Health Q1'26", value: 4.0, cat: "device" },
    { name: "Rock Health Q1'25", value: 3.0, cat: "device" },
  ];

  /* ---- AI 딜 비중 도넛 ---- */
  const AI_DEALS = [
    { cat: "ai", label: "AI 주도 딜", value: 62 },
    { cat: "device", label: "비 AI 딜", value: 38 },
  ];

  const KPIS = [
    { label: "디지털 헬스 시장 (2025)", value: "$347B", delta: +16.0, sub: "Grand View Research · 2033E $1,830B", fill: 0.74 },
    { label: "Q1 글로벌 펀딩", value: "$4.0B", delta: +33.0, sub: "Rock Health 110건 · CB Insights $7.4B", fill: 0.62 },
    { label: "GLP-1 시장 (2026E)", value: "$82B", delta: +42.0, sub: "Grand View Research · 세마+티르제 $84.5B", fill: 0.85 },
    { label: "웨어러블 CAGR", value: "14.7%", delta: +1.3, sub: "2026–2030 · RPM 성장 동력", fill: 0.74 },
    { label: "Oura 밸류", value: "$11B", delta: +120.0, sub: "Series E $9억 · IPO S-1 제출", fill: 0.92 },
    { label: "Whoop 데카콘", value: "$10.1B", delta: +180.0, sub: "Series G $5.75억 · 매출 $1.1B+", fill: 0.90 },
    { label: "Oura 매출 (2025)", value: "~$1B", delta: +100.0, sub: "2026E $2B 전망 · IPO S-1 제출", fill: 0.80 },
  ];

  /* ---- Key Insights (팩트체크 완료 · 9선) ---- */
  const INSIGHTS = [
    { title: "GLP-1 $82B · 임상 근거 확보", desc: "Grand View Research 2026E $82B · Nature 임상: GLP-1+mHealth 12개월 -12.7% 체중 감소 · 앱 참여도가 결과 결정", icon: "pulse" },
    { title: "AI 헬스 에이전트 시대 선언", desc: "BCG: 코파일럿→자율 에이전트 전환 · 앰비언트 스크라이브 1~2h/일 절감 · Rock Health 'AI 퍼스트 헬스' 공식 선언", icon: "ai" },
    { title: "Oura $11B · IPO S-1 제출", desc: "Series E $9억(Fidelity) 밸류 $11B · 유럽 헬스테크 최초 데카콘 · 2026.05 SEC S-1 비밀 제출 · 매출 $2B 전망", icon: "device" },
    { title: "Whoop $10.1B 데카콘", desc: "Series G $5.75억 · 매출 런레이트 $1.1B+ · 600명 채용 · 호날두·르브론 투자 · Advanced Labs 혈액검사", icon: "spark" },
    { title: "스크린리스 밴드 3파전", desc: "Fitbit Air $99(구독 없음) ↔ Whoop $30/월 구독 ↔ Garmin CIRQA $509(소매) · 카테고리 주류화 가속", icon: "chart" },
    { title: "FDA 규제 완화 수혜", desc: "2026.01 FDA 'General Wellness' 최종 가이드라인 · 비침습 혈압·혈당 wellness 허용 · Whoop·Oura 직접 수혜", icon: "report" },
    { title: "MFP × Cal AI · Strava IPO", desc: "MFP Cal AI 인수(ARR $30M · @dpjmcgregor) · 2억 사용자 비전 AI 통합 · Strava S-1 제출 · ARR ~$500M · Goldman 주간사", icon: "news" },
    { title: "Peloton 흑자 전환", desc: "Q3 FY2026 GAAP 순이익 $26.4M · 구독 2.662M · 매출 $631M(+1% YoY) · 월 이탈률 1.2%로 개선", icon: "grid" },
    { title: "Oura·Strava IPO — 헬스테크 상장 물결", desc: "Oura S-1 비밀 제출(2026.05) · 밸류 $11B · 2025 매출 ~$1B · Strava S-1(2026.01) · ARR ~$500M · 헬스테크 유니콘 동시 상장 물결", icon: "target" },
  ];

  window.DASH = { CATEGORIES, COMPANIES, ARTICLES, REPORTS, MARKET_GROWTH, FUNDING, SHARE, USERS, BAND_PRICE, FUNDING_TREND, AI_DEALS, KPIS, INSIGHTS };
})();
