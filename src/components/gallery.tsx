'use client'

import React, { useState, useRef, FormEvent } from 'react'
import { SignInButton, useUser } from '@clerk/clerk-react'

import { api } from '../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';

import Image from 'next/image'

// modal 
Modal.setAppElement('main');
import Modal from 'react-modal'

import {
  PiArrowFatDownThin,
  PiArrowFatUpThin
} from 'react-icons/pi'

import {
  AiOutlineHeart
} from 'react-icons/ai'

const Gallery = () => {

  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

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
      author: name,
      likes: 0,
    });

    setSelectedImage(null);
    imageInput.current!.value = '';

    closeUploadModal();
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

  const openloadModalOpen = () => {
    setUploadModalOpen(true);
  }

  const closeUploadModal = () => {
    setUploadModalOpen(false);
  }


  return (
    <>
    <div id="gallery" className="flex flex-col mb-12">

      <div className="flex flex-col ">
        <span className="text-2xl md:text-4xl font-semibold tracking-widest">
          Submit your photos to be featured in our gallery! 
        </span>
        {user ? (
          <button className="w-fit mt-8 bg-yellow-400 px-6 py-2 rounded-full"
            onClick={() => void setUploadModalOpen(true)}>
            Submit Now!
          </button>
          ) : (
          <div className="mt-8">
            <p className="text-neutral-400">
              To upload photos, you must sign in. 
              <span className="text-yellow-400"> <SignInButton mode='modal' afterSignInUrl='/' /> </span> now!
            </p>
          </div>
        )}
      </div>


      {/* <span className="mt-20 mb-8 font-semibold tracking-wider text-xl">
        &mdash; Gallery
      </span> */}
      <ul className=" columns-1 sm:columns-2 lg:columns-3 gap-8 mt-20">
        
          {posts?.map(post => {

            const creationTimeMs = post._creationTime;
            const date = new Date(creationTimeMs);

            const options: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }

            const formattedDate = date.toLocaleDateString('en-US', options);

            return (
              <li key={post._id} className="break-inside-avoid-column mb-10">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center text-xs text-neutral-500 tracking-wide font-light">
                      <p>
                        Posted by 
                      </p>
                      <span className="font-bold">
                        &nbsp;{post.author}
                      </span>
                      <span className="text-xs text-neutral-400 font-light">&nbsp;&bull; {formattedDate}</span>
                    </div>
                    {/* <span className="">{post.location}</span> */}
                  </div>
                  {post.format === "image" && (
                    <Images post={post} />
                  )}

                  {/* uncomment when likes are added */}
                  {/* {user ? (
                    <div className="mt-2 text-xl flex items-center space-x-2">
                      <button 
                      // like 
                      >
                        <AiOutlineHeart className="" />
                      </button>
                      <span className="text-sm font-light">{post.likes}</span>
                    </div>
                  ) : (
                    <></>
                  )} */}
              </li>
            )
          })}
      </ul>
    </div>


    <Modal
        isOpen={isUploadModalOpen}
        onRequestClose={closeUploadModal}
        contentLabel="Confirm Change"
        overlayClassName="modal-overlay fixed inset-0 bg-[#222] bg-opacity-80 flex items-center justify-center px-8 backdrop-blur-sm z-[999]"
        className="bg-white p-4 py-12 rounded-lg"
      >
        <div className="text-center flex flex-col justify-between space-y-8 px-4">
          <p className="text-sm">Upload your picture below!</p>
          <div className="">
            <form onSubmit={handleSendImage} 
              className="flex flex-col space-y-4 mt-2">
              <input
                type="file"
                accept="image/*"
                ref={imageInput}
                onChange={(event) => setSelectedImage(event.target.files![0])}
                className="w-56"
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
          </div>
        </div>
      </Modal>
    </>
  )
}

function Images({ post }: { post: { url?: string | null | undefined } }) {
  
  if (!post.url) {
    return null;
  }

  return (
    <Image src={post.url} alt={`user uploaded image`} height={1000} width={1000} className="object-cover w-fit h-full rounded-md" />
  );
}

export default Gallery