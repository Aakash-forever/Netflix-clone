"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Movie } from "@/lib/tmdb";

const KEY = "my-list";

const read = (): Movie[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved) as Movie[];
  } catch {
    return [];
  }
};

export function useMyList() {
  const [items, setItems] = useState<Movie[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const latestJson = useRef("[]");

  const isSaved = useMemo(
    () => (movie: Movie) =>
      items.some(
        (m) => m.id === movie.id && m.media_type === movie.media_type,
      ),
    [items],
  );

  useEffect(() => {
    const initial = read();
    const serialized = JSON.stringify(initial);
    latestJson.current = serialized;
    setItems(initial);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const serialized = JSON.stringify(items);
    if (serialized === latestJson.current) return;
    latestJson.current = serialized;
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, serialized);
    window.dispatchEvent(new CustomEvent("my-list-changed"));
  }, [items, hydrated]);

  useEffect(() => {
    const sync = () => {
      const next = read();
      const serialized = JSON.stringify(next);
      if (serialized !== latestJson.current) {
        latestJson.current = serialized;
        setItems(next);
        setHydrated(true);
      }
    };
    window.addEventListener("storage", sync);
    window.addEventListener("my-list-changed", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("my-list-changed", sync as EventListener);
    };
  }, []);

  const toggle = (movie: Movie) =>
    setItems((prev) => {
      const exists = prev.some(
        (m) => m.id === movie.id && m.media_type === movie.media_type,
      );
      return exists
        ? prev.filter(
            (m) => !(m.id === movie.id && m.media_type === movie.media_type),
          )
        : [{ ...movie }, ...prev];
    });

  return { items, isSaved, toggle, hydrated };
}
