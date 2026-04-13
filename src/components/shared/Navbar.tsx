'use client'
import Link from 'next/link'
import { useState } from 'react'

interface NavbarProps {
  buyHref?: string
}

export default function Navbar({ buyHref = '/collection' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'none' }}
          className="nav-hamburger"
          aria-label="Menu">
          <div style={{ width: 22, height: 2, background: 'white', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: 'white', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: 'white', borderRadius: 2 }} />
        </button>

        <Link href="/" className="nav-logo">NeoZAP</Link>
        <Link href="/collection" className="nav-link">Collection</Link>
        <Link href={buyHref} className="nav-buy-btn">Buy Now</Link>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}
          className="nav-mobile-menu">
          <Link href="/collection" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: 15 }}
            onClick={() => setMenuOpen(false)}>Collection</Link>
          <Link href={buyHref} style={{ color: '#d1d5db', textDecoration: 'none', fontSize: 15 }}
            onClick={() => setMenuOpen(false)}>Buy Now</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-hamburger { display: block !important; }
          .nav-mobile-menu { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  )
}
