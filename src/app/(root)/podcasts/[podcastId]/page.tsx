"use client";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Loader } from "lucide-react";
import PodacstDetailPage from "@/components/PodacstDetailPage";
import PodcastCard from "@/components/PodcastCard";
import EmptyState from "@/components/EmptyState";
import { useUser } from "@clerk/nextjs";

interface PodcastDetailsProps {
  params: {
    podcastId: Id<"podcasts">;
  };
}

const PodcastDetails = ({ params: { podcastId } }: PodcastDetailsProps) => {
  const { user } = useUser();
  const podcast = useQuery(api.podcasts.getPodcastById, {
    podcastId: podcastId,
  });
  const similarPodcast = useQuery(api.podcasts.getPodcastByPodcastType, {
    podcastId,
  });

  const isOwner = user?.id == podcast?.authorId
  if (!podcast) {
    return (
      <div className="flex w-ful h-screen justify-center items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-orange-1 text-24 font-bold">Loding</h1>
          <Loader className="animate-spin text-orange-1 size-8" />
        </div>
      </div>
    );
  }
  return (
    <section className="w-full flex flex-col">
      <header className="mt-9 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white-1 bg-black-2/20 px-2 py-1 rounded-lg">
          Current Podcast
        </h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            alt="HeadPhone Image"
            width={24}
            height={24}
          />
          <h1 className="text-16 text-white-1 font-bold">{podcast.views}</h1>
        </figure>
      </header>
      <PodacstDetailPage
        isOwner={isOwner}
        podcastId={podcastId}
        audioUrl={podcast.audioUrl!}
        podcastTitle={podcast.podcastTitle}
        author={podcast.author}
        imageUrl={podcast.imageUrl!}
        imageStorageId={podcast.imageStorageId!}
        audioStorageId={podcast.audioStorageId!}
        authorImageUrl={podcast.authorImageUrl}
        authorId={podcast.authorId}
      />
      <div className="flex flex-col gap-8 pt-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-20 font-bold text-white-1 uppercase">
            podcast Title
          </h1>
          <p className="text-18 text-gray-300 font-semibold w-96 pl-2">
            {podcast.podcastTitle}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-20 font-bold text-white-1 uppercase">
            podcast Description
          </h1>
          <p className="text-16 text-gray-300  capitalize pl-2">
            {podcast.podcastDescription}
          </p>
        </div>
      </div>
      <section className="flex flex-col mt-16 gap-4">
        <h1
          className={`text-20 font-bold text-white-1 py-2 pl-4 rounded-md ${similarPodcast?.length === 0 ? "" : "bg-black-2/20"}`}
        >
          Similar Podcast
        </h1>
        {similarPodcast && similarPodcast.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcast?.map((podcast) => (
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
          <div className="mt-5 bg-black-2/20 pb-10 rounded-md">
            <EmptyState
              title="No Similar Podcast Found"
              buttonLink="/discover"
              buttonText="Discover More Podcast"
            />
          </div>
        )}
      </section>
    </section>
  );
};

export default PodcastDetails;
