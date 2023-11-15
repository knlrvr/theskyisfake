'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  TfiFaceSmile 
} from "react-icons/tfi";

const Hero = () => {
  return (
    <div className="mt-14 max-w-[85rem] mx-auto p-4">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid grid-cols-3 gap-y-8 gap-x-4 w-full h-fit">
          <div className="col-span-3 bg-violet-200 rounded-xl h-full p-4 py-8 shadow-md">
            <span className="font-raleway tracking-widest text-5xl md:text-6xl">
              Between <br /> perception <br /> and ➺ <br /> deception.
            </span>
            <p className="pt-24 font-light text-lg">
              Established in September of 2023 in a bedroom in North Carolina, 
              we set out to prove the impossible. 
              <span className="font-semibold"> The sky is fake. </span> 
              Everyone knows it. We can stop pretending now.
            </p>
          </div>

          <div className="col-span-2">
            <Image
              src="https://images.unsplash.com/photo-1517228521637-11f1697b4731"
              alt=""
              width="1000"
              height="1000"
              className="object-center object-cover h-32 rounded-xl shadow-md"
            />
          </div>
          <div>
            <Link href="#gallery"
              className="h-32 group rounded-xl bg-orange-400 flex justify-end items-end text-8xl text-white shadow-md">
              <TfiArrowRight className="rotate-45 group-hover:translate-y-1 group-hover:translate-x-1 duration-300" />
            </Link>
          </div>
        </div>

        <div className="hidden md:block rounded-md">
          <Image
            src="https://images.unsplash.com/photo-1517228521637-11f1697b4731"
            alt=""
            width="1000"
            height="1000"
            className="object-center object-cover rounded-xl w-full h-full lg:h-[645px]"
          />
        </div>
      </div> */}

      <div className="flex flex-col -space-y-4 md:-space-y-2 font-migra mt-16">
        <div className="flex items-center justify-center p-2 tracking-widest font-bold">
          <p className="text-5xl md:text-7xl lg:text-8xl xl:text-[9rem]">
            All
          </p>
          <div className="inline-flex items-center px-2 md:px-4 lg:px-6 mb-2 md:mb-4">
            <Image
              src="https://images.unsplash.com/photo-1569982175971-d92b01cf8694"
              alt=""
              height="1000"
              width="1000"
              className="-mr-2 md:-mr-4 lg:-mr-6 object-center object-cover h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] xl:h-[6rem] xl:w-[6rem] border-2 md:border-4 border-[white] rounded-2xl"
            />
            <Image
              src="https://images.unsplash.com/photo-1589810264340-0ce27bfbf751"
              alt=""
              height="1000"
              width="1000"
              className="-mr-2 md:-mr-4 lg:-mr-6 object-center object-cover h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] xl:h-[6rem] xl:w-[6rem] border-2 md:border-4 border-white rounded-2xl"
            />
            <Image
              src="https://images.unsplash.com/photo-1554034483-04fda0d3507b"
              alt=""
              height="1000"
              width="1000"
              className="mr-2 object-center object-cover h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] xl:h-[6rem] xl:w-[6rem] border-2 md:border-4 border-white rounded-2xl"
            />
          </div>
          <p className="text-5xl md:text-7xl lg:text-8xl xl:text-[9rem]">
            the proof
          </p>
        </div>
        <div className="flex flex-col items-center justify-center font-bold p-4 tracking-widest">
          <p className="text-5xl md:text-7xl lg:text-8xl xl:text-[9rem]">
            you need ➺, right
          </p>
        </div>
        <div className="flex flex-col items-center justify-center font-bold p-4 tracking-widest">
          <p className="flex items-center text-5xl md:text-7xl lg:text-8xl xl:text-[9rem]">
            where you need it <TfiFaceSmile className="mb-2 ml-4 text-4xl md:text-5xl lg:text-6xl xl:text-7xl" />
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero