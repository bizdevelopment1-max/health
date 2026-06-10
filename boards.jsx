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
            <span className="num ct-trend">
              <Trend v={c.trend} small animate />
              <TrendBar v={c.trend} />
            </span>
            <span className="ct-note">{c.note}</span>
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
                  {a.summary && <span className="cd-art-sum">{a.summary}</span>}
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

// ---- Insights board -------------------------------------------
function InsightsBoard({ insights, sectionRef }) {
  const inView = useInView(sectionRef);
  return (
    <section className="board" ref={sectionRef} data-screen-label="Key Insights">
     <AnimCtx.Provider value={inView}>
      <div className="board-head">
        <span className="board-tab" style={{ background: "var(--accent)" }} />
        <div className="board-titles">
          <h2>핵심 인사이트 <span className="board-en">Key Insights · 2026.06</span></h2>
          <p>검증 데이터 기반 시장 핵심 동향 9선 · Grand View Research · Rock Health · 공식 발표</p>
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
                <div className="insight-desc">{ins.desc}</div>
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
          <h2>밸류 프로포지션 <span className="board-en">Value Proposition · Direction</span></h2>
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

Object.assign(window, { CoLogo, CompanyBoard, CompanyDetail, ArticleFeed, InsightsBoard, ChartsBoard, VPBoard, ReportsBoard });
