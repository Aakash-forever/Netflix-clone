const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    accept: "application/json",
  },
};

export const fetchTrending = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week`, options);
  return res.json();
};

export const fetchTopRated = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated`, options);
  return res.json();
};

export const fetchActionMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=28`,
    options
  );
  return res.json();
};
