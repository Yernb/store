import { Metadata } from 'next'
import CategoryPageClient from './CategoryPageClient'

// Static generation for all category pages
export async function generateStaticParams() {
  // These are the category names from the seed data
  const categories = [
    'Dining',
    'Seating',
    'Storage',
    'Bedroom',
    'Tables',
    'Kitchen Appliances',
    'Furniture Packages',
    // Subcategories
    'Dining Tables',
    'Dining Chairs',
    'Dining Sets',
    'Sofas',
    'Armchairs',
    'Recliners',
    'Bookshelves',
    'Cabinets',
    'Wardrobes',
    'Beds',
    'Bedside Tables',
    'Dressers',
    'Coffee Tables',
    'Side Tables',
    'Refrigerators',
    'Ovens',
    'Dishwashers',
    'Starter Packages',
    'Complete Packages'
  ]

  return categories.map((category) => ({
    slug: encodeURIComponent(category),
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.slug)

  return {
    title: `${categoryName} - FurnishAndGo`,
    description: `Browse our collection of ${categoryName.toLowerCase()} furniture. Quality pieces at affordable prices.`,
  }
}

export default function CategoryPage() {
  return <CategoryPageClient />
}