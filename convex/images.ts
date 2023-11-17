import { v } from "convex/values";
import { query } from "./_generated/server";

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
    .query("posts")
    .order("desc")
    .collect();
    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        // If the post is an "image" its `body` is a `StorageId`
        ...(post.format === "image"
          ? { url: await ctx.storage.getUrl(post.body) }
          : {}),
      }))
    );
  },
});

import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
  args: { 
    storageId: v.string(), 
    userName: v.string(),
    userImg: v.string(),
    author: v.string(), 
    likes: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("posts", {
      body: args.storageId,
      userName: args.userName,
      userImg: args.userImg,
      author: args.author,
      format: "image",
      likes: 0,
    });
  },
});

export const addLikeByUser = mutation({
  args: { post: v.id('posts'), userId: v.string() },
  handler: async (ctx, { post, userId }) => {
    const existing = await ctx.db.get(post);

    // Check if the user has already liked the post
    if (Array.isArray(existing.likes) && existing.likes.includes(userId)) {
      // User has already liked the post, remove the like
      const updatedLikes = existing.likes.filter((id: string) => id !== userId);
      await ctx.db.patch(post, { likes: updatedLikes });
      return;
    }

    // Ensure existing.likes is an array, and add the user to the list of likes
    const updatedLikes = [...(Array.isArray(existing.likes) ? existing.likes : []), userId];
    await ctx.db.patch(post, { likes: updatedLikes });
  }
});

// export const getAllPostsByUser = query({
  
// })

// once location has been added => 
// export const getAllPostsByLocation = query({

// })

export const deletePostById = mutation({
  args: { post: v.id('posts') },
  handler: async (ctx, { post }) => {
    // const storageId = await ctx.db.get(post);
    return await ctx.db.delete(post)
  }
})

