import { useState, useEffect } from 'react'
import { OWNER } from '../data'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Bezárja a menüt ESC-re
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Body scroll lock mobilmenü nyitásakor
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, menuOpen ? 300 : 0)
  }

  const links = [
    { id: 'about',     label: 'Rólam' },
    { id: 'portfolio', label: 'Portfólió' },
    { id: 'services',  label: 'Szolgáltatások' },
    { id: 'contact',   label: 'Kapcsolat' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <div
          className="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {OWNER.nameShort}<span className="logo-accent">.</span>
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={e => { e.preventDefault(); scrollTo(l.id) }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobil menü panel */}
      <div
        className={`nav-mobile ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {links.map(l => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={e => { e.preventDefault(); scrollTo(l.id) }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}
