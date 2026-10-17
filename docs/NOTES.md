# Paddle Florida website redesign: project notes
As of Oct 16, 2026
- Repo: https://github.com/powerocoos/paddle-florida-site (PUBLIC, chosen by Xavier for simplicity; no personal data ever goes in it). Layout: pages/ (page code, *.src.js built to *.js by build.py), trips/trips.json (trip data), shared/.
- Home v2 (Squarespace, Not Linked): one code block holds a loader pulling pages/home.js from jsDelivr pinned to commit 68daa87 (update the SHA in the Home v2 code block after each push). Renders hero (rotating photos), trip finder (filters, no wait list), "what a supported trip means", raffle/donate conversion section, newsletter section, 100 Trips shirt section (Bonfire), videos, gallery, mission, supporters (county tourism logos, Florida SEE and Guardian Guides certifications, quick links). Previewed in the editor and working. NOT live.
- Wait list removed everywhere in v2: sold-out cards say "See the trip" and point to the newsletter signup.
- Donate facts (from live site): Qgiv raffle page secure.qgiv.com/for/kpr/event/prthpfw/, $3,200 kayak package (Current Designs Vision 130 + Werner Shuna Hooked paddle), drawing Mar 21 2027 at Suwannee River State Park, winner need not be present, pickup in St. Augustine. Shirt on Bonfire. FEIN 27-4628150.
- To do next: add a native Squarespace newsletter block under the "Hear first" heading (id pf-news) and confirm it has a storage list (the current home block shows "needs a storage option"); partners section; first-timer guide; trip pages (Blackwater template), then dashboard publishing (trips.json -> D1 -> public PII-free JSON feed read by the pages via window.PF_FEED).
- Roll-out: Home v2, then trip pages (each as unlinked v2), then other pages in batches. Go-live per page only after approval: rename old slug -old and hide from search; keep as backup.

## Trip pages (Oct 16, 2026)
- Template: pages/trip.src.js (built to pages/trip.js by build.py). Mount `<div id="pf-trip" data-trip="<id>">` + script tag. Data per trip in trips/<id>.json (status soldout/open, price, deadline, itinerary days, map points, camps, gear, FAQ, gallery, payments). Sections appear only if their data exists, so partial trips still render. `window.PF_FEED_TRIP` can point to the dashboard feed later (replaces embedded data).
- Blackwater: Squarespace page "Blackwater v2" (/blackwater-v2, Not Linked, hidden from search), code block pinned to commit 697e96d. Status currently soldout (matches live page "SOLD OUT!"); preview either state with ?pfstatus=open or ?pfstatus=soldout.
- Payment JotForms (from live Blackwater page): credit/debit 251175948659170, e-check 251175621359155, mailed check 261215124394148. Open state shows three pay cards plus prefill tip (type over prefilled fields, complete "How you heard"); soldout state shows newsletter CTA and a collapsed "Already have a spot? Payment forms".
- To confirm: Blackwater daily miles sum to 49 (57 with optional day 4 paddle) vs the listed 42-50 total, and Day 7 says 7 miles in the table vs 12 in the text; mail-in address used is the PO box from the site footer; newsletter CTA currently links to /#pf-news on the home page.

## All six trip pages (Oct 16, 2026)
- Squarespace Not Linked previews, each a code block pinned to commit b964cde: Blackwater v2 (still 697e96d), Santa Fe v2 (/santa-fe-v2), Keys v2 (/keys-v2), Festival v2 (/festival-v2), Wilderness Trail v2 (/wilderness-trail-v2), St Augustine v2 (/st-augustine-v2). Duplicated from Blackwater v2; confirm each is hidden from search.
- JotForm IDs (credit / e-check / mail): Santa Fe 222815944854162 / 222815759925165 / 261215552355150. Keys 221198393243155 / 221198301755152 / 261215847479164. Festival 221197614892160 / 221198226272152 / 261215191411142. Wilderness 221196862267160 / 220956087734161 / 261215165456152. St Aug 221198434505152 / 221197843351154 / 261215737300145.
- Template additions: grouped days (label), paddle choices table (Keys), places cards (St Aug), noChart flag, outfitterLabel.
- Status: Santa Fe, Keys sold out (Blackwater too); Festival, Wilderness, St Aug open.
- To confirm with Janice: Santa Fe optional miles (Day 4 7-13 and Day 6 0-6 vs "35 plus an optional 6"), Dampiers Landing mention, post-trip shuttle wording; Keys per-day miles and bedding; Festival camp location (Suwannee River SP both nights assumed), capacity; Wilderness total 63 vs 65, Day 6 miles 6 vs 8, shuttle at Shrine Club; Wilderness price now $600/$575 and deadline Dec 19, 2026; St Aug deadline Jan 12, 2027 and 5 vs 6 paddling days; baggage wording for non-Blackwater trips; mailed-check address.
- Home trip cards still link to /trip-previews-registration; repoint to the v2 pages at go-live.

## Newsletter and card links (Oct 17, 2026)
- Home v2 loader pinned to 2d79715. Home trip cards now link to the v2 trip pages. A native Squarespace Newsletter block ("Get trip updates", stores to Squarespace Email Subscribers, mailing list "Default", reCAPTCHA on, confirmation email off) sits in its own section at the bottom of Home v2; home.js moves it into the teal "Hear first when a season opens" section and hides the empty section. No test signup was submitted.
- Trip pages' newsletter button links to /home-v2#pf-news in code at 1ebc3f9 or later; the six trip code blocks are still pinned to b964cde/697e96d (button goes to /#pf-news) until repinned at go-live.
- At go-live: change card urls and trip CFG.news to the final slugs, and repin all loaders.

## Our Team page (Oct 17, 2026)
- New page "Our Team v2" (/our-team-v2, Not Linked), code block pinned to 57fd524 (pages/team.js, data in team/team.json). Featured Executive Director, staff and board cards with a bio pop-up (Esc and arrow keys work), ex-officio list, volunteer and contact buttons (/volunteers, /contact-us). Bios are the current site's text with spelling fixes only.
- To confirm: Tom's surname spelling (site says McLaulin), Beth's photo is a distant kayak shot, Monelle's board title, organization names kept as on the current page, ex-officio descriptions.
- SEO titles and descriptions for every page are drafted in docs/SEO.md (Project doc claude/website-seo-plan.md); apply at go-live after approval.

## Our Team go-live (Oct 17, 2026, approved by Janice)
- Live at /our-team (loader pinned @57fd524, mount `#pf-team`). Title "Our Team | Staff and Board | Paddle Florida"; description saved (148 chars); indexable; 9 images render; one H1.
- Method: reused the existing nav page (kept its menu position), replaced its sections with one code block, removed the old teal header section.
- Backup of the old content: page "Our Team (old backup)" (/our-team-backup, Not Linked, noindex). Scratch page "Our Team v2" (/our-team-v2, Not Linked, noindex) can be deleted with an explicit yes.
- /our-team-old returns 404 (old-slug rename was not needed because the original page was edited in place).
- Remaining pages (Home, six trips) are NOT approved to go live.

## Evening Programs rework (Oct 17, 2026) - PREVIEW ONLY, not live
- Old page: /evening-programs, one long alphabetical list of 70 speaker and musician bios built block by block in Squarespace (title "Evening Programs | Join Our Evening Programs Today"). Still live and untouched.
- New private preview: "Evening Programs v2" (/evening-programs-v2, Not Linked, noindex), loader pinned @de25233. Searchable card directory, bio pop-up (Esc and arrow keys), website links, optional label filter buttons. Data in evening/speakers.json (copied verbatim from the live page; only fix: removed a duplicated name at the start of two bios, Daniel Alvarez and Sarah Mac Band).
- Updating from the dashboard: new "Evening programs" tab (pf-dashboard commit 34f065d). Add/edit/hide/reorder, photo upload (resized in the browser), page intro, draft then Publish. Publish writes a snapshot that the page reads from https://pf-dashboard.calm-sun-1c8d.workers.dev/public/evening.json. Until that feed is reachable the page shows the embedded copy (same 70 people).
- D1 tables added: evening_speakers, evening_settings, evening_photos, evening_published, evening_log (schema/evening.sql in pf-dashboard).
- BLOCKER for live updates: Cloudflare Access protects the whole Worker, so the public feed is login-gated. Xavier must add an Access application (or path rule) with a Bypass policy for /public/* on pf-dashboard.calm-sun-1c8d.workers.dev. Security setting, not done by Claude.
- Go-live (needs explicit yes): rename old slug to evening-programs-old and hide from search, give the new page slug evening-programs, nav title Evening Programs, SEO below; repin loader.
- SEO draft: title "Evening Programs | Speakers and Music on the Water | Paddle Florida"; description "Meet the naturalists, authors, scientists and musicians who lead evening programs on Paddle Florida's multi-day paddling trips across Florida." (check wording with Janice: confirm programs are held on trips).
- Open questions for Janice: are all 70 still current? labels (Music/Author/Scientist) to turn on filter buttons? which speakers have no photo or outdated bios?
