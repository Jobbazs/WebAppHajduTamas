import { OWNER } from '../data'

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero">
      <div className="hero-bg" />

      <div className="hero-year">EST. 2021 — BUDAPEST</div>

      <div className="hero-content">
        <div className="hero-eyebrow">{OWNER.title}</div>

        <h1 className="hero-title">
          Ahol a fény<br />
          <span className="accent">meghal.</span>
        </h1>

        <p className="hero-subtitle">
          Rendezvények, underground helyszínek, portrék és urbex — <br /> a képek, amelyek megmaradnak.
        </p>

        <button className="hero-cta" onClick={() => scrollTo('portfolio')}>
          <span>Portfólió megtekintése</span>
        </button>
      </div>

      <div className="scroll-hint">
        <span>Görgess</span>
      </div>
    </section>
  )
}
