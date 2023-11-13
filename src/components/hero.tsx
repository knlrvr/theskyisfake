import React from 'react'
import Image from 'next/image'

import {
  PiStarFourFill
} from 'react-icons/pi'

const Hero = () => {
  return (
    <div className="flex flex-col text-center pb-12 md:pb-20 pt-36">

      <span className="font-migra text-5xl md:text-7xl tracking-wider text-center">
        The Sky Is Fake
      </span>
      {/* <div className="w-[100%] mt-2 mb-4">
        <Image
          src="https://images.unsplash.com/photo-1601352209555-489a72668fda"
          alt=""
          height="1000"
          width="1000"
          className="h-36 md:h-48 object-center object-cover w-full"
        />
      </div> */}
      <p className="font-migra tracking-widest leading-normal text-2xl md:text-4xl text-center">
        This is more than an <em>idea</em>. 
        It&apos;s a <em>revolution</em>.
      </p> 
    </div>
  )
}

export default Hero