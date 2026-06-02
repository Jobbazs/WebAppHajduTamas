import { SERVICES } from '../data'

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-label">Mit kínálok</div>
        <h2 className="section-title">Szolgáltatások</h2>

        <div className="services-grid">
          {SERVICES.map(s => (
            <div key={s.id} className="service-card">
              <div className="service-number">{s.id}</div>
              <div className="service-name">{s.name}</div>
              <p className="service-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
