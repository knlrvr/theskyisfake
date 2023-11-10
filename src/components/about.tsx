import React from 'react'

import Image from 'next/image'

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 pb-20 pt-6">
      <div className="flex flex-col">
        <p className="text-3xl font-migra tracking-widest">
          est.
        </p>
        <p className="font-extrabold text-8xl">
          2023.
        </p>
        <p className="mt-8 font-light md:w-[75%] lg:w-[50%]">
          Established in September of 2023 in a bedroom in North Carolina, 
          we set out to prove the impossible. The sky is fake. Our dedicated
          team of researchers and field scientists showcase our cause 
          in the gallery below.  
        </p>
      </div>
    </div>
  )
}

export default About