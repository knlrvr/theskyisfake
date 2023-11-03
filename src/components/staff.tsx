import React from 'react'

import StaffCard from './staffCard'

const Staff = () => {
  return (
    <div className="bg-[#222] text-white p-4 md:p-8 mb-20 md:mb-44 md:mt-16">
        <p className="font-light tracking-[0.3rem] text-2xl mb-4 md:mb-8">
            &mdash; Staff Picks
        </p>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8">
          <StaffCard 
            staff='Kane'
            image={{
              src: '/kane.jpeg',
              alt: '',
              width: 1000,
              height: 1000,
              className: 'rounded-md'
            }}
          />
          <StaffCard 
            staff='Logan'
            image={{
              src: '/logan.jpeg',
              alt: '',
              width: 1000,
              height: 1000,
              className: 'rounded-md'
            }}
          />
          <StaffCard 
            staff='Emily'
            image={{
              src: '/emily.jpeg',
              alt: '',
              width: 1000,
              height: 1000,
              className: 'rounded-md'
            }}
          />
          <StaffCard 
            staff='Jimmy'
            image={{
              src: '/jimmy.jpg',
              alt: '',
              width: 1000,
              height: 1000,
              className: 'rounded-md'
            }}
          />
          <StaffCard 
            staff='Noah'
            image={{
              src: '/noah.jpeg',
              alt: '',
              width: 1000,
              height: 1000,
              className: 'rounded-md'
            }}
          />
          <StaffCard 
            staff='Alex'
            image={{
              src: '/alex.jpeg',
              alt: '',
              width: 1000,
              height: 1000,
              className: 'rounded-md'
            }}
          />
          <StaffCard 
            staff='Stephen'
            image={{
              src: '/Stephen.jpeg',
              alt: '',
              width: 1000,
              height: 1000,
              className: 'rounded-md'
            }}
          />
        </div>
    </div>
  )
}

export default Staff