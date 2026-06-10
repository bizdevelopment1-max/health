/* ============================================================
   boards.jsx — content sections
   ============================================================ */

// ---- Category company board (dense table) ----------------------
function CompanyBoard({ cat, companies, density, sectionRef, query }) {
  const inView = useInView(sectionRef);
  const rows = companies.filter(c => c.cat === cat.id)
    .filter(c => !query || (c.name + c.unit + c.note).toLowerCase().includes(query.toLowerCase()));
  return (
    <section className="board" ref={sectionRef} data-screen-label={cat.en}>
     <AnimCtx.Provider value={inView}>
      <div className="board-head" style={{ "--accent": cat.accent }}>
        <span className="board-tab" style={{ background: cat.accent }} />
        <div className="board-titles">
          <h2>{cat.ko} <span className="board-en">{cat.en}</span></h2>
          <p>{cat.desc}</p>
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
          <a className="ct-row" key={i} href={c.url} target="_blank" rel="noopener" style={{ "--accent": cat.accent }}>
            <span className="ct-name">
              <span className="ct-logo" style={{ background: cat.accent }}>{c.name[0]}</span>
              <b>{c.name}</b>
              <Icon name="ext" size={11} />
            </span>
            <span className="ct-seg">{c.unit}</span>
            <span className="num ct-valcell">
              <AnimatedNumber className="ct-val" value={c.valuation} />
              {c.valAsof && c.valAsof !== "\u2014" && <em className="ct-asof">'{c.valAsof}월 기준</em>}
            </span>
            <span className="num">
              <em className="ct-metric">{c.metric}</em>
              <AnimatedNumber className="ct-mval" value={c.value} />
              {c.metricAsof && c.metricAsof !== "\u2014" && <em className="ct-asof">'{c.metricAsof}월 기준</em>}
            </span>
            <span className="num ct-trend">
              <Trend v={c.trend} small animate />
              <TrendBar v={c.trend} />
            </span>
            <span className="ct-note">{c.note}</span>
          </a>
        ))}
      </div>
     </AnimCtx.Provider>
    </section>
  );
}

// ---- Article feed grouped by date ------------------------------
function ArticleFeed({ articles, cats, sectionRef, filter, onFilter, query }) {
  const catMap = Object.fromEntries(cats.map(c => [c.id, c]));
  const filtered = articles
    .filter(a => filter === "all" || a.cat === filter)
    .filter(a => !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.source.toLowerCase().includes(query.toLowerCase()));

  // group by date, newest first
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
          <h2>데일리 기사 피드 <span className="board-en">Daily Articles · 한국어 큐레이션</span></h2>
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
                    {a.summary && <span className="art-summary">{a.summary}</span>}
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
          <DonutChart data={data.SHARE} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} centerLabel="$8.2B" centerSub="Q2 글로벌" />
        </div>

        <div className="chart-card">
          <div className="cc-head"><h3>기업별 밸류에이션</h3><span>$B</span></div>
          <HBarChart data={data.FUNDING} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} grid={theme.grid} unit="B" valuePrefix="$" />
        </div>

        <div className="chart-card">
          <div className="cc-head"><h3>사용자 / 다운로드</h3><span>주요 앱 · M(백만)</span></div>
          <HBarChart data={data.USERS} colorOf={d => catColor(d.cat)} ink={theme.ink} muted={theme.muted} grid={theme.grid} unit="M" />
        </div>
      </div>
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

Object.assign(window, { CompanyBoard, ArticleFeed, ChartsBoard, ReportsBoard });
