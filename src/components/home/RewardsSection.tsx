import Link from 'next/link'
import { ASSETS } from '@/lib/data'

export default function RewardsSection() {
  return (
    <>
      {/* ── DESKTOP ── */}
      <section className="rewards-desktop" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Link href="/collection" style={{ display: 'block' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.rewardsBg} alt="Most Rewarding Payment Card"
            style={{ width: '100%', height: 'auto', display: 'block' }} />
        </Link>
      </section>

      {/* ── MOBILE ── */}
      <section className="rewards-mobile" style={{ display: 'none', background: '#080808', width: '100%' }}>
        <Link href="/collection" style={{ display: 'block' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.rewardsBgMobile} alt="Most Rewarding Payment Card"
            style={{ width: '100%', height: 'auto', display: 'block' }} />
        </Link>
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
