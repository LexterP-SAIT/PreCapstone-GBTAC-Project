// The 9 design parts. They must stay in the same order as options/design_options.csv on the Java server.
// env: true = this part changes the building, so each choice needs its own EnergyPlus run.
// pick: the positions (0, 1, 2 ...) that start ticked.

export interface DesignOption {
  name: string;
  short: string;
  desc: string;
}

export interface DesignGroup {
  key: string;
  tab: string;
  title: string;
  q: string;
  env: boolean;
  pick: number[];
  options: DesignOption[];
}

// For each group, the positions of the ticked options. Arrays, not Sets: we copy them with the spread operator.
export type Selections = Record<string, number[]>;

export const GROUPS: DesignGroup[] = [
  { key: "ceiling", tab: "Ceiling", title: "Ceiling insulation", q: "How well insulated is the roof space?", env: true, pick: [0, 2],
    options: [
      { name: "R-40", short: "R-40", desc: "Effective ceiling R-value 40" },
      { name: "R-50", short: "R-50", desc: "Effective ceiling R-value 50" },
      { name: "R-60", short: "R-60", desc: "Effective ceiling R-value 60" } ] },
  { key: "shgc", tab: "Solar gain", title: "Window solar heat gain", q: "How much sun comes through the glass?", env: true, pick: [0],
    options: [
      { name: "0.251", short: "0.251", desc: "SHGC 0.251. Lets in the least sun of the three." },
      { name: "0.483", short: "0.483", desc: "SHGC 0.483" },
      { name: "0.492", short: "0.492", desc: "SHGC 0.492. Lets in the most sun of the three." } ] },
  { key: "u", tab: "U-value", title: "Window U-value", q: "How well do the windows hold heat in?", env: true, pick: [0, 2],
    options: [
      { name: "1.08", short: "1.08", desc: "U-value 1.08. Best insulating of the three." },
      { name: "1.65", short: "1.65", desc: "U-value 1.65" },
      { name: "1.82", short: "1.82", desc: "U-value 1.82. Least insulating of the three." } ] },
  { key: "dwhr", tab: "DWHR", title: "Drain water heat recovery", q: "Is heat taken back from water going down the drain?", env: false, pick: [0, 2],
    options: [
      { name: "None", short: "None", desc: "No drain water heat recovery" },
      { name: "30%", short: "30%", desc: "Recovers heat at 30% efficiency" },
      { name: "55%", short: "55%", desc: "Recovers heat at 55% efficiency" } ] },
  { key: "heat", tab: "Heating", title: "Heating and cooling", q: "What heats the house?", env: false, pick: [0, 1],
    options: [
      { name: "Ground-source heat pump", short: "GSHP", desc: "Electricity · ground-source heat pump · rated efficiency 4.7" },
      { name: "Condensing gas furnace", short: "Gas furnace", desc: "Natural gas · efficiency 92%" },
      { name: "Air-source heat pump", short: "ASHP", desc: "Electricity · air-source heat pump · rated efficiency 3.66" } ] },
  { key: "vent", tab: "Ventilation", title: "Ventilation", q: "How does fresh air get in?", env: false, pick: [0, 2],
    options: [
      { name: "No ventilation system", short: "None", desc: "No mechanical ventilation" },
      { name: "Vent fans", short: "Vent fans", desc: "Fresh air with no heat recovery" },
      { name: "HRV", short: "HRV", desc: "Heat recovery ventilator, 70% recovery" } ] },
  { key: "air", tab: "Airtight", title: "Airtightness", q: "How leaky is the building shell?", env: true, pick: [0],
    options: ["0.6", "1.0", "1.5", "2.5", "3.5"].map((v, i) => ({ name: v, short: v,
      desc: `${v} air changes per hour at 50 Pa` + (i === 0 ? ". Tightest." : i === 4 ? ". Leakiest." : "") })) },
  { key: "wall", tab: "Walls", title: "Wall insulation", q: "How well insulated are the above-ground walls?", env: true, pick: [0, 4],
    options: ["R-20", "R-25", "R-30", "R-33", "R-40"].map((v) => ({ name: v, short: v, desc: `Effective wall R-value ${v.slice(2)}` })) },
  { key: "dhw", tab: "Hot Water", title: "Hot water system", q: "How is the household water heated?", env: false, pick: [0, 2],
    options: [
      { name: "Natural gas conventional tank", short: "Gas tank", desc: "Natural gas · conventional tank" },
      { name: "Gas instantaneous", short: "Gas inst.", desc: "Natural gas · efficiency 95%" },
      { name: "Electric heat pump", short: "Heat pump", desc: "Electricity · efficiency 2.30" },
      { name: "Electric tankless", short: "Tankless", desc: "Electricity · efficiency 94%" } ] },
];


export const MAX_COMBINATIONS = 5000;
export const MAX_RUNS = 48;
