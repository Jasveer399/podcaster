"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PodcastCard from "@/components/PodcastCard";
import { Button } from "@/components/ui/button";
import { podcastData } from "@/utils";
import React from "react";

function Home() {
  const trandingPodcasts = useQuery(api.podcasts.getTrandingPodcast);

  return (
    <div className="flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1 mt-16 bg-black-2/20 pl-4 py-1 rounded-lg">
          Trending Podcasts
        </h1>

        <div className="podcast_grid">
          {trandingPodcasts?.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              podcastId={podcast._id}
              imgUrl={podcast.imageUrl!}
              title={podcast.podcastTitle}
              description={podcast.podcastDescription}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
