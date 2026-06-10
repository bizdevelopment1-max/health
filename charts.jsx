/* ============================================================
   charts.jsx — lightweight animated SVG charts (no deps)
   Each chart observes its own visibility and fills 0→100,
   replaying every time it scrolls back into view.
   Labels count up alongside their chart elements.
   ============================================================ */
const { useRef: useRefC, useContext: useCtxC, useState: useStateC } = React;

// Re-fire a chart's animation as the pointer moves over it. Throttled so the
// 0→target ramp is actually visible (a fresh restart at most ~every 350ms).
function useHoverReplay() {
  const [nonce, setNonce] = useStateC(0);
  const last = useRefC(0);
  const bump = () => {
    const now = (typeof performance !== "undefined" ? performance.now() : Date.now());
    if (now - last.current > 350) { last.current = now; setNonce(n => n + 1); }
  };
  return [nonce, bump];
}

function niceTicks(max, count) {
  const step = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  let nice;
  if (norm < 1.5) nice = 1; else if (norm < 3) nice = 2; else if (norm < 7) nice = 5; else nice = 10;
  const tick = nice * mag;
  const ticks = [];
  for (let v = 0; v <= max + tick * 0.001; v += tick) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// ---- Combo: market size (area+line draws L→R) + growth markers count up ---
function MarketGrowthChart({ data, accent, ink, grid, muted }) {
  const inView = useCtxC(AnimCtx);
  const [nonce, bump] = useHoverReplay();
  const prog = useProgress(inView, 1400, 0, nonce);

  const W = 520, H = 235, padL = 46, padR = 16, padT = 22, padB = 30;
  const iw = W - padL - padR, ih = H - padT - padB;
  const maxSize = Math.max(...data.map(d => d.size));
  const ticks = niceTicks(maxSize, 4);
  const tMax = ticks[ticks.length - 1];
  const x = i => padL + (iw * i) / (data.length - 1);
  const y = v => padT + ih - (ih * v) / tMax;

  const linePts = data.map((d, i) => `${x(i)},${y(d.size)}`).join(" ");
  const areaPts = `${padL},${padT + ih} ${linePts} ${padL + iw},${padT + ih}`;
  const n = data.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", cursor: "pointer" }}
      onMouseMove={bump} onMouseEnter={bump}>
      <defs>
        <linearGradient id="mg-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.30" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
        </linearGradient>
        <clipPath id="mg-clip"><rect x={padL} y="0" width={iw * prog} height={H} /></clipPath>
      </defs>
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={padL} x2={padL + iw} y1={y(t)} y2={y(t)} stroke={grid} strokeWidth="1" />
          <text x={padL - 8} y={y(t) + 3} textAnchor="end" fontSize="10" fill={muted} style={{ fontVariantNumeric: "tabular-nums" }}>${t}B</text>
        </g>
      ))}
      <g clipPath="url(#mg-clip)">
        <polygon points={areaPts} fill="url(#mg-fill)" />
        <polyline points={linePts} fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      {data.map((d, i) => {
        const frac = i / (n - 1);
        const reveal = prog >= frac - 0.001;
        const localProg = reveal ? Math.min((prog - frac) / (1 / (n - 1)), 1) : 0;
        const shownGrowth = Math.round(d.growth * (reveal ? Math.min(localProg * 3, 1) : 0));
        const shownSize = Math.round(d.size * (reveal ? Math.min(localProg * 3, 1) : 0));
        return (
          <g key={i} style={{ opacity: reveal ? 1 : 0, transition: "opacity .25s" }}>
            <title>{d.src || `${d.year}: $${d.size}B`}</title>
            <circle cx={x(i)} cy={y(d.size)} r="3.4" fill="#fff" stroke={accent} strokeWidth="2" />
            <text x={x(i)} y={y(d.size) - 11} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={ink} style={{ fontVariantNumeric: "tabular-nums" }}>{shownGrowth}%</text>
            <text x={x(i)} y={padT + ih + 18} textAnchor="middle" fontSize="9.5" fill={muted}>{d.year}</text>
          </g>
        );
      })}
    </svg>
  );
}

// easeOutBack: slight overshoot then settle — gives bars a "spring" feel
function easeOutBack(p) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
}

// ---- Horizontal bars (funding / users): spring widths, staggered, labels count ----
function HBarChart({ data, colorOf, ink, muted, grid, unit, valuePrefix }) {
  const inView = useCtxC(AnimCtx);
  const [nonce, bump] = useHoverReplay();
  const prog = useProgress(inView, 1300, 0, nonce);

  const rowH = 28, padL = 4, padT = 6;
  const labelW = 108, barMaxW = 300;
  const W = labelW + barMaxW + 64, H = padT * 2 + data.length * rowH;
  const max = Math.max(...data.map(d => d.value));
  const pre = valuePrefix || "";
  const stagger = 0.08;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", cursor: "pointer" }}
      onMouseMove={bump} onMouseEnter={bump}>
      {data.map((d, i) => {
        const t0 = i * stagger;
        const local = Math.max(0, Math.min((prog - t0) / (1 - t0 || 1), 1));
        const spring = local >= 1 ? 1 : easeOutBack(local);
        const w = Math.max((barMaxW * d.value) / max * spring, 0);
        const yy = padT + i * rowH;
        const c = colorOf(d);
        const dec = (String(d.value).split(".")[1] || "").length;
        const shown = dec ? (d.value * Math.min(local * 1.15, 1)).toFixed(dec) : Math.round(d.value * Math.min(local * 1.15, 1));
        return (
          <g key={i} style={{ opacity: local > 0 ? 1 : 0.35, transition: "opacity .2s" }}>
            <title>{d.src || d.name}</title>
            <text x={padL} y={yy + rowH / 2 + 3.5} fontSize="11.5" fill={ink} fontWeight="600">{d.name}</text>
            <rect x={labelW} y={yy + 5} width={barMaxW} height={rowH - 13} rx="2.5" fill={grid} />
            <rect x={labelW} y={yy + 5} width={Math.max(w, 0.5)} height={rowH - 13} rx="2.5" fill={c} />
            <text x={labelW + Math.max(w, 0.5) + 8} y={yy + rowH / 2 + 3.5} fontSize="11.5" fontWeight="800" fill={ink}
              style={{ fontVariantNumeric: "tabular-nums", opacity: Math.min(local * 2, 1) }}>{pre}{shown}{unit}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---- Donut (category share): clockwise sweep + scale-in pop, center & legend count up ----
function DonutChart({ data, colorOf, ink, muted, centerLabel, centerSub }) {
  const inView = useCtxC(AnimCtx);
  const [nonce, bump] = useHoverReplay();
  const prog = useProgress(inView, 1400, 0, nonce);

  const size = 184, cx = size / 2, cy = size / 2, r = 64, sw = 27;
  const total = data.reduce((s, d) => s + d.value, 0);
  const sweepEnd = -90 + prog * 360;
  let acc = -90;
  const segs = data.map(d => {
    const frac = d.value / total;
    const start = acc, end = acc + frac * 360;
    acc = end;
    const drawnEnd = Math.min(end, sweepEnd);
    let path = null;
    if (drawnEnd > start + 0.01) {
      const large = drawnEnd - start > 180 ? 1 : 0;
      const sr = (start * Math.PI) / 180, er = (drawnEnd * Math.PI) / 180;
      const x1 = cx + r * Math.cos(sr), y1 = cy + r * Math.sin(sr);
      const x2 = cx + r * Math.cos(er), y2 = cy + r * Math.sin(er);
      path = `M${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
    }
    return { d, path, color: colorOf(d) };
  });

  const centerParsed = parseNum(centerLabel);
  const centerShown = centerParsed.ok ? fmtNum(centerParsed.num * prog, centerParsed) : centerLabel;
  const ringScale = 0.86 + 0.14 * Math.min(prog * 1.6, 1);
  const ringSpin = (1 - Math.min(prog * 1.4, 1)) * -14;
  const centerPop = 0.7 + 0.3 * Math.min(prog * 1.8, 1);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
      onMouseMove={bump} onMouseEnter={bump}>
      <svg viewBox={`0 0 ${size} ${size}`} width="150" height="150" style={{ flexShrink: 0 }}>
        <g transform={`rotate(${ringSpin} ${cx} ${cy}) translate(${cx} ${cy}) scale(${ringScale}) translate(${-cx} ${-cy})`}
          style={{ opacity: Math.min(prog * 3 + 0.15, 1) }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={ink} strokeOpacity="0.06" strokeWidth={sw} />
          {segs.map((s, i) => s.path && (
            <path key={i} d={s.path} fill="none" stroke={s.color} strokeWidth={sw} strokeLinecap="butt" />
          ))}
        </g>
        <g transform={`translate(${cx} ${cy}) scale(${centerPop}) translate(${-cx} ${-cy})`}
          style={{ opacity: Math.min(prog * 2.2, 1) }}>
          <text x={cx} y={cy - 2} textAnchor="middle" fontSize="22" fontWeight="800" fill={ink} style={{ fontVariantNumeric: "tabular-nums" }}>{centerShown}</text>
          <text x={cx} y={cy + 15} textAnchor="middle" fontSize="9.5" fill={muted}>{centerSub}</text>
        </g>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
        {segs.map((s, i) => {
          const t0 = 0.15 + i * 0.18;
          const local = Math.max(0, Math.min((prog - t0) / 0.3, 1));
          return (
            <div key={i} title={s.d.src || s.d.label} style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 12,
              opacity: 0.25 + 0.75 * local, transform: `translateX(${(1 - local) * 14}px)`,
              cursor: "default",
            }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }}></span>
              <span style={{ color: ink, fontWeight: 500, whiteSpace: "nowrap" }}>{s.d.label}</span>
              <span style={{ color: muted, marginLeft: "auto", fontWeight: 800, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                {Math.round(s.d.value * prog)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- Monthly line chart (multi-series, iOS+Android or revenue) ----
function MonthlyLineChart({ series, months, colors, ink, muted, grid, unit, valuePrefix }) {
  const inView = useCtxC(AnimCtx);
  const [nonce, bump] = useHoverReplay();
  const prog = useProgress(inView, 1400, 0, nonce);

  const W = 520, H = 220, padL = 46, padR = 16, padT = 18, padB = 30;
  const iw = W - padL - padR, ih = H - padT - padB;
  const allVals = series.flatMap(s => s.values);
  const ticks = niceTicks(Math.max(...allVals), 4);
  const tMax = ticks[ticks.length - 1];
  const x = i => padL + (iw * i) / (months.length - 1 || 1);
  const y = v => padT + ih - (ih * v) / tMax;
  const pre = valuePrefix || "";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", cursor: "pointer" }}
      onMouseMove={bump} onMouseEnter={bump}>
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={padL} x2={padL + iw} y1={y(t)} y2={y(t)} stroke={grid} strokeWidth="1" />
          <text x={padL - 8} y={y(t) + 3} textAnchor="end" fontSize="10" fill={muted} style={{ fontVariantNumeric: "tabular-nums" }}>{pre}{t}{unit}</text>
        </g>
      ))}
      {months.map((m, i) => (
        <text key={i} x={x(i)} y={padT + ih + 18} textAnchor="middle" fontSize="9" fill={muted}>{m.replace("2026-", "")}</text>
      ))}
      {series.map((s, si) => {
        const pts = s.values.map((v, i) => `${x(i)},${y(v)}`);
        const visiblePts = Math.floor(prog * pts.length) + 1;
        const shownPts = pts.slice(0, visiblePts).join(" ");
        return (
          <g key={si}>
            <polyline points={shownPts} fill="none" stroke={colors[si % colors.length]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
            {s.values.slice(0, visiblePts).map((v, i) => (
              <g key={i}>
                <title>{s.name} {months[i]}: {pre}{v}{unit} — {s.srcs && s.srcs[i] || ""}</title>
                <circle cx={x(i)} cy={y(v)} r="3" fill="#fff" stroke={colors[si % colors.length]} strokeWidth="1.8" />
              </g>
            ))}
          </g>
        );
      })}
      <g style={{ fontSize: 10 }}>
        {series.map((s, si) => (
          <g key={si} transform={`translate(${padL + si * 100}, ${H - 4})`}>
            <rect width="8" height="8" rx="1.5" fill={colors[si % colors.length]} y="-7" />
            <text x="12" y="0" fill={ink} fontWeight="600">{s.name}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

Object.assign(window, { MarketGrowthChart, HBarChart, DonutChart, MonthlyLineChart });
