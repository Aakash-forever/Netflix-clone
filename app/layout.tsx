import type { ReactNode } from "react";
import "./globals.css";
import AppLayout from "@/components/Layout/AppLayout";

export const metadata = {
  title: "Netflix Clone",
  description: "Just a simple clone",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
