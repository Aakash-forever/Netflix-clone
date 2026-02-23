import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-black text-white">
      <MobileNav />
      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto px-4 pb-10 pt-[72px] sm:px-6 md:px-0 md:pt-0">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
