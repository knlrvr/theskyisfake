'use client'

import React, { useState, useRef, FormEvent, useEffect } from 'react'
import { SignInButton, useUser } from '@clerk/clerk-react'

import { api } from '../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';

import { Reveal } from './utils/reveal';
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
import {
  BiTrashAlt
} from 'react-icons/bi'

const Gallery = () => {

  const [isUploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [expandedImageUrl, setExpandedImageUrl] = useState<string>('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const posts = useQuery(api.images.getPosts) ?? [];
  const likeByUser = useMutation(api.images.addLikeByUser);
  const deletePost = useMutation(api.images.deletePostById);

  const deleteFile = useMutation(api.images.deleteFileById);

  const { user } = useUser();
  const name = user?.fullName as string;
  const clerkUser = user?.id;

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
      userName: clerkUser as string,
      author: name,
      likes: 0,
    });

    setSelectedImage(null);
    imageInput.current!.value = '';
    closeUploadModal();
  }

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

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  }

  const deleteSelectedFile = () => {
    if (selectedFile !== null) {
      deleteFile({ storageId: selectedFile  })
    }
  };

  const deleteSelectedPost = () => {
    if (selectedPost !== null) {
      deletePost({ post: selectedPost })
    }
  };

  const handleSearch = () => {
    setSearchModalOpen(true);
  }

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  }

  return (
    <>
    <div id="gallery" className="p-4">

      <Reveal>
        <div className="w-full rounded-3xl bg-neutral-900 text-white shadow-lg max-w-5xl mx-auto p-8">
            <p className="font-light tracking-wide text-2xl text-left">
              Interested in contributing? Submit your photos to be featured in our gallery below!
            </p>
            {user ? (
              <button className="w-fit mt-8 bg-orange-300 text-[#111] px-8 py-2 rounded-xl hover:bg-orange-400 duration-300 font-light"
                onClick={() => void setUploadModalOpen(true)}>
                Submit A Photo
              </button>
              // <div className="mt-10">
              //   <div className="font-light text-neutral-500 text-sm">
              //     <span className="h-2 w-2 rounded-full bg-red-500 inline-flex mr-2"></span>
              //     The upload feature is currently unavailable due to system maintenance. Please check back later. We apologize for the inconvenience!
              //   </div>
              // </div>
              ) : (
              <div className="mt-8">
                <p className="text-neutral-500 text-left">
                  To upload photos, you must sign in. <br /> 
                  <span className="text-neutral-200 hover:text-orange-400 duration-300"> <SignInButton mode='modal' afterSignInUrl='/' /> </span> now!
                </p>
              </div>
            )}
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12 mb-6 max-w-5xl mx-auto">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                  type="text" 
                  id="default-search" 
                  className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 bg-transparent focus:border-orange-500" 
                  placeholder="Search Images" 
                  required 
                />
                <button onClick={handleSearch} className="text-[#222] absolute end-2.5 bottom-2.5 bg-orange-300 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-md text-sm px-4 py-2 duration-300">Search</button>
            </div>
        </div>
      </Reveal>

      {/* search / filter options */}

      <ul className="gap-8 max-w-5xl mx-auto columns-1 md:columns-2 lg:columns-3 rounded-3xl">
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
                <li key={post._id} className="break-inside-avoid-column py-4">
                  <Reveal>
                    <div className="">
                      <div className="flex justify-between items-center mb-2.5">
                        <div className="flex items-center text-xs text-neutral-500 tracking-wide font-light">
  
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
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xl flex items-center space-x-1">
                            <button 
                            onClick={() => {
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

                          {user?.id === post.userName && (
                            <div className="relative">
                                <button
                                  onClick={() => {
                                  setDeleteModalOpen(true);
                                  setSelectedPost(post._id);
                                  setSelectedFile(post.body);
                                  // deletePost({ post: post._id })
                                }}
                                  className="rounded-lg rounded-tr-none flex items-center space-x-2 text-lg text-neutral-500">
                                  <BiTrashAlt className="" />
                                </button>
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  </Reveal>
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
      overlayClassName="modal-overlay fixed inset-0 bg-[#111] bg-opacity-90 flex items-center justify-center px-4 backdrop-blur-sm z-[999]"
      className="bg-white p-8 rounded-lg w-full md:w-[75%] lg:w-[50%]"
    >
      <div className="text-center flex flex-col justify-between space-y-8">
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
                  className="w-fit rounded-full bg-orange-300 p-1 px-6 cursor-pointer hover:bg-orange-200 duration-300 text-[#111]"
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
        overlayClassName="modal-overlay fixed inset-0 bg-[#111] bg-opacity-90 flex items-center justify-center backdrop-blur-sm z-[999] p-2 md:p-20"
        className="focus:outline-none rounded-lg w-full h-fit flex flex-col items-center max-w-2xl relative"
      >
        {expandedImageUrl && (
          <div className="flex flex-col items-end p-2 md:p-4">

            <button className="text-2xl absolute top-4 right-4 md:top-6 md:right-6 text-white bg-white bg-opacity-20 rounded-md p-1"
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
                className="rounded-md w-full h-fit"
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Image"
        overlayClassName="modal-overlay fixed inset-0 bg-[#111] bg-opacity-90 flex items-center justify-center backdrop-blur-sm z-[999] p-2 md:p-20"
        className="focus:outline-none bg-white rounded-lg w-full h-fit flex flex-col items-center max-w-2xl relative p-10"
      >
        <div className="flex flex-col space-y-8">
          <span className="text-sm font-light">
            Are you sure you want to delete this picture? This action cannot be undone.
          </span>

          <div className="flex justify-evenly font-light">
            <button className="border border-[#222] px-4 py-1 rounded-md hover:text-neutral-400  hover:border-neutral-400"
              onClick={() => {
              setDeleteModalOpen(false);
            }}>
              cancel
            </button>
            <button className="px-4 py-1 rounded-md bg-red-400 text-white hover:bg-red-600 duration-300"
              onClick={() => {
                deleteSelectedPost();
                deleteSelectedFile();
                closeDeleteModal();
              }}>
              delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Search Modal */}
      <Modal
        isOpen={isSearchModalOpen}
        onRequestClose={closeSearchModal}
        contentLabel="Delete Image"
        overlayClassName="modal-overlay fixed inset-0 bg-[#111] bg-opacity-90 flex items-center justify-center backdrop-blur-sm z-[999] p-2 md:p-20"
        className="focus:outline-none bg-white rounded-lg w-full h-fit flex flex-col items-center max-w-2xl relative p-10"
      >
        <div className="flex flex-col space-y-2">
          <span className="font-migra text-2xl tracking-wide">We&apos;re working on it!</span>
          <span className="text-sm font-light">
            Unfortunately, the search feature isn&apos;t available just yet! Please check back soon!
          </span>

          <div className="flex justify-end font-light">
            <button className="mt-4 border border-[#222] px-4 py-1 rounded-md hover:text-neutral-400  hover:border-neutral-400"
              onClick={() => {
              setSearchModalOpen(false);
            }}>
              Close
            </button>
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
    <Image src={post.url} alt={post.url} height={1000} width={1000} className="object-cover object-center rounded-2xl cursor-pointer h-fit w-full shadow-lg" />
  );
}

export default Gallery