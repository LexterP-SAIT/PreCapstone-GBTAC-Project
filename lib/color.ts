const toRgb = (color: string) => [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16));

// A colour part of the way from a to b (t from 0 to 1).
export const mixColor = (a: string, b: string, t: number): string => {
  const from = toRgb(a);
  const to = toRgb(b);
  return `rgb(${from.map((v, i) => Math.round(v + (to[i] - v) * t)).join(",")})`;
};

export const clamp = (value: number, low: number, high: number) => (value < low ? low : value > high ? high : value);
export const ease = (t: number) => t * t * (3 - 2 * t);
