import { lazy, Suspense } from 'react'
import Hero from './components/hero/Hero'
import Navigation from './components/Navigation'
import ParallaxBackground from './components/ParallaxBackground'

const Expertise = lazy(() => import('./components/expertise/Expertise'))
const Projects = lazy(() => import('./components/projects/Projects'))
const Footer = lazy(() => import('./components/footer/Footer'))

export default function App() {
  return (
    <>
      <ParallaxBackground />
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Expertise />
        </Suspense>
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
    </>
  )
}
