import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Nuoihuy from './components/Nuoihuy'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}

// Scroll to top smoothly on every route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AnimatePresence>
        <div style={{ minHeight: '100vh' }}>
          {/* Animated gradient background orbs */}
          <div className="bg-orbs">
            <div className="bg-orb bg-orb--1" />
            <div className="bg-orb bg-orb--2" />
            <div className="bg-orb bg-orb--3" />
          </div>

          {/* Navigation */}
          <Navbar />

          {/* Routes */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nuoihuy" element={<Nuoihuy />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </AnimatePresence>
    </HashRouter>
  )
}
