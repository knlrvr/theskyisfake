import React from 'react'
import Image from 'next/image'

import {
  PiStarFourFill
} from 'react-icons/pi'

const Hero = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8 pb-20 pt-24">
      <div className="flex justify-between items-center">
        <h1 className="tracking-wider font-migra text-5xl md:text-7xl">The Sky Is Fake</h1>
        <PiStarFourFill />
      </div>
      <div className="w-[100%]">
        <Image
          src="https://images.unsplash.com/photo-1601352209555-489a72668fda"
          alt=""
          height="1000"
          width="1000"
          className="h-48 md:h-64 object-center object-cover w-full"
        />
      </div>
      <p className="font-migra tracking-wide leading-normal text-4xl md:text-6xl">
        This is more than an <em className='tracking-widest'>idea</em>. 
        It's a <em className='tracking-widest'>revolution</em>.
      </p>
    </div>
  )
}

export default Hero