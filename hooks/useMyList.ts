"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Movie } from "@/lib/tmdb";

const STORAGE_KEY = "my-list";

const sameItem = (a: Movie, b: Movie) =>
  a.id === b.id && a.media_type === b.media_type;

const serialize = (list: Movie[]) => JSON.stringify(list);

const loadList = (): Movie[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Movie[];
  } catch {
    return [];
  }
};

export function useMyList() {
  const latestJson = useRef("[]"); // remember last saved JSON
  const [items, setItems] = useState<Movie[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // First load after mount; keeps server/client markup identical, then hydrate.
  useEffect(() => {
    const initial = loadList();
    latestJson.current = serialize(initial);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(initial);
    setHydrated(true);
  }, []);

  // Persist whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    const nextJson = serialize(items);
    if (nextJson === latestJson.current) return;

    latestJson.current = nextJson;
    localStorage.setItem(STORAGE_KEY, nextJson);
    window.dispatchEvent(new CustomEvent("my-list-changed"));
  }, [items, hydrated]);

  // Listen for changes from other tabs or in-app events
  useEffect(() => {
    const sync = () => {
      const stored = loadList();
      const storedJson = serialize(stored);
      if (storedJson === latestJson.current) return;

      latestJson.current = storedJson;
      setItems(stored);
      setHydrated(true);
    };

    window.addEventListener("storage", sync);
    window.addEventListener("my-list-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("my-list-changed", sync);
    };
  }, []);

  const isSaved = useCallback(
    (movie: Movie) => items.some((m) => sameItem(m, movie)),
    [items],
  );

  const toggle = useCallback(
    (movie: Movie) =>
      setItems((prev) => {
        const exists = prev.some((m) => sameItem(m, movie));
        return exists
          ? prev.filter((m) => !sameItem(m, movie))
          : [{ ...movie }, ...prev];
      }),
    [],
  );

  return { items, isSaved, toggle, hydrated };
}
