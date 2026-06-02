import { useState, useCallback } from 'react'
import { PORTFOLIO_ITEMS, FILTER_LABELS } from '../data'
import MediaModal from './MediaModal'

const FILTERS = ['all', 'event', 'portrait', 'video', 'urbex']

const SPAN_CLASS = {
  large:  'port-item-large',
  medium: 'port-item-medium',
  small:  'port-item-small',
}

export default function Portfolio() {
  const [active,   setActive]   = useState('all')
  const [selected, setSelected] = useState(null) // megnyitott item

  const visible = active === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(i => i.category === active)

  const openModal = (item) => setSelected(item)
  const closeModal = () => setSelected(null)

  const goNext = useCallback(() => {
    if (!selected) return
    const idx = visible.findIndex(i => i.id === selected.id)
    setSelected(visible[(idx + 1) % visible.length])
  }, [selected, visible])

  const goPrev = useCallback(() => {
    if (!selected) return
    const idx = visible.findIndex(i => i.id === selected.id)
    setSelected(visible[(idx - 1 + visible.length) % visible.length])
  }, [selected, visible])

  return (
    <>
      <section id="portfolio">
        <div className="container">

          <div className="portfolio-header">
            <div>
              <div className="section-label">Munkáim</div>
              <h2 className="section-title">Portfólió</h2>
            </div>

            <div className="portfolio-filters">
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`filter-btn ${active === f ? 'active' : ''}`}
                  onClick={() => { setActive(f); setSelected(null) }}
                >
                  {FILTER_LABELS[f]}
                </button>
              ))}
            </div>
          </div>

          <div className="portfolio-grid">
            {visible.map(item => (
              <div
                key={item.id}
                className={`port-item ${SPAN_CLASS[item.span] || 'port-item-medium'}`}
                onClick={() => openModal(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openModal(item)}
              >
                {item.cloudinaryUrl ? (
                  <img
                    src={item.cloudinaryUrl}
                    alt={item.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="port-placeholder">{item.title}</div>
                )}

                <div className="port-overlay">
                  <span className="port-label">{item.title}</span>
                  {/* Videó ikon ha van videoUrl */}
                  {item.category === 'video' && (
                    <span className="port-play-icon">▶</span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      <MediaModal
        item={selected}
        items={visible}
        onClose={closeModal}
        onNext={goNext}
        onPrev={goPrev}
      />
    </>
  )
}
