/* ============================================================
   anim.jsx — scroll-triggered animation primitives
   - useInView: re-fires every time an element enters/leaves view
   - useProgress: eased 0→1 ramp, resets to 0 when inactive
   - CountUp: number string that counts 0→target (replays)
   - TrendBar: diverging mini bar for ± percentages
   - AnimCtx: lets rows inherit their board's in-view state
   ============================================================ */
const { useState: useStateA, useRef: useRefA, useEffect: useEffectA, useContext: useCtxA, createContext: createCtxA } = React;

const AnimCtx = createCtxA(true);

const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Observe an element; toggle true/false as it enters/leaves the viewport.
function useInView(ref, opts) {
  const o = opts || {};
  const [inView, setInView] = useStateA(false);
  useEffectA(() => {
    const el = ref && ref.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vis = r.top < vh * 0.9 && r.bottom > vh * 0.06;
      setInView(prev => (prev === vis ? prev : vis));
    };
    check();
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setInView(true); else if (!o.once) setInView(false); },
        { threshold: o.threshold != null ? o.threshold : 0.18, rootMargin: o.margin || "0px 0px -8% 0px" }
      );
      io.observe(el);
    }
    // Scroll/resize fallback — fires even when IO is throttled, and catches
    // inner scroll containers (capture phase). Enables replay on scroll.
    const onScroll = () => check();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      if (io) io.disconnect();
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return inView;
}

// Eased 0→1 ramp while `active`; snaps back to 0 when inactive (enables replay).
function useProgress(active, dur, delay) {
  dur = dur || 1150;
  const [p, setP] = useStateA(0);
  useEffectA(() => {
    if (!active) { setP(0); return; }
    if (REDUCED) { setP(1); return; }
    let raf, start, to, done = false;
    const finish = setTimeout(() => { if (!done) { done = true; setP(1); } }, (delay || 0) + dur + 140);
    const run = () => {
      const step = (t) => {
        if (done) return;
        if (!start) start = t;
        const k = Math.min((t - start) / dur, 1);
        setP(1 - Math.pow(1 - k, 3)); // easeOutCubic
        if (k < 1) raf = requestAnimationFrame(step); else done = true;
      };
      raf = requestAnimationFrame(step);
    };
    if (delay) to = setTimeout(run, delay); else run();
    return () => { cancelAnimationFrame(raf); clearTimeout(to); clearTimeout(finish); };
  }, [active]);
  return p;
}

// Split "$486B" → { prefix:"$", num:486, suffix:"B" }, preserving decimals/commas.
function parseNum(str) {
  const m = String(str).match(/^([^\d-]*)(-?\d[\d,]*\.?\d*)(.*)$/);
  if (!m) return { ok: false, raw: String(str) };
  const numStr = m[2].replace(/,/g, "");
  const dec = (numStr.split(".")[1] || "").length;
  return { ok: true, prefix: m[1], num: parseFloat(numStr), suffix: m[3], dec, comma: m[2].indexOf(",") >= 0 };
}
function fmtNum(n, p) {
  let s = p.dec > 0 ? n.toFixed(p.dec) : Math.round(n).toString();
  if (p.comma) s = Number(s).toLocaleString();
  return p.prefix + s + p.suffix;
}

// Counts a numeric string up from 0; non-numeric strings render as-is.
function CountUp({ value, active, dur }) {
  const ctx = useCtxA(AnimCtx);
  const on = active === undefined ? ctx : active;
  const pRef = useRefA(null);
  if (pRef.current === null || pRef.current.raw !== value) pRef.current = Object.assign(parseNum(value), { raw: value });
  const p = pRef.current;
  const [disp, setDisp] = useStateA(p.ok ? fmtNum(0, p) : p.raw);
  useEffectA(() => {
    if (!p.ok) { setDisp(value); return; }
    if (!on) { setDisp(fmtNum(0, p)); return; }
    if (REDUCED) { setDisp(fmtNum(p.num, p)); return; }
    let raf, start, done = false;
    const d = dur || 1100;
    const finish = setTimeout(() => { if (!done) { done = true; setDisp(fmtNum(p.num, p)); } }, d + 140);
    const step = (t) => {
      if (done) return;
      if (!start) start = t;
      const k = Math.min((t - start) / d, 1);
      const e = 1 - Math.pow(1 - k, 3);
      setDisp(fmtNum(p.num * e, p));
      if (k < 1) raf = requestAnimationFrame(step); else done = true;
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); clearTimeout(finish); };
  }, [on, value]);
  return disp;
}

// Diverging ± bar around a center line. Scale: |v| capped at 25%.
function TrendBar({ v, max }) {
  const ctx = useCtxA(AnimCtx);
  const prog = useProgress(ctx, 900);
  const cap = max || 25;
  if (v === 0 || v == null) return <span className="tbar"><span className="tbar-half neg" /><span className="tbar-half pos" /></span>;
  const up = v > 0;
  const pct = Math.min(Math.abs(v) / cap, 1) * 100 * prog;
  return (
    <span className="tbar">
      <span className="tbar-half neg">{!up && <i style={{ width: pct + "%" }} />}</span>
      <span className="tbar-half pos">{up && <i style={{ width: pct + "%" }} />}</span>
    </span>
  );
}

// Span wrapper around CountUp, so existing call sites keep their className.
function AnimatedNumber({ value, active, className, dur }) {
  return <span className={className}><CountUp value={value} active={active} dur={dur} /></span>;
}

// Horizontal fill bar (0→frac); animates with its section's in-view state.
function MiniBar({ frac, color, height, active }) {
  const ctx = useCtxA(AnimCtx);
  const on = active === undefined ? ctx : active;
  const prog = useProgress(on, 1000);
  const f = frac == null ? 0 : Math.max(0, Math.min(1, frac));
  return (
    <span className="minibar" style={height ? { height } : null}>
      <span className="minibar-fill" style={{ width: (f * 100 * prog) + "%", background: color || "var(--accent)" }} />
    </span>
  );
}

Object.assign(window, { AnimCtx, useInView, useProgress, parseNum, fmtNum, CountUp, TrendBar, AnimatedNumber, MiniBar });
