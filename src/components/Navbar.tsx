export default function Navbar() {
  return (
    <nav className="bg-blueprint py-5">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="font-serif font-semibold text-xl text-paper flex items-center gap-2.5">
          <span className="w-7 h-7 border border-brass flex items-center justify-center font-mono text-xs text-brass">
            BE
          </span>
          Beig Estates
        </div>
        <div className="hidden sm:flex gap-7 text-[13px] font-mono tracking-wide">
          <a href="#how-it-works" className="text-paper/75 hover:text-brass-bright">How It Works</a>
          <a href="#listings" className="text-paper/75 hover:text-brass-bright">Listings</a>
          <a href="#trust" className="text-paper/75 hover:text-brass-bright">Verification</a>
          <a href="#contact" className="text-paper/75 hover:text-brass-bright">Contact</a>
        </div>
      </div>
    </nav>
  );
}
