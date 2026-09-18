# Page-by-Page Specification

## PAGE 01 — HOME `/`

### Navigation
Logo LUMÉ at left. Links: Services, Experience, Stylists, Gallery, About. Right: Book Appointment.

On scroll, navigation becomes slightly more compact with a subtle background/blur.

### Hero
Full viewport image or muted 8–12 second looping salon/hair video.

Headline:
> Your hair. Your signature.

Supporting copy:
> A considered approach to colour, cut and care — created around you.

CTA: Book Your Appointment  
Secondary CTA: Explore the Experience

### Hero animation
- Page loads with dark/ivory transition.
- Logo fades/slides into place.
- Hero media gently scales from 1.04 to 1.0.
- Headline lines reveal upward with stagger.
- CTA follows 120–180ms later.
- Scroll indicator subtly pulses.

### Intro / Experience
Large statement on one side, portrait/detail image on the other.

Copy:
> We believe great hair starts with a great conversation.

Add a small text link: Discover LUMÉ.

### Signature services
Show 5 services with large typography and image reveal:
- Cut & Style
- Colour
- Balayage
- Extensions
- Treatments

Hover: image follows cursor slightly / service number shifts / arrow appears.

### Transformation
Full-width before/after slider.
Label: Transformation 01.
Include draggable divider and keyboard alternative where possible.

### Artists
3–4 temporary stylist profiles. Large portraits, name, role/specialty and View Profile.

### The space
Large editorial image sequence of the salon interior. Use horizontal scroll on desktop only if it remains accessible; stack vertically on mobile.

### Testimonials
Use clearly labelled demo testimonials, or replace with real client quotes before production. Never imply the demo quotes are real.

### Social gallery
6-image editorial grid. CTA: Follow @lume.salon.demo.

### Location
Address text, hours, phone/email and embedded Google Maps area.

### Final CTA
> Ready for your next look?

Button: Book Your Appointment

---

## PAGE 02 — SERVICES `/services`

Hero: "Made for your hair. Designed around you."

Service categories:
- Cut & Style
- Colour
- Balayage & Highlights
- Extensions
- Treatments

Each service row contains service name, short description, duration placeholder and starting-price placeholder.

Interaction:
- Row expands smoothly.
- Image appears during hover on desktop.
- Accordion behavior on mobile.
- Book button remains visible after expansion.

Do not invent exact pricing for a real salon. Demo values should be visibly marked as sample pricing or omitted.

---

## PAGE 03 — EXPERIENCE `/experience`

A visual storytelling page about the salon visit.

Sections:
1. Arrival
2. Consultation
3. Creation
4. Finish
5. Aftercare

Use large photography, short copy and scroll-linked transitions.

Animation concept: as each chapter enters, image position changes subtly while text stays readable. Never use aggressive parallax.

---

## PAGE 04 — STYLISTS `/stylists`

Hero: "Meet the artists."

Grid of temporary profiles:
- Olivia Martin — Creative Director
- Maya Chen — Colour Specialist
- Sofia Laurent — Extension Artist
- Ava Brooks — Stylist

These are fictional demo people.

Each profile:
- Portrait
- Name
- Role
- Specialty
- Short bio
- View Profile

Profile interaction can open an overlay containing full bio, specialties and Book with this artist.

---

## PAGE 05 — GALLERY `/gallery`

Masonry/editorial image grid.

Filters:
All / Colour / Cuts / Styling / Space

Interactions:
- Filter transition with fade + position shift.
- Image hover zoom 1.03 maximum.
- Click opens accessible lightbox.
- Lightbox supports previous/next, Escape and keyboard navigation.
- Mobile uses a two-column grid.

---

## PAGE 06 — ABOUT `/about`

Hero statement:
> Beauty feels different when it feels like you.

Sections:
- LUMÉ philosophy
- Founder/owner story with temporary owner image
- Salon values
- Space photography
- Closing CTA

Owner demo:
`Elena Laurent — Founder & Creative Director`

Clearly keep this as fictional placeholder content until a real salon supplies information.

---

## PAGE 07 — CONTACT `/contact`

Hero: "Let's talk hair."

Two-column desktop layout; stacked mobile.

Left:
- LUMÉ
- Milton, Ontario, Canada
- +1 (555) 014-2026
- hello@lume-demo.com
- Opening hours

Right: contact form.

Required fields exactly:
- Name
- Email
- Subject
- Your message
- Send

Form behavior:
- Inline validation.
- Helpful error text.
- Loading state after submit.
- Success state without a page reload.
- Demo mode may show a success message without actually sending email.

Google Maps:
Embed a map centered on **Milton, Ontario, Canada** using a replaceable map component/config. Do not claim a precise LUMÉ address.

---

## PAGE 08 — BOOKING `/book`

Hero:
> Let's make time for your next look.

Show:
- Service selection
- Preferred stylist
- Preferred date/time placeholder
- Client details
- Confirm request CTA

For the demo, submission can end in a confirmation state. Keep the provider integration abstract so a real booking platform can be connected later.
