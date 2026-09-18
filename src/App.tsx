import Expertise from './components/expertise/Expertise'
import Footer from './components/footer/Footer'
import Hero from './components/hero/Hero'
import Navigation from './components/Navigation'
import ParallaxBackground from './components/ParallaxBackground'
import Projects from './components/projects/Projects'

export default function App() {
  return (
    <>
      <ParallaxBackground />
      <Navigation />
      <main>
        <Hero />
        <Expertise />
        <Projects />
        <Footer />
      </main>
    </>
  )
}
