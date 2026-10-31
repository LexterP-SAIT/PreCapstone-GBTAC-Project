//bar at the bottom

import Link from "next/link";

const RunBar = () => {
  return (
    <div className="sticky bottom-0 z-10 mt-9">
      <div
        className="flex flex-wrap items-center gap-x-7 gap-y-2.5 bg-white border-2 border-slate-900
          rounded-2xl px-5 py-3.5 shadow-[0_4px_0] shadow-slate-900"
      >
        <div>
          <div className="text-4xl font-extrabold leading-none">128</div>
          <div className="text-sm font-semibold text-slate-500">combinations</div>
        </div>
        <div>
          <div className="text-4xl font-extrabold leading-none">8</div>
          <div className="text-sm font-semibold text-slate-500">EnergyPlus runs</div>
        </div>
        <Link href="/results" className="ml-auto min-h-12 px-6 rounded-xl bg-red-700 text-white font-extrabold text-base 
                    grid place-items-center cursor-pointer hover:bg-red-800 transition-colors">
          Run simulations
        </Link>
      </div>
    </div>
  );
};

export default RunBar;
