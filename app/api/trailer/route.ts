import { NextResponse } from "next/server";
import { getBestYoutubeTrailerKey } from "@/lib/tmdb";

type MediaType = "movie" | "tv";

const badRequest = (message: string) =>
  NextResponse.json({ error: message }, { status: 400 });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idRaw = searchParams.get("id");
  const typeRaw = searchParams.get("type");

  const id = idRaw ? Number(idRaw) : NaN;
  if (!Number.isFinite(id)) return badRequest("Missing or invalid id");

  const type: MediaType = typeRaw === "tv" ? "tv" : "movie";

  try {
    const key = await getBestYoutubeTrailerKey(id, type);
    if (!key) {
      return NextResponse.json({ error: "No trailer found" }, { status: 404 });
    }

    return NextResponse.json({
      key,
      url: `https://www.youtube.com/embed/${key}`,
    });
  } catch (error) {
    console.error("trailer error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
