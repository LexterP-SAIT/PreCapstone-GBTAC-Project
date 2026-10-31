"use client";
import { useState } from "react";
import Navbar from "@/components/NavBar";

interface CombinationData {
  id: number;
  co2: number;
  values: { [key: string]: string | number };
  isLowest?: boolean;
}

const parameters = [
  { key: "ceiling", label: "Ceiling", options: ["R-40", "R-60"] },
  { key: "shgc", label: "SHGC", options: ["0.251", "0.483", "0.492"] },
  { key: "uValue", label: "U_Value", options: ["1.08", "1.82"] },
  { key: "airTight", label: "Airtight", options: ["0.6", "3.5"] },
  { key: "walls", label: "Walls", options: ["R-20", "R-40"] },
  { key: "dwhr", label: "DWHR", options: ["None", "55%"] },
  { key: "heating", label: "Heating", options: ["ASHP", "GSHP"] },
  { key: "vent", label: "Vent", options: ["None", "HRV"] },
  { key: "hotWater", label: "Hot Water", options: ["Gas tank", "Gas insta.", "Heat pump", "Tankless"] },
  { key: "energyKWh", label: "Energy kWH", options: ["4,562", "4,568", "6,317", "6,617", "37,284"] },
  { key: "hdi", label: "HDI", options: ["72", "74.8", "75.3", "77.9", "142"] },
  { key: "co2", label: "CO2", options: ["1998", "2008", "2055", "2068", "2108", "7865"] },
];

const mockCombinationData: CombinationData[] = [
  { 
    id: 1, 
    co2: 1998, 
    values: { ceiling: "R-60", shgc: "0.492", uValue: "1.08", airTight: "0.6", walls: "R-40", dwhr: "55%", heating: "GSHP", vent: "None", hotWater: "Heat pump", energyKWh: "4,562", hdi: "77.3" }, 
    isLowest: true 
  },
  { 
    id: 2, 
    co2: 2008, 
    values: { ceiling: "R-60", shgc: "0.251", uValue: "1.08", airTight: "0.6", walls: "R-40", dwhr: "55%", heating: "GSHP", vent: "None", hotWater: "Heat pump", energyKWh: "4,568", hdi: "74.8" } 
  },
  { 
    id: 3, 
    co2: 2108, 
    values: { ceiling: "R-60", shgc: "0.483", uValue: "1.08", airTight: "0.6", walls: "R-40", dwhr: "55%", heating: "GSHP", vent: "None", hotWater: "Gas insta.", energyKWh: "6,617", hdi: "75.3" } 
  },
  { 
    id: 4, 
    co2: 2068, 
    values: { ceiling: "R-40", shgc: "0.251", uValue: "1.08", airTight: "0.6", walls: "R-40", dwhr: "55%", heating: "GSHP", vent: "None", hotWater: "Gas insta.", energyKWh: "6,317", hdi: "77.9" } 
  },
  { 
    id: 5, 
    co2: 2055, 
    values: { ceiling: "R-40", shgc: "0.492", uValue: "1.08", airTight: "0.6", walls: "R-40", dwhr: "55%", heating: "GSHP", vent: "None", hotWater: "Heat pump", energyKWh: "4,617", hdi: "79.4" } 
  }
];


const CHART_WIDTH = 1200;
const CHART_HEIGHT = 280;
const PADDING_X = 60;
const USABLE_WIDTH = CHART_WIDTH - PADDING_X * 2;
const TOP_Y = 35;
const BOTTOM_Y = 245;
const USABLE_HEIGHT = BOTTOM_Y - TOP_Y;

const getAxisX = (index: number) => {
  return PADDING_X + index * (USABLE_WIDTH / (parameters.length - 1));
};

const getOptionY = (axisKey: string, val: string | number) => {
  const axis = parameters.find(a => a.key === axisKey);
  if (!axis) return CHART_HEIGHT / 2;
  const stringVal = String(val);
  const index = axis.options.indexOf(stringVal);
  if (index === -1) return CHART_HEIGHT / 2;
  if (axis.options.length === 1) return CHART_HEIGHT / 2;
  return TOP_Y + (index / (axis.options.length - 1)) * USABLE_HEIGHT;
};

export default function ResultsPage() {
  const [selectedId, setSelectedId] = useState<number>(1);

  const handleExportCSV = () => {
    const headers = parameters.map(a => a.label).join(",");
    const rows = mockCombinationData.map(r => 
      parameters.map(a => `"${a.key === "co2" ? r.co2 : r.values[a.key]}"`).join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "simulation_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 pb-16">
      <Navbar />

      <main className="mx-auto px-4 pt-6 space-y-6" style={{ maxWidth: '1340px' }}>
        <h1 className="text-3xl font-bold tracking-wider text-[#4A463C]">Results</h1>

        <div className="relative w-full bg-[#1C7C7D] border-2 border-[#2B2A33] rounded-[21px] p-6 text-white shadow-[0px_6px_4px_rgba(0,0,0,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold tracking-wider uppercase text-teal-100">
              LOWEST EMISSION OF ALL XXX
            </div>
            <div className="text-3xl font-extrabold">
              1,998 <span className="text-lg font-normal">CO2 per year</span>
            </div>
            <div className="text-sm text-teal-100 font-medium">4562 kWh blah blah</div>
          </div>
          <div className="max-w-2xl text-xs leading-relaxed text-teal-50">
            Ground source heat pump, no ventilation system, 55% drain water heat recovery, heat pump water heater, r-60 ceiling, R-40 walls, ACH50 0.6 blah blah, blah blah
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 text-xs font-bold tracking-wider text-white bg-[#C8553D] border-2 border-black rounded-md hover:bg-[#b04833] transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => setSelectedId(1)}
            className="px-4 py-2 text-xs font-bold tracking-wider text-[#4A463C] bg-white border-2 border-black rounded-md hover:bg-slate-100 transition-colors"
          >
            Clear all selections
          </button>
        </div>

        <div className="relative w-full bg-white border-2 border-[#2B2A33] rounded-[21px] shadow-[0px_6px_4px_rgba(0,0,0,0.25)] p-6 overflow-x-auto">
          <div className="grid grid-cols-12 text-center text-xs font-bold text-black border-b border-slate-200 pb-3 mb-2" style={{ minWidth: '950px' }}>
            {parameters.map((axis, idx) => (
              <div key={idx}>{axis.label}</div>
            ))}
          </div>


          <div className="relative" style={{ minWidth: '950px', height: `${CHART_HEIGHT}px` }}>
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              {parameters.map((_, i) => {
                const x = getAxisX(i);
                return (
                  <line 
                    key={i} 
                    x1={x} 
                    y1={TOP_Y} 
                    x2={x} 
                    y2={BOTTOM_Y} 
                    stroke="#000000" 
                    strokeWidth="1.5" 
                    strokeDasharray="3 3" 
                    opacity="0.4"
                  />
                );
              })}

              {mockCombinationData.filter(c => c.id !== selectedId).map((combo) => {
                const points = parameters.map((axis, i) => {
                  const x = getAxisX(i);
                  const val = axis.key === "co2" ? combo.co2 : combo.values[axis.key];
                  const y = getOptionY(axis.key, val ?? "");
                  return `${x},${y}`;
                }).join(" ");

                return (
                  <polyline
                    key={combo.id}
                    fill="none"
                    stroke="#2B2A33"
                    strokeWidth="1.5"
                    opacity="0.3"
                    points={points}
                  />
                );
              })}

              {(() => {
                const selectedCombo = mockCombinationData.find(c => c.id === selectedId) || mockCombinationData[0];
                const points = parameters.map((axis, i) => {
                  const x = getAxisX(i);
                  const val = axis.key === "co2" ? selectedCombo.co2 : selectedCombo.values[axis.key];
                  const y = getOptionY(axis.key, val ?? "");
                  return `${x},${y}`;
                }).join(" ");

                return (
                  <polyline
                    fill="none"
                    stroke="#C8553D"
                    strokeWidth="3"
                    points={points}
                  />
                );
              })()}
            </svg>

            <div className="absolute inset-0 pointer-events-none">
              {parameters.map((axis, i) => {
                const x = getAxisX(i);
                const activeCombo = mockCombinationData.find(c => c.id === selectedId) || mockCombinationData[0];
                const activeVal = String(axis.key === "co2" ? activeCombo.co2 : activeCombo.values[axis.key]);

                return (
                  <div 
                    key={axis.key} 
                    className="absolute top-0 bottom-0 flex flex-col justify-between items-center -translate-x-1/2"
                    style={{ left: `${(x / CHART_WIDTH) * 100}%`, paddingTop: `${TOP_Y - 12}px`, paddingBottom: `${CHART_HEIGHT - BOTTOM_Y - 12}px` }}
                  >
                    {axis.options.map((opt) => {
                      const isHighlighted = opt === activeVal;
                      return (
                        <span
                          key={opt}
                          className={`px-2 py-0.5 rounded-full text-[11px] border border-[#2B2A33] shadow-xs whitespace-nowrap transition-all ${
                            isHighlighted
                              ? "bg-[#C8553D]/80 font-bold text-black scale-105 z-10"
                              : "bg-white text-black"
                          }`}
                        >
                          {opt}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-black rounded-[21px] p-6 shadow-sm overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-[#6A6355] tracking-wider uppercase">
              Combinations <span className="text-xs text-slate-400 font-normal">({mockCombinationData.length} of {mockCombinationData.length})</span>
            </h2>
          </div>

          <table className="w-full text-left text-xs text-[#4A463C] border-collapse" style={{ minWidth: '950px' }}>
            <thead>
              <tr className="border-b border-slate-200 font-bold text-slate-700">
                {parameters.map((axis) => (
                  <th key={axis.key} className="py-2 px-2">{axis.label}</th>
                ))}
                <th className="py-2 px-2 text-right">Tag</th>
              </tr>
            </thead>
            <tbody>
              {mockCombinationData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedId(row.id)}
                  className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                    row.id === selectedId ? "bg-[#C8553D]/20 font-semibold" : ""
                  }`}
                >
                  {parameters.map((axis) => (
                    <td key={axis.key} className="py-2.5 px-2">
                      {axis.key === "co2" ? row.co2 : row.values[axis.key]}
                    </td>
                  ))}
                  <td className="py-2.5 px-2 text-right">
                    {row.isLowest && (
                      <span className="px-3 py-1 text-[10px] uppercase font-bold text-white bg-[#C8553D] rounded-full">
                        LOWEST
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}