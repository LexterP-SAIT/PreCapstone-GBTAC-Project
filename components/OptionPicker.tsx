import { GROUPS } from "@/data/options";
import GroupTabs from "@/components/GroupTabs";
import OptionCard from "@/components/OptionCard";
import SelectionSummary from "@/components/SelectionSummary";
import RunBar from "@/components/RunBar";


// This is just the static design of the option picker, I only did the look.

const OptionPicker = () => {
  const group = GROUPS[0];
  const ticked = group.pick;

  return (
    <main id="inputs" className="bg-white pt-14">
      <div className="max-w-6xl mx-auto px-4 pb-32">
        <p className="text-sm font-extrabold tracking-widest uppercase text-red-700">
          Step 1 of 2 · Design options
        </p>
        <h2 className="text-[clamp(28px,4.4vw,44px)] leading-tight font-extrabold text-slate-900 mt-1.5 mb-2.5 text-balance">
          What should we build?
        </h2>
       
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 mb-5">
          <label htmlFor="study" className="text-sm font-bold tracking-wide uppercase text-slate-500">
            Study name
          </label>
          <input
            id="study"
            readOnly
            value="Calgary insulation study"
            className="flex-1 min-w-64 max-w-md min-h-11 px-3.5 rounded-lg border-2 border-slate-900 bg-white font-semibold"
          />
        </div>

        <GroupTabs />

        <section className="bg-white rounded-2xl border-2 border-slate-900 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 mb-4">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-sm font-extrabold text-red-700">Part 1 Options:</span>
              <h3 className="text-xl font-extrabold text-slate-900">{group.title}</h3>
              <span className="text-sm text-slate-500">{group.q}</span>
            </div>
            <div className="flex items-baseline gap-3.5 text-sm font-bold">
              <span>
                {ticked.length} of {group.options.length} selected.
              </span>
              <span className="text-red-700 underline underline-offset-2">select all</span>
              <span className="text-red-700 underline underline-offset-2">clear</span>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
            {group.options.map((option, position) => (
              <OptionCard key={option.name} name={option.name} desc={option.desc} selected={ticked.includes(position)} />
            ))}
          </div>

          <div className="flex justify-between gap-2.5 mt-5">
            <div className="min-h-10 px-4 rounded-full border-2 border-slate-900 bg-white font-bold text-sm grid place-items-center">
              ← Back
            </div>
            <div className="min-h-10 px-4 rounded-full border-2 border-slate-900 bg-white font-bold text-sm grid place-items-center">
              Next →
            </div>
          </div>
        </section>

        <SelectionSummary />

        <RunBar />
      </div>
    </main>
  );
};

export default OptionPicker;
