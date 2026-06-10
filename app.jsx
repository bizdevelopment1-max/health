/* ============================================================
   app.jsx — state, theming, nav, tweaks
   ============================================================ */
const { useState: uS, useRef: uR, useEffect: uE, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "density": "regular",
  "sidebar": "#1428A0",
  "colDevice": "#1428A0",
  "colAi": "#7A38D6",
  "colStartup": "#0E8F6E"
}/*EDITMODE-END*/;

// concrete palettes for SVG charts
const PALETTE = {
  light: { ink: "#0E1525", muted: "#8A93A4", grid: "#EAEDF3" },
  dark: { ink: "#E8ECF4", muted: "#6F7B90", grid: "#1E2636" },
};

const COLOR_PRESETS = [
  { sidebar: "#1428A0", colDevice: "#1428A0", colAi: "#7A38D6", colStartup: "#0E8F6E" },
  { sidebar: "#0B1F4D", colDevice: "#0F62FE", colAi: "#9333EA", colStartup: "#0A9D8E" },
  { sidebar: "#4322A8", colDevice: "#2D6BFF", colAi: "#C026D3", colStartup: "#16A34A" },
  { sidebar: "#0A6E63", colDevice: "#1668E3", colAi: "#6D28D9", colStartup: "#0891B2" },
  { sidebar: "#10131C", colDevice: "#1428A0", colAi: "#7A38D6", colStartup: "#0E8F6E" },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [brandIdx, setBrandIdx] = uS(0);
  const [colorIdx, setColorIdx] = uS(0);
  const [active, setActive] = uS("overview");
  const [query, setQuery] = uS("");
  const [feedFilter, setFeedFilter] = uS("all");
  const [selected, setSelected] = uS(null);
  const [sidebarOpen, setSidebarOpen] = uS(false);

  const D = window.DASH;
  const dark = t.dark;

  // category objects with tweakable accents
  const cats = useMemo(() => D.CATEGORIES.map(c => ({
    ...c,
    accent: c.id === "device" ? t.colDevice : c.id === "ai" ? t.colAi : t.colStartup,
    accentSoft: softTint(c.id === "device" ? t.colDevice : c.id === "ai" ? t.colAi : t.colStartup, dark),
  })), [t.colDevice, t.colAi, t.colStartup, dark]);

  // sidebar brand: explicit cycle overrides tweak default
  const brand = brandIdx === 0
    ? { name: (BRANDS.find(b => b.bg === t.sidebar) || BRANDS[0]).name, bg: t.sidebar }
    : BRANDS[brandIdx];

  // theme for charts
  const pal = dark ? PALETTE.dark : PALETTE.light;
  const chartTheme = { ...pal, accent: t.colDevice };

  // section refs
  const scrollRef = uR(null);
  const refs = {
    overview: uR(null), device: uR(null), ai: uR(null), startup: uR(null),
    vp: uR(null), articles: uR(null), charts: uR(null), insights: uR(null), dynamics: uR(null), bizmodel: uR(null), reports: uR(null),
  };

  uE(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);

  const navTo = id => {
    setActive(id);
    const el = refs[id] && refs[id].current;
    const sc = scrollRef.current;
    if (el && sc) sc.scrollTo({ top: el.offsetTop - 12, behavior: "smooth" });
  };

  // scroll-spy
  uE(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    const onScroll = () => {
      const y = sc.scrollTop + 80;
      let cur = "overview";
      for (const id of Object.keys(refs)) {
        const el = refs[id].current;
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    sc.addEventListener("scroll", onScroll, { passive: true });
    return () => sc.removeEventListener("scroll", onScroll);
  }, []);

  const cycleBrand = () => {
    setBrandIdx(p => (p + 1) % BRANDS.length);
  };

  const cycleColor = () => {
    const next = (colorIdx + 1) % COLOR_PRESETS.length;
    setColorIdx(next);
    const p = COLOR_PRESETS[next];
    setTweak("sidebar", p.sidebar);
    setTweak("colDevice", p.colDevice);
    setTweak("colAi", p.colAi);
    setTweak("colStartup", p.colStartup);
    setBrandIdx(0);
  };

  const articleCount = D.ARTICLES.filter(a => a.date === "2026-06-10").length;
  const today = "6/10 18:58";

  return (
    <div className={"app d-" + t.density}>
      <Sidebar
        active={active} onNav={id => { navTo(id); setSidebarOpen(false); }} brand={brand} onCycleBrand={cycleBrand}
        articleCount={articleCount} companies={D.COMPANIES} cats={cats} onSelectCompany={c => { setSelected(c); setSidebarOpen(false); }}
        open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)}
      />

      <div className="shell">
        <TopBar dark={dark} onTheme={() => setTweak("dark", !dark)} query={query} onQuery={setQuery} todayLabel={today}
          onMenuToggle={() => setSidebarOpen(o => !o)} onColorCycle={cycleColor} />

        <main className="main" ref={scrollRef}>
          <div className="main-inner">
            {/* Overview — market-level only */}
            <section ref={refs.overview} data-screen-label="Overview">
              <div className="ov-head">
                <h2 className="ov-title">마켓 오버뷰 <span>Market Overview · 검증 데이터 기준</span></h2>
                <div className="ov-legend">
                  {cats.map(c => (
                    <span key={c.id} className="ov-leg"><i style={{ background: c.accent }} />{c.ko}</span>
                  ))}
                </div>
              </div>
              <KpiStrip kpis={D.KPIS} />
              <OverviewCharts data={D} cats={cats} theme={chartTheme} />
            </section>

            <CompanyBoard cat={cats[0]} companies={D.COMPANIES} density={t.density} sectionRef={refs.device} query={query} onSelect={setSelected} />
            <CompanyBoard cat={cats[1]} companies={D.COMPANIES} density={t.density} sectionRef={refs.ai} query={query} onSelect={setSelected} />
            <CompanyBoard cat={cats[2]} companies={D.COMPANIES} density={t.density} sectionRef={refs.startup} query={query} onSelect={setSelected} />

            <VPBoard companies={D.COMPANIES} cats={cats} sectionRef={refs.vp} onSelect={setSelected} query={query} />

            <ArticleFeed articles={D.ARTICLES} cats={cats} sectionRef={refs.articles} filter={feedFilter} onFilter={setFeedFilter} query={query} />

            <ChartsBoard data={D} cats={cats} theme={chartTheme} sectionRef={refs.charts} />

            <InsightsBoard insights={D.INSIGHTS} sectionRef={refs.insights} />

            <DynamicsBoard companies={D.COMPANIES} cats={cats} sectionRef={refs.dynamics} />

            <BizModelBoard companies={D.COMPANIES} cats={cats} sectionRef={refs.bizmodel} theme={chartTheme} />

            <ReportsBoard reports={D.REPORTS} sectionRef={refs.reports} query={query} />

            <footer className="foot">
              <span>Health Intelligence Dashboard</span>
              <span>소스: Grand View Research · Rock Health · CB Insights · CNBC · TechCrunch · 공식 발표 기준 · 최종 업데이트 2026.06.10</span>
            </footer>
          </div>
        </main>
      </div>

      <CompanyDetail company={selected} cats={cats} articles={D.ARTICLES} onClose={() => setSelected(null)} />

      {/* Color change via palette button in TopBar */}
    </div>
  );
}

// soft tint of a hex color for chips/backgrounds
function softTint(hex, dark) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
  if (dark) return `rgba(${r},${g},${b},0.18)`;
  const mix = (c) => Math.round(c + (255 - c) * 0.88);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
