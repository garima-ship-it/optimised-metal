import { ASSETS } from '@/lib/data'

export default function RewardsSection() {
  return (
    <>
      <section className="rewards-desktop" style={{ position: 'relative', width: '100%', height: 693, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.rewardsBg} alt="Most Rewarding Payment Card"
          style={{ position: 'absolute', width: '100%', height: '122.94%', top: '-16.74%', left: 0, objectFit: 'cover' }} />
      </section>

      <section className="rewards-mobile" style={{ display: 'none', background: '#080808', width: '100%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.rewardsBgMobile} alt="Most Rewarding Payment Card"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
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