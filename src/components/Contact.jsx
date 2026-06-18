import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const contacts = [
  {
    icon: '📧',
    label: 'Email',
    value: 'contact@qhuyy.tech',
    href: 'mailto:contact@qhuyy.tech',
    color: '#a78bfa',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/wh2sperx',
    href: 'https://github.com/wh2sperx',
    color: '#22d3ee',
  },
  {
    icon: '💬',
    label: 'Discord',
    value: '@hqng05',
    href: 'https://discord.com/users/1262316486673043472',
    color: '#f472b6',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: 'center' }}
        >
          <span className="section__label" style={{ justifyContent: 'center' }}>Contact</span>
          <h2 className="section__title" style={{ margin: '0 auto 16px' }}>
            Let's <span className="gradient-text">connect</span>
          </h2>
          <p className="section__desc" style={{ margin: '0 auto 48px', textAlign: 'center' }}>
            Want to work together or just say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: 560,
          margin: '0 auto',
        }}>
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass--hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '24px 28px',
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
                minWidth: 0,
                boxSizing: 'border-box',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: `${c.color}15`,
                  border: `1px solid ${c.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>
                  {c.label}
                </div>
                <div style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {c.value}
                </div>
              </div>
              <div
                style={{ color: 'var(--text-muted)', fontSize: 18, flexShrink: 0 }}
              >
                →
              </div>
            </motion.a>
          ))}
        </div>

        {/* Big CTA */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '48px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="mailto:contact@qhuyy.tech"
            className="btn btn--primary"
            style={{ padding: '16px 40px', fontSize: 16 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✉ Send me an email
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
