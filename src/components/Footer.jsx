import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      padding: '32px 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: 14, color: 'var(--text-muted)' }}
        >
          © {new Date().getFullYear()} <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>hqng05</span>. Built with ☕ and code.
        </motion.p>

        {/* Support link */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/nuoihuy"
            style={{
              fontSize: 13,
              color: 'var(--accent-3)',
              textDecoration: 'none',
              fontWeight: 600,
              opacity: 0.7,
              transition: 'opacity 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            💖 Support My Work
          </Link>
        </motion.div>
      </div>
    </footer>
  )
}
