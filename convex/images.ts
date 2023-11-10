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
    author: v.string(), 
    likes: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("posts", {
      body: args.storageId,
      author: args.author,
      format: "image",
      likes: 0,
    });
  },
});

// 

// Keeping below code for reference lol 


// export const addLike = mutation({
//   args: { post: v.id('posts'), likes: v.number() },
//   handler: async (ctx, { post }) => {
//     const existing = await ctx.db.get(post);
//     const updatedLikes = (existing.likes || 0) + 1;

//     await ctx.db.patch(post, { likes: updatedLikes } );
//   }
// })

// Only allowing one like per user

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

// export const getAllPostsByLocation = query({

// })

// export const deletePost = mutation({

// })

