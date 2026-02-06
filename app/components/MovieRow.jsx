"use client";

import Image from "next/image";

export default function MovieRow({ movies }) {
  return movies.map(movie => <Image alt="movie" key={movie.id} />);
}
