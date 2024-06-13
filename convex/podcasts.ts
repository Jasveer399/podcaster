import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { podcastTypes } from "@/utils";

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const createPodcast = mutation({
  args: {
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    podcastType: v.string(),
    audioUrl: v.string(),
    imageUrl: v.string(),
    audioStorageId: v.id("_storage"),
    imageStorageId: v.id("_storage"),
    audioDuration: v.number(),
    views: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const newpodcast = await ctx.db.insert("podcasts", {
      ...args,
      user: user[0]._id,
      author: user[0].name,
      authorId: user[0].clerkId,
      authorImageUrl: user[0].imageUrl,
    });

    return newpodcast;
  },
});

export const getTrandingPodcast = query({
  handler: async (ctx) => {
    const podcast = await ctx.db.query("podcasts").collect();

    return podcast;
  },
});
export const getPodcastById = query({
  args: {
    podcastId: v.id("podcasts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.podcastId);
  },
});

export const getPodcastByPodcastType = query({
  args: {
    podcastId: v.id("podcasts"),
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId);

    return await ctx.db
      .query("podcasts")
      .filter((q) =>
        q.and(
          q.eq(q.field("podcastType"), podcast?.podcastType),
          q.neq(q.field("_id"), args.podcastId)
        )
      )
      .collect();
  },
});
export const getPodcastBySearch = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.search === "") {
      return await ctx.db.query("podcasts").order("desc").collect();
    }

    const authorSearch = await ctx.db
      .query("podcasts")
      .withSearchIndex("search_author", (q) => q.search("author", args.search))
      .take(10);

    if (authorSearch.length > 0) {
      return authorSearch;
    }

    const titleSearch = await ctx.db
      .query("podcasts")
      .withSearchIndex("search_title", (q) =>
        q.search("podcastTitle", args.search)
      )
      .take(10);

    if (titleSearch.length > 0) {
      return titleSearch;
    }
    const podcastypeSearch = await ctx.db
      .query("podcasts")
      .withSearchIndex("search_podcastType", (q) =>
        q.search("podcastType", args.search)
      )
      .take(10);

    if (podcastypeSearch.length > 0) {
      return podcastypeSearch;
    }

    return await ctx.db
      .query("podcasts")
      .withSearchIndex("search_body", (q) =>
        q.search(
          "podcastDescription" || "podcastTitle" || "podcastType",
          args.search
        )
      )
      .take(10);
  },
});
export const getPodcastByAuthorId = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const podcasts = await ctx.db
      .query("podcasts")
      .filter((q) => q.eq(q.field("authorId"), args.authorId))
      .collect();

    const totalListeners = podcasts.reduce(
      (sum, podcast) => sum + podcast.views,
      0
    );

    return { podcasts, listeners: totalListeners };
  },
});
export const deletePodcast = mutation({
  args: {
    podcastId: v.id("podcasts"),
    imageStorageId: v.id("_storage"),
    audioStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId);

    if (!podcast) {
      throw new ConvexError("Podcast not found");
    }

    await ctx.storage.delete(args.imageStorageId);
    await ctx.storage.delete(args.audioStorageId);
    return await ctx.db.delete(args.podcastId);
  },
});
