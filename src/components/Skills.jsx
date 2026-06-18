import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
  {
    title: 'Languages',
    icon: '🧑‍💻',
    color: '#a78bfa',
    skills: ['Java', 'Kotlin', 'C++', 'C#', 'Python', 'Go'],
  },
  {
    title: 'Frameworks',
    icon: '⚡',
    color: '#22d3ee',
    skills: ['React', 'Spring Boot', 'Flutter'],
  },
  {
    title: 'Tools',
    icon: '🛠️',
    color: '#f472b6',
    skills: ['Git', 'JetBrains', 'VS Code', 'Docker'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section__label">Skills</span>
          <h2 className="section__title">
            My <span className="gradient-text">tech stack</span>
          </h2>
          <p className="section__desc" style={{ marginBottom: '48px' }}>
            Technologies I work with on a daily basis — always learning, always growing.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: '24px' }}>
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className="glass"
              style={{ padding: '32px' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: 24 }}>{cat.icon}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{cat.title}</h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
              >
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={chipVariants}
                    whileHover={{
                      scale: 1.1,
                      y: -4,
                      boxShadow: `0 8px 24px ${cat.color}33`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-md)',
                      background: `${cat.color}10`,
                      border: `1px solid ${cat.color}25`,
                      fontSize: 14,
                      fontWeight: 600,
                      color: cat.color,
                      cursor: 'default',
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
