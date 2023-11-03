import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="flex flex-col items-start gap-8 pb-20 pt-24">
      <span className="font-extrabold tracking-wide leading-normal text-4xl md:text-6xl">
        The Sky Is Fake is more than an idea. It&apos;s a revolution.
      </span>
      <div className="w-[100%]">
        <Image
          src="https://images.unsplash.com/photo-1494253109108-2e30c049369b"
          alt=""
          height="1000"
          width="1000"
          className="h-48 md:h-64 object-center object-cover w-full"
        />
      </div>
    </div>
  )
}

export default Hero