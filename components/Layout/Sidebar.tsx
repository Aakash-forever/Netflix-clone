"use client";

import { Home, Search, Tv, Film, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside
      className="sticky top-0 h-screen w-[100px]
                 flex flex-col items-center gap-8 py-12
                 bg-neutral-950 border-r border-white/10"
    >
      <div className="mt-4 mb-6 text-3xl font-black text-red-600 drop-shadow-[0_4px_12px_rgba(255,0,0,0.35)]">
        N
      </div>

      <div className="flex flex-col items-center justify-center flex-1 gap-12 w-full">
        {[
          { href: "/", Icon: Home },
          { href: "/search", Icon: Search },
          { href: "/tv", Icon: Tv },
          { href: "/movies", Icon: Film },
          { href: "/mylist", Icon: User },
        ].map(({ href, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="group relative flex items-center justify-center w-full px-4 pb-4"
            >
              <span
                className={`absolute bottom-0 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-red-600 transition-opacity ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
              <Icon
                className={`cursor-pointer transition-colors ${
                  active ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
