'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import {
  BsBoxArrowUpRight
} from 'react-icons/bs'

import {
  SignInButton,
  SignOutButton,
  useUser
} from '@clerk/clerk-react'

import Image from 'next/image';


const desktopItems = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
];

const mobileItems = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' }
]

const Header = () => {

  const [isNavOpen, setNavOpen] = useState(false);

  const { user } = useUser();

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

              {user ? (
                <li className="relative flex items-center space-x-1 border border-[#333] rounded-full p-1 px-2">
                  <Image 
                    src={user.imageUrl ?? ''}
                    alt={`${user}'s profile picture`}
                    width="1000"
                    height="1000"
                    className="w-6 h-6 rounded-full bg-gradient from-blue-200 to-red-200"
                  />
                  <SignOutButton />
                </li>
              ) : (
                <li className="font-semibold border border-[#333] p-1 px-2 rounded-full">
                  <SignInButton mode='modal' afterSignInUrl='/' />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="lg:hidden nav fixed top-0 inset-x-0 z-[999] bg-white">
        <div className="flex items-center justify-between p-2 px-4">
          <Link href="/" className="">
            <span className="text-2xl font-bold tracking-wide">The Sky Is Fake</span>
          </Link>

          <button className={`menu -mr-2.5 ${isNavOpen ? 'opened' : ''}`} aria-label="Main Menu" onClick={() => void setNavOpen((prev) => !prev)}>
            <svg width="50" height="50" viewBox="0 0 100 100">
              <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
              <path className="line line2" d="M 20,50 H 80" />
              <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>
          </button>
        </div>
      </div>

      <div className={isNavOpen ? "showMenuNav bg-white" : "hideMenuNav"}> 
        <hr className="border-black mt-8 mx-4" />
        
        <ul className="text-5xl flex flex-col px-4 tracking-wider my-8 space-y-8">
            {mobileItems.map((mobileItem) => (
              <li key={mobileItem.href} className="relative">
                <Link href={mobileItem.href} onClick={() => void setNavOpen((prev) => !prev)}>
                  {mobileItem.label}
                </Link>
              </li>
            ))}

        </ul>
        <hr className="border-black mx-4" />


        <div className="flex flex-col px-4 mb-32">

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
            scroll: none;
            z-index: 998;
            padding-top: 4rem;
          }
        `}</style>
      </div>

    </nav>
  )
}

export default Header