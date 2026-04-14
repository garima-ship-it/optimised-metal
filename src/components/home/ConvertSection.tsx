import Link from 'next/link'
import { ASSETS } from '@/lib/data'

export default function ConvertSection() {
  return (
    <>
      <section className="conv-desktop" style={{ background: 'black', width: '100%', height: 640, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: -304, top: -260, width: 766, height: 766, pointerEvents: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.convertGlow} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
        <video autoPlay loop muted playsInline
          style={{ position: 'absolute', right: 111, top: '50%', transform: 'translateY(calc(-50% + 18px))', width: 537, height: 363, objectFit: 'cover', borderRadius: 12 }}>
          <source src="/videos/convert-card.webm" type="video/webm" />
          <source src="/videos/convert-card.mp4" type="video/mp4" />
        </video>
        <p style={{ position: 'absolute', left: 85, top: 84, fontSize: 26, color: '#d6d6d6' }}>Don&apos;t want a new card?</p>
        <h2 className="text-gradient-silver" style={{ position: 'absolute', left: 85, top: 149, fontSize: 55, fontWeight: 800, lineHeight: '66px', width: 660 }}>
          Convert Your Plastic Payment Card to Metal
        </h2>
        <div style={{ position: 'absolute', left: 85, top: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 22, color: 'rgba(214,214,214,0.82)' }}>Works like your existing payment card</p>
          <p style={{ fontSize: 22, color: 'rgba(214,214,214,0.82)' }}>FREE Movie Tickets worth <strong style={{ color: 'white' }}>₹300</strong></p>
        </div>
        <Link href="/collection"
          style={{ position: 'absolute', left: 85, top: 484, background: 'white', borderRadius: 13, height: 79, width: 377, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
          <span style={{ fontSize: 23, fontWeight: 600, color: 'black', whiteSpace: 'nowrap' }}>Explore Luxury Finishes</span>
        </Link>
      </section>

      <section className="conv-mobile" style={{ display: 'none', background: 'black', padding: '40px 22px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -200, top: -200, width: 500, height: 500, pointerEvents: 'none', opacity: 0.6 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.convertGlow} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
        <p style={{ fontSize: 14, color: '#d6d6d6', textAlign: 'center', marginBottom: 8, position: 'relative' }}>Don&apos;t want a new card?</p>
        <h2 className="text-gradient-silver" style={{ fontSize: 35, fontWeight: 800, lineHeight: '42px', textAlign: 'center', marginBottom: 16, position: 'relative' }}>
          Convert Your Plastic Payment Card to Metal
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, position: 'relative' }}>
          <p style={{ fontSize: 16, color: 'rgba(214,214,214,0.82)', textAlign: 'center' }}>Works like your existing payment card</p>
          <p style={{ fontSize: 16, color: 'rgba(214,214,214,0.82)', textAlign: 'center' }}>FREE Movie Tickets worth <strong style={{ color: 'white' }}>₹300</strong></p>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', marginBottom: 20 }} />
        <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 24, background: '#111' }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block', borderRadius: 12 }}>
            <source src="/videos/convert-card.webm" type="video/webm" />
            <source src="/videos/convert-card.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/collection"
            style={{ background: 'white', borderRadius: 13, height: 45, width: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <span style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>Buy Now</span>
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .conv-desktop { display: none !important; }
          .conv-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}