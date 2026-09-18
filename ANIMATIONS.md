# LUMÉ Motion & Interaction System

Motion should make the site feel crafted, not animated for the sake of animation.

## Global
- Default transition: 200–450ms.
- Use ease-out curves for entrances.
- Avoid constant motion.
- Never animate large layout shifts unnecessarily.
- Respect `prefers-reduced-motion`.

## Page entrance
1. Background/color transition.
2. Navigation fade in.
3. Hero media reveal.
4. Heading line reveal.
5. CTA reveal.

## Scroll reveals
Use IntersectionObserver or Motion viewport triggers.
- Fade + 16–30px upward movement.
- Stagger sibling items by roughly 60–100ms.
- Trigger once unless a repeated interaction benefits from replay.

## Navigation
- At top: transparent/minimal.
- After scrolling: compact background with subtle backdrop blur.
- Active link has a small animated underline or opacity change.
- Mobile menu slides/fades in with focus trapping.

## Image reveals
Use a masked reveal or clip-path animation for major editorial images. Keep duration around 600–900ms.

## Service rows
Hover:
- image opacity 0 → 1
- title shifts 4–8px
- arrow moves 4px

Mobile:
- no hover dependency; use accordion.

## Before/after slider
- Smooth pointer drag.
- Divider follows pointer.
- Touch support.
- Keyboard support if practical.

## Gallery
- Filter changes use opacity + small vertical movement.
- Lightbox uses fade + scale from 0.98 to 1.
- Background locks while open.

## Buttons
- Arrow moves horizontally on hover.
- Button background transition should be subtle.
- No exaggerated magnetic effect on mobile.

## Cursor enhancement
Optional desktop-only custom cursor for selected editorial areas. It must disappear for touch devices and must not interfere with normal click targets.

## Parallax
Use only on selected hero/large-image sections. Maximum movement should remain subtle. Disable or reduce under reduced-motion.

## Text reveal
Use word/line masks only for major headlines. Do not animate every paragraph.

## Performance
- Prefer transform/opacity animations.
- Avoid animating width/height/top/left continuously.
- Lazy-load below-the-fold images.
- Use responsive image sizes.
- Keep hero video lightweight and muted.
