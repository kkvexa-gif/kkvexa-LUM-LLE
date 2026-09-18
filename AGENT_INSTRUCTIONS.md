# Implementation Instructions — LUMÉ

You are implementing a production-quality fictional salon website demo from scratch.

## Read first
Read:
- README.md
- PRD.md
- DESIGN_SYSTEM.md
- PAGES.md
- ANIMATIONS.md
- CONTENT.md
- ASSETS.md
- GOOGLE_MAPS.md
- CONTACT.md
- LOGO_SPEC.md
- TECHNICAL_ARCHITECTURE.md

These files are the source of truth.

## Build order
1. Set up project shell and typography.
2. Build global navigation/footer.
3. Build Home page completely.
4. Build Services.
5. Build Stylists.
6. Build Gallery.
7. Build Experience.
8. Build About.
9. Build Contact + Map.
10. Build Booking demo state.
11. Add responsive refinements.
12. Add accessibility and reduced motion.
13. Optimize images/video.
14. Run lint, typecheck and production build.

## Critical visual direction
The site must NOT look like a generic AI website.

Avoid:
- giant pill navigation
- excessive rounded cards
- gradient text everywhere
- generic line-icon grids
- fake dashboards
- fake metrics
- excessive uppercase labels
- excessive glassmorphism
- excessive floating blobs
- unnecessary 3D effects
- repetitive cards for every section

Prefer:
- editorial typography
- large photography
- asymmetrical composition
- whitespace
- restrained borders
- subtle animation
- human photography
- clear booking CTA
- strong visual hierarchy

## Content rules
Use the fictional LUMÉ content supplied in CONTENT.md. Do not invent real reviews, clients, awards, statistics or business claims.

## Temporary people
All owner/stylist portraits are placeholders. Do not imply the people are real LUMÉ staff.

## Map
Use city-level Milton, Ontario demo location. Keep map configuration replaceable.

## Contact
The contact form must include:
Name, Email, Subject, Your message, Send.

Demo submission may show a success state without a real backend.

## Animation rules
Follow ANIMATIONS.md. Motion should be subtle and premium. Respect reduced-motion preferences.

## Responsive testing
Test at minimum:
320, 360, 375, 390, 414, 480, 768, 834, 1024, 1280, 1440 and 1920px widths.

## Quality gate
Before completion verify:
- No horizontal overflow.
- No broken images.
- All buttons have meaningful actions.
- All links work.
- Keyboard navigation works.
- Mobile menu works.
- Gallery lightbox works.
- Before/after interaction works.
- Contact form validation works.
- Map is responsive.
- Reduced motion works.
- No console errors.
- `npm run lint` passes.
- Typecheck passes.
- Production build passes.

## Final instruction
Build the site as if it will be shown to a real salon owner during a sales presentation. It should look custom-designed and intentionally art-directed, not like an AI template assembled from common components.
