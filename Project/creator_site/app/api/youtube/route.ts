import {
  YOUTUBE_API_MAX_RESULTS,
  YOUTUBE_CACHE_TIME,
  YOUTUBE_PLAYLISTS,
} from "@/app/common/utils/youtube";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get(
    "category"
  ) as keyof typeof YOUTUBE_PLAYLISTS;
  const pageToken = searchParams.get("pageToken");

  if (!category || !YOUTUBE_PLAYLISTS[category]) {
    return NextResponse.json(
      {
        error: "올바른 category를 입력해주세요.",
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "YOUTUBE_API_KEY가 설정되지 않았습니다.",
      },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    part: "snippet",
    playlistId: YOUTUBE_PLAYLISTS[category],
    maxResults: String(YOUTUBE_API_MAX_RESULTS),
    key: apiKey,
  });

  if (pageToken) {
    params.set("pageToken", pageToken);
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`,
      {
        next: {
          revalidate: YOUTUBE_CACHE_TIME,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        {
          error: "YouTube API 요청에 실패했습니다.",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    const videos = data.items.map(
      (item: {
        snippet: {
          title: string;
          thumbnails?: {
            high?: {
              url: string;
            };
          };
          resourceId: {
            videoId: string;
          };
        };
      }) => {
        const videoId = item.snippet.resourceId.videoId;

        return {
          title: item.snippet.title.replace(/#[^\s#]+/g, "").trim(),
          url: `https://www.youtube.com/watch?v=${videoId}`,
          image: item.snippet.thumbnails?.high?.url ?? "",
        };
      }
    );

    return NextResponse.json({
      category,
      videos,
      nextPageToken: data.nextPageToken ?? null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "YouTube API를 호출하는 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
