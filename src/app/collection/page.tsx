import type { Metadata } from 'next'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import CollectionClient from '@/components/collection/CollectionClient'
import { fetchCatalog, DEFAULT_CATEGORIES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Collection – NeoZAP Metal Cards',
  description: 'Browse our full collection of premium metal cards.',
}

export default async function CollectionPage() {
  const catalog = await fetchCatalog()
  const cards = catalog?.cards ?? []
  const allCategories = catalog?.categories ?? DEFAULT_CATEGORIES
  const categories = allCategories.filter(cat =>
    cards.some(c => c.category === cat.id)
  )

  return (
    <>
      <Navbar buyHref="/collection" />
      <main style={{ background: '#080808', minHeight: '100vh' }}>
        <CollectionClient cards={cards} categories={categories} />
      </main>
      <Footer />
    </>
  )
}