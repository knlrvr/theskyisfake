'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import {
  SignInButton,
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
          <Link href="/"
            className="flex items-center">
             <div className="inline-flex items-center -space-x-4 mr-2">
               <div className="h-8 w-8 rounded-full bg-gradient-to-b from-red-500 to-blue-400 border-2  border-white"></div>
               <div className="h-8 w-8 rounded-full bg-gradient-to-b from-yellow-500 to-pink-400 border-2  border-white"></div>
               <div className="h-8 w-8 rounded-full bg-gradient-to-b from-orange-500 to-teal-200 border-2  border-white"></div>
             </div>
            <span className="font-migra mt-1 text-xl">The Sky Is Fake</span>
          </Link>
          <div className="">
            <ul className="flex items-center space-x-8 text-sm font-light">
            
              {user ? (
                <UserButton afterSignOutUrl='/' />
              ) : (
                <li className="font-semibold border border-[#333] p-1 px-4 rounded-full">
                  <SignInButton mode='modal' afterSignInUrl='/' >Join </SignInButton>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header