import Hero from './components/hero/Hero'
import Expertise from './components/expertise/Expertise'
import Projects from './components/projects/Projects'
import Footer from './components/footer/Footer'
import Navigation from './components/Navigation'
import ParallaxBackground from './components/ParallaxBackground'

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
