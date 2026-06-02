insert into public.journal_posts (
  title,
  slug,
  excerpt,
  body,
  category,
  tags,
  status,
  seo_title,
  seo_description,
  published_at
) values
  (
    'End of tenancy cleaning checklist for Greater Manchester tenants',
    'end-of-tenancy-cleaning-checklist-greater-manchester',
    'A practical checklist for preparing a rented property before handover.',
    'End of tenancy cleaning works best when the property is prepared before the team arrives.

Start by removing personal belongings, emptying cupboards and checking appliance interiors. Make sure cleaners can access skirting boards, windowsills, bathroom fittings, kitchen surfaces and high-touch areas.

For Manchester tenants, the most common add-ons are oven cleaning, fridge cleaning, carpet cleaning and extra attention for mould-prone bathrooms. If your property has stairs, parking constraints or limited access, include that in the quote request.

ScrubSkwad quote requests are reviewed before confirmation, so include photos or notes where the condition is unusual. A clearer request gives the team a better estimate for time, staffing and price.',
    'Cleaning Guides',
    array['end of tenancy','cleaning','manchester'],
    'published',
    'End of Tenancy Cleaning Checklist | ScrubSkwad',
    'Prepare for end-of-tenancy cleaning in Greater Manchester with this practical tenant checklist.',
    now()
  ),
  (
    'Deep cleaning vs regular cleaning: what actually changes?',
    'deep-cleaning-vs-regular-cleaning',
    'Understand when a property needs a deeper clean rather than routine upkeep.',
    'Regular cleaning keeps a property under control. Deep cleaning is a more detailed reset.

A regular clean usually focuses on visible surfaces, bathrooms, kitchens, floors and general tidying. A deep clean gives more time to built-up dirt, edges, fittings, appliance exteriors, limescale, high-touch areas and rooms that have not had detailed attention for a while.

Deep cleaning is useful before hosting, after a busy season, before listing a property, after decorating, or when a tenant or owner wants a proper reset. In ScrubSkwad quote requests, dirt level, room count and add-ons change the live estimate.',
    'Cleaning Guides',
    array['deep cleaning','home care'],
    'published',
    'Deep Cleaning vs Regular Cleaning | ScrubSkwad',
    'Learn the difference between deep cleaning and regular cleaning before requesting a ScrubSkwad quote.',
    now()
  ),
  (
    'How to prepare for house removals in Manchester',
    'prepare-for-house-removals-manchester',
    'A moving-day preparation guide for homes, flats and busy Manchester streets.',
    'A smoother move starts before the van arrives.

Confirm lift access, parking restrictions, stairs, fragile items and whether packing or dismantling is needed. Label boxes by room and keep essentials separate. If your destination is outside the same local area, include the full pickup and destination details in the quote request.

Manchester moves often involve flats, terraces, tight streets, timed parking and shared access. These details affect mover count, duration and vehicle planning, so they belong in the booking configuration.',
    'Moving Guides',
    array['removals','moving','manchester'],
    'published',
    'House Removals Preparation Manchester | ScrubSkwad',
    'Prepare for house removals in Manchester with practical access, packing and moving-day guidance.',
    now()
  ),
  (
    'Wheelie bin hygiene: when to clean domestic bins',
    'wheelie-bin-hygiene-guide',
    'Why bin cleaning matters and when to request it.',
    'Wheelie bins can hold odour, residue and bacteria long after collection day.

Domestic bins benefit from cleaning after spills, warm weather, heavy food waste, tenancy changes, pest issues or long periods without attention. Commercial bins may need more frequent care depending on usage.

In the ScrubSkwad quote flow, bin count and bin type shape the estimate. Add clear notes if the bins are heavily soiled or if access is restricted.',
    'Bin Hygiene',
    array['bin cleaning','wheelie bins','hygiene'],
    'published',
    'Wheelie Bin Hygiene Guide | ScrubSkwad',
    'Learn when to clean domestic and commercial bins and what affects a bin cleaning quote.',
    now()
  ),
  (
    'Mobile car wash or full valet: choosing the right level',
    'mobile-car-wash-vs-full-valet',
    'A simple guide to exterior washes, interior cleaning and full valets.',
    'A mobile car wash is best for convenient exterior care. Interior cleaning adds attention to cabin surfaces and everyday mess. A full valet is more suitable when the vehicle needs a broader reset.

Vehicle type, number of vehicles and the chosen valet level affect price and duration. If access to the vehicle is limited or several vehicles need care at once, include that in the request.',
    'Car Care',
    array['mobile car wash','vehicle valeting'],
    'published',
    'Mobile Car Wash vs Full Valet | ScrubSkwad',
    'Compare mobile car wash, interior cleaning and full valet options before requesting a quote.',
    now()
  ),
  (
    'Airbnb turnover cleaning: what hosts should include',
    'airbnb-turnover-cleaning-host-guide',
    'A host-focused guide for cleaner, faster short-stay turnovers.',
    'Airbnb turnover cleaning is different from ordinary domestic cleaning because timing, presentation and repeatability matter.

Hosts should specify bedrooms, bathrooms, linen expectations, kitchen reset needs, waste handling, guest damage concerns and access instructions. If the property is in a busy Manchester location, include parking and entry details.

A clear turnover request helps the team estimate duration, staffing and whether add-ons are needed.',
    'Manchester Content',
    array['airbnb cleaning','hosts','manchester'],
    'published',
    'Airbnb Turnover Cleaning Guide | ScrubSkwad',
    'A practical Airbnb turnover cleaning guide for Manchester hosts and short-stay operators.',
    now()
  )
on conflict (slug) do update set
  excerpt = excluded.excerpt,
  body = excluded.body,
  category = excluded.category,
  tags = excluded.tags,
  status = excluded.status,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  published_at = excluded.published_at;

insert into public.seo_pages (
  service_slug,
  location_slug,
  service_name,
  location_name,
  h1,
  body,
  seo_title,
  seo_description,
  status
) values
  ('cleaning', 'manchester', 'Cleaning', 'Manchester', 'Premium Cleaning in Manchester', 'ScrubSkwad helps Manchester households, tenants, landlords and property teams request premium cleaning with a clearer process. Add your postcode, property type, room count and cleaning priorities to build a live estimate before admin review.

The quote flow supports routine cleaning, deeper cleaning needs and common add-ons. Every request remains a quote until reviewed, so the team can check access, staffing and time before confirmation.', 'Cleaning Manchester | ScrubSkwad', 'Request premium cleaning in Manchester with live estimates and admin-reviewed booking.', 'published'),
  ('deep-cleaning', 'manchester', 'Deep Cleaning', 'Manchester', 'Deep Cleaning in Manchester', 'Request a deep cleaning quote for Manchester homes, rented properties and busy households. The booking flow accounts for room count, bathrooms, dirt level and add-ons such as oven, fridge and carpet cleaning.

Use deep cleaning when a property needs more than routine upkeep. ScrubSkwad reviews every request before confirmation so the estimate can reflect the actual job.', 'Deep Cleaning Manchester | ScrubSkwad', 'Build a deep cleaning quote in Manchester with dirt-level and add-on estimates.', 'published'),
  ('end-of-tenancy', 'manchester', 'End of Tenancy Cleaning', 'Manchester', 'End of Tenancy Cleaning in Manchester', 'End of tenancy cleaning requests in Manchester can include bedrooms, bathrooms, dirt level, oven cleaning, fridge cleaning and carpets. The guided estimate helps tenants, landlords and agents understand price, duration and staffing before approval.

Include access notes, parking constraints and handover timing so the team can review the request clearly.', 'End of Tenancy Cleaning Manchester | ScrubSkwad', 'Request end-of-tenancy cleaning in Manchester with live quote estimates.', 'published'),
  ('end-of-tenancy', 'salford', 'End of Tenancy Cleaning', 'Salford', 'End of Tenancy Cleaning in Salford', 'Request an end-of-tenancy cleaning quote for Salford properties with room-based pricing, dirt-level modifiers, add-ons, and review before approval.

ScrubSkwad helps tenants, landlords and property managers describe the job clearly before the booking is confirmed.', 'End of Tenancy Cleaning Salford | ScrubSkwad', 'Request a premium end-of-tenancy cleaning quote in Salford with live pricing.', 'published'),
  ('removals', 'trafford', 'Removals', 'Trafford', 'House Removals in Trafford', 'Build a removals quote for Trafford with mover count, estimated hours, stairs, packing and access notes. The booking engine calculates a live estimate before the request is reviewed.

Use the quote flow for house removals, packing support and moving-day planning.', 'House Removals Trafford | ScrubSkwad', 'Premium removals quote requests in Trafford with live estimates and admin approval.', 'published'),
  ('bin-cleaning', 'salford', 'Bin Cleaning', 'Salford', 'Wheelie Bin Cleaning in Salford', 'Request bin cleaning in Salford for domestic or commercial bins. Add the number of bins, bin type and frequency notes so ScrubSkwad can estimate time and price.

Bin cleaning can help with odour, residue and property hygiene after heavy use or warm weather.', 'Wheelie Bin Cleaning Salford | ScrubSkwad', 'Request wheelie bin cleaning in Salford with clear bin count estimates.', 'published'),
  ('mobile-car-wash', 'stockport', 'Mobile Car Wash', 'Stockport', 'Mobile Car Wash in Stockport', 'Request a mobile car wash or valet quote in Stockport. Choose vehicle type, valet level and vehicle count to see a live estimate.

ScrubSkwad supports exterior care, interior cleaning and fuller valet requests for homes and workplaces.', 'Mobile Car Wash Stockport | ScrubSkwad', 'Mobile car wash and vehicle valet quote requests in Stockport.', 'published'),
  ('commercial-cleaning', 'manchester', 'Commercial Cleaning', 'Manchester', 'Commercial Cleaning in Manchester', 'Request commercial cleaning in Manchester for offices, workspaces and customer-facing properties. Include property type, access notes, frequency needs and any high-priority areas.

ScrubSkwad quote requests are reviewed before approval, helping the team match time and staffing to the space.', 'Commercial Cleaning Manchester | ScrubSkwad', 'Commercial cleaning quote requests in Manchester with admin-reviewed estimates.', 'published')
on conflict (service_slug, location_slug) do update set
  service_name = excluded.service_name,
  location_name = excluded.location_name,
  h1 = excluded.h1,
  body = excluded.body,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  status = excluded.status,
  updated_at = now();

