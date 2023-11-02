import About from '@/components/about'
import Gallery from '@/components/gallery'
import Hero from '@/components/hero'
import Links from '@/components/links'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto">
      {/* hero */}
      <Hero />

      {/* about */}
      <About />

      {/* links grid? */}
      {/* <Links /> */}

      {/* gallery */}
      <Gallery />
      
    </main>
  )
}
