import { OWNER } from '../data'

export default function About() {
  return (
    <section id="about">
      <div className="container about-grid">

        {/* Kép */}
        <div className="about-img-frame">
          {OWNER.portraitUrl ? (
            <img src={OWNER.portraitUrl} alt={OWNER.name} />
          ) : (
            <div className="about-img-placeholder">
              [ PORTRÉ FOTÓ ]
            </div>
          )}
        </div>

        {/* Szöveg */}
        <div>
          <div className="section-label">Rólam</div>
          <h2 className="section-title">A kamera<br />mögött</h2>

          <p className="body-text">
            Budapesti fotós és videós vagyok, aki <em>bulik, rendezvények és underground helyszínek</em> dokumentálására specializálódott. Az Arsenal és a hasonló helyek a természetes közegem.
          </p>
          <p className="body-text">
            Kezdő videoklipp-forgató – hiszek abban, hogy a mozgókép ugyanolyan nyers igazságot tud mutatni, mint egy jó állókép. <em>Portrékon, urbex helyszíneken és utcán</em> is otthon vagyok.
          </p>
          <p className="body-text">
            Nem szépítem az életet. Megmutatom, ahogy van.
          </p>

          <div className="about-tags">
            {['Rendezvény', 'Rave / Buli', 'Videóklipp', 'Portré', 'Urbex'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
