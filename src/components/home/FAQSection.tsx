'use client'
import { useState } from 'react'
import { FAQ_ITEMS } from '@/lib/data'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      {/* ── DESKTOP ── */}
      <section className="faq-desktop" style={{ background: '#0a0a0a', padding: '60px 79px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Common Questions &amp; Answers</h2>
        <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 40, maxWidth: 500 }}>
          Find out all the essential details about our platform and how it can serve your needs.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: 25, height: 25, borderRadius: 4, background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15, fontWeight: 600, color: 'white' }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'white', flex: 1 }}>{item.q}</span>
                <span style={{ color: '#6b7280', fontSize: 18 }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p style={{ paddingLeft: 41, paddingBottom: 16, fontSize: 13, color: '#6b7280', lineHeight: '20px' }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── MOBILE ── */}
      <section className="faq-mobile" style={{ display: 'none', background: '#0a0a0a', padding: '40px 20px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: 8 }}>Common Questions &amp; Answers</h2>
        <p style={{ fontSize: 15, color: '#9ca3af', textAlign: 'center', marginBottom: 32, maxWidth: 264, margin: '0 auto 32px' }}>
          Find out all the essential details about our platform and how it can serve your needs.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: 25, height: 25, borderRadius: 4, background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15, fontWeight: 600, color: 'white' }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'white', flex: 1 }}>{item.q}</span>
                <span style={{ color: '#6b7280', fontSize: 18 }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p style={{ paddingLeft: 39, paddingBottom: 14, fontSize: 10, color: '#6b7280', lineHeight: '18px' }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .faq-desktop { display: none !important; }
          .faq-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}
