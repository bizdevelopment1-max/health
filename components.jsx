/* ============================================================
   components.jsx — UI building blocks
   ============================================================ */
const { useState, useRef, useEffect, useContext } = React;

// ---- tiny icon set (stroke) ------------------------------------
function Icon({ name, size = 16, sw = 1.6 }) {
  const p = {
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
    pulse: "M3 12h4l2-6 4 12 2-6h6",
    device: "M9 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
    ai: "M12 3a4 4 0 0 1 4 4 4 4 0 0 1 0 8 4 4 0 0 1-8 0 4 4 0 0 1 0-8 4 4 0 0 1 4-4zM12 7v10M8 11h8",
    spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
    news: "M4 5h16v14H4zM7 9h10M7 13h10M7 17h6",
    report: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 16h6",
    chart: "M4 20V8M10 20V4M16 20v-8M22 20H2",
    chevron: "M9 6l6 6-6 6",
    collapse: "M15 6l-6 6 6 6",
    search: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4",
    sun: "M12 5V3M12 21v-2M5 12H3M21 12h-2M6 6 4.5 4.5M19.5 19.5 18 18M18 6l1.5-1.5M4.5 19.5 6 18M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
    moon: "M21 12.8A8 8 0 1 1 11.2 3a6 6 0 0 0 9.8 9.8z",
    ext: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
    up: "M6 15l6-6 6 6",
    down: "M6 9l6 6 6-6",
    dot: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={p[name] || p.dot} />
    </svg>
  );
}

// ---- trend chip (counts up while its board is in view) ----------
function Trend({ v, small, animate }) {
  const ctx = useContext(AnimCtx);
  const prog = useProgress(animate && ctx, 900);
  if (v === 0 || v == null) return <span className="trend flat">—</span>;
  const up = v > 0;
  const shown = (Math.abs(v) * (animate ? prog : 1)).toFixed(1);
  return (
    <span className={"trend " + (up ? "up" : "down")} style={small ? { fontSize: 10.5 } : null}>
      <Icon name={up ? "up" : "down"} size={small ? 11 : 12} sw={2.2} />
      {shown}%
    </span>
  );
}

// ---- Sidebar (Samsung blue board) ------------------------------
const NAV = [
  { id: "overview", ko: "오버뷰", en: "Overview", icon: "grid" },
  { id: "device", ko: "디바이스 헬스", en: "Device Health", icon: "device" },
  { id: "ai", ko: "AI 네이티브", en: "AI Native", icon: "ai" },
  { id: "startup", ko: "체중·피트니스", en: "Weight & Fitness", icon: "spark" },
  { id: "articles", ko: "데일리 기사", en: "Daily Articles", icon: "news" },
  { id: "charts", ko: "정량 분석", en: "Quant Charts", icon: "chart" },
  { id: "reports", ko: "리서치 리포트", en: "Research", icon: "report" },
];

function Sidebar({ collapsed, onToggle, active, onNav, brand, onCycleBrand, articleCount }) {
  const stop = (fn) => (e) => { e.stopPropagation(); fn && fn(); };
  return (
    <aside className={"sidebar" + (collapsed ? " collapsed" : "")} style={{ background: brand.bg }}
      onClick={onToggle} title={collapsed ? "펼치려면 클릭" : "접으려면 빈 영역 클릭"}>
      <div className="sb-head">
        <button className="sb-logo" onClick={stop(onCycleBrand)} title="클릭하여 보드 색상 변경">
          <span className="sb-logo-mark" style={{ color: brand.bg }}><Icon name="pulse" size={18} sw={2.4} /></span>
          {!collapsed && (
            <span className="sb-logo-txt">
              <b>HEALTH</b><span>INTELLIGENCE</span>
            </span>
          )}
        </button>
      </div>

      <nav className="sb-nav">
        {NAV.map(n => (
          <button key={n.id} className={"sb-item" + (active === n.id ? " on" : "")} onClick={stop(() => onNav(n.id))} title={n.ko}>
            <span className="sb-ic"><Icon name={n.icon} size={17} /></span>
            {!collapsed && <span className="sb-label">{n.ko}</span>}
            {!collapsed && n.id === "articles" && articleCount > 0 && (
              <span className="sb-badge">{articleCount}</span>
            )}
            {active === n.id && <span className="sb-active-bar" />}
          </button>
        ))}
      </nav>

      <div className="sb-foot">
        {!collapsed && (
          <div className="sb-swatches" onClick={stop(null)}>
            {BRANDS.map((b, i) => (
              <button key={i} className={"sb-sw" + (b.bg === brand.bg ? " on" : "")} style={{ background: b.bg }} onClick={stop(() => onCycleBrand(i))} title={b.name} />
            ))}
          </div>
        )}
        <div className="sb-hint">
          <Icon name={collapsed ? "chevron" : "collapse"} size={16} />
          {!collapsed && <span>빈 영역 클릭 시 접기 · 펼치기</span>}
        </div>
      </div>
    </aside>
  );
}

const BRANDS = [
  { name: "Samsung Blue", bg: "#1428A0" },
  { name: "Deep Navy", bg: "#0B1F4D" },
  { name: "Midnight", bg: "#10131C" },
  { name: "Violet", bg: "#4322A8" },
  { name: "Teal", bg: "#0A6E63" },
];

// ---- Top bar ----------------------------------------------------
function TopBar({ dark, onTheme, query, onQuery, todayLabel }) {
  return (
    <header className="topbar">
      <div className="tb-title">
        <h1>헬스케어 인텔리전스 <span className="tb-sub">데일리 브리핑 · 경쟁 트렌드 · 시장 정량분석</span></h1>
      </div>
      <div className="tb-tools">
        <div className="tb-search">
          <Icon name="search" size={15} />
          <input value={query} onChange={e => onQuery(e.target.value)} placeholder="기업·기사 검색…" />
        </div>
        <div className="tb-date">
          <Icon name="dot" size={9} />
          <span>{todayLabel} 기준</span>
        </div>
        <button className="tb-theme" onClick={onTheme} title="다크모드 토글">
          <Icon name={dark ? "sun" : "moon"} size={16} />
        </button>
      </div>
    </header>
  );
}

// ---- KPI strip (numbers + gauges replay each time it enters view) -
function KpiStrip({ kpis }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <AnimCtx.Provider value={inView}>
      <div className="kpi-strip" ref={ref}>
        {kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-row">
              <AnimatedNumber className="kpi-val" value={k.value} active={inView} />
              <Trend v={k.delta} small animate />
            </div>
            <MiniBar frac={k.fill} color="var(--accent)" />
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>
    </AnimCtx.Provider>
  );
}

Object.assign(window, { Icon, Trend, Sidebar, TopBar, KpiStrip, NAV, BRANDS });
