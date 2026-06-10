/* ============================================================
   Health Intelligence Dashboard — 팩트체크 반영판 (2026.06.10)
   소스: Statista, CB Insights, Grand View Research, 공식 발표
   plain script → window.DASH
   ============================================================ */
(function () {
  "use strict";

  const CATEGORIES = [
    { id: "device", ko: "디바이스 헬스", en: "Device-based Health", accent: "#1428A0", accentSoft: "#E8ECFA", desc: "웨어러블·링·밴드 기반 생체 데이터 플랫폼" },
    { id: "ai", ko: "AI 네이티브 헬스", en: "AI Native Health", accent: "#7A38D6", accentSoft: "#F0E9FB", desc: "파운데이션 모델 기반 헬스 에이전트·코칭" },
    { id: "startup", ko: "체중·피트니스 스타트업", en: "Weight & Fitness Startups", accent: "#0E8F6E", accentSoft: "#E2F4EE", desc: "칼로리·체중관리·운동추천 버티컬" },
  ];

  // ---- Companies (팩트체크 검증 데이터 · 출처 명시) ------------------
  const COMPANIES = [
    // Device
    { cat: "device", name: "Apple", domain: "apple.com", unit: "Health · Watch", valuation: "공개(상장)", valAsof: "26.5", funding: "Public", metric: "Watch 판매", value: "33M/yr", metricAsof: "25 IDC/Fortunly", trend: +4.2,
      note: "Watch·Health 생태계 락인 · ECG/AFib FDA clearance 보유 · Apple Intelligence 헬스 확장 · 연 3,300만대 출하(IDC 2025)",
      url: "https://www.apple.com/newsroom/",
      sources: [{ name: "IDC / Fortunly", date: "2025", url: "https://fortunly.com/statistics/apple-watch-statistics/" }] },

    { cat: "device", name: "Fitbit (Google)", domain: "fitbit.com", unit: "Wearables", valuation: "$2.1B 인수완료", valAsof: "21.1", funding: "Public", metric: "월 활성 사용자", value: "미공개", metricAsof: "—", trend: -2.1,
      note: "Pixel Watch 통합 심화 · 독립 Fitbit 앱 단계적 종료 · MAU 별도 지표 없음",
      url: "https://blog.google/products/fitbit/",
      sources: [{ name: "Google 공식 발표", date: "2021-01", url: "https://blog.google/products/fitbit/" }] },

    { cat: "device", name: "Garmin", domain: "garmin.com", unit: "Fitness · Outdoor", valuation: "$33B+ 시총", valAsof: "26.5", funding: "Public", metric: "피트니스 매출(FY)", value: "$2.36B", metricAsof: "FY25 확정", trend: +12.8,
      note: "FY2025 피트니스 세그먼트 매출 $2.36B 확정 · 전년비 +12.8% · 프리미엄 멀티스포츠 강세",
      url: "https://www.garmin.com/en-US/newsroom/",
      sources: [{ name: "Garmin PR Newswire", date: "2026-02-18", url: "https://www.prnewswire.com/" }] },

    { cat: "device", name: "Oura", domain: "ouraring.com", unit: "Smart Ring", valuation: "$5.2B", valAsof: "25.9 Series D", funding: "Series D", metric: "누적 링 판매", value: "5.5M+", metricAsof: "25 추정", trend: +22.0,
      note: "2025 Series D $2억 조달 밸류 $5.2B 확정 · Oura Ring 5 출시 · 대사·혈당 인사이트 확장 · wellness 기기(FDA 미승인)",
      url: "https://ouraring.com/blog",
      sources: [{ name: "BusinessWire", date: "2025-09-21", url: "https://www.businesswire.com/" }] },

    { cat: "device", name: "Whoop", domain: "whoop.com", unit: "Recovery Band", valuation: "$10.1B", valAsof: "26.3 Series G", funding: "Series G", metric: "구독 ARPU", value: "$239/yr", metricAsof: "26.6", trend: +14.5,
      note: "2026.03 Series G $2.85억 조달 밸류 $10.1B · 데카콘 등극 · Whoop 5.0 + Advanced Labs 혈액검사 연동 · FDA 미승인(wellness)",
      url: "https://www.whoop.com/thelocker/",
      sources: [{ name: "Bloomberg", date: "2026-03-31", url: "https://www.bloomberg.com/news/" }] },

    // AI native
    { cat: "ai", name: "OpenAI Health", domain: "openai.com", unit: "Health Agent", valuation: "$300B+", valAsof: "25", funding: "내부 투자", metric: "헬스 파일럿", value: "Beta", metricAsof: "26.6", trend: +0,
      note: "개인 헬스 어시스턴트 개발 · 의료기관 파트너십 탐색 · Fitbit 출신 임상 인력 영입 정황",
      url: "https://openai.com/news/",
      sources: [{ name: "Bloomberg", date: "2026-06", url: "https://www.bloomberg.com/technology" }] },

    { cat: "ai", name: "Anthropic Claude", domain: "anthropic.com", unit: "Clinical · Wellness", valuation: "$61B", valAsof: "25.3", funding: "Enterprise", metric: "헬스 API 채택", value: "확대", metricAsof: "26.6", trend: +0,
      note: "Claude 헬스케어 엔터프라이즈 확대 · 임상 문서화 파일럿 · 구체 병원 수 공식 미확인",
      url: "https://www.anthropic.com/news",
      sources: [{ name: "Anthropic 공식", date: "2025-03", url: "https://www.anthropic.com/news" }] },

    { cat: "ai", name: "Amazon Health", domain: "amazon.com", unit: "One Medical · Pharmacy", valuation: "$3.9B 인수", valAsof: "23.2", funding: "Public", metric: "One Medical 회원", value: "1M+", metricAsof: "25.12", trend: +12.5,
      note: "AI 트리아지 + Amazon Pharmacy 통합 · Alexa+ 의료 기능 출시 · 가상 진료 속도 개선",
      url: "https://www.aboutamazon.com/news/health",
      sources: [{ name: "Amazon 공식", date: "2023-02", url: "https://www.aboutamazon.com/news/health" }] },

    // Startups
    { cat: "startup", name: "MyFitnessPal", domain: "myfitnesspal.com", unit: "Cal AI 인수 통합", valuation: "~$345M", valAsof: "20 Francisco P.", funding: "PE 보유", metric: "등록 사용자", value: "200M+", metricAsof: "26.5", trend: +5.3,
      note: "Cal AI 인수 후 사진 AI 칼로리 기록 전면 적용 · 앱스토어 피트니스 매출 1위(Jan 2025) · 비전 AI 기본 기능 통합",
      url: "https://www.myfitnesspal.com/blog",
      sources: [{ name: "TechCrunch", date: "2026-06", url: "https://techcrunch.com/" }] },

    { cat: "startup", name: "Noom", domain: "noom.com", unit: "Behavioral Weight", valuation: "피크 $3.7B", valAsof: "21.5 Series F", funding: "Series F", metric: "유료 구독", value: "수백만", metricAsof: "25.12", trend: -3.4,
      note: "GLP-1 원격의료 병행 · 2023 감원 500+명 · 현재 실질 밸류 미공개 · 처방 연계 전환 시도",
      url: "https://www.noom.com/blog/",
      sources: [{ name: "Forbes", date: "2021-05", url: "https://www.forbes.com/" }] },

    { cat: "startup", name: "Snapcalorie", domain: "snapcalorie.com", unit: "Photo Calorie AI", valuation: "Seed 단계", valAsof: "23.7", funding: "Seed $2M", metric: "추정 정확도", value: "업계최고", metricAsof: "26.6", trend: +0,
      note: "구글 출신 창업 · MyFitnessPal 비전AI 도입으로 경쟁 심화 · Series A 미확인",
      url: "https://www.snapcalorie.com/",
      sources: [{ name: "Crunchbase", date: "2023", url: "https://www.crunchbase.com/" }] },

    { cat: "startup", name: "Calm", domain: "calm.com", unit: "Sleep · Mental", valuation: "피크 $2B", valAsof: "19.12", funding: "Series C", metric: "다운로드 추이", value: "-61%", metricAsof: "18→24 Statista", trend: -8.0,
      note: "다운로드 하락세(-61%, 2018→2024) · 임상 검증 정신건강 + B2B 기업복지 전환 · ARPU 방어 전략",
      url: "https://www.calm.com/blog",
      sources: [{ name: "Statista", date: "2024", url: "https://www.statista.com/" }] },

    { cat: "startup", name: "Flo Health", domain: "flo.health", unit: "Women's Health", valuation: "$1B+", valAsof: "24.7", funding: "Series C $200M", metric: "월 활성 사용자", value: "77M", metricAsof: "26.3 NetNewsLedger", trend: +14.2,
      note: "MAU 7,700만 확인(NetNewsLedger 2026.03) · Google Play 헬스앱 다운로드 글로벌 2위 · 갱년기 시장 확장",
      url: "https://flo.health/about-us/press",
      sources: [{ name: "NetNewsLedger", date: "2026-03-17", url: "https://www.netnewsledger.com/" }] },

    { cat: "startup", name: "AllTrails", domain: "alltrails.com", unit: "Outdoor Activity", valuation: "$1B+", valAsof: "23.3", funding: "PE", metric: "등록 사용자", value: "65M", metricAsof: "26.4", trend: +11.0,
      note: "AI 트레일 추천 출시 · 아웃도어 앱 최고 성장률 · 위치·난이도·날씨 반영 맞춤 추천",
      url: "https://www.alltrails.com/press",
      sources: [{ name: "AllTrails 공식", date: "2026-04", url: "https://www.alltrails.com/press" }] },

    { cat: "startup", name: "Peloton", domain: "onepeloton.com", unit: "Connected Fitness", valuation: "~$1.1B 시총", valAsof: "26.5", funding: "Public", metric: "Connected 구독", value: "2.66M", metricAsof: "Q3 FY25 IR", trend: +0.8,
      note: "Q3 FY2025 Connected Fitness 구독 2.66M 확정 · 흑자 전환 성공 · 구독 매출 $1.7B(67%) · 하드웨어→콘텐츠 플랫폼 완료",
      url: "https://www.onepeloton.com/press",
      sources: [{ name: "Peloton IR", date: "2026-05-06", url: "https://investor.onepeloton.com/" }] },

    { cat: "startup", name: "Finch", domain: "finchcare.com", unit: "Self-care Pet", valuation: "Series A", valAsof: "22.2", funding: "Series A", metric: "DAU 리텐션", value: "상위권", metricAsof: "26.5", trend: +7.5,
      note: "Gen Z 셀프케어 앱 최고 리텐션 · 게이미피케이션 + 정신건강",
      url: "https://finchcare.com/",
      sources: [{ name: "Crunchbase", date: "2022", url: "https://www.crunchbase.com/" }] },

    { cat: "startup", name: "Strava", domain: "strava.com", unit: "Activity Social", valuation: "$2.2B+", valAsof: "26.1 SiliconAngle", funding: "Series F", metric: "등록 사용자", value: "150M", metricAsof: "26.5", trend: +8.1,
      note: "2026.01 밸류 $2.2B+ 확인 · IPO 추진 S-1 비밀 제출 보도 · AI 코치 'Athlete Intelligence' 출시 · Google Play 매출 2위",
      url: "https://press.strava.com/",
      sources: [{ name: "SiliconAngle", date: "2026-01-07", url: "https://siliconangle.com/" }] },

    { cat: "startup", name: "Ladder", domain: "joinladder.com", unit: "Strength Coaching", valuation: "Series B", valAsof: "24.9", funding: "Series B", metric: "구독 성장", value: "고성장", metricAsof: "26.5", trend: +22.0,
      note: "근력 코칭 구독 + AI 맞춤 계획 · 헬스케어 구독 성장률 최고 수준",
      url: "https://www.joinladder.com/",
      sources: [{ name: "TechCrunch", date: "2024-09", url: "https://techcrunch.com/" }] },
  ];

  // ---- Articles (개조식 · 팩트체크 반영 · 확장) ----------------------
  const ARTICLES = [
    // 2026-06-10 (오늘)
    { date: "2026-06-10", cat: "ai", source: "Bloomberg", title: "오픈AI, 소비자 헬스팀 조용히 확대… 핏빗 출신 임상 인력 영입", summary: "· 개인 헬스 어시스턴트 출시 겨냥 채용·파트너십 정황 포착\n· Fitbit 출신 임상·규제 전문가 다수 합류\n· 웨어러블 데이터 통합 의료 에이전트 개발 추진", tag: "Hiring", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-10", cat: "device", source: "The Verge", title: "오우라, 새 대사 플랫폼으로 링에서 연속 혈당 인사이트 제공", summary: "· 수면·심박 넘어 메타볼릭 헬스로 스마트링 경쟁 영역 확장\n· Series D $2억 조달 밸류 $5.2B 확정(BusinessWire 2025.09)\n· 대사 지표 + 여성건강 신규 트래킹 추가 예정", tag: "Product", url: "https://www.theverge.com/health" },
    { date: "2026-06-10", cat: "startup", source: "TechCrunch", title: "마이피트니스팔, Cal AI 인수 후 사진 칼로리 기록을 2억 사용자에 전면 적용", summary: "· Cal AI 인수 완료 후 비전 AI 식단 기록 기본 기능 통합\n· 사진 한 장으로 칼로리·영양소 자동 분석\n· 앱스토어 피트니스 매출 1위(Jan 2025) 기록", tag: "Launch", url: "https://techcrunch.com/" },
    { date: "2026-06-10", cat: "device", source: "ZDNet Korea", title: "삼성헬스, 갤럭시 워치 신제품 앞두고 AI 코칭 대폭 강화", summary: "· 수면·운동 데이터 기반 개인화 코칭 기능 확대\n· 헬스 에이전트 기능 예고 · 온디바이스 AI 실시간 분석\n· Galaxy Ring 2세대 출시 로드맵 확인", tag: "Product", url: "https://www.zdnet.co.kr/" },
    { date: "2026-06-10", cat: "ai", source: "STAT News", title: "美 GLP-1 시장 $66.4B 규모로 확대… 디지털 코칭 결합 가속", summary: "· Grand View Research 2026 기준 글로벌 GLP-1 시장 $66.4B\n· 비만 치료제 + 행동 코칭 결합 표준화 가속\n· Noom·WW 처방 연계 전환 · 참여도 +38% YoY", tag: "Market", url: "https://www.statnews.com/" },
    { date: "2026-06-10", cat: "device", source: "Wareable", title: "스마트링, 가장 빠른 웨어러블 카테고리로 부상", summary: "· Oura Ring 5 + Samsung Galaxy Ring 양강 구도 형성\n· 스마트링 시장 2025~2030 CAGR 24.3% 전망\n· 신규 진입(Ultrahuman, Amazfit) 가속 · 소형 폼팩터 수요 증가", tag: "Trend", url: "https://www.wareable.com/" },
    { date: "2026-06-10", cat: "startup", source: "Bloomberg", title: "Whoop, Series G $2.85억 조달로 데카콘 등극… 밸류 $10.1B", summary: "· 2026.03 Series G 라운드 완료 밸류에이션 $10.1B 확정\n· 소비자 wellness 웨어러블 최초 데카콘\n· Advanced Labs 혈액검사 연동 + Whoop 5.0 출시", tag: "Funding", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-10", cat: "startup", source: "SiliconAngle", title: "스트라바, IPO 추진… S-1 비밀 제출 보도", summary: "· 밸류에이션 $2.2B+(SiliconAngle 2026.01) 확인\n· S-1 비밀 제출 보도 · 상장 시 활동 소셜 플랫폼 첫 IPO\n· 등록 사용자 1.5억 · AI 코치 'Athlete Intelligence' 출시", tag: "IPO", url: "https://siliconangle.com/" },

    // 2026-06-09
    { date: "2026-06-09", cat: "ai", source: "Reuters", title: "앤스로픽, 클로드 기반 임상 문서화 파일럿 확대", summary: "· 진료 기록 자동화·요약 워크로드 실증 진행\n· 구체 병원 수 공식 미확인 · 엔터프라이즈 채택 확대\n· 의료 AI 안전성 프레임워크 동시 발표", tag: "Enterprise", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },
    { date: "2026-06-09", cat: "device", source: "CNBC", title: "Whoop 5.0, Advanced Labs 혈액검사 연동 출시", summary: "· 소비자 wellness 기기로 혈액 바이오마커 연동 최초 시도\n· FDA 의료기기 승인 없음(wellness 등급)\n· 구독 ARPU $239/yr · 데카콘 $10.1B 달성 직후 제품 확장", tag: "Product", url: "https://www.cnbc.com/health-and-science/" },
    { date: "2026-06-09", cat: "startup", source: "Axios", title: "눔, 표준 다이어트 앱 둔화 속 GLP-1 원격의료로 무게중심 이동", summary: "· 행동 코칭 + 비만 치료제 처방 결합 모델 전환\n· 2023 감원 500+명 이후 조직 재편 완료\n· GLP-1 원격 처방 서비스 본격 론칭", tag: "Strategy", url: "https://www.axios.com/" },
    { date: "2026-06-09", cat: "startup", source: "매일경제", title: "국내 체중관리 앱, GLP-1 처방 연계 서비스 잇따라 출시", summary: "· 원격의료·약 배송 결합 디지털 체중관리 경쟁 본격화\n· 국내 비만 치료제 시장 급성장 · 앱 기반 처방 연계 모델 확산", tag: "Market", url: "https://www.mk.co.kr/" },
    { date: "2026-06-09", cat: "device", source: "9to5Mac", title: "애플워치, ECG/AFib FDA clearance 기반 의료 등급 차별화", summary: "· 소비자 웨어러블 중 유일 FDA clearance 보유\n· Whoop·Oura는 wellness 등급(미승인)\n· 연 3,300만대 판매(IDC/Fortunly 2025) · 헬스 생태계 락인 심화", tag: "Regulatory", url: "https://9to5mac.com/" },
    { date: "2026-06-09", cat: "ai", source: "Rock Health", title: "2026 상반기 디지털 헬스 = AI 시대 공식 선언", summary: "· Rock Health 반기 리포트에서 'AI 퍼스트 헬스' 시대 공식 선언\n· 2026 상반기 펀딩 62% AI 주도 딜\n· 비AI 헬스 스타트업 펀딩 급감 · 패러다임 전환 확인", tag: "Report", url: "https://rockhealth.com/insights/" },

    // 2026-06-08
    { date: "2026-06-08", cat: "ai", source: "WSJ", title: "아마존, One Medical에 AI 트리아지 결합… 가상 진료 속도 개선", summary: "· 증상 분류 AI 선처리 → 의료진 연결 시간 단축\n· Alexa+ 의료 기능 출시 · Amazon Pharmacy 통합\n· One Medical 회원 100만+ 기반 확장", tag: "Product", url: "https://www.wsj.com/health" },
    { date: "2026-06-08", cat: "startup", source: "TechCrunch", title: "스냅칼로리, 사진 기반 칼로리 추정 고도화 추진", summary: "· 구글 출신 창업팀 이미지 인식 정확도 승부\n· Seed $2M 단계 · MFP Cal AI 통합으로 경쟁 심화\n· 더 정밀한 영양소 분석 알고리즘 개발 중", tag: "Funding", url: "https://techcrunch.com/" },
    { date: "2026-06-08", cat: "device", source: "9to5Google", title: "핏빗, 픽셀 통합 심화… 독립 앱 시대 사실상 종료 신호", summary: "· 구글 생태계 흡수 가속 · 별도 핏빗 경험 축소\n· MAU 미공개 · Pixel Watch 중심 전략 전환\n· 기존 Fitbit 사용자 마이그레이션 진행", tag: "Analysis", url: "https://9to5google.com/guides/fitbit/" },
    { date: "2026-06-08", cat: "ai", source: "전자신문", title: "빅테크 헬스 경쟁의 핵심은 'AI 헬스 에이전트' 레이어 장악", summary: "· 디바이스·앱 위 사용자 조율 에이전트 주도권 경쟁 부상\n· OpenAI·Google·Amazon·Anthropic 4파전 구도\n· 데이터 허브 역할이 핵심 경쟁력", tag: "Analysis", url: "https://www.etnews.com/" },
    { date: "2026-06-08", cat: "startup", source: "Peloton IR", title: "펠로톤, Q3 FY2025 흑자 전환 성공… 구독 2.66M 확정", summary: "· Connected Fitness 구독 2.66M 확정(Peloton IR 2026.05.06)\n· 흑자 전환 성공 · 구독 매출 $1.7B(67%)\n· 하드웨어→콘텐츠 플랫폼 전환 완료", tag: "Earnings", url: "https://investor.onepeloton.com/" },

    // 2026-06-06
    { date: "2026-06-06", cat: "startup", source: "Forbes", title: "플로 헬스, 월 7,700만 사용자 돌파… 美 갱년기 시장 정조준", summary: "· MAU 7,700만 확인(NetNewsLedger 2026.03)\n· femtech 유니콘 생애주기 전반 확장\n· Google Play 헬스앱 다운로드 글로벌 2위", tag: "Growth", url: "https://www.forbes.com/health/" },
    { date: "2026-06-06", cat: "device", source: "DC Rainmaker", title: "가민, FY2025 피트니스 매출 $2.36B 확정… 웨어러블 시장 상회 성장", summary: "· FY2025 피트니스 세그먼트 $2.36B 확정(Garmin PR Newswire 2026.02)\n· 전년비 +12.8% 성장 · 프리미엄 멀티스포츠 수요 견조\n· 시총 $33B+ 유지", tag: "Market", url: "https://www.dcrainmaker.com/" },
    { date: "2026-06-06", cat: "startup", source: "The Information", title: "스트라바, 활동 이력 기반 AI 코치 'Athlete Intelligence' 출시", summary: "· 누적 운동 데이터 해석 개인화 훈련 인사이트 제공\n· Google Play 매출 2위 · IPO S-1 비밀 제출 보도\n· 1.5억 사용자 대상 AI 코칭 확장", tag: "Product", url: "https://www.theinformation.com/" },

    // 2026-06-05
    { date: "2026-06-05", cat: "ai", source: "STAT News", title: "파운데이션 모델 헬스 에이전트, 데모 넘어 규제 파일럿 단계로", summary: "· 임상·규제 환경 실증 시작 · 안전성 검증 프레임 구축\n· FDA AI/ML 가이드라인 업데이트 반영\n· 헬스 LLM 임상 시험 프로토콜 정비", tag: "Trend", url: "https://www.statnews.com/" },
    { date: "2026-06-05", cat: "device", source: "Wareable", title: "애플 헬스, 워치·아이폰 전반에 AI 트렌드 요약 기능 추가", summary: "· 흩어진 건강 지표 AI 요약 · 변화 추이 자동 제시\n· Apple Intelligence 헬스 확장의 첫 단계\n· 사용자 행동 데이터 기반 예측 인사이트 개발", tag: "Product", url: "https://www.wareable.com/" },
    { date: "2026-06-05", cat: "startup", source: "한국경제", title: "운동 앱들, AI 개인화 추천 경쟁 본격화", summary: "· 추천·코칭 품질이 구독 유지율 가르는 핵심 변수\n· Strava·Ladder·AllTrails AI 기능 경쟁 심화\n· 개인화 수준이 유료 전환율 직접 결정", tag: "Trend", url: "https://www.hankyung.com/" },

    // 2026-06-04
    { date: "2026-06-04", cat: "startup", source: "TechCrunch", title: "올트레일스, 6,500만 가입자 대상 AI 트레일 추천 출시", summary: "· 위치·난이도·날씨 반영 맞춤 트레일 추천\n· 아웃도어 앱 최고 성장률 기록\n· AI 기반 안전 경고 + 실시간 혼잡도 표시 추가", tag: "Launch", url: "https://techcrunch.com/" },
    { date: "2026-06-04", cat: "ai", source: "CNBC", title: "구글·아마존·MS, 헬스 AI 인프라 투자 가속", summary: "· 클라우드·모델 사업자 헬스 데이터 워크로드 선점 경쟁\n· Azure Health Bot + AWS HealthScribe + Google MedPaLM\n· 의료 특화 LLM 인프라 구축 가속", tag: "Analysis", url: "https://www.cnbc.com/health-and-science/" },
    { date: "2026-06-04", cat: "device", source: "ZDNet Korea", title: "스마트링 경쟁 격화… 삼성·오우라 양강 구도 본격화", summary: "· 반지형 웨어러블 시장 급성장 · 신규 진입 잇따라\n· Oura $5.2B vs Samsung 시총 차이에도 기술 경쟁 치열\n· 2026 스마트링 출하량 전년비 2배 전망", tag: "Market", url: "https://www.zdnet.co.kr/" },

    // 2026-06-03
    { date: "2026-06-03", cat: "device", source: "Bloomberg", title: "오우라, Series D 후 스마트링 사업 확장 가속", summary: "· 2025.09 $2억 조달 밸류 $5.2B(BusinessWire)\n· 대사·여성건강 신규 지표 확장 가속\n· Ring 5 글로벌 출시 완료 · 기업 B2B 웰니스 진출", tag: "Funding", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-03", cat: "startup", source: "Axios", title: "캄·헤드스페이스, 임상 검증 정신건강 서비스로 전환", summary: "· 명상 앱 다운로드 하락세(-61%, 2018→2024 Statista)\n· 근거 기반 디지털 치료제(DTx) 이동\n· B2B 기업복지 + 보험 연계 수익화 전략", tag: "Strategy", url: "https://www.axios.com/" },
    { date: "2026-06-03", cat: "ai", source: "Reuters", title: "2분기 AI 네이티브 헬스 스타트업에 사상 최대 자본 유입", summary: "· AI 우선 헬스 기업 디바이스 스타트업 대비 2배 자금 조달\n· Q1 2026 디지털 헬스 펀딩 $4~7.4B 범위 추정\n· Rock Health·CB Insights 집계 기준 차이 존재", tag: "Funding", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },

    // 2026-06-02
    { date: "2026-06-02", cat: "ai", source: "The Verge", title: "삼성헬스, 차기 갤럭시 워치 앞두고 AI 코칭 확장", summary: "· 온디바이스 AI 실시간 코칭 강화 예고\n· Galaxy Watch 7 시리즈 + One UI Health 대규모 업데이트\n· 삼성 헬스 에이전트 기능 2026 하반기 출시 예정", tag: "Product", url: "https://www.theverge.com/health" },
    { date: "2026-06-02", cat: "startup", source: "매일경제", title: "펠로톤, 하드웨어→콘텐츠 플랫폼 전환 완료 단계", summary: "· FY2025 구독 매출 $1.7B(67%) · 하드웨어 $817M\n· 총매출 ~$2.5B · Q3 흑자 전환 확정\n· Connected Fitness 구독 2.66M 안정 유지", tag: "Earnings", url: "https://www.mk.co.kr/" },
    { date: "2026-06-02", cat: "device", source: "CNBC", title: "웨어러블 RPM(원격환자모니터링) 시장, 연 14.7% 성장 전망", summary: "· 만성질환 관리 수요 · 웨어러블 기반 원격 모니터링 확대\n· 2026~2030 CAGR 14.7% · TAM $660B(2030E)\n· 보험 적용 범위 확대가 성장 핵심 동력", tag: "Market", url: "https://www.cnbc.com/health-and-science/" },

    // 2026-05-30
    { date: "2026-05-30", cat: "ai", source: "J.P. Morgan", title: "GLP-1 + 디지털 코칭, 새로운 체중관리 스택으로 부상", summary: "· 비만 치료제 + 행동 코칭 결합 시장 표준화\n· 코칭 결합 시 참여도 +38% YoY 개선\n· GLP-1 글로벌 시장 $66.4B(Grand View Research 2026)", tag: "Report", url: "https://www.jpmorgan.com/insights" },
    { date: "2026-05-30", cat: "startup", source: "TechCrunch", title: "핀치, 게이미피케이션 셀프케어로 Z세대 리텐션 1위", summary: "· 정서 관리 루틴 게임화 설계 · 높은 재방문율 기록\n· Gen Z 정신건강 앱 DAU 리텐션 최고 수준\n· 셀프케어 + 정서 일기 결합 차별화", tag: "Growth", url: "https://techcrunch.com/" },
    { date: "2026-05-30", cat: "device", source: "Garmin Newsroom", title: "가민, 피트니스 매출 $2.36B로 전년비 12.8% 성장", summary: "· FY2025 피트니스 세그먼트 $2.36B 확정\n· 프리미엄 라인 호조 · 시총 $33B+ 유지\n· 아웃도어·마린 세그먼트도 동반 성장", tag: "Earnings", url: "https://www.garmin.com/en-US/newsroom/" },

    // 2026-05-28
    { date: "2026-05-28", cat: "startup", source: "Forbes", title: "GLP-1 시대, 다이어트 앱 비즈니스 모델 재편 가속", summary: "· 단순 칼로리 추적 → 치료제 연계·코칭으로 가치사슬 이동\n· GLP-1 시장 $66.4B 규모 · 디지털 동반 서비스 필수화\n· Noom·WW·캐시워크 처방 연계 전환", tag: "Analysis", url: "https://www.forbes.com/health/" },
    { date: "2026-05-28", cat: "ai", source: "ZDNet Korea", title: "국내 병원, 생성형 AI 임상 문서화 도입 확대", summary: "· 진료 요약·기록 자동화 · 의료진 업무 부담 경감\n· 서울대·삼성서울·아산 등 시범 운영 확대\n· LLM 기반 의무기록 요약 정확도 검증 중", tag: "Enterprise", url: "https://www.zdnet.co.kr/" },
    { date: "2026-05-28", cat: "device", source: "Wareable", title: "Whoop, 구독 ARPU $239/yr 상승… 혈액검사 연동 차별화", summary: "· 회복·수면 분석 + Advanced Labs 혈액 바이오마커\n· wellness 기기 객단가 업계 최고 수준\n· $10.1B 데카콘 달성 후 프리미엄 포지셔닝 강화", tag: "Product", url: "https://www.wareable.com/" },

    // 2026-05-27
    { date: "2026-05-27", cat: "startup", source: "매일경제", title: "래더, 근력 코칭 구독 고성장… 시리즈B 마감 임박", summary: "· 근력 프로그램 구독 모델 가입자 급증\n· 헬스 구독 성장률 최고 · AI 맞춤 계획 차별화\n· 시리즈B 자금으로 글로벌 확장 계획", tag: "Funding", url: "https://www.mk.co.kr/" },
    { date: "2026-05-27", cat: "ai", source: "Bloomberg", title: "오픈AI, 헬스 데이터 파트너십 확대 모색", summary: "· 양질 헬스 데이터 확보 제휴 전략 거론\n· 대형 병원 체인·보험사 데이터 파트너십 탐색\n· HIPAA 준수 데이터 파이프라인 구축", tag: "Strategy", url: "https://www.bloomberg.com/technology" },
    { date: "2026-05-27", cat: "startup", source: "TechCrunch", title: "MZ세대 칼로리 관리, 사진 한 장으로… 비전 AI 경쟁 가열", summary: "· 촬영만으로 식단 기록 비전 AI 앱 급증\n· MFP Cal AI 통합 후 시장 판도 변화\n· Snapcalorie·Bitesnap 등 신생 업체 경쟁 심화", tag: "Trend", url: "https://techcrunch.com/" },

    // 2026-05-26
    { date: "2026-05-26", cat: "device", source: "한국경제", title: "애플워치, 헬스 생태계 락인으로 사용자 고착 지속", summary: "· 기기·서비스 통합 · 연 3,300만대 판매(IDC/Fortunly 2025)\n· ECG/AFib FDA clearance 유일 보유\n· Apple Intelligence 헬스 기능 확장 예정", tag: "Market", url: "https://www.hankyung.com/" },
    { date: "2026-05-26", cat: "startup", source: "Axios", title: "존재감 키우는 femtech… 플로·클루 글로벌 확장", summary: "· 여성건강 앱 데이터·규제 신뢰 기반 시장 확대\n· Flo MAU 7,700만(NetNewsLedger 2026.03)\n· 갱년기·불임 등 생애주기 전반 서비스 확장", tag: "Growth", url: "https://www.axios.com/" },
    { date: "2026-05-26", cat: "ai", source: "Reuters", title: "헬스 AI 규제 가이드라인, 美·EU 동시 정비 착수", summary: "· 안전성·책임 소재 규제 프레임워크 정비 시작\n· FDA AI/ML 업데이트 + EU AI Act 헬스 조항\n· 임상 AI 배포 전 사전 심사 의무화 논의", tag: "Regulatory", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },
  ];

  const REPORTS = [
    { house: "Morgan Stanley", type: "Securities", date: "2026-06-09", title: "Digital Health 2026: AI 에이전트가 웨어러블 해자를 재편한다", figure: "TAM $660B (2030E)", rating: "Overweight", url: "https://www.morganstanley.com/ideas" },
    { house: "Goldman Sachs", type: "Securities", date: "2026-06-06", title: "웨어러블 & RPM — 프리미엄 하드웨어 vs. AI 소프트웨어 마진", figure: "웨어러블 CAGR 14.7%", rating: "Neutral", url: "https://www.goldmansachs.com/insights" },
    { house: "CB Insights", type: "Market", date: "2026-06-05", title: "State of Digital Health Q2'26 — 펀딩·엑시트 동향", figure: "Q1 $4~7.4B", rating: "Report", url: "https://www.cbinsights.com/research/" },
    { house: "Rock Health", type: "Market", date: "2026-06-04", title: "AI 네이티브 헬스 펀딩, 디바이스 스타트업의 2배 · AI 시대 선언", figure: "딜 62% AI 주도", rating: "Report", url: "https://rockhealth.com/insights/" },
    { house: "Grand View Research", type: "Market", date: "2026-06-02", title: "글로벌 디지털 헬스 시장 — $347B(2025) → $1,830B(2033E)", figure: "$347B (2025)", rating: "Report", url: "https://www.grandviewresearch.com/" },
    { house: "Grand View Research", type: "Market", date: "2026-05-30", title: "글로벌 GLP-1 수용체 작용제 시장 $66.4B(2026)", figure: "$66.4B GLP-1", rating: "Report", url: "https://www.grandviewresearch.com/" },
    { house: "J.P. Morgan", type: "Securities", date: "2026-05-30", title: "GLP-1 + 디지털 코칭: 새로운 체중관리 스택", figure: "참여도 +38% YoY", rating: "Overweight", url: "https://www.jpmorgan.com/insights" },
    { house: "삼성증권", type: "Securities", date: "2026-05-28", title: "디지털 헬스케어 — 국내외 플랫폼 경쟁 구도 점검", figure: "국내 시장 +21% YoY", rating: "Buy", url: "https://www.samsungpop.com/" },
    { house: "한국투자증권", type: "Securities", date: "2026-05-26", title: "웨어러블·femtech 밸류체인과 투자 포인트", figure: "femtech CAGR 16%", rating: "Buy", url: "https://www.truefriend.com/" },
  ];

  const MARKET_GROWTH = [
    { year: "2021", size: 180, growth: 12 },
    { year: "2022", size: 210, growth: 17 },
    { year: "2023", size: 250, growth: 19 },
    { year: "2024", size: 300, growth: 20 },
    { year: "2025", size: 347, growth: 16 },
    { year: "2026E", size: 410, growth: 18 },
    { year: "2033E", size: 1830, growth: 23 },
  ];

  // ---- 검증된 밸류에이션 (팩트체크 반영 2026.06) --------------------
  const FUNDING = [
    { name: "Whoop", value: 10.1, cat: "device" },
    { name: "Oura", value: 5.2, cat: "device" },
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

  const KPIS = [
    { label: "디지털 헬스 시장 (2025)", value: "$347B", delta: +16.0, sub: "Grand View Research · 2033E $1,830B", fill: 0.74 },
    { label: "Q1 글로벌 펀딩", value: "$4~7.4B", delta: +12.4, sub: "Rock Health · CB Insights 집계 차이", fill: 0.62 },
    { label: "AI-네이티브 딜 비중", value: "62%", delta: +9.0, sub: "디바이스 대비 2:1 · Rock Health", fill: 0.62 },
    { label: "웨어러블 CAGR", value: "14.7%", delta: +1.3, sub: "2026–2030 · RPM 성장 동력", fill: 0.74 },
    { label: "글로벌 GLP-1 시장", value: "$66.4B", delta: +42.0, sub: "Grand View Research 2026 · 디지털 코칭 결합", fill: 0.85 },
    { label: "Whoop 데카콘", value: "$10.1B", delta: +180.0, sub: "Series G · Bloomberg 2026.03", fill: 0.92 },
  ];

  // ---- Key insights (팩트체크 검증 데이터 기반 · 개조식 · 8선) -------
  const INSIGHTS = [
    { title: "GLP-1 시장 $66.4B 시대", desc: "Grand View Research 2026 기준 글로벌 GLP-1 시장 $66.4B · Noom·WW 처방 연계 전환 · 디지털 코칭 결합 표준화", icon: "pulse" },
    { title: "AI 헬스 에이전트 경쟁", desc: "OpenAI·Anthropic·Google·Amazon 4파전 · Rock Health 'AI 퍼스트 헬스' 시대 공식 선언 · 임상 파일럿 진입", icon: "ai" },
    { title: "스마트링 $5.2B 시대", desc: "Oura Series D $5.2B(BusinessWire 2025.09) · Samsung Galaxy Ring · CAGR 24.3% 전망", icon: "device" },
    { title: "Whoop 데카콘 $10.1B", desc: "Series G $2.85억 조달(Bloomberg 2026.03) · 소비자 wellness 웨어러블 최초 데카콘 · Advanced Labs 혈액검사", icon: "spark" },
    { title: "Strava IPO 추진", desc: "밸류 $2.2B+(SiliconAngle 2026.01) · S-1 비밀 제출 보도 · 활동 소셜 플랫폼 첫 상장 시도", icon: "chart" },
    { title: "디지털 헬스 $347B→$1,830B", desc: "Grand View Research 2025 기준 $347B · 2033E $1,830B · CAGR 23.1% · AI+RPM 성장 동력", icon: "report" },
    { title: "MFP × Cal AI 통합", desc: "Cal AI 인수 후 사진 칼로리 비전 AI 전면 적용 · 2억 사용자 · 앱스토어 피트니스 매출 1위", icon: "news" },
    { title: "Peloton 흑자 전환", desc: "Q3 FY2025 흑자 확정 · Connected Fitness 구독 2.66M · 구독 매출 $1.7B(67%) · 플랫폼 전환 완료", icon: "grid" },
  ];

  window.DASH = { CATEGORIES, COMPANIES, ARTICLES, REPORTS, MARKET_GROWTH, FUNDING, SHARE, USERS, KPIS, INSIGHTS };
})();
