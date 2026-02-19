"use client";

import type { ReactNode } from "react";

type HeadingProps = {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  addon?: ReactNode;
};

const base = {
  1: "text-4xl md:text-5xl font-black tracking-tight",
  2: "text-3xl md:text-4xl font-bold",
  3: "text-xl md:text-2xl font-semibold",
};

export default function Heading({
  level = 2,
  children,
  className = "",
  addon,
}: HeadingProps) {
  const Tag = (`h${level}` as keyof JSX.IntrinsicElements);
  const wrapperGap = level === 3 ? "gap-2" : "gap-3";

  return (
    <div className={`flex items-baseline ${wrapperGap}`}>
      <Tag className={`${base[level]} text-white ${className}`}>{children}</Tag>
      {addon ? <span className="text-sm text-gray-400">{addon}</span> : null}
    </div>
  );
}
