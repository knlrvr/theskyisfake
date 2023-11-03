import React from 'react'

import Image from 'next/image'

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 pb-20">
      <div className="w-[100%] md:w-[50%]">
        <Image
          src="https://images.unsplash.com/photo-1494253109108-2e30c049369b"
          alt=""
          height="1000"
          width="1000"
          className="h-64 object-center object-cover"
        />
      </div>
      <div className="w-[100%] md:w-[50%]">
        <p className="font-light text-lg">
          Our team of researchers & field scientists have dedicated themselves to exposing
          the truth about our sky. The truth that they&apos;ve paid trillions of dollars to conceal. 
          The truth that we will reveal. 
          <br /><br />
          You guessed it. 
          <span className="ml-2 font-extrabold">The sky is fake</span>.
          <br /> And we&apos;re here to prove it. 
        </p>
      </div>
    </div>
  )
}

export default About