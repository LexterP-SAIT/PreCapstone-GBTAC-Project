import { GROUPS, MAX_COMBINATIONS, MAX_RUNS, Selections } from "@/data/options";

export interface Totals {
  combinations: number;
  runs: number;
  problem: string | null;
}

// How many combinations and EnergyPlus runs the current selections give.
export const totals = (selections: Selections): Totals => {
  let combinations = 1;
  let runs = 1;
  const empty: string[] = [];

  GROUPS.forEach((group) => {
    const count = selections[group.key].length;
    if (count === 0) empty.push(group.tab);
    combinations = combinations * count;
    if (group.env) runs = runs * count; // only changes to the building need EnergyPlus
  });

  let problem: string | null = null;
  if (empty.length > 0) {
    problem = `Pick at least one option in: ${empty.join(", ")}.`;
  } else if (combinations > MAX_COMBINATIONS) {
    problem = `Over the limit of ${MAX_COMBINATIONS.toLocaleString("en-US")} combinations. Remove some options.`;
  } else if (runs > MAX_RUNS) {
    problem = `Over the limit of ${MAX_RUNS} EnergyPlus runs. Remove some ceiling, window, airtightness or wall options.`;
  }

  return { combinations, runs: empty.length > 0 ? 0 : runs, problem };
};

export const defaultSelections = (): Selections => {
  const selections: Selections = {};
  GROUPS.forEach((group) => {
    selections[group.key] = [...group.pick];
  });
  return selections;
};
