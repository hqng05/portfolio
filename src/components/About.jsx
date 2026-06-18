import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const facts = [
    { icon: '🎂', label: 'Age', value: '15' },
    { icon: '📍', label: 'Location', value: 'Lam Dong, VN' },
    { icon: '🎓', label: 'Education', value: 'Middle School' },
    { icon: '💼', label: 'Status', value: 'Open to Work' },
  ]

  return (
    <section className="section" id="about">
      <div className="container">
        <AnimatedSection>
          <span className="section__label">About Me</span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="section__title">
            Get to know<br />
            <span className="gradient-text">who I am</span>
          </h2>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '48px' }}>
          {/* Bio Card */}
          <AnimatedSection delay={0.2}>
            <div className="glass glass--hover" style={{ padding: '36px', height: '100%' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: '16px' }}>
                👋 Hello there!
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
                I'm <strong style={{ color: 'var(--text-primary)' }}>Bui Doan Quang Huy</strong> (hqng05), a passionate developer from Viet Nam. I love building clean, interactive web experiences and tools that solve real problems.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
                When I'm not coding, you'll find me deep in <strong style={{ color: 'var(--accent-1)' }}>competitive programming</strong> (optimizing 'til 3AM, don't judge), working on <strong style={{ color: 'var(--accent-2)' }}>Minecraft plugins</strong> with Bukkit, or tinkering with <strong style={{ color: 'var(--accent-3)' }}>Android apps</strong>.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 14 }}>
                I believe in writing clean code, learning constantly, and building things that make a difference — no matter how small.
              </p>
            </div>
          </AnimatedSection>

          {/* Quick Facts */}
          <AnimatedSection delay={0.3}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  className="glass glass--hover"
                  style={{ padding: '24px', textAlign: 'center' }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div style={{ fontSize: 28, marginBottom: '8px' }}>{fact.icon}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {fact.label}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {fact.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Interests */}
        <AnimatedSection delay={0.4}>
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Things I'm passionate about
            </h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Competitive Programming', 'Minecraft Modding', 'Web Development', 'Open Source', 'System Design', 'UI/UX'].map((interest) => (
                <motion.span
                  key={interest}
                  className="tech-tag"
                  whileHover={{ scale: 1.08, y: -2 }}
                  style={{ cursor: 'default' }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
