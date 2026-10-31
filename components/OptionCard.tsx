interface OptionCardProps {
  name: string;
  desc: string;
  selected: boolean;
}
// the option card is static for now, pre selected options

const OptionCard = ({ name, desc, selected }: OptionCardProps) => {
  return (
    <div
      className={`flex items-start gap-3 p-4 min-h-18 rounded-xl border-2 border-slate-900 ${
        selected ? "bg-rose-100" : "bg-white"
      }`}
    >
      <span
        className={`w-5 h-5 shrink-0 mt-0.5 rounded-md border-2 border-slate-900
          grid place-items-center text-sm font-extrabold text-white ${
            selected ? "bg-slate-900" : "bg-transparent"
          }`}
      >
        {selected ? "✓" : ""}
      </span>
      <span>
        <b className="block text-base leading-tight text-slate-900">{name}</b>
        <small className="block text-sm text-slate-600 mt-0.5">{desc}</small>
      </span>
    </div>
  );
};

export default OptionCard;
