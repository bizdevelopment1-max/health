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
    x: "M6 6l12 12M18 6L6 18",
    target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z",
    menu: "M3 6h18M3 12h18M3 18h18",
    palette: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.6 0-.4-.1-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9.7-10-9.7z",
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

// ---- Sidebar ------------------------------
const NAV = [
  { id: "overview", ko: "오버뷰", en: "Overview", icon: "grid" },
  { id: "device", ko: "디바이스 헬스", en: "Device Health", icon: "device" },
  { id: "ai", ko: "AI 네이티브", en: "AI Native", icon: "ai" },
  { id: "startup", ko: "체중·피트니스", en: "Weight & Fitness", icon: "spark" },
  { id: "vp", ko: "밸류 프로포지션", en: "Value Proposition", icon: "target" },
  { id: "articles", ko: "데일리 기사", en: "Daily Articles", icon: "news" },
  { id: "charts", ko: "정량 분석", en: "Quant Charts", icon: "chart" },
  { id: "monthly", ko: "월별 추이", en: "Monthly Trends", icon: "chart" },
  { id: "insights", ko: "핵심 인사이트", en: "Insights", icon: "pulse" },
  { id: "dynamics", ko: "경쟁 다이내믹스", en: "Competitive Map", icon: "target" },
  { id: "bizmodel", ko: "수익화 모델", en: "Biz Model", icon: "chart" },
  { id: "reports", ko: "리서치 리포트", en: "Research", icon: "report" },
];

// gradient background for the sidebar, derived from a single brand color
function sbBg(hex) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
  const sh = (f) => {
    const m = (c) => f >= 0 ? Math.round(c + (255 - c) * f) : Math.round(c * (1 + f));
    return `rgb(${m(r)},${m(g)},${m(b)})`;
  };
  return `linear-gradient(168deg, ${sh(0.16)} 0%, ${hex} 40%, ${sh(-0.46)} 100%)`;
}

function Sidebar({ active, onNav, brand, onCycleBrand, articleCount, companies, cats, onSelectCompany, open, onToggle }) {
  const [openCat, setOpenCat] = useState(null);
  const isCat = id => id === "device" || id === "ai" || id === "startup";
  return (
    <>
    {open && <div className="sb-backdrop" onClick={onToggle} />}
    <aside className={"sidebar" + (open ? " sb-open" : "")} style={{ background: sbBg(brand.bg) }}>
      <div className="sb-head">
        <button className="sb-logo" onClick={onCycleBrand} title="클릭하여 색상 변경">
          <span className="sb-logo-mark" style={{ color: brand.bg }}><Icon name="pulse" size={18} sw={2.4} /></span>
          <span className="sb-logo-txt">
            <b>HEALTH</b><span>INTELLIGENCE</span>
          </span>
        </button>
      </div>

      <nav className="sb-nav">
        {NAV.map(n => {
          const cat = isCat(n.id) ? (cats || []).find(c => c.id === n.id) : null;
          const subs = cat ? (companies || []).filter(c => c.cat === n.id) : [];
          const open = openCat === n.id;
          return (
            <React.Fragment key={n.id}>
              <button className={"sb-item" + (active === n.id ? " on" : "")} title={n.ko}
                onClick={() => { onNav(n.id); if (cat) setOpenCat(open ? null : n.id); }}>
                <span className="sb-ic"><Icon name={n.icon} size={17} /></span>
                <span className="sb-label">{n.ko}</span>
                {n.id === "articles" && articleCount > 0 && (
                  <span className="sb-badge">{articleCount}</span>
                )}
                {cat && <span className={"sb-caret" + (open ? " open" : "")}><Icon name="chevron" size={13} sw={2.2} /></span>}
                {active === n.id && <span className="sb-active-bar" />}
              </button>
              {cat && open && (
                <div className="sb-sub">
                  {subs.map((c, i) => (
                    <button key={i} className="sb-subitem" title={c.name + " 상세 보기"}
                      onClick={() => onSelectCompany && onSelectCompany(c)}>
                      <span className="sb-sub-dot" style={{ background: cat.accent }} />
                      <span className="sb-sub-name">{c.name}</span>
                      <span className="sb-sub-val">{c.value}</span>
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      <div className="sb-foot" />
    </aside>
    </>
  );
}

const BRANDS = [
  { name: "Classic Blue", bg: "#1428A0" },
  { name: "Deep Navy", bg: "#0B1F4D" },
  { name: "Midnight", bg: "#10131C" },
  { name: "Violet", bg: "#4322A8" },
  { name: "Teal", bg: "#0A6E63" },
];

// ---- Top bar ----------------------------------------------------
function TopBar({ dark, onTheme, query, onQuery, todayLabel, onMenuToggle, onColorCycle, onNav }) {
  return (
    <header className="topbar">
      <button className="tb-menu" onClick={onMenuToggle} title="메뉴">
        <Icon name="menu" size={18} sw={2} />
      </button>
      <div className="tb-title">
        <h1>헬스케어 인텔리전스</h1>
      </div>
      <div className="tb-tools">
        <div className="tb-search">
          <Icon name="search" size={15} />
          <input value={query} onChange={e => onQuery(e.target.value)} placeholder="기업·기사 검색…" />
        </div>
        <AIChatbot onNav={onNav} />
        <button className="tb-color" onClick={onColorCycle} title="색상 변경">
          <Icon name="palette" size={16} />
        </button>
        <button className="tb-theme" onClick={onTheme} title="다크모드 토글">
          <Icon name={dark ? "sun" : "moon"} size={16} />
        </button>
        <div className="tb-date">
          <Icon name="dot" size={9} />
          <span>{todayLabel} 업데이트</span>
        </div>
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
          <div className="kpi" key={i} title={k.src || ""}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-row">
              <AnimatedNumber className="kpi-val" value={k.value} active={inView} />
              <Trend v={k.delta} small animate />
            </div>
            <MiniBar frac={k.fill} color="var(--accent)" />
            <div className="kpi-sub">{k.sub}</div>
            {k.src && <div className="kpi-src">{k.src}</div>}
          </div>
        ))}
      </div>
    </AnimCtx.Provider>
  );
}

// ---- AI Chatbot (dropdown questions + natural language search) ----
function AIChatbot({ onNav }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [answer, setAnswer] = useState(null);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(false);
  const [answerNav, setAnswerNav] = useState(null);
  const dropRef = useRef(null);
  const typingRef = useRef(null);

  const QA = window.DASH.QA_PAIRS || [];

  useEffect(() => {
    const close = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const typeOut = (text, nav) => {
    setAnswer(text);
    setAnswerNav(nav);
    setDisplayText("");
    setTyping(true);
    setOpen(false);
    if (typingRef.current) clearInterval(typingRef.current);
    let i = 0;
    typingRef.current = setInterval(() => {
      i += 2;
      if (i >= text.length) {
        setDisplayText(text);
        setTyping(false);
        clearInterval(typingRef.current);
      } else {
        setDisplayText(text.slice(0, i));
      }
    }, 12);
  };

  const selectQ = (qa) => {
    setSearch(qa.q);
    typeOut(qa.a, qa.nav);
  };

  const doSearch = () => {
    if (!search.trim()) return;
    const q = search.toLowerCase().trim();
    const words = q.split(/\s+/).filter(w => w.length > 1);

    const scored = QA.map(qa => {
      let score = 0;
      const kw = qa.keywords || [];
      kw.forEach(k => { if (q.includes(k)) score += 10; });
      if (qa.q.toLowerCase().includes(q)) score += 8;
      words.forEach(w => { if (qa.q.toLowerCase().includes(w)) score += 3; });
      words.forEach(w => { if (qa.a.toLowerCase().includes(w)) score += 1; });
      return { qa, score };
    });
    scored.sort((a, b) => b.score - a.score);
    if (scored[0] && scored[0].score >= 3) { typeOut(scored[0].qa.a, scored[0].qa.nav); return; }

    const D = window.DASH;
    const results = [];
    (D.COMPANIES || []).forEach(c => {
      const txt = (c.name + " " + c.note + " " + (c.vp || "")).toLowerCase();
      let s = 0;
      if (txt.includes(q)) s += 10;
      words.forEach(w => { if (c.name.toLowerCase().includes(w)) s += 5; if (txt.includes(w)) s += 1; });
      if (s > 0) results.push({ text: c.name + ": " + c.note, nav: c.cat, score: s });
    });
    (D.INSIGHTS || []).forEach(ins => {
      const txt = (ins.title + " " + ins.desc).toLowerCase();
      let s = 0;
      if (txt.includes(q)) s += 8;
      words.forEach(w => { if (txt.includes(w)) s += 1; });
      if (s > 0) results.push({ text: ins.title + " — " + ins.desc, nav: "insights", score: s });
    });
    (D.ARTICLES || []).forEach(a => {
      const txt = (a.title + " " + (a.summary || "")).toLowerCase();
      let s = 0;
      words.forEach(w => { if (txt.includes(w)) s += 1; });
      if (s > 0) results.push({ text: a.source + ": " + a.title, nav: "articles", score: s });
    });

    results.sort((a, b) => b.score - a.score);
    if (results.length > 0) {
      const top = results.slice(0, 3);
      const answerText = top.map((r, i) => (i + 1) + ". " + r.text).join("\n\n");
      typeOut(answerText, top[0].nav);
    } else {
      typeOut("관련 정보를 찾을 수 없습니다. 다른 키워드로 검색해 보세요.", null);
    }
  };

  const closeAnswer = () => {
    setAnswer(null);
    setDisplayText("");
    setTyping(false);
    if (typingRef.current) clearInterval(typingRef.current);
  };

  const goToSection = () => {
    if (answerNav && onNav) { onNav(answerNav); }
    closeAnswer();
  };

  const filtered = search.trim()
    ? QA.filter(qa => {
        const s = search.toLowerCase();
        return qa.q.toLowerCase().includes(s) || (qa.keywords || []).some(k => s.includes(k));
      })
    : QA;

  return (
    <div className="chatbot" ref={dropRef}>
      <div className="chatbot-box">
        <input
          className="chatbot-input"
          value={search}
          onChange={e => { setSearch(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); doSearch(); } }}
          placeholder="AI Chatbot"
        />
        <button className="chatbot-arrow" onClick={() => setOpen(!open)} title="질문 선택">
          <Icon name={open ? "up" : "down"} size={14} sw={2.2} />
        </button>
      </div>
      {open && (
        <div className="chatbot-drop">
          <div className="chatbot-drop-title">질문을 선택하세요</div>
          <div className="chatbot-drop-list">
            {filtered.slice(0, 10).map((qa, i) => (
              <button key={i} className="chatbot-drop-item" onClick={() => selectQ(qa)}>
                {qa.q}
              </button>
            ))}
            {filtered.length === 0 && <div className="chatbot-drop-empty">일치하는 질문이 없습니다. Enter로 자연어 검색</div>}
          </div>
        </div>
      )}
      {answer && (
        <div className="chatbot-overlay" onClick={closeAnswer}>
          <div className="chatbot-bubble" onClick={e => e.stopPropagation()}>
            <div className="chatbot-bubble-head">
              <span className="chatbot-bubble-icon"><Icon name="ai" size={16} /></span>
              <b>AI Chatbot</b>
              {typing && <span className="chatbot-typing">입력 중...</span>}
              <button className="chatbot-bubble-close" onClick={closeAnswer}><Icon name="x" size={14} sw={2} /></button>
            </div>
            <div className="chatbot-bubble-q">{search}</div>
            <div className="chatbot-bubble-a">{displayText}{typing && <span className="chatbot-cursor">|</span>}</div>
            {!typing && answerNav && (
              <button className="chatbot-go" onClick={goToSection}>
                해당 섹션으로 이동 <Icon name="chevron" size={12} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Icon, Trend, Sidebar, TopBar, KpiStrip, NAV, BRANDS, sbBg, AIChatbot });
