'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { TfiArrowRight } from "react-icons/tfi";

const Hero = () => {
  return (
    <div className="mt-14 max-w-[85rem] mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
    </div>
  </div>
  )
}

export default Hero