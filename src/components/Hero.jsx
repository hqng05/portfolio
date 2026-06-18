import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12 + 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Hero() {
  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          {/* Text */}
          <div style={{ flex: '1 1 420px' }}>
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '100px',
                background: 'rgba(167, 139, 250, 0.1)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--accent-1)',
                letterSpacing: '0.5px',
                marginBottom: '24px',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-2)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '8px',
              }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">hqng05</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 22px)',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                marginBottom: '12px',
                lineHeight: 1.5,
              }}
            >
              A beginner system engineer from <span style={{ color: 'var(--accent-3)', fontWeight: 600 }}>Viet Nam</span> :3
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 16,
                color: 'var(--text-muted)',
                marginBottom: '36px',
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              I like makin' stuff for the web — clean UI, interactive experiences, tools that actually work. Into competitive programming, Minecraft modding, and app dev.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <motion.a
                href="#projects"
                className="btn btn--primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects ↓
              </motion.a>
              <motion.a
                href="#contact"
                className="btn btn--ghost"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch →
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                display: 'flex',
                gap: '32px',
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {[
                { value: '15', label: 'Years Old' },
                { value: '7+', label: 'Projects' },
                { value: '3', label: 'Languages' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}
          >
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: 'var(--accent-gradient-subtle)',
                border: '2px solid rgba(167, 139, 250, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, var(--accent-1), var(--accent-2), var(--accent-3), var(--accent-1))',
                  opacity: 0.3,
                  animation: 'spin 8s linear infinite',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 4,
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                }}
              />
              <img
                src="/avatar.svg"
                alt="hqng05 avatar"
                style={{
                  width: 160,
                  height: 160,
                  position: 'relative',
                  zIndex: 1,
                  imageRendering: 'pixelated',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
