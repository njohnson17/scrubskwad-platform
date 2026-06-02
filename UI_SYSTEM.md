# UI System

Approval status: Draft for review  
Project: ScrubSkwad premium service marketplace  
Date: 2026-06-02

## Design Objective

ScrubSkwad should feel premium, modern, trustworthy, and technology-enabled while preserving the existing visual identity.

The interface should feel closer to a polished SaaS marketplace than a typical local cleaning website.

## Brand Color Status

The attached brief requires exact color extraction from `https://scrubskwad.cleaning`. That live crawl could not be completed in the current environment.

Provisional tokens below are extracted from the provided logo image only and must be validated against the live website before implementation.

Provisional logo-derived colors:

- `brand-background-soft`: `#f2f2f2`
- `brand-taupe`: approximately `#c8b9b9`
- `brand-graphite`: approximately `#858585`
- `brand-white`: `#ffffff`

Do not treat these as final until the website palette is extracted and approved.

## Final Token Requirements

The implementation should use a central token system, not scattered raw colors.

Token categories:

- Brand.
- Background.
- Surface.
- Text.
- Border.
- CTA.
- CTA hover.
- Accent.
- Gradient.
- Status.
- Chart/admin.

Example structure:

```ts
export const tokens = {
  color: {
    brand: {
      backgroundSoft: "#f2f2f2",
      taupe: "#c8b9b9",
      graphite: "#858585"
    }
  }
}
```

Final implementation must replace provisional values with exact extracted live-site values.

## Visual Direction

Keywords:

- Luxury.
- Premium.
- Modern.
- Elegant.
- Clean.
- Confident.
- Professional.
- Fast.
- High trust.
- Technology-driven.

Avoid:

- Cheap cleaning-site patterns.
- Generic WordPress layouts.
- Stock-heavy local tradesman design.
- Overly playful visuals.
- One-note color palettes.
- Large marketing pages that delay the actual service experience.

## Layout Principles

- Mobile first.
- Booking-first navigation.
- Dense but calm information hierarchy.
- Strong service discovery.
- Premium whitespace without wasting space.
- Clear CTAs.
- Sticky estimate panel in booking.
- Dashboard layouts should be utilitarian, not decorative.

## Typography

Recommended approach:

- Use a refined sans-serif for interface clarity.
- Use strong weight contrast rather than novelty fonts.
- Keep letter spacing at `0`.
- Do not scale font size with viewport width.
- Ensure all button and card text fits on mobile.

Suggested type scale:

- Display: homepage and major service hero only.
- H1: page title.
- H2: section title.
- H3: card/panel title.
- Body: core reading.
- Small: metadata, helper text.

## Components

Foundation:

- Button.
- Icon button.
- Input.
- Select.
- Textarea.
- Checkbox.
- Toggle.
- Slider/stepper.
- Segmented control.
- Badge.
- Tabs.
- Dialog.
- Drawer.
- Toast.
- Tooltip.
- Progress indicator.

Marketing/platform:

- Service card.
- Location card.
- Trust metric.
- Review card.
- FAQ accordion.
- Price factor list.
- Service bundle selector.
- Journal card.

Booking:

- Stepper.
- Address lookup panel.
- Service multi-select grid.
- Dynamic question renderer.
- Estimate panel.
- Review summary.
- Status tracker.

Dashboard:

- Booking table.
- Quote detail panel.
- Customer profile panel.
- Admin decision form.
- Moderation queue.
- Pricing editor.
- Service editor.
- Analytics summary.

## Iconography

Use lucide icons through the chosen component stack wherever possible.

Guidance:

- Buttons for tools/actions should use icons.
- Unfamiliar icon-only controls require tooltips.
- Service cards may use icon plus label.
- Avoid manually drawn SVG icons unless creating brand-specific assets.

## Buttons

Button hierarchy:

- Primary: booking and quote actions.
- Secondary: service exploration.
- Tertiary/ghost: low-emphasis navigation.
- Destructive: admin rejection/delete actions.

Primary CTA examples:

- `Start Booking`
- `Request My Quote`
- `Approve Quote`
- `Pay Deposit`

Do not use final booking language before admin approval.

## Booking UI

Desktop:

- Main form column.
- Sticky estimate panel on the right.
- Stepper across top or left.
- Clear save/continue actions.

Mobile:

- Single-column step flow.
- Sticky bottom estimate summary.
- Expandable full estimate drawer.
- Large tap targets.

Estimate panel states:

- Empty.
- Updating.
- Estimate ready.
- Admin review required.
- Error/unavailable coverage.

## Admin UI

Admin screens should feel calm, fast, and operational.

Key patterns:

- Tables with filters and search.
- Status chips.
- Detail drawers.
- Audit trail.
- Clear approve/reject actions.
- No decorative marketing sections.

## Customer Dashboard UI

Customer dashboard should show:

- Booking status.
- Quote summary.
- Deposit/payment status.
- Upcoming service details.
- Past bookings.
- Review prompts.
- Account/contact details.

## Imagery

Use real or high-quality generated bitmap images for:

- Premium cleaning context.
- Before/after transformations.
- Teams at work.
- Vehicles/valeting.
- Bin cleaning.
- Removals.

Avoid:

- Generic stock photos that do not show actual service value.
- Dark, blurred, atmospheric images where users need inspection.
- Purely decorative shapes as primary visuals.

## Accessibility

Requirements:

- WCAG-conscious contrast.
- Keyboard navigable booking flow.
- Visible focus states.
- Form errors tied to fields.
- Motion respects reduced-motion preferences.
- Semantic headings.
- ARIA labels for icon-only controls.

## Motion

Use Framer Motion sparingly:

- Step transitions.
- Estimate updates.
- Drawer/dialog entry.
- Subtle service-card feedback.

Avoid:

- Slow animations.
- Motion that blocks booking.
- Excessive decorative movement.

## Approval Decisions Needed

- Approve provisional direction: premium SaaS marketplace, not brochure site.
- Confirm whether exact live-site colors should override all provisional logo-derived values.
- Confirm whether the icon-only transparent logo should be used as a subtle background/watermark asset.
- Confirm whether the initial UI should prioritise booking over editorial homepage storytelling.

