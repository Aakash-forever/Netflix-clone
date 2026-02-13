import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
