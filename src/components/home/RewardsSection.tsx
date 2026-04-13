import { ASSETS } from '@/lib/data'

export default function RewardsSection() {
  return (
    <>
      {/* ── DESKTOP ── */}
      <section className="rewards-desktop" style={{ position: 'relative', width: '100%', height: 693, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.rewardsBg} alt="Most Rewarding Payment Card"
          style={{ position: 'absolute', width: '100%', height: '122.94%', top: '-16.74%', left: 0, objectFit: 'cover' }} />
      </section>

      {/* ── MOBILE ── */}
      <section className="rewards-mobile" style={{ display: 'none', background: '#080808', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(0,0,0,0.46)', borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.rewardsBg} alt="Most Rewarding Payment Card"
            style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', opacity: 0.8 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
          {/* Benefits text overlay */}
          <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                '🎁 Benefits worth ₹60,000 in NeoZAP App',
                '🤑 Get 4% Gold cashback on your spends',
                '🍿 FREE PVR Movie Tickets worth ₹300',
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 14, color: '#dfdfdf', textAlign: 'center', lineHeight: '28px' }}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .rewards-desktop { display: none !important; }
          .rewards-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}
