"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import EmptyState from "@/components/EmptyState";
import { Loader } from "lucide-react";
import PodcastCard from "@/components/PodcastCard";
import Searchbar from "@/components/Searchbar";

function Discover({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) {
  const podcastData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || "",
  });
  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1 bg-black-2/20 pl-4 py-1 rounded-lg">
          {!search ? "Discover Tranding Podcast" : "Search Result for "}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcastData ? (
          <>
            {podcastData.length > 0 ? (
              <div className="podcast_grid">
                {podcastData?.map((podcast) => (
                  <PodcastCard
                    key={podcast._id}
                    podcastId={podcast._id}
                    imgUrl={podcast.imageUrl!}
                    title={podcast.podcastTitle}
                    description={podcast.podcastDescription}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="Podcast Not Found" />
            )}
          </>
        ) : (
          <div className="flex w-ful h-screen justify-center items-center">
            <div className="flex gap-2 items-center">
              <h1 className="text-orange-1 text-24 font-bold">Loding...</h1>
              <Loader className="animate-spin text-orange-1 size-8" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Discover;
