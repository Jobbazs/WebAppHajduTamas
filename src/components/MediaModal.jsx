import { useEffect, useRef, useCallback } from 'react'

/*
  Props:
    item     – a kiválasztott portfólió elem (vagy null ha nincs megnyitva)
    items    – az összes visible elem tömbje (navigációhoz)
    onClose  – bezárás callback
    onPrev   – előző callback
    onNext   – következő callback
*/
export default function MediaModal({ item, items, onClose, onPrev, onNext }) {
  const videoRef = useRef(null)

  // ESC / nyíl billentyűk
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')     onClose()
    if (e.key === 'ArrowLeft')  onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    if (!item) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [item, handleKey])

  // Videó megállítása navigációkor
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [item?.id])

  if (!item) return null

  const isVideo   = item.category === 'video'
  const currentIdx = items.findIndex(i => i.id === item.id)
  const total      = items.length

  // Cloudinary: ha képURL-ből nagy verziót kérünk (w_1600)
  const fullUrl = item.cloudinaryUrl
    ? item.cloudinaryUrl.replace(/w_\d+/, 'w_1600').replace(/q_\d+/, 'q_90')
    : item.cloudinaryUrl

  // Videó URL – Cloudinary video/upload path
  const videoUrl = item.videoUrl || null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Fejléc */}
        <div className="modal-header">
          <div className="modal-meta">
            <span className="modal-title">{item.title}</span>
            <span className="modal-counter">{currentIdx + 1} / {total}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Bezár">✕</button>
        </div>

        {/* Médiatartalom */}
        <div className="modal-media">

          {isVideo && videoUrl ? (
            // ── VIDEÓ LEJÁTSZÓ ──
            <video
              ref={videoRef}
              className="modal-video"
              src={videoUrl}
              controls
              autoPlay
              playsInline
              poster={item.cloudinaryUrl}
            />
          ) : isVideo && !videoUrl ? (
            // ── VIDEÓ URL HIÁNYZIK ──
            <div className="modal-no-video">
              <div className="modal-no-video-icon">▶</div>
              <p>Videó URL nincs megadva.</p>
              <p className="modal-no-video-hint">
                Add hozzá a <code>videoUrl</code> mezőt a <code>data.js</code>-ben.
              </p>
            </div>
          ) : (
            // ── LIGHTBOX KÉP ──
            <img
              className="modal-image"
              src={fullUrl || item.cloudinaryUrl}
              alt={item.title}
              draggable={false}
            />
          )}

        </div>

        {/* Navigáció */}
        <div className="modal-nav">
          <button
            className="modal-nav-btn"
            onClick={onPrev}
            disabled={total <= 1}
            aria-label="Előző"
          >
            ← Előző
          </button>

          {/* Thumbnail sáv */}
          <div className="modal-thumbs">
            {items.map((it, idx) => (
              <button
                key={it.id}
                className={`modal-thumb ${it.id === item.id ? 'active' : ''}`}
                onClick={() => {
                  // parent-ben kezeljük index alapján
                  const diff = idx - currentIdx
                  if (diff > 0) for (let i = 0; i < diff; i++) onNext()
                  if (diff < 0) for (let i = 0; i < Math.abs(diff); i++) onPrev()
                }}
                aria-label={it.title}
              >
                {it.cloudinaryUrl ? (
                  <img
                    src={it.cloudinaryUrl.replace(/w_\d+/, 'w_120').replace(/q_\d+/, 'q_60')}
                    alt={it.title}
                    draggable={false}
                  />
                ) : (
                  <div className="modal-thumb-placeholder">
                    {it.category === 'video' ? '▶' : '·'}
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            className="modal-nav-btn"
            onClick={onNext}
            disabled={total <= 1}
            aria-label="Következő"
          >
            Következő →
          </button>
        </div>

      </div>
    </div>
  )
}
