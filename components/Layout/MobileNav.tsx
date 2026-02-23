"use client";

import { Film, Home, Search, Tv, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", Icon: Home, label: "Home" },
  { href: "/search", Icon: Search, label: "Search" },
  { href: "/tv", Icon: Tv, label: "TV" },
  { href: "/movies", Icon: Film, label: "Movies" },
  { href: "/mylist", Icon: User, label: "My List" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center gap-2 border-b border-white/10 bg-black/85 px-3 py-3 backdrop-blur md:hidden">
      <Link
        href="/"
        className="flex shrink-0 items-center"
        aria-label="Netflix Home"
        title="Netflix"
      >
        <span className="text-xl font-black uppercase tracking-[0.18rem] text-red-600 drop-shadow-[0_4px_12px_rgba(255,0,0,0.35)] sm:text-2xl sm:tracking-[0.25rem]">
          Netflix
        </span>
      </Link>

      <nav className="ml-auto flex min-w-0 items-center gap-1 overflow-x-auto text-[10px] font-medium scrollbar-hide sm:gap-2 sm:text-[11px]">
        {links.map(({ href, Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className="flex flex-col items-center px-1.5 py-1"
            >
              <Icon
                className={`h-5 w-5 transition-colors ${
                  active ? "text-white" : "text-gray-400"
                }`}
              />
              <span
                className={`mt-0.5 ${
                  active ? "text-white" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
