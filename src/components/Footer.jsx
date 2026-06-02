import { OWNER } from '../data'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        {OWNER.nameShort}<span className="logo-accent">.</span>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} — {OWNER.location}</div>
      <div className="footer-socials">
        <a href={OWNER.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a href={OWNER.tiktok}    target="_blank" rel="noreferrer">TikTok</a>
        <a href={OWNER.behance}   target="_blank" rel="noreferrer">Behance</a>
      </div>
    </footer>
  )
}
