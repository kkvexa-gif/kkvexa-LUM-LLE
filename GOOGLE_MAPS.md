# Google Maps Integration

## Demo location
Use:
`Milton, Ontario, Canada`

This is intentionally a city-level demo location. Do not show a fake precise street address or pin for LUMÉ.

## Implementation
Create a reusable `MapEmbed` component whose location/query comes from configuration.

Preferred behavior:
- Desktop: map beside contact details.
- Mobile: map below contact details.
- Add a visible "Open in Google Maps" link.
- Lazy-load the map where possible.
- Do not expose a secret API key in client-side code.

## API option
For a simple portfolio demo, a Google Maps search/embed URL can be used without building a custom map application. If an official Maps Embed API integration is later required, keep credentials in environment variables and follow Google's current API requirements.
