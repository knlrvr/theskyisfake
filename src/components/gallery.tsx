'use client'

import React, { useState, useRef, FormEvent } from 'react'
import { useUser } from '@clerk/clerk-react'
import Link from 'next/link'

import { api } from '../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';

const Gallery = () => {

  const posts = useQuery(api.images.getPosts) ?? [];

  const { user } = useUser();
  const name = user?.fullName as string;

  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const uploadImage = useMutation(api.images.createPost);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': selectedImage!.type },
      body: selectedImage,
    });
    const json = await result.json();
    if (!result.ok) {
      throw new Error(`Upload failed: ${JSON.stringify(json)}`);
    }
    const { storageId } = json;
    await uploadImage({ storageId, author: name });

    setSelectedImage(null);
    imageInput.current!.value = '';
  }



  return (
    <div className="flex flex-col">
      gallery


      <form onSubmit={handleSendImage}>
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          onChange={(event) => setSelectedImage(event.target.files![0])}
          className=""
          disabled={selectedImage !== null}
        />
        <input
          type="submit"
          value="Upload"
          disabled={selectedImage === null}
        />
      </form>

      <ul className="columns-3 space-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            {post.format === "image" && (
              <Image post={post} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Image({ post }: { post: { url: string } }) {
  return <img src={post.url} height="full" width="full" className="object-cover w-fit h-auto" />;
}

export default Gallery