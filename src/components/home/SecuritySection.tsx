import { ASSETS } from '@/lib/data'

export default function SecuritySection() {
  return (
    <>
      {/* ── DESKTOP ── */}
      <section className="sec-desktop" style={{ background: 'black', width: '100%', height: 565, overflow: 'hidden', position: 'relative' }}>
        <p style={{ position: 'absolute', left: 79, top: 51, fontSize: 54, fontWeight: 700, lineHeight: '58px', color: 'white', width: 666 }}>
          Unbreakable standard of security &amp; convenience
        </p>
        <div style={{ position: 'absolute', left: 79, top: 217, width: 666, height: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.secDivider} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.securityImg} alt="Security features"
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 245, width: 1281.5, height: 264.5, objectFit: 'cover' }} />
      </section>

      {/* ── MOBILE ── portrait version */}
      <section className="sec-mobile" style={{ display: 'none', background: 'black', padding: '40px 20px' }}>
        <p style={{ fontSize: 35, fontWeight: 700, lineHeight: '42px', color: 'white', textAlign: 'center', marginBottom: 24 }}>
          Unbreakable standard of security &amp; convenience
        </p>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', marginBottom: 24 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.securityImgMobile} alt="Security features"
          style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 12, display: 'block' }} />
      </section>

      <style>{`
        @media (max-width: 768px) {
          .sec-desktop { display: none !important; }
          .sec-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}
