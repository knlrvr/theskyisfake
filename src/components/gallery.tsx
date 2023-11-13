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
  AiOutlineClose
} from 'react-icons/ai'

import {
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai'

const Gallery = () => {

  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [expandedImageUrl, setExpandedImageUrl] = useState<string>('');

  const posts = useQuery(api.images.getPosts) ?? [];
  const likeByUser = useMutation(api.images.addLikeByUser);

  const { user } = useUser();
  const name = user?.fullName as string;

  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const uploadImage = useMutation(api.images.createPost);

  const imageInput = useRef<HTMLInputElement>(null);
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

  const openUploadModal = () => {
    setUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
  };

  function formatFileSize(bytes: number) {
    if (bytes < 1024) {
        return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }

  const openImageModal = (imageUrl: string) => {
    setExpandedImageUrl(imageUrl);
  }
  const closeImageModal = () => {
    setExpandedImageUrl('');
  }

  return (
    <>
    <div id="gallery" className="flex flex-col mb-12">

      <div className="flex flex-col ">
        <span className="text-2xl md:text-4xl font-light tracking-widest">
          Submit your photos to be featured in our gallery! 
        </span>
        {user ? (
          <button className="w-fit mt-8 bg-yellow-400 text-white px-6 py-2 rounded-full"
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
                    <div onClick={() => openImageModal(post.url!)}>
                      <Images post={post} />
                    </div>
                  )}

                  {/* uncomment when likes are added */}
                  {user && (
                    <div className="mt-2 text-xl flex items-center space-x-2">
                      <button 
                      onClick={() => {
                        // likePost({ post: post._id, likes: 1 })

                        const userId = user.id;
                        likeByUser({ post: post._id, userId })
                      }} 
                      >
                        {(Array.isArray(post.likes) && post.likes.includes(user.id)) ? (
                          <AiFillHeart className="text-red-600" />
                        ) : (
                          <AiOutlineHeart className="" />
                        )}
                      </button>
                      <span className="text-sm font-light">{post.likes.length}</span>
                    </div>
                  )}
              </li>
            )
          })}
      </ul>
    </div>

    {/*  Upload Modal */}
    <Modal
        isOpen={isUploadModalOpen}
        onRequestClose={closeUploadModal}
        contentLabel="Upload Image"
        overlayClassName="modal-overlay fixed inset-0 bg-[#222] bg-opacity-80 flex items-center justify-center px-8 backdrop-blur-sm z-[999]"
        className="bg-white p-4 py-10 rounded-lg w-full md:w-[75%] lg:w-[50%]"
      >
        <div className="text-center flex flex-col justify-between space-y-8 px-4">
          <form onSubmit={handleSendImage}
            className="flex flex-col items-end space-y-2 w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span></p>
                <p className="text-xs font-light">PNG, JPG, HEIC or <em>other image formats</em></p>
              </div>
              <input 
                id="dropzone-file" 
                type="file" 
                accept='image/*'
                ref={imageInput}
                onChange={(event) => setSelectedImage(event.target.files![0])}
                disabled={selectedImage !== null}
                className="hidden"
              />
            </label>

            {selectedImage !== null && ( 
              <div className="flex flex-col items-end space-y-4 w-full pt-4">
                <div className="flex items-center w-full">
                  <div className="flex items-center w-full space-x-2">
                    <Image  
                      src={URL.createObjectURL(selectedImage)}
                      alt={selectedImage.name}
                      width="1000"
                      height="1000"
                      className="w-10 h-10 rounded-md border"
                    />
                    <p className="font-light"> 
                      &mdash; {selectedImage.name} <span className="font-light text-xs text-neutral-500">({formatFileSize(selectedImage.size)})</span>
                    </p>
                  </div>

                  <button onClick={() => {
                    handleRemoveImage();
                  }}>
                    <AiOutlineClose />
                  </button>
                </div>

                <input
                  type="submit"
                  value="Submit"
                  disabled={selectedImage === null}
                  className="w-fit rounded-full bg-yellow-400 p-1 px-6 cursor-pointer hover:bg-yellow-300 duration-300 text-white"
                />
              </div>
            )}
          </form> 
        </div>
      </Modal>

      
      {/* Expanded Modal */}
      <Modal
        isOpen={expandedImageUrl !== ''}
        onRequestClose={closeImageModal}
        contentLabel="Upload Image"
        overlayClassName="modal-overlay fixed inset-0 bg-[#222] bg-opacity-90 flex items-center justify-center backdrop-blur-sm z-[999] p-4 md:p-20"
        className="rounded-lg w-full h-fit bg-white flex flex-col items-center max-w-3xl"
      >
        {expandedImageUrl && (
          <div className="flex flex-col items-end p-2 md:p-4">

            <button className="text-3xl mb-2 md:mb-4"
              onClick={() => {
              closeImageModal();
            }}>
              <AiOutlineClose className="" />
            </button>

            <div className="flex flex-col space-y-2 justify-center">
              <Image 
                src={expandedImageUrl}
                alt=""
                width="1000"
                height="1000"
                className="rounded-md w-full max-h-[50%]"
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

function Images({ post }: { post: { url?: string | null | undefined } }) {

  if (!post.url) {
    return null;
  }

  return (
    <Image src={post.url} alt={post.url} height={1000} width={1000} className="object-cover w-fit h-full rounded-md cursor-pointer" />
  );
}

export default Gallery