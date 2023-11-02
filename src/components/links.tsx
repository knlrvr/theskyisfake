import React from 'react'
import Link from 'next/link'

import {
    BsArrowUpRight
} from 'react-icons/bs'

const Links = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/"
            className="bg-[#222] h-64 text-white p-8 flex flex-col justify-between">
            <div className="flex justify-end text-4xl">
                <BsArrowUpRight />
            </div>
            <div className="">
                <p className="underline underline-offset-[0.3rem] text-3xl">
                    Contribute To <br />
                    Our Work
                </p>
            </div>
        </Link>
        <Link href="/"
            className="bg-[#222] h-64 text-white p-8 flex flex-col justify-between">
            <div className="flex justify-end text-4xl">
                <BsArrowUpRight />
            </div>
            <div className="">
                <p className="underline underline-offset-[0.3rem] text-3xl">
                    Hear From <br />
                    Our Researchers
                </p>
            </div>
        </Link>
        <Link href="/"
            className="bg-[#222] h-64 text-white p-8 flex flex-col justify-between">
            <div className="flex justify-end text-4xl">
                <BsArrowUpRight />
            </div>
            <div className="">
                <p className="underline underline-offset-[0.3rem] text-3xl">
                    View Our <br />
                    Archives
                </p>
            </div>
        </Link>

    </div>
  )
}

export default Links