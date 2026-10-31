"use client";
import { useEffect, useRef } from "react";
import House, { HouseHandle } from "@/components/House";
import Person from "@/components/Person";
import { STREET, FOCUS_HOUSE } from "@/lib/street";
import { clamp, ease } from "@/lib/color";

// Colours of the hazy houses far behind the street.
const FAR = [
  ["#EFE6D6", "#B9A99A", "#CDBFB0"],
  ["#E4EBDD", "#9FB09A", "#B6C4B0"],
  ["#E9E1EE", "#ADA3BC", "#C0B8CC"],
];

const LandingScreen = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const titleBox = useRef<HTMLDivElement>(null);
  const heroCol = useRef<HTMLDivElement>(null);
  const startBtn = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const farG = useRef<SVGGElement>(null);
  const midG = useRef<SVGGElement>(null);
  const people = useRef<SVGGElement>(null);
  const personA = useRef<SVGGElement>(null);
  const personB = useRef<SVGGElement>(null);
  const houses = useRef<(HouseHandle | null)[]>([]);

  // Scrolling moves the researchers along the street. The scene is changed directly (not with state),
  // because React would otherwise redraw the whole street on every scroll event.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let target = 0;
    let frame = 0;
    let finished = false; // set when the page is left, so no late frame touches removed elements

    const paint = (p: number, moving: boolean) => {
      if (!personA.current || !personB.current || !people.current || !farG.current || !midG.current) return;
      if (!titleBox.current || !heroCol.current || !startBtn.current || !hint.current) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const scale = Math.max(w / 1600, h / 900); // the 1600x900 scene is cropped like background-size: cover
      const visibleW = w / scale;
      const left = 800 - visibleW / 2;
      const focusX = STREET[FOCUS_HOUSE].x;
      const pan = Math.max(0, focusX - (left + visibleW * 0.52)); // slide the street so the focus house ends up on screen
      const startA = left + visibleW * 0.26;
      const endA = focusX - pan + 200;
      const ax = startA + (endA - startA) * p;
      const bx = ax - 96 - 8 * Math.sin(p * 18);
      const bob = moving ? Math.sin(p * 160) * 2.2 : 0;

      personA.current.setAttribute("transform", `translate(${ax},${868 + bob}) scale(1.9)`);
      personB.current.setAttribute("transform", `translate(${bx},${878 - bob}) scale(1.75)`);
      people.current.setAttribute("class", moving ? "walking" : "");
      houses.current.forEach((house, i) => house?.setProgress(p, 0.06 + i * 0.085));
      farG.current.setAttribute("transform", `translate(${-pan * p * 0.45},0)`);
      midG.current.setAttribute("transform", `translate(${-pan * p},0)`);

      const fade = 1 - ease(clamp((p - 0.5) / 0.3, 0, 1));
      titleBox.current.style.opacity = String(0.3 + 0.7 * fade);
      heroCol.current.style.transform = `translateY(${-p * 28}px)`;
      startBtn.current.style.opacity = String(fade);
      startBtn.current.style.pointerEvents = fade < 0.2 ? "none" : "auto";
      hint.current.style.opacity = String(1 - clamp(p * 5, 0, 1));
    };

    const tick = () => {
      frame = 0;
      if (finished) return;
      current += (target - current) * (reduce ? 1 : 0.14);
      const moving = Math.abs(target - current) > 0.0007;
      if (!moving) current = target;
      paint(current, moving);
      if (moving) frame = requestAnimationFrame(tick);
    };

    const measure = () => {
      if (finished || !wrap.current) return;
      const box = wrap.current.getBoundingClientRect();
      target = clamp(-box.top / Math.max(1, wrap.current.offsetHeight - window.innerHeight), 0, 1);
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    paint(0, false);

    return () => {
      finished = true;
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div id="top" ref={wrap} className="relative h-[320vh] bg-green-200">
      <div
        className="sticky top-0 h-svh overflow-hidden
          bg-linear-to-b from-sky-400 via-sky-200 to-green-200"
      >
        <nav
          aria-label="Page"
          className="absolute z-20 top-0 inset-x-0 flex justify-center items-center
            gap-4 sm:gap-8 lg:gap-16 px-4 pt-3.5"
        >
          <a href="#top" className="text-slate-800 font-semibold text-base py-2 px-1 hover:underline underline-offset-4">
            Welcome
          </a>
          <span
            aria-hidden="true"
            className="w-14 h-14 rounded-full bg-slate-800 text-white text-2xl grid place-items-center shrink-0"
          >
            ⌂
          </span>
          <a href="#inputs" className="text-slate-800 font-semibold text-base py-2 px-1 hover:underline underline-offset-4">
            Choose options
          </a>
        </nav>

        {/* back layer: sky art, hills and far houses */}
        <svg className="absolute inset-0 w-full h-full block" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="1290" cy="150" r="96" fill="#FFF3B0" opacity=".35" />
          <circle cx="1290" cy="150" r="58" fill="#FFE46B" />
          <g fill="#fff" opacity=".92">
            <ellipse cx="260" cy="150" rx="120" ry="24" />
            <ellipse cx="330" cy="128" rx="74" ry="26" />
            <ellipse cx="860" cy="100" rx="130" ry="22" />
            <ellipse cx="930" cy="80" rx="76" ry="24" />
          </g>
          <ellipse cx="260" cy="670" rx="760" ry="70" fill="#9ED38A" />
          <ellipse cx="1260" cy="676" rx="700" ry="64" fill="#8BC77A" />
          <rect x="-400" y="660" width="2400" height="300" fill="#A4D77F" />
          <g ref={farG}>
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
              const c = FAR[(i + 3) % 3];
              return (
                <House
                  key={i}
                  fixed
                  hazy
                  design={{ body: c[0], roof: c[1], door: c[2] }}
                  x={i * 210 + 20}
                  y={662}
                  scale={0.92 - ((i + 3) % 3) * 0.08}
                />
              );
            })}
          </g>
        </svg>

        <div ref={heroCol} className="absolute z-10 inset-x-0 top-1/4 text-center px-4 will-change-transform">
          <div ref={titleBox}>
            <h1
              className="font-display font-normal uppercase text-slate-800
                leading-none text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-balance">Eco Structure</h1>
          </div>
          <div ref={startBtn} className="mt-4 sm:mt-6">
            <a
              href="#inputs"
              className="inline-block border-2 border-slate-800 bg-white/35 text-slate-800
                font-display text-2xl tracking-wide px-8 pt-1.5 pb-1
                hover:bg-slate-800 hover:text-white"
            >
              START
            </a>
          </div>
        </div>

        {/* front layer: lawn, the street, the researchers */}
        <svg className="absolute inset-0 w-full h-full block" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8FCB63" />
              <stop offset="1" stopColor="#6FB247" />
            </linearGradient>
          </defs>
          <rect x="-400" y="712" width="2400" height="300" fill="url(#lawn)" />
          <rect x="-400" y="792" width="2400" height="46" fill="#E5DFD2" />
          <g ref={midG}>
            {STREET.map((design, i) => (
              <House key={i} ref={(handle) => { houses.current[i] = handle; }} design={design} x={design.x} />
            ))}
          </g>
          <g ref={people}>
            <g ref={personA}>
              <Person coat="#F2778C" arm="#F2C9A5" pants="#3F6FA8" cap="#FFFFFF" capBrim="#E5E9EE" />
            </g>
            <g ref={personB}>
              <Person coat="#4C9A7B" arm="#F2C9A5" pants="#8A7A5E" hardHat carry="plans" />
            </g>
          </g>
        </svg>

        <div
          ref={hint}
          className="absolute z-20 left-1/2 bottom-5 -translate-x-1/2 bg-white/85 text-slate-800
            font-bold text-sm px-4 py-2 rounded-full whitespace-nowrap"
        >
          Scroll to design the street ↓
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
