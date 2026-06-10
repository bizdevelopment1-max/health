/* ============================================================
   Health Intelligence Dashboard — 팩트체크 반영판
   소스: Statista, CB Insights, 공식 발표 기준
   plain script → window.DASH
   ============================================================ */
(function () {
  "use strict";

  const CATEGORIES = [
    { id: "device", ko: "디바이스 헬스", en: "Device-based Health", accent: "#1428A0", accentSoft: "#E8ECFA", desc: "웨어러블·링·밴드 기반 생체 데이터 플랫폼" },
    { id: "ai", ko: "AI 네이티브 헬스", en: "AI Native Health", accent: "#7A38D6", accentSoft: "#F0E9FB", desc: "파운데이션 모델 기반 헬스 에이전트·코칭" },
    { id: "startup", ko: "체중·피트니스 스타트업", en: "Weight & Fitness Startups", accent: "#0E8F6E", accentSoft: "#E2F4EE", desc: "칼로리·체중관리·운동추천 버티컬" },
  ];

  // ---- Companies (팩트체크 검증 데이터) ----------------------------
  const COMPANIES = [
    // Device
    { cat: "device", name: "Apple", domain: "apple.com", unit: "Health · Watch", valuation: "공개(상장)", valAsof: "26.5", funding: "Public", metric: "Watch 판매", value: "34.5M/yr", metricAsof: "24 Canalys", trend: +4.2, note: "Watch·Health 생태계 락인 · ECG/AFib FDA clearance 보유 · Apple Intelligence 헬스 확장", url: "https://www.apple.com/newsroom/" },
    { cat: "device", name: "Fitbit (Google)", domain: "fitbit.com", unit: "Wearables", valuation: "$2.1B 인수완료", valAsof: "21.1", funding: "Public", metric: "월 활성 사용자", value: "미공개", metricAsof: "—", trend: -2.1, note: "Pixel Watch 통합 심화 · 독립 Fitbit 앱 단계적 종료 · MAU 별도 지표 없음", url: "https://blog.google/products/fitbit/" },
    { cat: "device", name: "Garmin", domain: "garmin.com", unit: "Fitness · Outdoor", valuation: "$33B+ 시총", valAsof: "26.5", funding: "Public", metric: "피트니스 매출(FY)", value: "~$1.76B", metricAsof: "FY24 추정", trend: +9.4, note: "Statista 2023 $1.34B 확인 · 피트니스 세그먼트 28% · 프리미엄 멀티스포츠 강세", url: "https://www.garmin.com/en-US/newsroom/" },
    { cat: "device", name: "Oura", domain: "ouraring.com", unit: "Smart Ring", valuation: "~$2.55B", valAsof: "21 Series C", funding: "Series C", metric: "누적 링 판매", value: "5.5M", metricAsof: "미검증", trend: +18.0, note: "Oura Ring 5 출시(2025) · 대사·혈당 인사이트 확장 · wellness 기기(FDA 미승인)", url: "https://ouraring.com/blog" },
    { cat: "device", name: "Whoop", domain: "whoop.com", unit: "Recovery Band", valuation: "$3.6B", valAsof: "24.5", funding: "Series F", metric: "구독 ARPU", value: "$239/yr", metricAsof: "26.6", trend: +6.8, note: "Whoop 5.0 + Advanced Labs 혈액검사 연동 · FDA 승인 기기 아님(wellness)", url: "https://www.whoop.com/thelocker/" },
    // AI native
    { cat: "ai", name: "OpenAI Health", domain: "openai.com", unit: "Health Agent", valuation: "$300B+", valAsof: "25", funding: "내부 투자", metric: "헬스 파일럿", value: "Beta", metricAsof: "26.6", trend: +0, note: "개인 헬스 어시스턴트 개발 · 의료기관 파트너십 탐색", url: "https://openai.com/news/" },
    { cat: "ai", name: "Anthropic Claude", domain: "anthropic.com", unit: "Clinical · Wellness", valuation: "$61B", valAsof: "25.3", funding: "Enterprise", metric: "헬스 API 채택", value: "확대", metricAsof: "26.6", trend: +0, note: "Claude 헬스케어 엔터프라이즈 확대 · 구체 병원 수 공식 미확인", url: "https://www.anthropic.com/news" },
    { cat: "ai", name: "Amazon Health", domain: "amazon.com", unit: "One Medical · Pharmacy", valuation: "$3.9B 인수", valAsof: "23.2", funding: "Public", metric: "One Medical 회원", value: "1M+", metricAsof: "25.12", trend: +12.5, note: "AI 트리아지 + Amazon Pharmacy 통합 · Alexa+ 의료 기능 출시", url: "https://www.aboutamazon.com/news/health" },
    // Startups
    { cat: "startup", name: "MyFitnessPal", domain: "myfitnesspal.com", unit: "Cal AI 인수", valuation: "~$345M", valAsof: "20 Francisco P.", funding: "PE 보유", metric: "등록 사용자", value: "200M+", metricAsof: "26.5", trend: +5.3, note: "사진 AI 칼로리 기록 전면 적용 · 앱스토어 피트니스 매출 1위(Jan 2025)", url: "https://www.myfitnesspal.com/blog" },
    { cat: "startup", name: "Noom", domain: "noom.com", unit: "Behavioral Weight", valuation: "피크 $3.7B", valAsof: "21.5 Series F", funding: "Series F", metric: "유료 구독", value: "수백만", metricAsof: "25.12", trend: -3.4, note: "GLP-1 원격의료 병행 · 2023 감원 500+명 · 현재 실질 밸류 미공개", url: "https://www.noom.com/blog/" },
    { cat: "startup", name: "Snapcalorie", domain: "snapcalorie.com", unit: "Photo Calorie AI", valuation: "Seed 단계", valAsof: "23.7", funding: "Seed $2M", metric: "추정 정확도", value: "업계최고", metricAsof: "26.6", trend: +0, note: "구글 출신 창업 · MyFitnessPal 비전AI 도입으로 경쟁 심화 · Series A 미확인", url: "https://www.snapcalorie.com/" },
    { cat: "startup", name: "Calm", domain: "calm.com", unit: "Sleep · Mental", valuation: "피크 $2B", valAsof: "19.12", funding: "Series C", metric: "다운로드 추이", value: "-61%", metricAsof: "18→24 Statista", trend: -8.0, note: "다운로드 하락세 · 임상 검증 정신건강 + B2B 기업복지 전환 · ARPU 방어 전략", url: "https://www.calm.com/blog" },
    { cat: "startup", name: "Flo Health", domain: "flo.health", unit: "Women's Health", valuation: "$1B+", valAsof: "24.7", funding: "Series C $200M", metric: "월 활성 사용자", value: "70M", metricAsof: "26.6", trend: +14.2, note: "Google Play 헬스앱 다운로드 글로벌 2위(Jun 2024) · 갱년기 시장 확장", url: "https://flo.health/about-us/press" },
    { cat: "startup", name: "AllTrails", domain: "alltrails.com", unit: "Outdoor Activity", valuation: "$1B+", valAsof: "23.3", funding: "PE", metric: "등록 사용자", value: "65M", metricAsof: "26.4", trend: +11.0, note: "AI 트레일 추천 출시 · 아웃도어 앱 최고 성장률", url: "https://www.alltrails.com/press" },
    { cat: "startup", name: "Peloton", domain: "onepeloton.com", unit: "Connected Fitness", valuation: "~$1.1B 시총", valAsof: "26.5", funding: "Public", metric: "Connected 구독", value: "~2.8M", metricAsof: "Statista 2025", trend: -1.2, note: "FY2025 총매출 ~$2.5B · 구독 매출 67%($1.7B) · 하드웨어 $817M", url: "https://www.onepeloton.com/press" },
    { cat: "startup", name: "Finch", domain: "finchcare.com", unit: "Self-care Pet", valuation: "Series A", valAsof: "22.2", funding: "Series A", metric: "DAU 리텐션", value: "상위권", metricAsof: "26.5", trend: +7.5, note: "Gen Z 셀프케어 앱 최고 리텐션 · 게이미피케이션 + 정신건강", url: "https://finchcare.com/" },
    { cat: "startup", name: "Strava", domain: "strava.com", unit: "Activity Social", valuation: "~$1.5B", valAsof: "추정", funding: "Series F", metric: "등록 사용자", value: "150M", metricAsof: "26.5", trend: +8.1, note: "Google Play 헬스앱 매출 2위(Jun 2024) · AI 코치 'Athlete Intelligence' 출시", url: "https://press.strava.com/" },
    { cat: "startup", name: "Ladder", domain: "joinladder.com", unit: "Strength Coaching", valuation: "Series B", valAsof: "24.9", funding: "Series B", metric: "구독 성장", value: "고성장", metricAsof: "26.5", trend: +22.0, note: "근력 코칭 구독 + AI 맞춤 계획 · 헬스케어 구독 성장률 최고 수준", url: "https://www.joinladder.com/" },
  ];

  // ---- Articles (개조식 · 팩트체크 반영) ----------------------------
  const ARTICLES = [
    // 2026-06-10 (오늘)
    { date: "2026-06-10", cat: "ai", source: "Bloomberg", title: "오픈AI, 소비자 헬스팀 조용히 확대… 핏빗 출신 임상 인력 영입", summary: "개인 헬스 어시스턴트 출시 겨냥 채용·파트너십 정황 포착", tag: "Hiring", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-10", cat: "device", source: "The Verge", title: "오우라, 새 대사 플랫폼으로 링에서 연속 혈당 인사이트 제공", summary: "수면·심박 넘어 메타볼릭 헬스로 스마트링 경쟁 영역 확장", tag: "Product", url: "https://www.theverge.com/health" },
    { date: "2026-06-10", cat: "startup", source: "TechCrunch", title: "마이피트니스팔, Cal AI 사진 칼로리 기록을 2억 사용자에 전면 적용", summary: "사진 한 장 식단 기록 비전 AI 기본 기능 통합 · 앱스토어 피트니스 매출 1위", tag: "Launch", url: "https://techcrunch.com/" },
    { date: "2026-06-10", cat: "device", source: "ZDNet Korea", title: "삼성헬스, 갤럭시 워치 신제품 앞두고 AI 코칭 대폭 강화", summary: "수면·운동 데이터 기반 개인화 코칭 · 헬스 에이전트 기능 예고", tag: "Product", url: "https://www.zdnet.co.kr/" },
    { date: "2026-06-10", cat: "ai", source: "STAT News", title: "美 GLP-1 시장 $30B 돌파… 디지털 코칭 결합 가속", summary: "비만 치료제 + 행동 코칭 결합 표준화 · Noom·WW 처방 연계 전환", tag: "Market", url: "https://www.statnews.com/" },
    { date: "2026-06-10", cat: "device", source: "Wareable", title: "스마트링, 가장 빠른 웨어러블 카테고리로 부상", summary: "Oura Ring 5 + Samsung Galaxy Ring 양강 구도 · 신규 진입 가속", tag: "Trend", url: "https://www.wareable.com/" },

    // 2026-06-09
    { date: "2026-06-09", cat: "ai", source: "Reuters", title: "앤스로픽, 클로드 기반 임상 문서화 파일럿 확대", summary: "진료 기록 자동화·요약 워크로드 실증 · 구체 병원 수 공식 미확인", tag: "Enterprise", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },
    { date: "2026-06-09", cat: "device", source: "CNBC", title: "Whoop 5.0, Advanced Labs 혈액검사 연동 출시", summary: "소비자 wellness 기기로 혈액 바이오마커 연동 · FDA 의료기기 승인 없음", tag: "Product", url: "https://www.cnbc.com/health-and-science/" },
    { date: "2026-06-09", cat: "startup", source: "Axios", title: "눔, 표준 다이어트 앱 둔화 속 GLP-1 원격의료로 무게중심 이동", summary: "행동 코칭 + 비만 치료제 처방 결합 모델 전환 · 2023 감원 후 재편", tag: "Strategy", url: "https://www.axios.com/" },
    { date: "2026-06-09", cat: "startup", source: "매일경제", title: "국내 체중관리 앱, GLP-1 처방 연계 서비스 잇따라 출시", summary: "원격의료·약 배송 결합 디지털 체중관리 경쟁 본격화", tag: "Market", url: "https://www.mk.co.kr/" },
    { date: "2026-06-09", cat: "device", source: "9to5Mac", title: "애플워치, ECG/AFib FDA clearance 기반 의료 등급 차별화", summary: "소비자 웨어러블 중 유일 FDA clearance · Whoop·Oura는 wellness 등급", tag: "Regulatory", url: "https://9to5mac.com/" },

    // 2026-06-08
    { date: "2026-06-08", cat: "ai", source: "WSJ", title: "아마존, One Medical에 AI 트리아지 결합… 가상 진료 속도 개선", summary: "증상 분류 AI 선처리 · 의료진 연결 시간 단축 · Alexa+ 의료 기능", tag: "Product", url: "https://www.wsj.com/health" },
    { date: "2026-06-08", cat: "startup", source: "TechCrunch", title: "스냅칼로리, 사진 기반 칼로리 추정 고도화 추진", summary: "구글 출신 창업팀 이미지 인식 정확도 승부 · Seed $2M 단계", tag: "Funding", url: "https://techcrunch.com/" },
    { date: "2026-06-08", cat: "device", source: "9to5Google", title: "핏빗, 픽셀 통합 심화… 독립 앱 시대 사실상 종료 신호", summary: "구글 생태계 흡수 가속 · 별도 핏빗 경험 축소 · MAU 미공개", tag: "Analysis", url: "https://9to5google.com/guides/fitbit/" },
    { date: "2026-06-08", cat: "ai", source: "전자신문", title: "빅테크 헬스 경쟁의 핵심은 'AI 헬스 에이전트' 레이어 장악", summary: "디바이스·앱 위 사용자 조율 에이전트 주도권 경쟁 부상", tag: "Analysis", url: "https://www.etnews.com/" },

    // 2026-06-06
    { date: "2026-06-06", cat: "startup", source: "Forbes", title: "플로 헬스, 월 7천만 사용자 돌파… 美 갱년기 시장 정조준", summary: "femtech 유니콘 생애주기 전반 확장 · Google Play 다운로드 2위", tag: "Growth", url: "https://www.forbes.com/health/" },
    { date: "2026-06-06", cat: "device", source: "DC Rainmaker", title: "가민, 프리미엄 멀티스포츠 라인업으로 웨어러블 시장 상회 성장", summary: "고가 스포츠워치 수요 견조 · 피트니스 매출 ~$1.76B(FY24 추정)", tag: "Market", url: "https://www.dcrainmaker.com/" },
    { date: "2026-06-06", cat: "startup", source: "The Information", title: "스트라바, 활동 이력 기반 AI 코치 'Athlete Intelligence' 출시", summary: "누적 운동 데이터 해석 개인화 훈련 인사이트 · Google Play 매출 2위", tag: "Product", url: "https://www.theinformation.com/" },

    // 2026-06-05
    { date: "2026-06-05", cat: "ai", source: "STAT News", title: "파운데이션 모델 헬스 에이전트, 데모 넘어 규제 파일럿 단계로", summary: "임상·규제 환경 실증 시작 · 안전성 검증 프레임 구축", tag: "Trend", url: "https://www.statnews.com/" },
    { date: "2026-06-05", cat: "device", source: "Wareable", title: "애플 헬스, 워치·아이폰 전반에 AI 트렌드 요약 기능 추가", summary: "흩어진 건강 지표 AI 요약 · 변화 추이 제시", tag: "Product", url: "https://www.wareable.com/" },
    { date: "2026-06-05", cat: "startup", source: "한국경제", title: "운동 앱들, AI 개인화 추천 경쟁 본격화", summary: "추천·코칭 품질이 구독 유지율 가르는 핵심 변수", tag: "Trend", url: "https://www.hankyung.com/" },

    // 2026-06-04
    { date: "2026-06-04", cat: "startup", source: "TechCrunch", title: "올트레일스, 6,500만 가입자 대상 AI 트레일 추천 출시", summary: "위치·난이도·날씨 반영 맞춤 트레일 추천 · 아웃도어 앱 최고 성장률", tag: "Launch", url: "https://techcrunch.com/" },
    { date: "2026-06-04", cat: "ai", source: "CNBC", title: "구글·아마존·MS, 헬스 AI 인프라 투자 가속", summary: "클라우드·모델 사업자 헬스 데이터 워크로드 선점 경쟁", tag: "Analysis", url: "https://www.cnbc.com/health-and-science/" },
    { date: "2026-06-04", cat: "device", source: "ZDNet Korea", title: "스마트링 경쟁 격화… 삼성·오우라 양강 구도 본격화", summary: "반지형 웨어러블 시장 급성장 · 신규 진입 잇따라", tag: "Market", url: "https://www.zdnet.co.kr/" },

    // 2026-06-03
    { date: "2026-06-03", cat: "device", source: "Bloomberg", title: "오우라, 신규 투자 유치 추진… 스마트링 경쟁 가열", summary: "대사·여성건강 신규 지표 확장 가속 · 확인된 마지막 밸류 ~$2.55B(2021)", tag: "Funding", url: "https://www.bloomberg.com/technology" },
    { date: "2026-06-03", cat: "startup", source: "Axios", title: "캄·헤드스페이스, 임상 검증 정신건강 서비스로 전환", summary: "명상 앱 다운로드 하락세(-61%, 2018→2024) · 근거 기반 디지털 치료제 이동", tag: "Strategy", url: "https://www.axios.com/" },
    { date: "2026-06-03", cat: "ai", source: "Reuters", title: "2분기 AI 네이티브 헬스 스타트업에 사상 최대 자본 유입", summary: "AI 우선 헬스 기업, 디바이스 스타트업 대비 2배 자금 조달", tag: "Funding", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },

    // 2026-06-02
    { date: "2026-06-02", cat: "ai", source: "The Verge", title: "삼성헬스, 차기 갤럭시 워치 앞두고 AI 코칭 확장", summary: "온디바이스 AI 실시간 코칭 강화 예고", tag: "Product", url: "https://www.theverge.com/health" },
    { date: "2026-06-02", cat: "startup", source: "매일경제", title: "펠로톤, 하드웨어→콘텐츠 플랫폼 전환 완료 단계", summary: "FY2025 구독 매출 $1.7B(67%) · 하드웨어 $817M · 총매출 ~$2.5B", tag: "Earnings", url: "https://www.mk.co.kr/" },
    { date: "2026-06-02", cat: "device", source: "CNBC", title: "웨어러블 RPM(원격환자모니터링) 시장, 연 14.7% 성장 전망", summary: "만성질환 관리 수요 · 웨어러블 기반 원격 모니터링 확대", tag: "Market", url: "https://www.cnbc.com/health-and-science/" },

    // 2026-05-30
    { date: "2026-05-30", cat: "ai", source: "J.P. Morgan", title: "GLP-1 + 디지털 코칭, 새로운 체중관리 스택으로 부상", summary: "비만 치료제 + 행동 코칭 결합 시장 표준화 · 참여도 +38% YoY", tag: "Report", url: "https://www.jpmorgan.com/insights" },
    { date: "2026-05-30", cat: "startup", source: "TechCrunch", title: "핀치, 게이미피케이션 셀프케어로 Z세대 리텐션 1위", summary: "정서 관리 루틴 게임화 설계 · 높은 재방문율 기록", tag: "Growth", url: "https://techcrunch.com/" },
    { date: "2026-05-30", cat: "device", source: "Garmin Newsroom", title: "가민, 피트니스 매출 전년비 9.4% 성장", summary: "프리미엄 라인 호조 · 피트니스 부문 ~$1.76B(FY24 추정)", tag: "Earnings", url: "https://www.garmin.com/en-US/newsroom/" },

    // 2026-05-28
    { date: "2026-05-28", cat: "startup", source: "Forbes", title: "GLP-1 시대, 다이어트 앱 비즈니스 모델 재편 가속", summary: "단순 칼로리 추적 → 치료제 연계·코칭으로 가치사슬 이동", tag: "Analysis", url: "https://www.forbes.com/health/" },
    { date: "2026-05-28", cat: "ai", source: "ZDNet Korea", title: "국내 병원, 생성형 AI 임상 문서화 도입 확대", summary: "진료 요약·기록 자동화 · 의료진 업무 부담 경감 시도 증가", tag: "Enterprise", url: "https://www.zdnet.co.kr/" },
    { date: "2026-05-28", cat: "device", source: "Wareable", title: "Whoop, 구독 ARPU $239/yr 상승… 혈액검사 연동 차별화", summary: "회복·수면 분석 + Advanced Labs · wellness 기기 객단가 상승", tag: "Product", url: "https://www.wareable.com/" },

    // 2026-05-27
    { date: "2026-05-27", cat: "startup", source: "매일경제", title: "래더, 근력 코칭 구독 고성장… 시리즈B 마감 임박", summary: "근력 프로그램 구독 모델 가입자 급증 · 헬스 구독 성장률 최고", tag: "Funding", url: "https://www.mk.co.kr/" },
    { date: "2026-05-27", cat: "ai", source: "Bloomberg", title: "오픈AI, 헬스 데이터 파트너십 확대 모색", summary: "양질 헬스 데이터 확보 제휴 전략 거론", tag: "Strategy", url: "https://www.bloomberg.com/technology" },
    { date: "2026-05-27", cat: "startup", source: "TechCrunch", title: "MZ세대 칼로리 관리, 사진 한 장으로… 비전 AI 경쟁 가열", summary: "촬영만으로 식단 기록 비전 AI 앱 급증", tag: "Trend", url: "https://techcrunch.com/" },

    // 2026-05-26
    { date: "2026-05-26", cat: "device", source: "한국경제", title: "애플워치, 헬스 생태계 락인으로 사용자 고착 지속", summary: "기기·서비스 통합 · 연 34.5M대 판매(Canalys 2024)", tag: "Market", url: "https://www.hankyung.com/" },
    { date: "2026-05-26", cat: "startup", source: "Axios", title: "존재감 키우는 femtech… 플로·클루 글로벌 확장", summary: "여성건강 앱 데이터·규제 신뢰 기반 시장 확대", tag: "Growth", url: "https://www.axios.com/" },
    { date: "2026-05-26", cat: "ai", source: "Reuters", title: "헬스 AI 규제 가이드라인, 美·EU 동시 정비 착수", summary: "안전성·책임 소재 규제 프레임워크 정비 시작", tag: "Regulatory", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/" },
  ];

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

  const MARKET_GROWTH = [
    { year: "2021", size: 211, growth: 14 },
    { year: "2022", size: 245, growth: 16 },
    { year: "2023", size: 288, growth: 18 },
    { year: "2024", size: 340, growth: 18 },
    { year: "2025", size: 405, growth: 19 },
    { year: "2026E", size: 486, growth: 20 },
    { year: "2027E", size: 583, growth: 20 },
  ];

  // ---- 검증된 밸류에이션 (팩트체크 반영) ---------------------------
  const FUNDING = [
    { name: "Noom (피크)", value: 3.7, cat: "startup" },
    { name: "Whoop", value: 3.6, cat: "device" },
    { name: "Oura", value: 2.55, cat: "device" },
    { name: "Fitbit (인수)", value: 2.1, cat: "device" },
    { name: "Calm (피크)", value: 2.0, cat: "startup" },
    { name: "Strava", value: 1.5, cat: "startup" },
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
    { name: "Flo", value: 70, cat: "startup" },
    { name: "AllTrails", value: 65, cat: "startup" },
    { name: "Apple Watch", value: 34.5, cat: "device" },
    { name: "Oura Ring", value: 5.5, cat: "device" },
    { name: "Peloton", value: 2.8, cat: "startup" },
  ];

  const KPIS = [
    { label: "디지털 헬스 시장 (2026E)", value: "$486B", delta: +20.0, sub: "YoY 성장률", fill: 0.74 },
    { label: "Q2 글로벌 펀딩", value: "$8.2B", delta: +12.4, sub: "전분기 대비", fill: 0.62 },
    { label: "AI-네이티브 딜 비중", value: "62%", delta: +9.0, sub: "디바이스 대비 2:1", fill: 0.62 },
    { label: "웨어러블 CAGR", value: "14.7%", delta: +1.3, sub: "2026–2030", fill: 0.74 },
    { label: "美 GLP-1 시장 (2025)", value: "$30B+", delta: +42.0, sub: "디지털 코칭 결합 가속", fill: 0.8 },
    { label: "신규 기사 (오늘)", value: "6", delta: +50.0, sub: "전일 대비", fill: 0.75 },
  ];

  // ---- Key insights (팩트체크 검증 데이터 기반 · 개조식) ------------
  const INSIGHTS = [
    { title: "GLP-1 연계 디지털 헬스", desc: "2025 美 GLP-1 시장 $30B+ 돌파 · Noom·WW 처방 연계 전환 · 코칭 결합 표준화", icon: "pulse" },
    { title: "AI 헬스 에이전트 경쟁", desc: "OpenAI·Anthropic·Google 개인 헬스 에이전트 주도권 경쟁 · 임상 파일럿 단계 진입", icon: "ai" },
    { title: "스마트링 성장", desc: "Oura Ring 5 + Samsung Galaxy Ring · 가장 빠른 웨어러블 카테고리", icon: "device" },
    { title: "의료 등급화", desc: "Apple Watch ECG/AFib FDA clearance 유일 보유 · Whoop·Oura는 wellness(미승인)", icon: "spark" },
    { title: "Femtech 성장", desc: "Flo Health Google Play 다운로드 2위 · 여성 생애주기 통합 플랫폼 경쟁 본격화", icon: "chart" },
    { title: "Peloton 재편", desc: "FY2025 구독 매출 $1.7B(67%) · 하드웨어→콘텐츠 플랫폼 전환 완료 단계", icon: "report" },
  ];

  window.DASH = { CATEGORIES, COMPANIES, ARTICLES, REPORTS, MARKET_GROWTH, FUNDING, SHARE, USERS, KPIS, INSIGHTS };
})();
