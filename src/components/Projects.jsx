import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'HqngEconomy',
    desc: 'Dual-currency (Money/Gem) economy plugin for Paper with MySQL/SQLite support, PlaceholderAPI hooks, public API. Has its own API designed for a specific plugin ecosystem.',
    tags: ['Kotlin', 'Gradle DSL', 'Claude Code', 'Codex'],
    link: 'https://github.com/HqngDev/HqngEconomy',
    featured: true,
  },
  {
    title: 'HqngLastLocation',
    desc: 'Lightweight Paper plugin that auto-saves players\' logout positions and lets them teleport back with a single command. Built for multi-world servers with lobby architecture.',
    tags: ['Kotlin', 'Gradle DSL'],
    link: 'https://github.com/HqngDev/HqngLastLocation',
    featured: false,
  },
  {
    title: 'HqngLogger',
    desc: 'Lightweight Paper plugin that logs player commands & chat, plus customizable join/leave messages integrated with AuthMe.',
    tags: ['Kotlin', 'Gradle DSL'],
    link: 'https://github.com/HqngDev/HqngLogger',
    featured: false,
  },
  {
    title: 'HqngTools',
    desc: 'Custom tools for Paper/Folia that enhance block breaking with area-of-effect mechanics (like DonutSMP Amethyst tool).',
    tags: ['Kotlin', 'Gradle DSL', 'Claude Code'],
    link: 'https://github.com/HqngDev/HqngTools',
    featured: true,
  },
  {
    title: 'InsureInv',
    desc: 'A flexible, charge-based inventory protection plugin for modern Minecraft servers.',
    tags: ['Kotlin', 'Gradle DSL', 'Claude'],
    link: 'https://github.com/hqng05/InsureInv',
    featured: false,
  },
  {
    title: 'Hqng-environment-detection',
    desc: 'A Java 21 library for detecting the runtime execution environment of the current JVM process.',
    tags: ['Java', 'Markdown'],
    link: 'https://github.com/HqngDev/Hqng-environment-detection',
    featured: false,
  },
  {
    title: 'hqng-i18n',
    desc: 'A platform-agnostic localization infrastructure library for JVM Applications (mainly for Bukkit).',
    tags: ['Java', 'SnakeYaml'],
    link: 'https://github.com/HqngDev/Hqng-i18n',
    featured: false,
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass glass--hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        group: true,
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '4px 10px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(34, 211, 238, 0.2))',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--accent-1)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          ✦ Featured
        </div>
      )}

      {/* Glow on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--accent-gradient)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        className="project-glow"
      />

      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
        {project.title}
      </h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, flex: 1, marginBottom: '20px' }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {project.tags.map((tag) => (
          <span key={tag} className="tech-tag">{tag}</span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-1)', fontSize: 14, fontWeight: 600 }}>
        View Project
        <motion.span
          style={{ display: 'inline-block' }}
          whileHover={{ x: 4 }}
        >
          →
        </motion.span>
      </div>
    </motion.a>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section__label">Projects</span>
          <h2 className="section__title">
            Stuff I've <span className="gradient-text">built</span>
          </h2>
          <p className="section__desc" style={{ marginBottom: '48px' }}>
            A collection of projects I've worked on — from Minecraft plugins to libraries and tools.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .glass--hover:hover .project-glow {
          opacity: 1;
        }
        @media (max-width: 400px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
