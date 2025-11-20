import Link from 'next/link'
import CTATileBase from './CTATileBase'

/**
 * Tourist CTA Tile Component
 *
 * Elegant, image-based CTA tile for tourists to explore local student guides.
 * Routes to the internal tourist landing page (/tourist).
 *
 * Design features:
 * - Full-bleed background: Travel-themed image (cityscape/traveler)
 * - Minimal default state: Just the word "Tourist" in elegant serif
 * - Hover reveals: Description and explore arrow with smooth 150ms transition
 * - Fully clickable: Entire tile acts as navigation link
 *
 * Background image source: Unsplash - Traveler with backpack exploring city
 */
export default function TouristCTA() {
  return (
    <Link href="/tourist" className="block">
      <CTATileBase
        backgroundImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=1200&q=85"
        imageAlt="Traveler standing on mountain overlooking scenic European landscape"
        headline="Tourist"
        description="Explore with a local student guide. Personalized and authentic experiences."
        gradientFrom="from-blue-600/40"
        gradientVia="via-blue-700/50"
        gradientTo="to-cyan-600/40"
      />
    </Link>
  )
}
