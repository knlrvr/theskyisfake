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

// export const addLikes = mutation({

// })

// export const getAllPostsByUser = query({

// })

// export const getAllPostsByLocation = query({

// })

// export const deletePost = mutation({

// })

