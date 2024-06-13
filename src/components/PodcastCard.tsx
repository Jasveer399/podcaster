import { PodcastCardProps } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function PodcastCard({
  podcastId,
  imgUrl,
  title,
  description,
}: PodcastCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/podcasts/${podcastId}`);
  };
  return (
    <div
      className="md:max-w-sm bg-black-2/20 rounded overflow-hidden shadow-2xl max-w-64 cursor-pointer hover:bg-black-2/40"
      onClick={handleClick}
    >
      <Image
        className="w-full p-4 rounded-3xl object-fill min-h-[268px]"
        src={imgUrl}
        alt="Podcaster image"
        width={174}
        height={174}
      />
      <div className="pl-5 pt-2">
        <div className="text-white-1 font-bold mb-2 capitalize">{title}</div>
        <p className="text-white-4 text-base mb-4 line-clamp-2 mr-2">{description}</p>
      </div>
      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div> */}
    </div>
  );
}

export default PodcastCard;
