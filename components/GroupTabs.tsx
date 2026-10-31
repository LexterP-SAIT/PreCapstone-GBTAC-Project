import { GROUPS } from "@/data/options";

// this is the row of 9 options at the top, still static. Ceiling is highlighted

const GroupTabs = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {GROUPS.map((group, index) => (
        <div
          key={group.key}
          className={`flex items-center gap-2 min-h-10 pl-1.5 pr-3 py-1.5 rounded-full
            border-2 border-slate-900 text-sm font-bold shadow-[0_3px_0] shadow-slate-900
            ${index === 0 ? "bg-rose-100" : "bg-white"}`}
        >
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white grid place-items-center text-sm">
            {index + 1}
          </span>
          {group.tab}
        </div>
      ))}
    </div>
  );
};

export default GroupTabs;
