import { Home, Search, Tv, Film, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside
      className="sticky top-0 h-screen w-[100px]
                 flex flex-col items-center gap-8 py-12
                 bg-neutral-950 border-r border-white/10"
    >
      <div className="mt-4 mb-6 text-3xl font-black text-red-600 drop-shadow-[0_4px_12px_rgba(255,0,0,0.35)]">
        N
      </div>
      <div className="flex flex-col items-center justify-center flex-1 gap-12">
        <Home className="text-gray-400 hover:text-white cursor-pointer" />
        <Search className="text-gray-400 hover:text-white cursor-pointer" />
        <Tv className="text-gray-400 hover:text-white cursor-pointer" />
        <Film className="text-gray-400 hover:text-white cursor-pointer" />
        <User className="text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </aside>
  );
}
