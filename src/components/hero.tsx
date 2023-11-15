'use client'

import React from 'react'
import Image from 'next/image'

import { Reveal } from './utils/reveal';

import {
  TfiFaceSmile 
} from "react-icons/tfi";

const Hero = () => {
  return (
    <div className="mt-14 max-w-[85rem] mx-auto p-4">
      <div className="flex flex-col -space-y-4 md:-space-y-2 font-migra mt-16">
        <Reveal>
          <div className="flex items-center justify-center p-2 tracking-widest font-bold">
            <p className="text-[2rem] md:text-6xl lg:text-7xl xl:text-8xl">
              All
            </p>
            <div className="inline-flex items-center px-2 md:px-4 lg:px-6 mb-2 md:mb-4 -mr-2">
              <Image
                src="https://images.unsplash.com/photo-1569982175971-d92b01cf8694"
                alt=""
                height="1000"
                width="1000"
                className="-mr-2 md:-mr-4 lg:-mr-6 object-center object-cover h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] border-2 md:border-4 border-[white] rounded-2xl"
              />
              <Image
                src="https://images.unsplash.com/photo-1589810264340-0ce27bfbf751"
                alt=""
                height="1000"
                width="1000"
                className="-mr-2 md:-mr-4 lg:-mr-6 object-center object-cover h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] border-2 md:border-4 border-white rounded-2xl"
              />
              <Image
                src="https://images.unsplash.com/photo-1554034483-04fda0d3507b"
                alt=""
                height="1000"
                width="1000"
                className="mr-2 object-center object-cover h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] border-2 md:border-4 border-white rounded-2xl"
              />
            </div>
            <p className="text-[2rem] md:text-6xl lg:text-7xl xl:text-8xl">
              the proof
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-col items-center justify-center font-bold p-4 tracking-widest">
            <p className="text-[2rem] md:text-6xl lg:text-7xl xl:text-8xl mt-2">
              you need &nbsp;➺&nbsp; right
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-col items-center justify-center font-bold p-4 tracking-widest">
            <p className="flex items-center text-[2rem] md:text-6xl lg:text-7xl xl:text-8xl">
              where you need it
              <TfiFaceSmile className="ml-2 md:ml-4 mb-2 text-2xl md:text-3xl lg:text-4xl xl:text-6xl" />
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default Hero