// The shapes of the answers that come back from the Java server (Server.java).

export interface ServerOption {
  key: string;
  label: string;
  source: string;
}

export interface ServerVariable {
  id: string;
  title: string;
  envelope: boolean;
  options: ServerOption[];
}

export interface ServerOptions {
  variables: ServerVariable[];
  limits: { maxSims: number; maxCombos: number };
  factors: { gridEf: number; gasEf: number };
}

// One design combination with its results
export interface ResultRow {
  [column: string]: string | number | boolean | undefined;
  hdi: number;
  eui: number;
  energyKwh: number;
  co2Kg: number;
  bestCarbon?: boolean;
  bestEnergy?: boolean;
  error?: string;
}

export interface Batch {
  batchId: string;
  status: string; // "RUNNING" or "DONE"
  name: string;
  done?: number;
  total?: number;
  params?: { combinations?: number; gridEf?: number; gasEf?: number };
  results: ResultRow[];
}
