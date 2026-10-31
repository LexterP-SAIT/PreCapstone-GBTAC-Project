// Seven houses. Each starts plain grey and becomes its own design as you scroll.
// heat: F = gas furnace, A = air-source heat pump, G = ground-source heat pump

export interface HouseDesign {
  x: number;
  body: string;
  roof: string;
  door: string;
  heat: "F" | "A" | "G";
  hrv: boolean;
  triple: boolean;
}

export interface Colours {
  body: string;
  roof: string;
  door: string;
}

export const PLAIN: Colours = { body: "#ECEEF2", roof: "#8E99A8", door: "#B5BDC9" };

export const STREET: HouseDesign[] = [
  { x: 140, body: "#F2D9C4", roof: "#3A4655", door: "#C8553D", heat: "F", hrv: false, triple: false },
  { x: 370, body: "#BFD6E2", roof: "#3A4655", door: "#2F6F7A", heat: "A", hrv: false, triple: true },
  { x: 600, body: "#F3E6C8", roof: "#33414F", door: "#2F6F7A", heat: "A", hrv: true, triple: false },
  { x: 830, body: "#E9A58F", roof: "#33414F", door: "#FFFFFF", heat: "F", hrv: true, triple: true },
  { x: 1060, body: "#CFE6D8", roof: "#2F5D50", door: "#D9731A", heat: "G", hrv: false, triple: false },
  { x: 1290, body: "#BFE3E0", roof: "#1C7C7D", door: "#FFD84D", heat: "G", hrv: true, triple: true },
  { x: 1520, body: "#E3D2EE", roof: "#3A4655", door: "#C8553D", heat: "F", hrv: false, triple: false },
];

export const FOCUS_HOUSE = 5; // the researchers walk toward this one
