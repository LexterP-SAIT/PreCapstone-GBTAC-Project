import { GROUPS } from "@/data/options";

// The "Your selections so far" cards. Display only: shows the starting choices.
const SelectionSummary = () => {
  return (
    <>
      <h3 className="mt-9 mb-3 text-sm font-extrabold tracking-widest uppercase text-slate-500">
        Your selections so far
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {GROUPS.map((group, index) => (
          <li
            key={group.key}
            className={`flex flex-col items-start gap-2.5 p-4 min-h-28 rounded-2xl
              border-2 border-slate-900 shadow-[0_3px_0] shadow-slate-900
              ${index === 0 ? "bg-rose-100" : "bg-white"}`}
          >
            <span className="flex items-center gap-2.5 w-full">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white grid place-items-center text-sm font-extrabold shrink-0">
                {index + 1}
              </span>
              <span className="font-extrabold text-base text-slate-900">{group.tab}</span>
            </span>
            <span className="flex flex-wrap gap-1.5">
              {group.pick.map((position) => (
                <span
                  key={group.options[position].name}
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900"
                >
                  {group.options[position].short}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SelectionSummary;
