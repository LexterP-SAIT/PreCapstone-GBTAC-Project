import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900">Building Simulation</h1>
        <Link
          href="/#inputs"
          className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200">← Change options</Link>
      </div>
    </header>
  );
};

export default Navbar;
