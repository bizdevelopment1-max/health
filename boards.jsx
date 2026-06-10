/* ============================================================
   boards.jsx — content sections
   ============================================================ */

// ---- Company logo (real favicon, falls back to initial) ---------
function CoLogo({ name, domain, accent }) {
  const [failed, setFailed] = React.useState(false);
  if (!domain || failed) {
    return <span className="ct-logo" style={{ background: accent }}>{name[0]}</span>;
  }
  return (
    <span className="ct-logo ct-logo-img">
      <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt={name} loading="lazy" onError={() => setFailed(true)} />
    </span>
  );
}

// ---- Category company board (dense table) ----------------------
function CompanyBoard({ cat, companies, density, sectionRef, query, onSelect }) {
  const inView = useInView(sectionRef);
  const rows = companies.filter(c => c.cat === cat.id)
    .filter(c => !query || (c.name + c.unit + c.note).toLowerCase().includes(query.toLowerCase()));
  const open = c => onSelect && onSelect(c);
  return (
    <section className="board" ref={sectionRef} data-screen-label={cat.en}>
     <AnimCtx.Provider value={inView}>
      <div className="board-head" style={{ "--accent": cat.accent }}>
        <span className="board-tab" style={{ background: cat.accent }} />
        <div className="board-titles">
          <h2>{cat.ko} <span className="board-en">{cat.en}</span></h2>
          <p>{cat.desc} · 기업 클릭 시 상세 정보</p>
        </div>
        <div className="board-count" style={{ color: cat.accent, background: cat.accentSoft }}>{rows.length} 社</div>
      </div>

      <div className={"ctable d-" + density}>
        <div className="ct-head">
          <span>기업</span>
          <span>세그먼트</span>
          <span className="num">밸류에이션</span>
          <span className="num">핵심지표</span>
          <span className="num">추이</span>
          <span>코멘트</span>
        </div>
        {rows.map((c, i) => (
          <div className="ct-row" key={i} role="button" tabIndex={0} style={{ "--accent": cat.accent }}
            onClick={() => open(c)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(c); } }}>
            <span className="ct-name">
              <CoLogo name={c.name} domain={c.domain} accent={cat.accent} />
              <b>{c.name}</b>
              <Icon name="chevron" size={12} />
            </span>
            <span className="ct-seg">{c.unit}</span>
            <span className="num ct-valcell">
              <AnimatedNumber className="ct-val" value={c.valuation} />
              {c.valAsof && c.valAsof !== "—" && <em className="ct-asof">'{c.valAsof}월 기준</em>}
            </span>
            <span className="num">
              <em className="ct-metric">{c.metric}</em>
              <AnimatedNumber className="ct-mval" value={c.value} />
              {c.metricAsof && c.metricAsof !== "—" && <em className="ct-asof">'{c.metricAsof}월 기준</em>}
            </span>
            <span className="num ct-trend" title={c.trendBasis || "YoY 또는 밸류 변화율"}>
              <Trend v={c.trend} small animate />
              <TrendBar v={c.trend} />
            </span>
            <span className="ct-note"><BoldSummary text={c.note} /></span>
          </div>
        ))}
      </div>
     </AnimCtx.Provider>
    </section>
  );
}

// ---- Company detail modal (overview + all info + related news) --
function CompanyDetail({ company, cats, articles, onClose }) {
  React.useEffect(() => {
    if (!company) return;
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [company]);
  if (!company) return null;
  const c = company;
  const cat = (cats.find(x => x.id === c.cat) || {});
  const token = c.name.split(" (")[0].toLowerCase();
  // related news: same category, name-mentioning articles surfaced first
  const rel = (articles || [])
    .filter(a => a.cat === c.cat)
    .sort((a, b) => {
      const am = (a.title + a.summary).toLowerCase().includes(token) ? 0 : 1;
      const bm = (b.title + b.summary).toLowerCase().includes(token) ? 0 : 1;
      return am - bm || (a.date < b.date ? 1 : -1);
    })
    .slice(0, 6);
  const fmtD = ds => `${+ds.slice(5, 7)}/${+ds.slice(8, 10)}`;
  return (
    <div className="cd-overlay" onClick={onClose}>
     <AnimCtx.Provider value={true}>
      <div className="cd-modal" onClick={e => e.stopPropagation()} style={{ "--accent": cat.accent }}>
        <button className="cd-close" onClick={onClose} aria-label="닫기"><Icon name="x" size={16} sw={2} /></button>

        <div className="cd-head">
          <CoLogo name={c.name} domain={c.domain} accent={cat.accent} />
          <div className="cd-head-txt">
            <h3>{c.name}</h3>
            <div className="cd-sub">
              <span className="cd-cat" style={{ color: cat.accent, background: cat.accentSoft }}>{cat.ko}</span>
              <span>{c.unit}</span>
            </div>
          </div>
          <div className="cd-trend">
            <Trend v={c.trend} animate />
            <TrendBar v={c.trend} />
          </div>
        </div>

        <div className="cd-stats">
          <div className="cd-stat">
            <em>밸류에이션</em>
            <b><AnimatedNumber value={c.valuation} /></b>
            {c.valAsof && c.valAsof !== "—" && <span>'{c.valAsof} 기준</span>}
          </div>
          <div className="cd-stat">
            <em>{c.metric}</em>
            <b><AnimatedNumber value={c.value} /></b>
            {c.metricAsof && c.metricAsof !== "—" && <span>'{c.metricAsof} 기준</span>}
          </div>
          <div className="cd-stat">
            <em>펀딩 단계</em>
            <b>{c.funding}</b>
          </div>
          <div className="cd-stat">
            <em>분기 추이</em>
            <b><Trend v={c.trend} animate /></b>
          </div>
        </div>

        <div className="cd-section">
          <h4>개요</h4>
          <p>{c.note}</p>
        </div>

        {c.vp && (
          <div className="cd-section">
            <h4>밸류 프로포지션 <em>Value Proposition</em></h4>
            <p className="cd-vp" style={{ borderColor: cat.accent }}>{c.vp}</p>
          </div>
        )}

        {c.direction && (
          <div className="cd-section">
            <h4>방향성 · 추구 가치 <em>Direction</em></h4>
            <p>{c.direction}</p>
          </div>
        )}

        <div className="cd-section">
          <h4>관련 뉴스 <em>{rel.length}건</em></h4>
          <div className="cd-news">
            {rel.length === 0 && <span className="cd-empty">관련 기사가 없습니다</span>}
            {rel.map((a, i) => (
              <a key={i} className="cd-art" href={a.url} target="_blank" rel="noopener">
                <span className="cd-art-dot" style={{ background: cat.accent }} />
                <span className="cd-art-body">
                  <span className="cd-art-meta"><em>{a.source}</em><span className="cd-art-date">{fmtD(a.date)}</span><span className="cd-art-tag" style={{ color: cat.accent, background: cat.accentSoft }}>{a.tag}</span></span>
                  <span className="cd-art-title">{a.title}</span>
                  {a.summary && <span className="cd-art-sum"><BoldSummary text={a.summary} /></span>}
                </span>
              </a>
            ))}
          </div>
        </div>

        {c.sources && c.sources.length > 0 && (
          <div className="cd-section">
            <h4>출처 <em>{c.sources.length}건 · 텍스트 복사 가능</em></h4>
            <div className="cd-sources">
              {c.sources.map((s, i) => (
                <div key={i} className="cd-src-item" onClick={e => { const t = e.currentTarget.querySelector('.cd-src-text'); if (t) { navigator.clipboard.writeText(t.textContent); } }}>
                  <span className="cd-src-text">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <a className="cd-source" href={c.url} target="_blank" rel="noopener">
          공식 출처 보기 <Icon name="ext" size={13} />
        </a>
      </div>
     </AnimCtx.Provider>
    </div>
  );
}

// ---- Bold key numbers helper -----------------------------------
function BoldSummary({ text }) {
  if (!text) return null;
  const parts = text.split(/(\$[\d,.]+[BMK]?(?:\+|~)?|\d+\.?\d*%|\+\d+\.?\d*%|-\d+\.?\d*%)/g);
  return parts.map((part, i) =>
    /^\$|^\d+\.?\d*%$|^[+-]\d+\.?\d*%$/.test(part)
      ? <b key={i} style={{ color: 'var(--accent)' }}>{part}</b>
      : part
  );
}

// ---- Article feed grouped by date ------------------------------
function ArticleFeed({ articles, cats, sectionRef, filter, onFilter, query }) {
  const catMap = Object.fromEntries(cats.map(c => [c.id, c]));
  const filtered = articles
    .filter(a => filter === "all" || a.cat === filter)
    .filter(a => !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.source.toLowerCase().includes(query.toLowerCase()));

  const groups = [];
  const seen = {};
  filtered.forEach(a => {
    if (!seen[a.date]) { seen[a.date] = { date: a.date, items: [] }; groups.push(seen[a.date]); }
    seen[a.date].items.push(a);
  });

  const fmtDate = ds => {
    const d = new Date(ds + "T00:00:00");
    const wd = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
    return `${d.getMonth() + 1}월 ${d.getDate()}일 (${wd})`;
  };
  const isToday = ds => ds === "2026-06-10";

  return (
    <section className="board feed" ref={sectionRef} data-screen-label="Daily Articles">
      <div className="board-head">
        <span className="board-tab" style={{ background: "var(--ink)" }} />
        <div className="board-titles">
          <h2>데일리 기사 피드 <span className="board-en">Daily Articles · 글로벌 외신 큐레이션</span></h2>
          <p>매일 최신 기사가 날짜별로 상단에 쌓입니다 · 클릭 시 원문 이동</p>
        </div>
        <div className="feed-filters">
          <button className={filter === "all" ? "on" : ""} onClick={() => onFilter("all")}>전체</button>
          {cats.map(c => (
            <button key={c.id} className={filter === c.id ? "on" : ""} onClick={() => onFilter(c.id)}
              style={filter === c.id ? { background: c.accent, borderColor: c.accent, color: "#fff" } : { "--accent": c.accent }}>
              {c.ko}
            </button>
          ))}
        </div>
      </div>

      <div className="feed-body">
        {groups.length === 0 && <div className="feed-empty">검색 결과가 없습니다.</div>}
        {groups.map((g, gi) => (
          <div className="feed-day" key={g.date}>
            <div className="feed-date">
              <span className="fd-line" />
              <span className={"fd-label" + (isToday(g.date) ? " today" : "")}>
                {isToday(g.date) && <span className="fd-new">NEW</span>}
                {fmtDate(g.date)}
                <em>{g.items.length}건</em>
              </span>
              <span className="fd-line" />
            </div>
            {g.items.map((a, i) => {
              const c = catMap[a.cat];
              return (
                <a className="art" key={i} href={a.url} target="_blank" rel="noopener">
                  <span className="art-cat" style={{ background: c.accent }} />
                  <span className="art-body">
                    <span className="art-meta">
                      <em className="art-src">{a.source}</em>
                      <span className="art-tag" style={{ color: c.accent, background: c.accentSoft }}>{a.tag}</span>
                      <span className="art-catname">{c.ko}</span>
                    </span>
                    <span className="art-title">{a.title}</span>
                    {a.summary && <span className="art-summary"><BoldSummary text={a.summary} /></span>}
                  </span>
                  <Icon name="ext" size={13} />
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- Insights board (10선) ------------------------------------
function InsightsBoard({ insights, sectionRef }) {
  const inView = useInView(sectionRef);
  return (
    <section className="board" ref={sectionRef} data-screen-label="Key Insights">
     <AnimCtx.Provider value={inView}>
      <div className="board-head">
        <span className="board-tab" style={{ background: "var(--accent)" }} />
        <div className="board-titles">
          <h2>핵심 인사이트 <span className="board-en">Key Insights · 2026.06</span></h2>
          <p>검증 데이터 기반 시장 핵심 동향 10선 · Grand View Research · Rock Health · 공식 발표</p>
        </div>
      </div>
      <div className="insight-grid">
        {insights.map((ins, i) => {
          const prog = useProgress(inView, 700, i * 100);
          return (
            <div className="insight-card" key={i} style={{ opacity: prog, transform: `translateY(${(1 - prog) * 16}px)` }}>
              <div className="insight-icon"><Icon name={ins.icon || "spark"} size={18} /></div>
              <div className="insight-body">
                <div className="insight-title">{ins.title}</div>
                <div className="insight-desc"><BoldSummary text={ins.desc} /></div>
              </div>
            </div>
          );
        })}
      </div>
     </AnimCtx.Provider>
    </section>
  );
}

// ---- Charts section --------------------------------------------
function ChartsBoard({ data, cats, theme, sectionRef }) {
  const inView = useInView(sectionRef);
  const catColor = id => (cats.find(c => c.id === id) || {}).accent || theme.ink;
  return (
    <section className="board" ref={sectionRef} data-screen-label="Quant Charts">
     <AnimCtx.Provider value={inView}>
      <div className="board-head">
        <span className="board-tab" style={{ background: "var(--ink)" }} />
        <div className="board-titles">
          <h2>정량 분석 <span className="board-en">Market Quant · Reports</span></h2>
          <p>증권사·시장조사 리포트 기반 시장규모·펀딩·점유율·사용자 지표</p>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <div className="cc-head"><h3>디지털 헬스 시장 규모 & 성장률</h3><span>$B · YoY%</span></div>
          <MarketGrowthChart data={data.MARKET_GROWTH} accent={theme.accent} ink={theme.ink} grid={theme.grid} muted={theme.muted} />
        </div>

        <div className="chart-card">
          <div className="cc-head"><h3>2026 펀딩 점유율</h3><span>카테고리</span></div>
          <DonutChart data={data.SHARE} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} centerLabel="$7.4B" centerSub="Q1 글로벌 펀딩" />
        </div>

        <div className="chart-card">
          <div className="cc-head"><h3>기업별 밸류에이션 (검증본)</h3><span>$B</span></div>
          <HBarChart data={data.FUNDING} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} grid={theme.grid} unit="B" valuePrefix="$" />
        </div>

        <div className="chart-card">
          <div className="cc-head"><h3>사용자 / 판매량</h3><span>주요 앱·기기 · M(백만)</span></div>
          <HBarChart data={data.USERS} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} grid={theme.grid} unit="M" />
        </div>

        <div className="chart-card">
          <div className="cc-head"><h3>스크린리스 밴드 가격 비교</h3><span>$ · 2026.06 검증</span></div>
          <HBarChart data={data.BAND_PRICE} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} grid={theme.grid} unit="" valuePrefix="$" />
        </div>

        <div className="chart-card">
          <div className="cc-head"><h3>AI 주도 딜 비중 (Q1'26)</h3><span>Rock Health</span></div>
          <DonutChart data={data.AI_DEALS} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} centerLabel="62%" centerSub="AI 딜 비중" />
        </div>

        <div className="chart-card">
          <div className="cc-head"><h3>매출 비교 (검증)</h3><span>$B · 연환산</span></div>
          <HBarChart data={data.REVENUE} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} grid={theme.grid} unit="B" valuePrefix="$" />
        </div>

        <div className="chart-card wide" style={{ gridColumn: "1 / -1" }}>
          <div className="cc-head"><h3>Q1'26 펀딩 집계 비교</h3><span>$B · Rock Health vs CB Insights</span></div>
          <HBarChart data={data.FUNDING_TREND} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} grid={theme.grid} unit="B" valuePrefix="$" />
        </div>
      </div>
     </AnimCtx.Provider>
    </section>
  );
}

// ---- Value Proposition board (3 categories × company VP cards) ---
function VPBoard({ companies, cats, sectionRef, onSelect, query }) {
  const inView = useInView(sectionRef);
  return (
    <section className="board" ref={sectionRef} data-screen-label="Value Proposition">
     <AnimCtx.Provider value={inView}>
      <div className="board-head">
        <span className="board-tab" style={{ background: "var(--accent)" }} />
        <div className="board-titles">
          <h2>Value Proposition <span className="board-en">Value Proposition · Direction</span></h2>
          <p>3대 카테고리 기업별 핵심 가치 제안과 방향성 · 카드 클릭 시 상세 정보</p>
        </div>
      </div>
      {cats.map(cat => {
        const rows = companies.filter(c => c.cat === cat.id && c.vp)
          .filter(c => !query || (c.name + c.vp + (c.direction || "")).toLowerCase().includes(query.toLowerCase()));
        if (rows.length === 0) return null;
        return (
          <div className="vp-group" key={cat.id} style={{ "--accent": cat.accent }}>
            <div className="vp-cat">
              <span className="vp-cat-dot" style={{ background: cat.accent }} />
              <b style={{ color: cat.accent }}>{cat.ko}</b>
              <em>{cat.en}</em>
            </div>
            <div className="vp-grid">
              {rows.map((c, i) => {
                const prog = useProgress(inView, 700, i * 90);
                return (
                  <div className="vp-card" key={c.name} role="button" tabIndex={0}
                    onClick={() => onSelect && onSelect(c)}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect && onSelect(c); } }}
                    style={{ opacity: prog, transform: `translateY(${(1 - prog) * 14}px)` }}>
                    <div className="vp-head">
                      <CoLogo name={c.name} domain={c.domain} accent={cat.accent} />
                      <b className="vp-name">{c.name}</b>
                      <Trend v={c.trend} small animate />
                    </div>
                    <div className="vp-prop">{c.vp}</div>
                    {c.direction && <div className="vp-dir"><Icon name="target" size={12} sw={1.8} /><span>{c.direction}</span></div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
     </AnimCtx.Provider>
    </section>
  );
}

// ---- Reports list ----------------------------------------------
function ReportsBoard({ reports, sectionRef, query }) {
  const inView = useInView(sectionRef);
  const rows = reports.filter(r => !query || (r.title + r.house).toLowerCase().includes(query.toLowerCase()));
  const fmtDate = ds => { const d = new Date(ds + "T00:00:00"); return `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, "0")}`; };
  return (
    <section className="board" ref={sectionRef} data-screen-label="Research Reports">
     <AnimCtx.Provider value={inView}>
      <div className="board-head">
        <span className="board-tab" style={{ background: "var(--ink)" }} />
        <div className="board-titles">
          <h2>리서치 리포트 <span className="board-en">Securities & Market Research</span></h2>
          <p>증권사·시장기관 리포트 정량 요약 · 클릭 시 원문 이동</p>
        </div>
      </div>
      <div className="report-list">
        {rows.map((r, i) => (
          <a className="report" key={i} href={r.url} target="_blank" rel="noopener">
            <span className={"rep-type " + (r.type === "Securities" ? "sec" : "mkt")}>{r.type === "Securities" ? "증권사" : "시장조사"}</span>
            <span className="rep-house">{r.house}</span>
            <span className="rep-title">{r.title}</span>
            <span className="rep-figure"><AnimatedNumber value={r.figure} /></span>
            <span className={"rep-rating r-" + r.rating.replace(/\s/g, "").toLowerCase()}>{r.rating}</span>
            <span className="rep-date">{fmtDate(r.date)}</span>
            <Icon name="ext" size={12} />
          </a>
        ))}
      </div>
     </AnimCtx.Provider>
    </section>
  );
}

// ---- Overview Charts (market-level donut + bar + area, no company names) ----
function OverviewCharts({ data, cats, theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const catColor = id => (cats.find(c => c.id === id) || {}).accent || theme.ink;
  return (
    <AnimCtx.Provider value={inView}>
      <div className="ov-charts" ref={ref}>
        <div className="ov-chart-card">
          <div className="cc-head"><h3>디지털 헬스 시장 규모</h3><span>$B · YoY%</span></div>
          <MarketGrowthChart data={data.MARKET_GROWTH} accent={theme.accent} ink={theme.ink} grid={theme.grid} muted={theme.muted} />
        </div>
        <div className="ov-chart-card">
          <div className="cc-head"><h3>Q1'26 펀딩 카테고리 점유</h3><span>카테고리별</span></div>
          <DonutChart data={data.SHARE} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} centerLabel="$7.4B" centerSub="Q1 글로벌 펀딩" />
        </div>
        <div className="ov-chart-card">
          <div className="cc-head"><h3>AI 딜 비중 (Q1'26)</h3><span>Rock Health</span></div>
          <DonutChart data={data.AI_DEALS} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} centerLabel="62%" centerSub="AI 딜 비중" />
        </div>
        <div className="ov-chart-card">
          <div className="cc-head"><h3>Q1'26 펀딩 집계 비교</h3><span>$B</span></div>
          <HBarChart data={data.FUNDING_TREND} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} grid={theme.grid} unit="B" valuePrefix="$" />
        </div>
      </div>
    </AnimCtx.Provider>
  );
}

// ---- Dynamics Board (competitive landscape visualization) ------
function DynamicsBoard({ companies, cats, sectionRef }) {
  const inView = useInView(sectionRef);
  const catMap = Object.fromEntries(cats.map(c => [c.id, c]));

  const arenas = [
    {
      title: "스크린리스 밴드 3파전",
      en: "Screenless Band Battle",
      desc: "Whoop 4.0 vs Fitbit Air vs Garmin CIRQA — 구독 vs 일회성 vs 프리미엄 하드웨어",
      players: ["Whoop", "Fitbit Air", "Garmin"],
      dims: [
        { label: "가격 모델", values: ["구독 $199~$359/yr", "$99.99 일회성", "$509 일회성(리크)"] },
        { label: "FDA 인증", values: ["MG ECG clearance", "AFib 감지", "미확인"] },
        { label: "배터리", values: ["4~5일", "7일", "미공개"] },
        { label: "AI 코칭", values: ["스트레인 코치", "Gemini 기반", "Body Battery"] },
      ],
    },
    {
      title: "AI 헬스 에이전트 경쟁",
      en: "AI Health Agent Layer",
      desc: "OpenAI · Google · 애플 — 누가 건강 데이터 AI를 지배할 것인가",
      players: ["OpenAI", "Google Health", "Apple Intelligence"],
      dims: [
        { label: "접근 방식", values: ["범용 에이전트 → 헬스", "Gemini + Fitbit", "온디바이스 + HealthKit"] },
        { label: "데이터 소스", values: ["API 파트너십", "Fitbit+Pixel", "Watch+iPhone+HealthKit"] },
        { label: "차별화", values: ["S-1 filed · $340B+", "대중 시장 접근", "프라이버시 + 생태계"] },
      ],
    },
    {
      title: "GLP-1 + 디지털 코칭 스택",
      en: "GLP-1 & Digital Coaching · $82B Market",
      desc: "GLP-1 시장 $82B(2026E) — 체중관리 앱이 약물 치료 동반자로 재편",
      players: ["Noom", "WeightWatchers", "MFP"],
      dims: [
        { label: "포지셔닝", values: ["GLP-1 동반 코칭", "GLP-1 원격 처방", "AI 칼로리 비전"] },
        { label: "매출/규모", values: ["ARR $600M+", "~$0.5B 시총", "$1B+(매각 검토)"] },
        { label: "전략", values: ["CBT+임상 파트너십", "Sequence 인수·처방 번들", "Cal AI 인수·AI-first"] },
        { label: "GLP-1 연계", values: ["원격의료 병행", "직접 처방 플랫폼", "영양 추적 보완재"] },
      ],
    },
    {
      title: "스마트링 시장 경쟁",
      en: "Smart Ring Battle",
      desc: "Oura 74% 점유율 방어 vs Ultrahuman·Samsung 도전",
      players: ["Oura", "Ultrahuman Ring", "Samsung"],
      dims: [
        { label: "점유율", values: ["74% (Omdia '25)", "성장 중", "Galaxy Ring 지연"] },
        { label: "차별화", values: ["수면 정확도 1위", "CGM 연동 대사", "Samsung 생태계"] },
        { label: "가격", values: ["$349+구독 $6/월", "$349 구독 없음", "$399 (1세대)"] },
      ],
    },
    {
      title: "IPO 파이프라인",
      en: "IPO Pipeline 2026–27",
      desc: "헬스케어 유니콘들의 상장 경쟁 — 투자자 주목 포인트",
      players: ["Oura ($11B)", "Whoop ($10.1B)", "Strava ($2.2B)"],
      dims: [
        { label: "단계", values: ["Series E 완료", "Series G 완료", "Series G 완료"] },
        { label: "매출", values: ["$2B(26E 전망)", "$1.1B(추정)", "$0.5B(추정)"] },
        { label: "전망", values: ["Ring 5 발표·IPO 유력", "MG ECG FDA 차별화", "130M 사용자 기반"] },
      ],
    },
  ];

  return (
    <section className="board" ref={sectionRef} data-screen-label="Competitive Map">
     <AnimCtx.Provider value={inView}>
      <div className="board-head">
        <span className="board-tab" style={{ background: "var(--accent)" }} />
        <div className="board-titles">
          <h2>경쟁 다이내믹스 <span className="board-en">Competitive Dynamics Map · 2026.06</span></h2>
          <p>주요 경쟁 구도와 전략적 포지셔닝 한눈에 보기</p>
        </div>
      </div>
      <div className="dyn-grid">
        {arenas.map((arena, ai) => {
          const prog = useProgress(inView, 800, ai * 120);
          return (
            <div className="dyn-arena" key={ai} style={{ opacity: prog, transform: `translateY(${(1 - prog) * 20}px)` }}>
              <div className="dyn-arena-head">
                <h3>{arena.title}</h3>
                <span className="dyn-arena-en">{arena.en}</span>
              </div>
              <p className="dyn-arena-desc">{arena.desc}</p>
              <div className="dyn-table">
                <div className="dyn-thead">
                  <span className="dyn-dim-label"></span>
                  {arena.players.map((p, pi) => {
                    const co = companies.find(c => p.startsWith(c.name.split(" (")[0]));
                    const cat = co ? catMap[co.cat] : null;
                    return (
                      <span key={pi} className="dyn-player" style={{ color: cat ? cat.accent : 'var(--ink)' }}>
                        {co && <CoLogo name={co.name} domain={co.domain} accent={cat ? cat.accent : 'var(--accent)'} />}
                        <b>{p}</b>
                      </span>
                    );
                  })}
                </div>
                {arena.dims.map((dim, di) => (
                  <div className="dyn-trow" key={di}>
                    <span className="dyn-dim-label">{dim.label}</span>
                    {dim.values.map((v, vi) => (
                      <span key={vi} className="dyn-cell">{v}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
     </AnimCtx.Provider>
    </section>
  );
}

// ---- Biz Model Board (monetization / revenue model per company) ----
function BizModelBoard({ companies, cats, sectionRef, theme }) {
  const inView = useInView(sectionRef);
  const catMap = Object.fromEntries(cats.map(c => [c.id, c]));
  const models = window.DASH.BIZ_MODELS || [];

  const modelTypes = [
    { label: "하드웨어 프리미엄", color: "#1428A0" },
    { label: "기기 + 구독", color: "#7A38D6" },
    { label: "기기무료 + 구독 전용", color: "#D23B3B" },
    { label: "프리미엄 하드웨어", color: "#0E8F6E" },
    { label: "저가 일회성", color: "#F59E0B" },
    { label: "하드웨어 + 콘텐츠 구독", color: "#0891B2" },
    { label: "프리미엄 구독", color: "#2D6BFF" },
    { label: "구독 + 원격의료", color: "#C026D3" },
    { label: "프리미엄 + 광고", color: "#16A34A" },
  ];
  const modelColor = m => (modelTypes.find(t => t.label === m) || {}).color || theme.ink;

  return (
    <section className="board" ref={sectionRef} data-screen-label="Biz Model">
     <AnimCtx.Provider value={inView}>
      <div className="board-head">
        <span className="board-tab" style={{ background: "var(--accent)" }} />
        <div className="board-titles">
          <h2>수익화 모델 <span className="board-en">Biz Model & Monetization · 2026.06</span></h2>
          <p>기업별 수익 구조 · 가격 전략 · ARPU · 리텐션 · 성장 전략 비교</p>
        </div>
      </div>

      <div className="biz-grid">
        {models.map((m, i) => {
          const prog = useProgress(inView, 800, i * 80);
          const cat = catMap[m.cat];
          const co = companies.find(c => c.name.startsWith(m.name.split(" (")[0]));
          return (
            <div className="biz-card" key={i} style={{
              opacity: prog, transform: `translateY(${(1 - prog) * 18}px)`,
              "--biz-accent": cat ? cat.accent : "var(--accent)",
            }}>
              <div className="biz-card-head">
                {co && <CoLogo name={co.name} domain={co.domain} accent={cat ? cat.accent : "var(--accent)"} />}
                <div className="biz-card-titles">
                  <b className="biz-name">{m.name}</b>
                  <span className="biz-model-tag" style={{ background: modelColor(m.model), color: "#fff" }}>{m.model}</span>
                </div>
              </div>

              <div className="biz-metrics">
                <div className="biz-metric">
                  <em>가격</em>
                  <b>{m.pricing}</b>
                </div>
                <div className="biz-metric">
                  <em>매출</em>
                  <b><AnimatedNumber value={m.revenue} /></b>
                </div>
                <div className="biz-metric">
                  <em>ARPU</em>
                  <b>{m.arpu}</b>
                </div>
                <div className="biz-metric">
                  <em>리텐션</em>
                  <b>{m.retention}</b>
                </div>
              </div>

              <div className="biz-sub-row">
                <em>구독 구조</em>
                <span>{m.sub}</span>
              </div>

              <div className="biz-moat">
                <em>경쟁 해자 (Moat)</em>
                <span>{m.moat}</span>
              </div>

              <div className="biz-strategy">
                <em>수익화 전략</em>
                <span>{m.strategy}</span>
              </div>
            </div>
          );
        })}
      </div>
     </AnimCtx.Provider>
    </section>
  );
}

Object.assign(window, { BoldSummary, CoLogo, CompanyBoard, CompanyDetail, ArticleFeed, InsightsBoard, ChartsBoard, VPBoard, ReportsBoard, DynamicsBoard, OverviewCharts, BizModelBoard });
