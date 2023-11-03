'use client'

import React, { useState, useRef, FormEvent } from 'react'
import { SignInButton, useUser } from '@clerk/clerk-react'

import { api } from '../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';

import Link from 'next/link'
import Image from 'next/image'
import { BsLayers, BsPinAngle, BsPuzzle } from 'react-icons/bs';

const Gallery = () => {

  const posts = useQuery(api.images.getPosts) ?? [];

  const { user } = useUser();
  const name = user?.fullName as string;

  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const uploadImage = useMutation(api.images.createPost);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [imageContinent, setImageContinent] = useState<string>('');

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
    await uploadImage({ 
      storageId, 
      author: name 
    });

    setSelectedImage(null);
    imageInput.current!.value = '';
  }

  // const locationOptions = [
  //   'Select Continent',
  //   'Asia',
  //   'Africa',
  //   'Europe',
  //   'North America',
  //   'South America',
  //   'Oceania',
  //   'Antarctica',
  // ]

  return (
    <div id="gallery" className="flex flex-col mb-12">

      <div className="">
        <span className="text-2xl md:text-4xl font-semibold tracking-widest">
          Ready to join one of our worldwide field teams? Upload your photos to be featured in our gallery! 
        </span>

      {user ? (
        <form onSubmit={handleSendImage} className="flex flex-col space-y-4 mt-8">
          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            onChange={(event) => setSelectedImage(event.target.files![0])}
            className="w-fit"
            disabled={selectedImage !== null}
          />
          {/* <select
            id="continent"
            placeholder='Select Continent'
            value={imageContinent}
            onChange={(e) => setImageContinent(e.currentTarget.value)}
            className="text-[#222] w-fit p-1 pr-[4.2rem] rounded-full"
          >
            {locationOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select> */}
          <input
            type="submit"
            value="Upload"
            disabled={selectedImage === null}
            className="w-fit rounded-full bg-yellow-400 p-1 px-6 cursor-pointer hover:bg-yellow-300 duration-300 text-white"
          />
        </form>
        ) : (
        <div className="mt-8">
          <p className="text-neutral-400">
            To upload photos, you must sign in. 
            <span className="text-yellow-400"> <SignInButton mode='modal' afterSignInUrl='/' /> </span> now!
          </p>
        </div>
      )}
      </div>


      <span className="mt-12 mb-8 font-semibold tracking-wider text-xl">
        &mdash; Gallery
      </span>
      <ul className=" columns-1 md:columns-2 lg:columns-3 xl:columns-4">
        
        {posts.map((post) => (
          <li key={post._id} className="break-inside-avoid-column mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral-500 font-semibold tracking-wide">@{post.author}</span>
              <span className="">{post.location}</span>
              <span className="text-xs text-neutral-400 font-mono">&mdash; {new Date(post._creationTime).toLocaleTimeString()}</span>
            </div>
            {post.format === "image" && (
              <Images post={post} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Images({ post }: { post: { url: string } }) {
  return (
    <Image src={post.url} alt="user uploaded image" height={1000} width={1000} className="object-cover w-fit h-full rounded-lg" />
  );
}

export default Gallery