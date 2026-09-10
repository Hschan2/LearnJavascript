import { NextResponse } from 'next/server';

const PLAYLISTS = {
  portfolio: 'PLSIL5GEUInys',
  motion: 'PLYqkGJr-KzGY',
  travel: 'PLXcJqArXkF4s',
  short: 'PLA4HEW0z2fao',
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as keyof typeof PLAYLISTS;

  if (!category || !PLAYLISTS[category]) {
    return NextResponse.json(
      {
        error: '올바른 category를 입력해주세요.',
      },
      { status: 400 },
    );
  }

  const playlistId = PLAYLISTS[category];
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: 'YOUTUBE_API_KEY가 설정되지 않았습니다.',
      },
      { status: 500 },
    );
  }

  const url = new URL(
    'https://www.googleapis.com/youtube/v3/playlistItems',
  );

  url.searchParams.set('part', 'snippet');
  url.searchParams.set('playlistId', playlistId);
  url.searchParams.set('maxResults', '50');
  url.searchParams.set('key', apiKey);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        {
          error: 'YouTube API 요청에 실패했습니다.',
          details: errorData,
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    const videos = data.items.map(
      (item: {
        snippet: {
          title: string;
          description: string;
          publishedAt: string;
          thumbnails?: {
            high?: {
              url: string;
            };
          };
          resourceId: {
            videoId: string;
          };
        };
      }) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails?.high?.url ?? '',
      }),
    );

    return NextResponse.json({
      category,
      videos,
      nextPageToken: data.nextPageToken ?? null,
    });
  } catch {
    return NextResponse.json(
      {
        error: 'YouTube API를 호출하는 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}