/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";

import { Id } from "../../convex/_generated/dataModel";

export interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface TopPodcastersProps {
  _id: Id<"users">;
  _creationTime: number;
  email: string;
  imageUrl: string;
  clerkId: string;
  name: string;
  podcast: {
    podcastTitle: string;
    podcastId: Id<"podcasts">;
  }[];
  totalPodcasts: number;
}

// export interface PodcastProps {
//   _id: Id<"podcasts">;
//   _creationTime: number;
//   audioStorageId: Id<"_storage"> |null;
//   user: Id<"users">;
//   podcastTitle: string;
//   podcastDescription: string;
//   audioUrl: string | null;
//   imageUrl: string | null;
//   imageStorageId: Id<"_storage"> | null;
//   author: string;
//   authorId: string;
//   authorImageUrl: string;
//   audioDuration: number;
//   views: number;
// }
// types.ts
export interface PodcastProps {
  _id: Id<"podcasts">;
  _creationTime: number;
  audioUrl?: string;
  audioStorageId?: Id<"_storage">| null;
  imageUrl?: string;
  imageStorageId?: Id<"_storage"> | null;
  audioDuration: number;
  author: string;
  authorId: string;
  authorImageUrl: string;
  podcastDescription: string;
  podcastTitle: string;
  podcastType: string;
  user: Id<"users">;
  views: number;
}

export interface ProfilePodcastProps {
  podcasts: PodcastProps[];
  listeners: number;
}

export interface ProfileCardProps {
  podcastData: ProfilePodcastProps;
  imageUrl: string;
  userFirstName: string;
}

export interface PodcastDetailPlayerProps {
  audioUrl: string | null;
  podcastTitle: string;
  author: string;
  isOwner: boolean;
  imageUrl: string | null;
  podcastId: Id<'podcasts'>;
  imageStorageId: Id<'_storage'>;
  audioStorageId: Id<'_storage'>;
  authorImageUrl: string;
  authorId: string;
}

export interface ProfilePodcastProps {
  podcasts: PodcastProps[];
  listeners: number;
}

export interface GeneratePodcastProps {
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
}

export interface LatestPodcastCardProps {
  imgUrl: string;
  title: string;
  duration: string;
  index: number;
  audioUrl: string;
  author: string;
  views: number;
  podcastId: Id<"podcasts">;
}

export interface AudioProps {
  title: string;
  audioUrl: string | null;
  author: string;
  imageUrl: string |null;
  podcastId: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface PodcastCardProps {
  imgUrl: string;
  title: string;
  description: string;
  podcastId: Id<"podcasts">;
}

export interface CarouselProps {
  fansLikeDetail: TopPodcastersProps[];
}

export interface ProfileCardProps {
  podcastData: ProfilePodcastProps;
  imageUrl: string;
  userFirstName: string;
}

export type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};
