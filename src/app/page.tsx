import About from '@/components/about'
import Hero from '@/components/hero'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto">
      {/* hero */}
      <Hero />

      {/* about */}
      <About />

      
    </main>
  )
}
