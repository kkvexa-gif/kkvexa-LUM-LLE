# Technical Architecture

## Frontend
Next.js App Router + TypeScript + Tailwind CSS.

## Components
Suggested reusable components:
- Navbar
- MobileMenu
- HeroMedia
- SectionHeading
- EditorialImage
- ServiceList
- ServiceAccordion
- BeforeAfterSlider
- StylistCard
- StylistProfileModal
- GalleryGrid
- GalleryLightbox
- TestimonialStrip
- MapEmbed
- ContactForm
- BookingPanel
- Footer

## Data
Keep demo content in typed local data files. No database required.

Suggested structures:
- `data/services.ts`
- `data/stylists.ts`
- `data/gallery.ts`
- `data/site.ts`

## SEO
- Unique title and description per page.
- Open Graph metadata.
- Semantic headings.
- Descriptive image alt text.
- `LocalBusiness`/`BeautySalon` structured data only when the site represents a real business and supplied details are verified. Do not publish fictional structured business data as real.

## Accessibility
- WCAG-conscious contrast.
- Keyboard navigation.
- Visible focus states.
- Dialog focus management.
- Escape closes overlays.
- Form labels are real labels.
- Reduced-motion support.

## Performance
- `next/image`.
- Lazy-load noncritical media.
- Optimized font loading.
- Avoid huge JavaScript bundles.
- Avoid autoplay video on constrained/mobile connections where appropriate.
