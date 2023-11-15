'use client'

import React from 'react'
import Image from 'next/image'

import { Reveal } from './utils/reveal';

import {
  TfiFaceSmile 
} from "react-icons/tfi";

const Hero = () => {
  return (
    <div className="mt-16 mb-8 md:mb-14 max-w-[85rem] mx-auto p-4">
      
      <div className="mt-14 mb-8 md:mb-14 max-w-[85rem] mx-auto p-4">
       <div className="flex flex-col -space-y-4 md:-space-y-2 font-migra mt-16">
         <Reveal>
           <div className="flex items-center justify-center p-2 tracking-widest font-bold">
             <p className="text-[2rem] md:text-6xl lg:text-7xl xl:text-8xl">
               All
             </p>

             {/* will change to divs w gradient bg instead of imgs since they're just gradients now anyway lol */}
             <div className="inline-flex items-center px-2 md:px-4 lg:px-6 mb-2 md:mb-3 -space-x-4">
               <div className="h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] rounded-full bg-gradient-to-b from-red-500 to-blue-400 border-2 lg:border-4 border-white"></div>
               <div className="h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] rounded-full bg-gradient-to-b from-yellow-500 to-pink-400 border-2 lg:border-4 border-white"></div>
               <div className="h-8 w-8 md:h-14 md:w-14 lg:h-[4.5rem] lg:w-[4.5rem] rounded-full bg-gradient-to-b from-orange-500 to-teal-200 border-2 lg:border-4 border-white"></div>
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
    </div>
  )
}

export default Hero