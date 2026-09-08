"use client";

/**
 * AnimatedBackground
 * ------------------------------------------------------------------
 * Full-bleed animated backdrop for a PC-hardware / gaming storefront.
 * A dark motherboard at rest: Manhattan-routed circuit traces sit dim
 * in near-black space, current pulses sweep a subset of them on loop,
 * and two slow violet/blue aurora blobs give the scene depth.
 *
 * Fixes vs. the previous version:
 *  1. Stacking bug: the component now wraps your page content itself
 *     (pass it as `children`) instead of asking you to add a
 *     `relative z-10` wrapper elsewhere. That was the most likely
 *     reason it "did nothing" — one missing z-index anywhere in the
 *     tree and the background painted over (or under) the wrong
 *     layer. Now it's a single component, correct by construction.
 *  2. Dropped GSAP's MotionPathPlugin. It depends on
 *     `transform-box: fill-box` on SVG elements, which is still
 *     inconsistently supported on mobile Safari/older Android
 *     WebViews — the most likely reason it looked broken on phones.
 *     Pulses now animate via plain Framer Motion keyframes on cx/cy,
 *     which is broadly supported.
 *  3. Responsive: viewBox, trace density and blob size are derived
 *     from the actual viewport (phone, tablet, laptop, ultrawide
 *     monitor) instead of a fixed 1600x900 canvas, so nothing gets
 *     cropped or over-zoomed on portrait screens.
 *
 * Palette — darker overall, violet promoted to co-lead with blue:
 *   --bg-void   #030308  page base, near true black
 *   --bg-deep   #0D0A1F  faint indigo-violet core of the base glow
 *   --trace     #1C1836  resting (unlit) circuit trace / grid
 *   --blue      #3B6FF0  accent — traces, one blob
 *   --violet    #9B5CFF  accent — traces, two blobs (now the lead hue)
 *   --spark     #D6C2FF  pale lavender-white core of a traveling pulse
 *
 * Usage — wrap your whole app with it, nothing else required:
 *
 *   // app/layout.tsx
 *   <body>
 *     <AnimatedBackground>{children}</AnimatedBackground>
 *   </body>
 * ------------------------------------------------------------------
 */

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = {
  void: "#030308",
  deep: "#0D0A1F",
  trace: "#1C1836",
  blue: "#3B6FF0",
  violet: "#9B5CFF",
  spark: "#D6C2FF",
};

const GRID = 64;

type Breakpoint = "mobile" | "tablet" | "desktop" | "ultrawide";

function getBreakpoint(width: number): Breakpoint {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1680) return "desktop";
  return "ultrawide";
}

const TRACE_COUNT_BY_BREAKPOINT: Record<Breakpoint, number> = {
  mobile: 12,
  tablet: 18,
  desktop: 24,
  ultrawide: 30,
};

/** Deterministic PRNG so a given (seed) always yields the same layout —
 *  keeps server and client markup in sync and avoids hydration warnings. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type TraceData = {
  id: string;
  points: [number, number][];
  d: string;
  pads: { x: number; y: number; r: number }[];
  pulse: boolean;
  color: string;
  duration: number;
  delay: number;
  repeatDelay: number;
};

function snap(v: number) {
  return Math.round(v / GRID) * GRID;
}

function buildTrace(rng: () => number, index: number, width: number, height: number): TraceData {
  const cols = Math.max(2, Math.floor(width / GRID));
  const rows = Math.max(2, Math.floor(height / GRID));

  let x = Math.min(Math.max(snap(rng() * cols * GRID), GRID), width - GRID);
  let y = Math.min(Math.max(snap(rng() * rows * GRID), GRID), height - GRID);

  const points: [number, number][] = [[x, y]];
  const steps = 4 + Math.floor(rng() * 5); // 4-8 segments
  let lastAxis: "h" | "v" | null = null;

  for (let i = 0; i < steps; i++) {
    const axis: "h" | "v" =
      lastAxis === "h" ? "v" : lastAxis === "v" ? "h" : rng() > 0.5 ? "h" : "v";
    const length = (1 + Math.floor(rng() * 3)) * GRID; // 1-3 grid cells
    const dir = rng() > 0.5 ? 1 : -1;

    if (axis === "h") {
      x = Math.min(Math.max(x + dir * length, GRID), width - GRID);
    } else {
      y = Math.min(Math.max(y + dir * length, GRID), height - GRID);
    }
    points.push([x, y]);
    lastAxis = axis;
  }

  const d = points.map(([px, py], i) => `${i === 0 ? "M" : "L"} ${px} ${py}`).join(" ");
  const pads = [points[0], points[points.length - 1]].map(([px, py]) => ({
    x: px,
    y: py,
    r: 3.5 + rng() * 1.5,
  }));

  // Violet leads: roughly 3-in-5 traces skew violet, the rest blue.
  const color = rng() > 0.4 ? COLORS.violet : COLORS.blue;

  return {
    id: `trace-${index}`,
    points,
    d,
    pads,
    pulse: rng() < 0.55,
    color,
    duration: 3.5 + rng() * 3.5,
    delay: rng() * 4,
    repeatDelay: 1 + rng() * 4,
  };
}

/** Cumulative, length-weighted 0..1 time for each waypoint, so a dot
 *  moves at a constant visual speed across uneven segment lengths. */
function waypointTimes(points: [number, number][]) {
  const lengths: number[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    lengths.push(len);
    total += len;
  }
  const times = [0];
  let acc = 0;
  for (const len of lengths) {
    acc += len;
    times.push(total === 0 ? 1 : acc / total);
  }
  return times;
}

function useViewportSize() {
  const [size, setSize] = useState({ width: 1440, height: 900, mounted: false });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight, mounted: true });
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return size;
}

function useTraces(width: number, height: number) {
  const breakpoint = getBreakpoint(width);
  const count = TRACE_COUNT_BY_BREAKPOINT[breakpoint];

  // Re-derive only when the breakpoint (not every pixel of a resize)
  // or the viewport dimensions genuinely change.
  return useMemo(() => {
    const rng = mulberry32(1337);
    return Array.from({ length: count }, (_, i) => buildTrace(rng, i, width, height));
  }, [count, width, height]);
}

function CircuitLayer({ width, height }: { width: number; height: number }) {
  const traces = useTraces(width, height);
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="pulse-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {traces.map((trace) => (
        <g key={trace.id}>
          <path
            d={trace.d}
            fill="none"
            stroke={COLORS.trace}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.6}
          />
          {trace.pads.map((pad, i) => (
            <circle key={i} cx={pad.x} cy={pad.y} r={pad.r} fill={COLORS.trace} opacity={0.7} />
          ))}
        </g>
      ))}

      {!prefersReducedMotion &&
        traces
          .filter((t) => t.pulse)
          .map((trace) => {
            const times = waypointTimes(trace.points);
            return (
              <motion.circle
                key={`dot-${trace.id}`}
                r={3.2}
                fill={COLORS.spark}
                filter="url(#pulse-glow)"
                initial={{ cx: trace.points[0][0], cy: trace.points[0][1], opacity: 0 }}
                animate={{
                  cx: trace.points.map((p) => p[0]),
                  cy: trace.points.map((p) => p[1]),
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: trace.duration,
                  delay: trace.delay,
                  repeat: Infinity,
                  repeatDelay: trace.repeatDelay,
                  ease: "linear",
                  times,
                }}
              />
            );
          })}
    </svg>
  );
}

function AuroraBlobs({ width, height }: { width: number; height: number }) {
  const prefersReducedMotion = useReducedMotion();
  const minDim = Math.min(width, height);

  const blobs = [
    {
      color: COLORS.violet,
      size: minDim * 0.85,
      base: { top: "-10%", left: "4%" },
      animate: prefersReducedMotion
        ? undefined
        : { x: [0, 50, -15, 0], y: [0, 35, 70, 0], scale: [1, 1.08, 0.96, 1] },
      duration: 34,
    },
    {
      color: COLORS.violet,
      size: minDim * 0.95,
      base: { bottom: "-16%", right: "0%" },
      animate: prefersReducedMotion
        ? undefined
        : { x: [0, -45, 25, 0], y: [0, -55, -15, 0], scale: [1, 0.94, 1.05, 1] },
      duration: 42,
    },
    {
      color: COLORS.blue,
      size: minDim * 0.55,
      base: { top: "28%", right: "15%" },
      animate: prefersReducedMotion ? undefined : { x: [0, 25, -25, 0], y: [0, -25, 15, 0] },
      duration: 26,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}4D 0%, ${blob.color}00 70%)`,
            filter: "blur(60px)",
            willChange: "transform",
            ...blob.base,
          }}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function AnimatedBackground({ children }: { children?: ReactNode }) {
  const { width, height, mounted } = useViewportSize();

  return (
    <>
      <div
        className="fixed inset-0 z-0 overflow-hidden"
        style={{ backgroundColor: COLORS.void }}
      >
        {/* base radial gradient — darker core, tuned toward violet */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 50% 0%, ${COLORS.deep} 0%, ${COLORS.void} 62%)`,
          }}
        />

        <AuroraBlobs width={width} height={height} />

        {/* fine blueprint grid, static */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${COLORS.trace} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.trace} 1px, transparent 1px)`,
            backgroundSize: `${GRID}px ${GRID}px`,
          }}
        />

        {mounted && <CircuitLayer width={width} height={height} />}

        {/* edge vignette so foreground content stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 100% at 50% 40%, transparent 35%, ${COLORS.void} 100%)`,
          }}
        />
      </div>

      {children && <div className="relative z-10">{children}</div>}
    </>
  );
}