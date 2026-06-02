# Booking Flow

Approval status: Draft for review  
Project: ScrubSkwad premium service marketplace  
Date: 2026-06-02

## Booking Principle

The booking experience must feel like a premium guided quote builder, not a traditional contact form.

Bookings are quote requests, not automatic confirmed bookings. ScrubSkwad keeps operational control through admin review before the customer pays a 50% deposit.

## Funnel Summary

1. Customer starts booking from homepage, service page, location page, or direct `/booking`.
2. Customer enters location and property details.
3. Customer selects one or multiple services.
4. Dynamic questions appear based on selected services.
5. Customer selects team requirements.
6. Customer selects preferred dates and times.
7. Customer enters contact details and instructions.
8. Customer reviews estimate.
9. Customer submits quote request.
10. Admin reviews and approves/rejects.
11. Customer receives approval and deposit link.
12. Customer pays 50% deposit.
13. Booking is confirmed.

## Step 1: Location

Fields:

- Address lookup.
- Postcode.
- Manual address fallback.
- Property type.
- Property size.
- Access notes.

Property type options:

- Flat/apartment.
- Terraced house.
- Semi-detached house.
- Detached house.
- Office.
- Commercial unit.
- Airbnb/short-stay.
- Student property.
- Vehicle only.
- Other.

Live estimate effects:

- Coverage availability.
- Travel cost.
- Property-size baseline.
- Access complexity flag.

Validation:

- Postcode required.
- Manual address allowed if lookup fails.
- If outside coverage, capture lead but mark as "coverage review required".

## Step 2: Select Service

Customers may select one or multiple services.

Services:

- Cleaning.
- Deep Cleaning.
- End Of Tenancy.
- Pre-Tenancy.
- Commercial Cleaning.
- Office Cleaning.
- After Builders Cleaning.
- Airbnb Cleaning.
- Wheelie Bin Cleaning.
- Commercial Bin Cleaning.
- House Removals.
- Office Removals.
- Packing Services.
- Storage Assistance.
- Mobile Car Wash.
- Vehicle Valeting.

UX notes:

- Use service cards with icons, short descriptions, and "popular with" context.
- Allow bundles such as "End of tenancy + removals + packing" and "Airbnb cleaning + laundry add-on later".
- Persist service selection in URL or draft state where appropriate.

Live estimate effects:

- Base price.
- Base duration.
- Default team size.
- Required configuration questions.

## Step 3: Dynamic Configuration

### Cleaning Questions

- Bedrooms.
- Bathrooms.
- Dirt level.
- Pet hair.
- Mould.
- Carpet cleaning.
- Oven cleaning.
- Fridge cleaning.
- Move-in cleaning.
- Move-out cleaning.

### Bin Questions

- Number of bins.
- Type of bins.
- Frequency.
- Commercial or domestic.
- One-off or recurring.

### Removals Questions

- Pickup location.
- Destination.
- Packing required.
- Dismantling required.
- Number of movers.
- Stairs.
- Lift access.
- Vehicle size.
- Heavy items.

### Car Wash and Valeting Questions

- Vehicle type.
- Exterior only.
- Interior cleaning.
- Full valet.
- Number of vehicles.
- On-site access.
- Water/electric access if required.

Live estimate effects:

- Service line items.
- Add-on costs.
- Duration changes.
- Team-size recommendations.
- Admin uncertainty flags.

## Step 4: Team Requirements

Fields:

- Number of cleaners.
- Number of movers.
- Number of technicians.
- "Recommend for me" default.

UX:

- The system should recommend team size automatically.
- Manual customer changes should be allowed but clearly reflected in price/time.
- If customer requests too small a team for a large job, show a soft warning.

Live estimate effects:

- Labour cost.
- Duration.
- Feasibility warning.

## Step 5: Date and Time

Fields:

- Preferred dates.
- Preferred time windows.
- Flexible scheduling toggle.
- Urgency.

Time windows:

- Morning.
- Midday.
- Afternoon.
- Evening.
- Anytime.

Live estimate effects:

- Optional urgency or out-of-hours modifier.
- Admin review priority.

## Step 6: Customer Information

Fields:

- Name.
- Email.
- Phone.
- Special instructions.
- Marketing consent.
- Account creation or magic-link sign-in.

Validation:

- Name required.
- Email required.
- Phone required.
- Special instructions optional but encouraged for complex jobs.

## Step 7: Review

Review screen must show:

- Customer details.
- Address.
- Selected services.
- Configuration summary.
- Preferred dates/times.
- Estimated duration.
- Estimated team size.
- Estimated travel cost.
- Estimated total.
- Estimated 50% deposit.
- Disclaimer: final quote requires admin approval.

Submit CTA:

- `Request My Quote`

Post-submit state:

- Confirmation page.
- Email: Quote Received.
- Dashboard draft/customer booking status.

## Live Estimate Panel

The panel remains visible on desktop and collapses into a sticky bottom summary on mobile.

Panel content:

- Estimated total.
- Deposit due after approval.
- Estimated duration.
- Suggested team size.
- Travel cost.
- Service breakdown.
- Confidence indicator.

Confidence states:

- High confidence: standard property and clear service selection.
- Medium confidence: multiple services or add-ons.
- Admin review required: unusual access, heavy dirt, mould, commercial scale, removals complexity, outside coverage, or unclear configuration.

Important copy:

- Use "estimate" language, not "final price", until admin approval.
- Do not imply an automatic booking has been confirmed.

## Booking Status Model

Statuses:

- `draft`
- `submitted`
- `under_review`
- `approved`
- `rejected`
- `deposit_pending`
- `deposit_paid`
- `confirmed`
- `cancelled`
- `completed`

Customer-facing labels:

- Draft.
- Quote requested.
- Under review.
- Approved: deposit required.
- Unable to approve.
- Deposit paid.
- Booking confirmed.
- Cancelled.
- Completed.

## Admin Review Flow

Admin sees:

- Booking summary.
- Customer details.
- Property/access notes.
- Estimate breakdown.
- Risk/uncertainty flags.
- Similar previous jobs if available later.

Admin actions:

- Approve as estimated.
- Approve with adjusted price/time/team.
- Request more details.
- Reject.

Approval triggers:

- Email: Booking Approved.
- Email: Deposit Required.
- Payment/deposit link.
- Customer dashboard update.

Rejection triggers:

- Email: Quote Rejected.
- Optional reason.
- Optional alternative recommendation.

## Email Flow

Required templates:

- Quote Received.
- Admin Notification.
- Booking Approved.
- Deposit Required.
- Deposit Paid.
- Booking Confirmed.
- Reminder Email.
- Booking Completed.
- Review Request.

Tone:

- Premium.
- Clear.
- Reassuring.
- Operationally precise.

## Edge Cases

- Outside coverage: capture quote request, mark for review.
- Multi-service bookings: split line items, keep one parent request.
- Customer abandons draft: optional reminder if email captured.
- Admin adjusts quote: show previous estimate and approved quote.
- Payment failure: keep `deposit_pending`, send retry option.
- Customer changes details after approval: revert to `under_review`.

## Approval Decisions Needed

- Confirm whether customers can save drafts before creating an account.
- Confirm whether payment link is generated by Stripe, another provider, or manual invoice.
- Confirm whether urgent/same-day requests should carry an automatic modifier.
- Confirm whether recurring services are phase one or phase two.

