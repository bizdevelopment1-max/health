/* ============================================================
   anim.jsx — scroll-triggered animation primitives
   ============================================================ */
const { useState: useStateA, useRef: useRefA, useEffect: useEffectA, useContext: useCtxA, createContext: createCtxA } = React;

const AnimCtx = createCtxA(false);

const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const _snapCallbacks = new Set();
(function initVisSnap() {
  const snap = () => { if (document.hidden) _snapCallbacks.forEach(fn => fn()); };
  document.addEventListener("visibilitychange", snap);
  window.addEventListener("beforeprint", () => _snapCallbacks.forEach(fn => fn()));
})();

function findScrollParent(el) {
  let p = el && el.parentElement;
  while (p) {
    const s = getComputedStyle(p).overflowY;
    if (s === "auto" || s === "scroll" || s === "overlay") return p;
    p = p.parentElement;
  }
  return null;
}

function useInView(ref) {
  const [inView, setInView] = useStateA(false);
  const [tick, setTick] = useStateA(0);

  // force a second pass so ref.current is guaranteed set
  useEffectA(() => { if (tick === 0) setTick(1); }, [tick]);

  useEffectA(() => {
    const el = ref && ref.current;
    if (!el) return;

    const scrollEl = findScrollParent(el);

    const check = () => {
      const rect = el.getBoundingClientRect();
      let vpTop, vpBot;
      if (scrollEl) {
        const sr = scrollEl.getBoundingClientRect();
        vpTop = sr.top;
        vpBot = sr.bottom;
      } else {
        vpTop = 0;
        vpBot = window.innerHeight;
      }
      const h = vpBot - vpTop;
      const vis = rect.top < vpTop + h * 0.9 && rect.bottom > vpTop + h * 0.05;
      setInView(vis);
    };

    check();

    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { root: scrollEl || null, threshold: [0, 0.1, 0.2], rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);

    const target = scrollEl || window;
    target.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      io.disconnect();
      target.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [tick]);

  return inView;
}

function useProgress(active, dur, delay, replayKey) {
  dur = dur || 1200;
  const [p, setP] = useStateA(0);
  useEffectA(() => {
    if (!active) { setP(0); return; }
    if (REDUCED) { setP(1); return; }
    setP(0);
    let raf, start, to, done = false;
    const snapFn = () => { if (!done) { done = true; setP(1); } };
    _snapCallbacks.add(snapFn);
    const safety = setTimeout(snapFn, (delay || 0) + dur + 300);
    const run = () => {
      const step = (t) => {
        if (done) return;
        if (!start) start = t;
        const k = Math.min((t - start) / dur, 1);
        setP(1 - Math.pow(1 - k, 3));
        if (k < 1) raf = requestAnimationFrame(step); else { done = true; setP(1); }
      };
      raf = requestAnimationFrame(step);
    };
    if (delay) to = setTimeout(run, delay); else run();
    return () => { cancelAnimationFrame(raf); clearTimeout(to); clearTimeout(safety); _snapCallbacks.delete(snapFn); };
  }, [active, replayKey]);
  return p;
}

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
    const d = dur || 1200;
    const snapFn = () => { if (!done) { done = true; setDisp(fmtNum(p.num, p)); } };
    _snapCallbacks.add(snapFn);
    const finish = setTimeout(snapFn, d + 300);
    const step = (t) => {
      if (done) return;
      if (!start) start = t;
      const k = Math.min((t - start) / d, 1);
      const e = 1 - Math.pow(1 - k, 3);
      setDisp(fmtNum(p.num * e, p));
      if (k < 1) raf = requestAnimationFrame(step); else { done = true; setDisp(fmtNum(p.num, p)); }
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); clearTimeout(finish); _snapCallbacks.delete(snapFn); };
  }, [on, value]);
  return disp;
}

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

function AnimatedNumber({ value, active, className, dur }) {
  return <span className={className}><CountUp value={value} active={active} dur={dur} /></span>;
}

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
