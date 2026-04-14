'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CAT_GRADIENTS } from '@/lib/data'
import type { Card, Category } from '@/types'

function ProductCard({ card }: { card: Card }) {
  const grad = CAT_GRADIENTS[card.category] ?? { c1: '#1a1a2e', c2: '#16213e' }
  const discPct = card.disc ?? (card.price && card.dprice ? Math.round((1 - card.dprice / card.price) * 100) : null)
  const reviewCount = card.reviews?.length ?? 0
  const avgRating = reviewCount
    ? Math.round(card.reviews!.reduce((a, r) => a + r.rating, 0) / reviewCount)
    : 5

  return (
    <Link href={`/product/${card.id}`} style={{ textDecoration: 'none', cursor: 'pointer', display: 'block' }}>
      <div>
        <div className="product-card-img" style={{ width: '100%', height: 180, borderRadius: 14, overflow: 'hidden', position: 'relative', transition: 'transform .2s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,${grad.c1},${grad.c2})`, position: 'relative' }}>
            {card.imgCol && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.imgCol} alt={card.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            )}
          </div>
          {discPct && (
            <div style={{ position: 'absolute', top: 0, right: 0, height: 15, width: 56, background: 'linear-gradient(115.58deg,#ad8e43 1.97%,#e0d484 45.28%,#a38847 97.8%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0 14px 0 4px' }}>
              <span style={{ fontSize: 10, color: 'black', fontWeight: 500 }}>{discPct}% OFF</span>
            </div>
          )}
          {card.bestseller && (
            <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 4, padding: '2px 6px', fontSize: 9, fontWeight: 700, color: '#f59e0b' }}>
              ★ Bestseller
            </div>
          )}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 38, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'white', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>{card.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              {card.dprice && (
                <span style={{ fontSize: 10, color: '#b0b0b0', position: 'relative' }}>
                  ₹{card.price}
                  <span style={{ position: 'absolute', width: '108%', height: 1, background: 'red', top: '50%', left: '-4%', transform: 'rotate(-15deg)', display: 'block' }} />
                </span>
              )}
              <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>₹{card.dprice ?? card.price}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 0 2px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 1 }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ color: i <= avgRating ? '#f59e0b' : '#444', fontSize: 11 }}>★</span>
            ))}
          </div>
          <span style={{ fontSize: 11, color: '#a8a5a5' }}>({reviewCount})</span>
          {card.colors && card.colors.length > 0 && (
            <div style={{ display: 'flex', gap: 3, marginLeft: 2 }}>
              {card.colors.slice(0, 4).map(c => (
                <div key={c.hex} title={c.name} style={{ width: 10, height: 10, borderRadius: '50%', background: c.hex, border: '1px solid rgba(255,255,255,0.2)' }} />
              ))}
              {card.colors.length > 4 && <span style={{ fontSize: 9, color: '#6b7280' }}>+{card.colors.length - 4}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

interface Props {
  cards: Card[]
  categories: Category[]
}

export default function CollectionClient({ cards, categories }: Props) {
  const [activeCat, setActiveCat] = useState('all')

  const filtered = activeCat === 'all'
    ? cards
    : cards.filter(c => c.category === activeCat)

  return (
    <>
      {/* Category strip */}
      <div className="cat-strip" style={{ padding: '28px 60px 0', display: 'flex', gap: 0, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* All tab */}
        <div onClick={() => setActiveCat('all')}
          style={{ width: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', paddingBottom: 6 }}>
          <div className="cat-box" style={{ width: 100, height: 90, border: `0.3px solid ${activeCat === 'all' ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)'}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: activeCat === 'all' ? 'rgba(255,255,255,0.04)' : 'transparent', transition: 'all .2s', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/categories/catAll.png" alt="All" style={{ width: 64, height: 64, objectFit: 'contain' }} />
          </div>
          <span style={{ marginTop: 10, fontSize: 13, color: 'white', fontWeight: activeCat === 'all' ? 600 : 400 }}>All</span>
          <div style={{ height: 2, width: activeCat === 'all' ? 40 : 0, background: 'white', borderRadius: 2, marginTop: 6, transition: 'width .2s' }} />
        </div>

        {categories
          .filter(cat => cards.some(c => c.category === cat.id))
          .map(cat => (
            <div key={cat.id} onClick={() => setActiveCat(cat.id)}
              style={{ width: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', paddingBottom: 6 }}>
              <div className="cat-box" style={{ width: 100, height: 90, border: `0.3px solid ${activeCat === cat.id ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)'}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: activeCat === cat.id ? 'rgba(255,255,255,0.04)' : 'transparent', transition: 'all .2s', overflow: 'hidden' }}>
                {cat.icon
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={cat.icon} alt={cat.label} style={{ width: 64, height: 64, objectFit: 'contain' }} />
                  : <span style={{ fontSize: 28 }}>🏷️</span>
                }
              </div>
              <span style={{ marginTop: 10, fontSize: 13, color: 'white', textAlign: 'center', textTransform: 'capitalize', fontWeight: activeCat === cat.id ? 600 : 400 }}>
                {cat.label}
              </span>
              <div style={{ height: 2, width: activeCat === cat.id ? 40 : 0, background: 'white', borderRadius: 2, marginTop: 6, transition: 'width .2s' }} />
            </div>
          ))}
      </div>

      {/* Heading */}
      <div className="collection-heading" style={{ padding: '48px 60px 0' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: 'white' }}>
          {activeCat === 'all' ? `Explore all (${cards.length})` : `${categories.find(c => c.id === activeCat)?.label ?? activeCat} (${filtered.length})`}
        </h2>
        <p style={{ fontSize: 16, color: '#9ca3af' }}>Real life shots of our premium metal cards. Each handcrafted to perfection.</p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💳</div>
          <p style={{ fontSize: 16 }}>No cards in this category yet.</p>
        </div>
      ) : (
        <div className="collection-grid" style={{ padding: '32px 60px 60px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {filtered.map(card => <ProductCard key={card.id} card={card} />)}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .cat-strip { padding: 20px 16px 0 !important; overflow-x: auto; flex-wrap: nowrap !important; scrollbar-width: none; }
          .cat-strip::-webkit-scrollbar { display: none; }
          .cat-strip > div { width: 80px !important; flex-shrink: 0; }
          .cat-box { width: 60px !important; height: 60px !important; }
          .cat-box img { width: 38px !important; height: 38px !important; }
          .cat-strip span { font-size: 11px !important; }
          .collection-heading { padding: 24px 16px 0 !important; }
          .collection-heading h2 { font-size: 20px !important; }
          .collection-grid { padding: 16px 16px 80px !important; grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </>
  )
}
