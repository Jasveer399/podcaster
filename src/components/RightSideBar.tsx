"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "./Carousel";
import Header from "./Header";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

function RightSideBar() {
  const { user } = useUser();
  const router = useRouter();
  const topPodcastDetails = useQuery(api.users.getTopUserByPodcastCount);
  return (
    <section className="right_sidebar text-white-1">
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-3">
          <UserButton />
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-16 font-extrabold">{user?.fullName}</h1>
            <Image
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </SignedIn>
      <section className="mt-10">
        <Header headertitle="Fans Like You" />
        <Carousel fansLikeDetail={topPodcastDetails!} />
      </section>
      <section className="flex flex-col gap-8 pt-8">
        <Header headertitle="Top Podcast" />
        <div className="flex flex-col gap-6">
          {topPodcastDetails?.slice(0, 4).map((podcaster) => (
            <div
              key={podcaster._id}
              onClick={() => router.replace(`/profile/${podcaster.clerkId}`)}
              className="flex cursor-pointer justify-between bg-black-2/30 rounded-lg py-2 px-2"
            >
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-md shadow-xl"
                />
                <h1 className="text-white-1 font-semibold text-14">
                  {podcaster.name}
                </h1>
              </figure>
              <div className="flex items-center">
                <p>
                  {podcaster.totalPodcasts === 1
                    ? podcaster.totalPodcasts + " Podcast"
                    : podcaster.totalPodcasts+" Podcasts"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default RightSideBar;
