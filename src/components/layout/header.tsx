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

  const { user } = useUser();

  return (
    <nav className="">
      <div className="nav fixed top-0 inset-x-0 z-20 bg-[#f5f5f5]">

        <div className="flex justify-between items-center p-4 max-w-[85rem] mx-auto">
          <Link href="/">
            <span className="text-2xl font-migra tracking-widest">The Sky Is Fake</span>
          </Link>
          <div className="">
            <ul className="flex items-center space-x-8 text-sm font-light">
              
              {/* I don't think this would be necessary  */}
              {/* {desktopItems.map((desktopItem) => (
                <li key={desktopItem.href} className="relative">
                  <Link href={desktopItem.href}>
                    {desktopItem.label}
                  </Link>
                </li>
              ))} */}

              {user ? (
                <UserButton afterSignOutUrl='/' 
                  
                />
              ) : (
                <li className="font-semibold border border-[#333] p-1 px-4 rounded-full">
                  <SignInButton mode='modal' afterSignInUrl='/' >Join </SignInButton>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* I know this is a ton of commented out code, but I'm not yet sure if I want to get rid of it completely */}
      {/* <div className="lg:hidden nav fixed top-0 inset-x-0 z-[991] bg-white">
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
      </div> */}

      {/* <div className={isNavOpen ? "showMenuNav bg-white" : "hideMenuNav"}> 


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
      </div> */}

    </nav>
  )
}

export default Header