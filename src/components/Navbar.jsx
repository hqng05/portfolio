import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'About', href: '#about', type: 'hash' },
  { label: 'Projects', href: '#projects', type: 'hash' },
  { label: 'Skills', href: '#skills', type: 'hash' },
  { label: 'Contact', href: '#contact', type: 'hash' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isNuoihuy = location.pathname.includes('nuoihuy')

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Toggle between home and nuoihuy, always scroll to top smoothly
  const handleToggle = useCallback((e) => {
    e.preventDefault()
    if (isNuoihuy) {
      navigate('/')
    } else {
      navigate('/nuoihuy')
    }
    // Smooth scroll to top after a tiny tick so navigation fires first
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [isNuoihuy, navigate])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(7, 7, 15, 0.7)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo — always goes home */}
          <Link
            to="/"
            onClick={() => {
              requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              })
            }}
            style={{ textDecoration: 'none', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            <motion.span className="gradient-text" whileHover={{ scale: 1.05 }}>hqng</motion.span>
            <span style={{ color: 'var(--text-muted)' }}>05</span>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Only show section links on home page */}
            {!isNuoihuy && navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => {
                  const id = link.href.replace('#', '')
                  const el = document.getElementById(id)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  fontFamily: 'inherit',
                  transition: 'all 0.25s ease',
                }}
                whileHover={{
                  color: 'var(--text-primary)',
                  background: 'rgba(255,255,255,0.06)',
                }}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Toggle button: home ↔ nuoihuy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.button
                onClick={handleToggle}
                className="btn"
                style={{
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  background: isNuoihuy
                    ? 'var(--accent-gradient)'
                    : 'var(--glass-bg)',
                  border: `1px solid ${isNuoihuy ? 'rgba(167,139,250,0.5)' : 'var(--glass-border)'}`,
                  color: isNuoihuy ? '#fff' : 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: 'var(--radius-md)',
                  backdropFilter: 'var(--glass-blur)',
                  WebkitBackdropFilter: 'var(--glass-blur)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isNuoihuy ? (
                  <>
                    <span>←</span>
                    <span>Portfolio</span>
                  </>
                ) : (
                  <>
                    <span>☕</span>
                    <span>Support</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: 'var(--text-primary)',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'all 0.3s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </motion.button>
        </div>

        {/* Mobile menu styles */}
        <style>{`
          @media (max-width: 768px) {
            .nav-links { display: none !important; }
            .nav-hamburger { display: flex !important; }
          }
        `}</style>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(7, 7, 15, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {!isNuoihuy && navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => {
                  setMobileOpen(false)
                  // Small delay so mobile menu closes first, then scroll
                  setTimeout(() => {
                    const id = link.href.replace('#', '')
                    const el = document.getElementById(id)
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 100)
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                style={{
                  padding: '16px 32px',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background 0.2s',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.05)' }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.button
                onClick={handleToggle}
                className="btn btn--primary"
                style={{
                  fontSize: 18,
                  padding: '14px 32px',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isNuoihuy ? '← Portfolio' : '☕ Support Me'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
