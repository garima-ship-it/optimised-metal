import Link from 'next/link'
import { ASSETS } from '@/lib/data'

export default function HeroSection() {
  const benefits = [
    { icon1: ASSETS.benefitMovie1,  icon2: ASSETS.benefitMovie2,  rot1: '-14.69deg', rot2: '7.83deg',  label: '20% Off on\nMovie Tickets' },
    { icon1: ASSETS.benefitFood1,   icon2: ASSETS.benefitFood2,   rot1: '-15deg',    rot2: '56.45deg', label: '14% Off on\nFood & Dining' },
    { icon1: ASSETS.benefitTravel1, icon2: ASSETS.benefitTravel2, rot1: '-15deg',    rot2: '8deg',     label: '4% Off on\nTravel Booking' },
  ]

  return (
    <>
      {/* ── DESKTOP HERO ── */}
      <section className="hero-desktop" style={{ position: 'relative', background: '#040404', width: '100%', height: 640, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/heroCard.png" alt="NeoZAP Metal Card"
          style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 'auto', pointerEvents: 'none' }} />
        <h1 className="text-gradient-silver" style={{ position: 'absolute', left: 70, top: 80, fontSize: 54, fontWeight: 800, lineHeight: '58px', width: 562, zIndex: 3 }}>
          Get India&apos;s First Prepaid Metal Card
        </h1>
        <p style={{ position: 'absolute', left: 70, top: 220, fontSize: 20, color: '#dcdcdc', zIndex: 3 }}>
          Get 4% unlimited cashback on every spend
        </p>
        <div style={{ position: 'absolute', left: 71, top: 272, display: 'flex', gap: 14, zIndex: 3 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ border: '0.3px solid rgba(255,255,255,0.7)', borderRadius: 10, width: 140, height: 128, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 14, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon1} alt="" style={{ width: 35, height: 35, borderRadius: 4, objectFit: 'cover', transform: `rotate(${b.rot1})` }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon2} alt="" style={{ width: 35, height: 35, borderRadius: 4, objectFit: 'cover', transform: `rotate(${b.rot2})` }} />
              </div>
              <div style={{ position: 'absolute', bottom: 9, left: 0, right: 0, textAlign: 'center', fontSize: 15, color: '#ededed', lineHeight: '18px', whiteSpace: 'pre-line' }}>
                {b.label}
              </div>
            </div>
          ))}
        </div>
        <Link href="/collection" style={{ position: 'absolute', left: 70, top: 424, background: 'white', borderRadius: 8, height: 48, width: 228, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', zIndex: 3 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'black' }}>Buy Now at <span style={{ fontSize: 13, color: '#888', textDecoration: 'line-through' }}>₹5999</span> ₹2999</span>
        </Link>
        <p style={{ position: 'absolute', left: 70, top: 496, fontSize: 16, color: '#9ca3af', zIndex: 3 }}>Powered by</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.visaLogo} alt="Visa" style={{ position: 'absolute', left: 166, top: 502, height: 19, width: 71, objectFit: 'cover', zIndex: 3 }} />
      </section>

      {/* ── MOBILE HERO ── */}
      <section className="hero-mobile" style={{ display: 'none', background: '#040404', width: '100%', overflow: 'hidden', position: 'relative', paddingBottom: 32 }}>

        <h1 className="text-gradient-silver" style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, lineHeight: '38px', padding: '16px 26px 0', marginBottom: 12 }}>
          Get India&apos;s First Prepaid Metal Card
        </h1>
        <p style={{ textAlign: 'center', fontSize: 18, color: '#9ca3af', padding: '0 10px', marginBottom: 20 }}>
          Get 4% unlimited cashback on every spend
        </p>

        {/* Mobile hero image — separate image uploaded as homeCard mob.png */}
        <div style={{ width: '100%', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/homeCard%20mob.png" alt="NeoZAP Metal Card"
            style={{ width: '100%', display: 'block' }} />
        </div>

        {/* Benefit boxes */}
        <div style={{ display: 'flex', gap: 8, padding: '20px 10px 0', justifyContent: 'center' }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ border: '0.3px solid rgba(255,255,255,0.7)', borderRadius: 10, width: 98, height: 90, position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 2 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon1} alt="" style={{ width: 25, height: 25, borderRadius: 3, objectFit: 'cover', transform: `rotate(${b.rot1})` }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon2} alt="" style={{ width: 25, height: 25, borderRadius: 3, objectFit: 'cover', transform: `rotate(${b.rot2})` }} />
              </div>
              <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#ffffff', lineHeight: '14px', whiteSpace: 'pre-line' }}>
                {b.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <Link href="/collection" style={{ background: 'white', borderRadius: 10, height: 48, width: 226, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: 'black' }}>Buy Now at <span style={{ fontSize: 13, color: '#888', textDecoration: 'line-through' }}>₹5999</span> ₹2999</span>
          </Link>
        </div>

        {/* Powered by */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
          <span style={{ fontSize: 10, color: '#9ca3af' }}>Powered By</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.visaLogo} alt="Visa" style={{ height: 14, width: 53, objectFit: 'cover' }} />
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-desktop { display: none !important; }
          .hero-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}
