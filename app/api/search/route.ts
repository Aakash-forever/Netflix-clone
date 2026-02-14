import { NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  try {
    const results = await searchMovies(query);
    return NextResponse.json(results);
  } catch (error) {
    console.log("search error", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
