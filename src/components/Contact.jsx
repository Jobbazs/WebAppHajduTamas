import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { SERVICE_OPTIONS } from '../data'

const EMPTY = { name: '', email: '', service: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState(EMPTY)
  const [status, setStatus]   = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg]   = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!form.name.trim())    return 'Kérlek add meg a neved.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                               return 'Érvényes email szükséges.'
    if (!form.message.trim()) return 'Az üzenet mező nem lehet üres.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setErrMsg(err); return }

    setStatus('sending')
    setErrMsg('')

    const { error } = await supabase.from('messages').insert({
      name:    form.name.trim(),
      email:   form.email.trim(),
      service: form.service || 'Nem megadott',
      message: form.message.trim(),
      read:    false,
    })

    if (error) {
      console.error(error)
      setErrMsg('Hiba történt az elküldés során. Kérlek próbáld újra.')
      setStatus('error')
    } else {
      setStatus('success')
      setForm(EMPTY)
    }
  }

  return (
    <section id="contact">
      <div className="container contact-inner">

        <div className="section-label">Írj nekem</div>
        <h2 className="section-title">Kapcsolat</h2>
        <p className="contact-intro">
          Legyen szó rendezvényről, klippről vagy egyedi projektről – szívesen hallom az elképzeléseidet.
        </p>

        {status === 'success' ? (
          <div className="form-success">
            ✓ &nbsp; Üzeneted megérkezett! Hamarosan visszajelzek.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Neved</label>
                <input
                  id="name" name="name" type="text"
                  className="form-input"
                  placeholder="Kis János"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email" name="email" type="email"
                  className="form-input"
                  placeholder="valaki@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">Szolgáltatás</label>
              <select
                id="service" name="service"
                className="form-input"
                value={form.service}
                onChange={handleChange}
              >
                {SERVICE_OPTIONS.map(o => (
                  <option key={o} value={o === 'Válassz...' ? '' : o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Üzeneted</label>
              <textarea
                id="message" name="message"
                className="form-input"
                placeholder="Meséld el az elképzelésed..."
                rows={6}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {errMsg && <div className="form-error">{errMsg}</div>}

            <button
              type="submit"
              className="submit-btn"
              disabled={status === 'sending'}
            >
              <span>{status === 'sending' ? 'Küldés...' : 'Üzenet küldése →'}</span>
            </button>

          </form>
        )}

      </div>
    </section>
  )
}
