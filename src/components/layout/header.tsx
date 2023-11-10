'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import {
  BsBoxArrowUpRight,
  BsThreeDotsVertical,
  BsBoxArrowInRight
} from 'react-icons/bs'

import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser
} from '@clerk/clerk-react'

import Image from 'next/image';


const desktopItems = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  // { label: 'Disclaimer', href: '#footer' },
];

const mobileItems = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  // { label: 'Disclaimer', href: '#footer' },
]

const Header = () => {

  const [isNavOpen, setNavOpen] = useState<boolean>(false);

  const { user } = useUser();

  return (
    <nav className="font-mont">
      <div className="nav fixed top-0 inset-x-0 z-20">

        <div className="hidden lg:flex justify-between items-center p-4 max-w-6xl mx-auto bg-white">
          <Link href="/">
            <span className="text-2xl font-migra tracking-widest">The Sky Is Fake</span>
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
                <UserButton afterSignOutUrl='/' />
              ) : (
                <li className="font-semibold border border-[#333] p-1 px-2 rounded-full">
                  <SignInButton mode='modal' afterSignInUrl='/' />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="lg:hidden nav fixed top-0 inset-x-0 z-[991] bg-white">
        <div className="flex items-center justify-between p-2 px-4">
          <Link href="/" className="pt-1">
            <span className="text-2xl font-migra tracking-widest">TSIF</span>
          </Link>

          <input type="checkbox" id="menu" checked={isNavOpen} onChange={() => setNavOpen((prev) => !prev)} />
          <label id="burger" htmlFor="menu">
              <div></div>
              <div></div>
              <div></div>
          </label>
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

        <div className="flex items-center justify-between px-4 mt-12">
          <Link href="https://github.com/knlrvr/theskyisfake"
            className="flex items-center space-x-4">
            <span>Learn More</span>
            <BsBoxArrowUpRight className="text-sm" />
          </Link>

          <div className="flex items-center space-x-2 relative">
            {user ? ( 
              <UserButton afterSignOutUrl='/' />
            ) : (
              <div className="flex items-center space-x-4">
                <SignInButton mode='modal' afterSignInUrl='/' />
                <BsBoxArrowInRight />
              </div>
            )}

            
          </div>
        </div>

        <div className="p-4 mt-16">
          <p className="text-sm">
            For more information or support, please contact 
            <span className="text-yellow-400">&nbsp; help@theskyisfake.org</span>.
          </p>
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
            z-index: 990;
            padding-top: 4rem;
          }
        `}</style>
      </div>

    </nav>
  )
}

export default Header