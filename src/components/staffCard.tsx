import React from 'react'
import Image from 'next/image'

interface StaffCardProps {
  staff: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  }
}

const StaffCard = ({
    staff, image
}: StaffCardProps ) => {
  return (
    <div className="flex flex-col break-inside-avoid-column mb-4">
        <Image 
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={image.className}
        />
        <span className="flex justify-start text-sm mt-1 text-neutral-500">{staff}</span>
    </div>
  )
}

export default StaffCard