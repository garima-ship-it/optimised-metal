'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const inp: React.CSSProperties = {
  width: '100%', background: '#141414',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 10, padding: '13px 14px',
  fontSize: 14, color: 'white',
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
}

function CheckoutContent() {
  const params = useSearchParams()
  const router = useRouter()

  const flow = (params.get('flow') ?? 'neozap') as 'neozap' | 'convert'
  const product = {
    id: params.get('productId') ?? '',
    name: params.get('productName') ?? 'NeoZAP Metal Card',
    price: Number(params.get('price') ?? 2999),
    dprice: Number(params.get('dprice') ?? 2999),
    img: params.get('img') ?? '',
  }

  const fullPrice = product.dprice
  const discPct = Math.round((1 - product.dprice / product.price) * 100)

  // User details
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [verified, setVerified] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState('')

  // Delivery address
  const [delivery, setDelivery] = useState({ address: '', city: '', state: '', pincode: '' })

  // Pickup address (convert flow only)
  const [pickup, setPickup] = useState({ address: '', city: '', state: '', pincode: '' })
  const [sameAsDelivery, setSameAsDelivery] = useState(false)

  // Payment selection
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('online')

  useEffect(() => {
    try {
      const u = sessionStorage.getItem('nz_user')
      if (u) {
        const parsed = JSON.parse(u)
        setName(parsed.name)
        setPhone(parsed.phone)
        setVerified(true)
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (sameAsDelivery) setPickup({ ...delivery })
  }, [sameAsDelivery, delivery])

  const sendOTP = async () => {
    if (!name.trim()) { setOtpError('Enter your name'); return }
    if (phone.length !== 10) { setOtpError('Enter a valid 10-digit number'); return }
    setOtpError('')
    setOtpLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setOtpLoading(false)
    setOtpSent(true)
  }

  const verifyOTP = async () => {
    if (otp.length !== 6) { setOtpError('Enter the 6-digit OTP'); return }
    setOtpError('')
    setOtpLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setOtpLoading(false)
    if (phone === '9999999999' && otp !== '123456') {
      setOtpError('Wrong OTP. Use 123456 for test number.')
      return
    }
    setVerified(true)
    sessionStorage.setItem('nz_user', JSON.stringify({ name: name.trim(), phone }))
  }

  const isAddressComplete = !!(delivery.address && delivery.city && delivery.state && delivery.pincode.length === 6)
  const isPickupComplete = flow === 'neozap' || (pickup.address && pickup.city && pickup.state && pickup.pincode.length === 6)
  const canPay = verified && isAddressComplete && !!isPickupComplete

  const placeOrder = () => {
    const order = {
      id: `NZ${Date.now()}`,
      user: { name, phone },
      product, flow,
      delivery,
      pickup: flow === 'convert' ? pickup : null,
      payment: paymentMethod,
      total: fullPrice,
      codPrepay: paymentMethod === 'cod' ? 1000 : null,
      codOnDelivery: paymentMethod === 'cod' ? 1999 : null,
      createdAt: new Date().toISOString(),
    }
    sessionStorage.setItem('nz_last_order', JSON.stringify(order))
    router.push('/checkout/success')
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#080808', zIndex: 10 }}>
        <Link href="/" style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(95deg,#ededed,#616169)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textDecoration: 'none' }}>NeoZAP</Link>
        <span style={{ fontSize: 12, color: '#6b7280' }}>🔒 Secure Checkout</span>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 20px 120px' }}>

        {/* Product summary */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px', marginBottom: 28, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 60, height: 42, borderRadius: 8, overflow: 'hidden', background: '#1a1a2e', flexShrink: 0 }}>
            {product.img && <img src={product.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
            <p style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
              {flow === 'convert' ? '🔄 Convert to Metal' : '✨ New NeoZAP Card'}
            </p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 800 }}>₹{fullPrice.toLocaleString('en-IN')}</p>
            {discPct > 0 && <p style={{ fontSize: 11, color: '#22c55e' }}>{discPct}% off</p>}
          </div>
        </div>

        {/* SECTION 1 — Your Details */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: verified ? '#22c55e' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'black', flexShrink: 0 }}>
              {verified ? '✓' : '1'}
            </div>
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Your Details</h2>
            {verified && (
              <button onClick={() => { setVerified(false); setOtpSent(false); setOtp('') }}
                style={{ marginLeft: 'auto', fontSize: 12, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Change
              </button>
            )}
          </div>

          {verified ? (
            <div style={{ background: '#111', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>👤</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{name}</p>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>+91 {phone} ✓ Verified</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" style={inp} />
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ ...inp, width: 'auto', flexShrink: 0, color: '#9ca3af', whiteSpace: 'nowrap' }}>🇮🇳 +91</div>
                <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,'').slice(0,10))}
                  placeholder="Mobile Number" type="tel" style={{ ...inp, flex: 1 }} />
              </div>
              {otpSent && (
                <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="Enter 6-digit OTP" type="tel" autoFocus
                  style={{ ...inp, letterSpacing: 6, textAlign: 'center', fontSize: 20 }} />
              )}
              {otpError && <p style={{ fontSize: 12, color: '#ef4444' }}>{otpError}</p>}
              <button onClick={otpSent ? verifyOTP : sendOTP} disabled={otpLoading}
                style={{ height: 46, background: 'white', borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 700, color: 'black', cursor: 'pointer', opacity: otpLoading ? 0.6 : 1 }}>
                {otpLoading ? '...' : otpSent ? 'Verify OTP →' : 'Get OTP →'}
              </button>
              {!otpSent && <p style={{ fontSize: 11, color: '#374151', textAlign: 'center' }}>Test: <span style={{ color: '#6b7280' }}>9999999999</span> → OTP <span style={{ color: '#6b7280' }}>123456</span></p>}
            </div>
          )}
        </div>

        {/* SECTION 2 — Delivery Address */}
        {verified && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: isAddressComplete ? '#22c55e' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: isAddressComplete ? 'black' : '#6b7280', flexShrink: 0 }}>
                {isAddressComplete ? '✓' : '2'}
              </div>
              <h2 style={{ fontSize: 15, fontWeight: 700 }}>📦 Delivery Address</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input value={delivery.address} onChange={e => setDelivery(d => ({ ...d, address: e.target.value }))}
                placeholder="House/Flat No., Street, Area, Landmark" style={inp} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input value={delivery.city} onChange={e => setDelivery(d => ({ ...d, city: e.target.value }))} placeholder="City" style={inp} />
                <input value={delivery.pincode} onChange={e => setDelivery(d => ({ ...d, pincode: e.target.value.replace(/\D/g,'').slice(0,6) }))} placeholder="PIN Code" type="tel" style={inp} />
              </div>
              <input value={delivery.state} onChange={e => setDelivery(d => ({ ...d, state: e.target.value }))} placeholder="State" style={inp} />
            </div>
          </div>
        )}

        {/* SECTION 3 — Pickup Address (convert only) */}
        {verified && flow === 'convert' && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: isPickupComplete ? '#22c55e' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: isPickupComplete ? 'black' : '#6b7280', flexShrink: 0 }}>
                {isPickupComplete ? '✓' : '3'}
              </div>
              <h2 style={{ fontSize: 15, fontWeight: 700 }}>🏠 Pickup Address</h2>
            </div>
            <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 14, paddingLeft: 32 }}>We'll pick up your existing card from here</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#9ca3af', cursor: 'pointer', marginBottom: 12 }}>
              <input type="checkbox" checked={sameAsDelivery} onChange={e => setSameAsDelivery(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'white', cursor: 'pointer' }} />
              Same as delivery address
            </label>
            {!sameAsDelivery && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input value={pickup.address} onChange={e => setPickup(p => ({ ...p, address: e.target.value }))} placeholder="House/Flat No., Street, Area, Landmark" style={inp} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input value={pickup.city} onChange={e => setPickup(p => ({ ...p, city: e.target.value }))} placeholder="City" style={inp} />
                  <input value={pickup.pincode} onChange={e => setPickup(p => ({ ...p, pincode: e.target.value.replace(/\D/g,'').slice(0,6) }))} placeholder="PIN Code" type="tel" style={inp} />
                </div>
                <input value={pickup.state} onChange={e => setPickup(p => ({ ...p, state: e.target.value }))} placeholder="State" style={inp} />
              </div>
            )}
          </div>
        )}

        {/* SECTION 4 — Payment Options (shown after address is complete) */}
        {verified && isAddressComplete && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#6b7280', flexShrink: 0 }}>
                {flow === 'convert' ? '4' : '3'}
              </div>
              <h2 style={{ fontSize: 15, fontWeight: 700 }}>💳 Payment Option</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Partial COD */}
              <div onClick={() => setPaymentMethod('cod')}
                style={{ background: paymentMethod === 'cod' ? 'rgba(255,255,255,0.05)' : '#111', border: `2px solid ${paymentMethod === 'cod' ? 'white' : 'rgba(255,255,255,0.09)'}`, borderRadius: 14, padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all .15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Radio */}
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${paymentMethod === 'cod' ? 'white' : '#4b5563'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {paymentMethod === 'cod' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'white' }} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Partial COD</p>
                    <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>₹1,000 now + ₹1,999 on delivery</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>₹1,000</p>
                  <p style={{ fontSize: 11, color: '#6b7280' }}>pay now</p>
                </div>
              </div>

              {/* Full Payment */}
              <div onClick={() => setPaymentMethod('online')}
                style={{ background: paymentMethod === 'online' ? 'rgba(255,255,255,0.05)' : '#111', border: `2px solid ${paymentMethod === 'online' ? 'white' : 'rgba(255,255,255,0.09)'}`, borderRadius: 14, padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all .15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Radio */}
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${paymentMethod === 'online' ? 'white' : '#4b5563'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {paymentMethod === 'online' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'white' }} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Full Payment</p>
                    <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Pay the full amount now</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>₹2,999</p>
                  <p style={{ fontSize: 11, color: '#6b7280' }}>pay now</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 20px', zIndex: 50 }}>
        {canPay ? (
          <button onClick={placeOrder}
            style={{ width: '100%', height: 50, background: 'white', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, color: 'black', cursor: 'pointer' }}>
            {paymentMethod === 'cod'
              ? 'Place Order — Pay ₹1,000 Now'
              : 'Pay ₹2,999 — Complete Order'}
          </button>
        ) : (
          <div style={{ height: 50, background: 'rgba(255,255,255,0.04)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: 13, color: '#4b5563' }}>
              {!verified ? '🔒 Verify your number to continue' : !isAddressComplete ? '📦 Fill delivery address to continue' : !isPickupComplete ? '🏠 Fill pickup address to continue' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ background: '#080808', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
