import About from '@/components/about'
import Gallery from '@/components/gallery'
import Hero from '@/components/hero'

import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      {/* hero */}
      <Hero />

      {/* about */}
      {/* <About /> */}

      {/* gallery */}
      <Gallery />
      
    </main>
  )
}
