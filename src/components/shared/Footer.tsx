import Link from 'next/link'
import { ASSETS } from '@/lib/data'

export default function Footer() {
  const paymentLogos = [
    { src: ASSETS.payVisa, alt: 'Visa' },
    { src: ASSETS.payMastercard, alt: 'Mastercard' },
    { src: ASSETS.payPhonePe, alt: 'PhonePe' },
    { src: ASSETS.payRazorpay, alt: 'Razorpay' },
    { src: ASSETS.payGPay, alt: 'Google Pay' },
  ]

  return (
    <>
      {/* ── DESKTOP ── */}
      <footer className="footer-desktop" style={{ background: 'black', borderTop: '1px solid rgba(30,41,57,0.5)', padding: '40px 179px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div className="footer-logo-text" style={{ marginBottom: 8 }}>NeoZAP</div>
            <div style={{ fontSize: 14, color: '#6a7282', lineHeight: 1.6 }}>
              Premium metal credit cards with<br />laser-engraved designs.
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            {[{ label: 'Home', href: '/' }, { label: 'Collection', href: '/collection' }, { label: 'Contact', href: '#' }, { label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Refunds', href: '#' }].map(link => (
              <Link key={link.label} href={link.href} style={{ fontSize: 14, color: '#99a1af', textDecoration: 'none' }}>{link.label}</Link>
            ))}
          </nav>
          <div>
            <a href="tel:+918421373429" style={{ display: 'block', fontSize: 14, color: '#99a1af', textDecoration: 'none', marginBottom: 4 }}>+91 8421373429</a>
            <a href="mailto:support@neofinity.in" style={{ display: 'block', fontSize: 14, color: '#99a1af', textDecoration: 'none' }}>support@neofinity.in</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(30,41,57,0.5)', paddingTop: 25, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {paymentLogos.map(p => (
              <div key={p.alt} style={{ background: 'white', borderRadius: 4, height: 20, padding: '0 4px', display: 'flex', alignItems: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} style={{ height: 14, width: 'auto', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#99a1af' }}>© 2026 NeoZAP. All rights reserved.</p>
        </div>
      </footer>

      {/* ── MOBILE ── */}
      <footer className="footer-mobile" style={{ display: 'none', background: 'black', borderTop: '1px solid rgba(30,41,57,0.5)', padding: '32px 20px 24px' }}>
        <div className="footer-logo-text" style={{ marginBottom: 8 }}>NeoZAP</div>
        <div style={{ fontSize: 13, color: '#6a7282', lineHeight: 1.6, marginBottom: 20 }}>
          Premium metal credit cards with laser-engraved designs.
        </div>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', marginBottom: 24 }}>
          {[{ label: 'Home', href: '/' }, { label: 'Collection', href: '/collection' }, { label: 'Contact', href: '#' }, { label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Refunds', href: '#' }].map(link => (
            <Link key={link.label} href={link.href} style={{ fontSize: 13, color: '#99a1af', textDecoration: 'none' }}>{link.label}</Link>
          ))}
        </nav>
        <div style={{ borderTop: '1px solid rgba(30,41,57,0.5)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {paymentLogos.map(p => (
              <div key={p.alt} style={{ background: 'white', borderRadius: 4, height: 20, padding: '0 4px', display: 'flex', alignItems: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} style={{ height: 14, width: 'auto', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#99a1af' }}>© 2026 NeoZAP. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .footer-desktop { display: none !important; }
          .footer-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}
