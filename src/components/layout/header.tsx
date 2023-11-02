'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const desktopItems = [
  { label: 'Research', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Archive', href: '#archive' },
];

const mobileItems = [
  { label: 'Research', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Archive', href: '#archive' },
]

const Header = () => {

  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <nav className="font-mont">
      <div className="nav fixed top-0 inset-x-0 z-20">

        <div className="hidden lg:flex justify-between items-center p-4 max-w-6xl mx-auto bg-white">
          <Link href="/">
            <span className="text-2xl font-bold tracking-wide">The Sky Is Fake</span>
          </Link>
          <div className="">
            <ul className="flex items-center space-x-8 text-sm font-light">
              {desktopItems.map((desktopItem) => (
                <li key={desktopItem.href} className="relative">
                  <Link href={desktopItem.href}>
                    {desktopItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="lg:hidden nav fixed top-0 inset-x-0 z-[999] bg-white">
        <div className="flex items-center justify-between p-2 px-4">
          <Link href="/" className="">
            <span className="text-2xl font-bold tracking-wide">The Sky Is Fake</span>
          </Link>

          <button onClick={() => void setNavOpen((prev) => !prev)}
            className="menu-icon w-fit h-fit">
            <input className="menu-icon__checkbox" type="checkbox" />
            <div>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      <div className={isNavOpen ? "showMenuNav bg-white" : "hideMenuNav"}> 

      <ul className="text-5xl flex flex-col px-4 space-y-8 font-thin">
        <hr className="border-black mt-8" />
          {mobileItems.map((mobileItem) => (
            <li key={mobileItem.href} className="relative">
              <Link href={mobileItem.href} onClick={() => void setNavOpen((prev) => !prev)}>
                {mobileItem.label}
              </Link>
            </li>
          ))}
        <hr className="border-black mt-8" />
      </ul>

      <div className="flex justify-between px-4 mb-32">
        <div className="font-light">
          <Link href="/" className="">
            example@email.com
          </Link>
        </div>
      </div>


      <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: fixed;
          min-width: 100%;
          min-height: 100vh;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          scroll: none;
          z-index: 998;
        }
      `}</style>
      </div>

    </nav>
  )
}

export default Header