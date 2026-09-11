"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ICategoriesProps, IVideo } from "../types/videoType";
import VideosTitle from "../components/utils/videos-title";
import dynamic from "next/dynamic";
import useInfiniteScroll from "../hooks/useIinfiniteScroll";

const VideoButton = dynamic(() => import("../components/utils/video-button"), {
  ssr: false,
});

function Videos({ category, title }: ICategoriesProps) {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadingRef = useRef(false);

  const fetchVideos = useCallback(
    async (pageToken?: string) => {
      if (loadingRef.current) return;

      loadingRef.current = true;
      setIsLoading(true);
      setError(false);

      try {
        const url = pageToken
          ? `/api/youtube?category=${category}&pageToken=${pageToken}`
          : `/api/youtube?category=${category}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("영상을 가져오지 못했습니다.");
        }

        const data = await response.json();

        setVideos((prevVideos) => {
          if (pageToken) {
            return [...prevVideos, ...(data.videos ?? [])];
          }

          return data.videos ?? [];
        });

        setNextPageToken(data.nextPageToken ?? null);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        loadingRef.current = false;
        setIsLoading(false);
      }
    },
    [category]
  );

  useEffect(() => {
    setVideos([]);
    setNextPageToken(null);
    setError(false);

    fetchVideos();
  }, [category, fetchVideos]);

  const loadMoreItems = useCallback(() => {
    if (!nextPageToken || loadingRef.current) return;

    fetchVideos(nextPageToken);
  }, [nextPageToken, fetchVideos]);

  const { target } = useInfiniteScroll(loadMoreItems);

  return (
    <div>
      <VideosTitle>{title}</VideosTitle>

      {isLoading && videos.length === 0 && (
        <p className="mt-4 text-center text-sm">영상을 불러오는 중...</p>
      )}

      {error && videos.length === 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm">영상을 불러오지 못했습니다.</p>

          <button
            type="button"
            onClick={() => fetchVideos()}
            className="mt-2 rounded-md border px-3 py-1 text-sm"
          >
            다시 시도
          </button>
        </div>
      )}

      {videos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {videos.map((video: IVideo, index) => (
            <VideoButton
              key={`${video.url}-${index}`}
              size="w-full aspect-[8/7]"
              data={video}
            />
          ))}

          <div ref={target}></div>
        </div>
      )}

      {isLoading && videos.length > 0 && (
        <p className="mt-4 text-center text-sm">영상을 더 불러오는 중...</p>
      )}

      {error && videos.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm">영상을 더 불러오지 못했습니다.</p>

          <button
            type="button"
            onClick={() => {
              if (nextPageToken) {
                fetchVideos(nextPageToken);
              }
            }}
            className="mt-2 rounded-md border px-3 py-1 text-sm"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}

export default Videos;
