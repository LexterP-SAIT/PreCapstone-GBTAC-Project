"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { PLAIN, Colours, HouseDesign } from "@/lib/street";
import { mixColor, clamp, ease } from "@/lib/color";

// One house drawn in SVG. In the street, the parent calls ref.setProgress(0..1) while scrolling:
// that changes the attributes directly, so React does not re-render on every scroll event.
export interface HouseHandle {
  setProgress: (p: number, start?: number) => void;
}

interface HouseProps {
  design: HouseDesign | Colours;
  x: number;
  y?: number;
  scale?: number;
  fixed?: boolean;
  hazy?: boolean;
}

const House = forwardRef<HouseHandle, HouseProps>(({ design, x, y = 752, scale = 0.92, fixed = false, hazy = false }, ref) => {
  const body = useRef<SVGRectElement>(null);
  const roof = useRef<SVGPolygonElement>(null);
  const chimney = useRef<SVGRectElement>(null);
  const door = useRef<SVGRectElement>(null);
  const gas = useRef<SVGGElement>(null);
  const unit = useRef<SVGGElement>(null);
  const loop = useRef<SVGGElement>(null);
  const vent = useRef<SVGGElement>(null);
  const triple = useRef<SVGGElement>(null);
  const c = fixed ? design : PLAIN; // starting colours
  const glass = hazy ? "#D5E1EF" : "#CFE9FB";

  useImperativeHandle(ref, () => ({
    setProgress(p, start = 0) {
      const d = design as HouseDesign;
      const t = ease(clamp((p - start) / 0.2, 0, 1));
      body.current?.setAttribute("fill", mixColor(PLAIN.body, d.body, t));
      roof.current?.setAttribute("fill", mixColor(PLAIN.roof, d.roof, t));
      chimney.current?.setAttribute("fill", mixColor(PLAIN.roof, d.roof, t));
      door.current?.setAttribute("fill", mixColor(PLAIN.door, d.door, t));
      gas.current?.setAttribute("opacity", String(d.heat === "F" ? t : 0));
      unit.current?.setAttribute("opacity", String(d.heat === "A" ? t : 0));
      loop.current?.setAttribute("opacity", String(d.heat === "G" ? t : 0));
      vent.current?.setAttribute("opacity", String(d.hrv ? t : 0));
      triple.current?.setAttribute("opacity", String(d.triple ? t : 0));
    },
  }));

  const line = "#3A4655";
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <g ref={loop} opacity="0">
        <rect x="-96" y="8" width="192" height="42" rx="8" fill="#6E4F34" opacity=".35" />
        <path d="M-76 16H76V28H-76V40H76M0 0V16" fill="none" stroke="#F2B632" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <ellipse cx="0" cy="3" rx="112" ry="8" fill="#2F6B2A" opacity=".2" />
      <rect ref={chimney} x="44" y="-150" width="16" height="44" fill={c.roof} />
      <rect ref={body} x="-80" y="-95" width="160" height="95" fill={c.body} />
      <polygon ref={roof} points="-102,-84 0,-158 102,-84" fill={c.roof} />
      <circle cx="0" cy="-112" r="9" fill={hazy ? glass : "#FFE7A3"} stroke={fixed ? c.roof : line} strokeWidth="2.5" />
      <rect ref={door} x="-12" y="-47" width="24" height="47" rx="3" fill={c.door} />
      <circle cx="6" cy="-23" r="2" fill="#fff" />
      {[-66, 32].map((wx) => (
        <g key={wx}>
          <rect x={wx} y="-74" width="34" height="30" rx="2" fill={glass} stroke={fixed ? c.roof : line} strokeWidth="2.5" />
          <path d={`M${wx + 17} -74v30M${wx} -59h34`} stroke={fixed ? c.roof : line} strokeWidth="2" />
        </g>
      ))}
      <g ref={triple} opacity="0" stroke={line} strokeWidth="2" fill="none">
        <rect x="-62" y="-70" width="26" height="22" /><rect x="36" y="-70" width="26" height="22" />
      </g>
      <g ref={gas} opacity="0">
        <rect x="96" y="-34" width="18" height="28" rx="3" fill="#C9CED6" stroke={line} strokeWidth="2.5" />
        <circle cx="105" cy="-24" r="5" fill="#fff" stroke={line} strokeWidth="1.5" />
      </g>
      <g ref={unit} opacity="0">
        <rect x="98" y="-36" width="34" height="36" rx="4" fill="#E9EEF5" stroke={line} strokeWidth="2.5" />
        <circle cx="115" cy="-18" r="11" fill="none" stroke={line} strokeWidth="2" />
        <g className="fan"><path d="M115 -18v-9M115 -18l8 5M115 -18l-8 5" stroke={line} strokeWidth="2.5" strokeLinecap="round" /></g>
      </g>
      <g ref={vent} opacity="0">
        <rect x="-70" y="-146" width="22" height="26" rx="3" fill="#8FA3B8" stroke={line} strokeWidth="2" />
        <path d="M-62 -134l4 -6 4 6M-62 -128l4 6 4 -6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
});

House.displayName = "House";

export default House;
