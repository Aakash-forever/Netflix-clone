"use client";

import { Home, Search, Tv, Film, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkBase =
    "group relative flex items-center justify-center w-full px-4 pb-4";
  const barBase =
    "absolute bottom-0 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-red-600 transition-opacity";

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
        <Link href="/" className={linkBase}>
          <span
            className={`${barBase} ${
              isActive("/") ? "opacity-100" : "opacity-0"
            }`}
          />
          <Home
            className={`cursor-pointer transition-colors ${
              isActive("/")
                ? "text-white"
                : "text-gray-400 group-hover:text-white"
            }`}
          />
        </Link>
        <Link href="/search" className={linkBase}>
          <span
            className={`${barBase} ${
              isActive("/search") ? "opacity-100" : "opacity-0"
            }`}
          />
          <Search
            className={`cursor-pointer transition-colors ${
              isActive("/search")
                ? "text-white"
                : "text-gray-400 group-hover:text-white"
            }`}
          />
        </Link>
        <Link href="/tv" className={linkBase}>
          <span
            className={`${barBase} ${
              isActive("/tv") ? "opacity-100" : "opacity-0"
            }`}
          />
          <Tv
            className={`cursor-pointer transition-colors ${
              isActive("/tv")
                ? "text-white"
                : "text-gray-400 group-hover:text-white"
            }`}
          />
        </Link>
        <Link href="/movies" className={linkBase}>
          <span
            className={`${barBase} ${
              isActive("/movies") ? "opacity-100" : "opacity-0"
            }`}
          />
          <Film
            className={`cursor-pointer transition-colors ${
              isActive("/movies")
                ? "text-white"
                : "text-gray-400 group-hover:text-white"
            }`}
          />
        </Link>
        <Link href="/mylist" className={linkBase}>
          <span
            className={`${barBase} ${
              isActive("/mylist") ? "opacity-100" : "opacity-0"
            }`}
          />
          <User
            className={`cursor-pointer transition-colors ${
              isActive("/mylist")
                ? "text-white"
                : "text-gray-400 group-hover:text-white"
            }`}
          />
        </Link>
      </div>
    </aside>
  );
}
