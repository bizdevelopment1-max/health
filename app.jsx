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

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [collapsed, setCollapsed] = uS(false);
  const [brandIdx, setBrandIdx] = uS(0);
  const [active, setActive] = uS("overview");
  const [query, setQuery] = uS("");
  const [feedFilter, setFeedFilter] = uS("all");

  const D = window.DASH;
  const dark = t.dark;

  // category objects with tweakable accents
  const cats = useMemo(() => D.CATEGORIES.map(c => ({
    ...c,
    accent: c.id === "device" ? t.colDevice : c.id === "ai" ? t.colAi : t.colStartup,
    accentSoft: softTint(c.id === "device" ? t.colDevice : c.id === "ai" ? t.colAi : t.colStartup, dark),
  })), [t.colDevice, t.colAi, t.colStartup, dark]);

  // sidebar brand: explicit cycle overrides tweak default
  const brand = brandIdx === 0 ? { name: "tweak", bg: t.sidebar } : BRANDS[brandIdx];

  // theme for charts
  const pal = dark ? PALETTE.dark : PALETTE.light;
  const chartTheme = { ...pal, accent: t.colDevice };

  // section refs
  const scrollRef = uR(null);
  const refs = {
    overview: uR(null), factcheck: uR(null), device: uR(null), ai: uR(null), startup: uR(null),
    articles: uR(null), charts: uR(null), insights: uR(null), reports: uR(null),
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

  const cycleBrand = (i) => {
    if (typeof i === "number") setBrandIdx(i);
    else setBrandIdx(p => (p + 1) % BRANDS.length);
  };

  const articleCount = D.ARTICLES.filter(a => a.date === "2026-06-10").length;
  const today = "2026. 6. 10";

  return (
    <div className={"app d-" + t.density}>
      <Sidebar
        collapsed={collapsed} onToggle={() => setCollapsed(v => !v)}
        active={active} onNav={navTo} brand={brand} onCycleBrand={cycleBrand}
        articleCount={articleCount} hallCount={D.HALLUCINATIONS ? D.HALLUCINATIONS.length : 0}
      />

      <div className="shell">
        <TopBar dark={dark} onTheme={() => setTweak("dark", !dark)} query={query} onQuery={setQuery} todayLabel={today} />

        <main className="main" ref={scrollRef}>
          <div className="main-inner">
            {/* Overview */}
            <section ref={refs.overview} data-screen-label="Overview">
              <div className="ov-head">
                <h2 className="ov-title">마켓 오버뷰 <span>Market Overview · v2 팩트체크판</span></h2>
                <div className="ov-legend">
                  {cats.map(c => (
                    <span key={c.id} className="ov-leg"><i style={{ background: c.accent }} />{c.ko}</span>
                  ))}
                </div>
              </div>
              <KpiStrip kpis={D.KPIS} />
              <div className="ticker">
                <div className="ticker-track">
                  {D.COMPANIES.concat(D.COMPANIES).map((c, i) => (
                    <span className="tk" key={i}>
                      <b>{c.name}</b>
                      <span className="tk-v">{c.value}</span>
                      <Trend v={c.trend} small />
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <HallucinationBoard hallucinations={D.HALLUCINATIONS} sectionRef={refs.factcheck} />

            <CompanyBoard cat={cats[0]} companies={D.COMPANIES} density={t.density} sectionRef={refs.device} query={query} />
            <CompanyBoard cat={cats[1]} companies={D.COMPANIES} density={t.density} sectionRef={refs.ai} query={query} />
            <CompanyBoard cat={cats[2]} companies={D.COMPANIES} density={t.density} sectionRef={refs.startup} query={query} />

            <ArticleFeed articles={D.ARTICLES} cats={cats} sectionRef={refs.articles} filter={feedFilter} onFilter={setFeedFilter} query={query} />

            <ChartsBoard data={D} cats={cats} theme={chartTheme} sectionRef={refs.charts} />

            <InsightsBoard insights={D.INSIGHTS} sectionRef={refs.insights} />

            <ReportsBoard reports={D.REPORTS} sectionRef={refs.reports} query={query} />

            <footer className="foot">
              <span>Health Intelligence Dashboard v2 · 팩트체크판</span>
              <span>소스: Statista, CB Insights, 공식 발표 기준 · 최종 업데이트 2026.06.10</span>
            </footer>
          </div>
        </main>
      </div>

      <TweaksPanel>
        <TweakSection label="테마 · 밀도" />
        <TweakToggle label="다크 모드 (Bloomberg)" value={t.dark} onChange={v => setTweak("dark", v)} />
        <TweakRadio label="카드 밀도" value={t.density} options={["compact", "regular", "comfy"]} onChange={v => setTweak("density", v)} />
        <TweakSection label="사이드바 보드 색상" />
        <TweakColor label="사이드바" value={t.sidebar} options={["#1428A0", "#0B1F4D", "#10131C", "#4322A8", "#0A6E63"]} onChange={v => { setTweak("sidebar", v); setBrandIdx(0); }} />
        <TweakSection label="카테고리 색상" />
        <TweakColor label="디바이스 헬스" value={t.colDevice} options={["#1428A0", "#0F62FE", "#1668E3", "#2D6BFF"]} onChange={v => setTweak("colDevice", v)} />
        <TweakColor label="AI 네이티브" value={t.colAi} options={["#7A38D6", "#9333EA", "#6D28D9", "#C026D3"]} onChange={v => setTweak("colAi", v)} />
        <TweakColor label="체중·피트니스" value={t.colStartup} options={["#0E8F6E", "#0A9D8E", "#16A34A", "#0891B2"]} onChange={v => setTweak("colStartup", v)} />
      </TweaksPanel>
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
