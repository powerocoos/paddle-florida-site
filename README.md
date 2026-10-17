# Paddle Florida website (Squarespace)

Custom code for paddleflorida.org, built by Ocoos Web Consulting. Squarespace holds the pages and content; this repo holds the code blocks, shared CSS/JS and trip data.

## Layout
- `pages/`  one file per Squarespace code block (home sections, etc.), pasted into a Code block with Display Source off
- `trips/`  one JSON record per trip (status, price, deadline, itinerary, gear, FAQ). Later published from the dashboard
- `shared/` shared CSS/JS loaded site-wide (jsDelivr loader pinned to a commit SHA)

## Rules
- Every selector is prefixed and scoped to its section.
- No personal data in this repo (public). Registrations stay in JotForm and the private dashboard.
- Nothing goes live without client approval. Old pages are renamed `-old` and hidden, never deleted.

## Preview and release
Preview with `?ocdev=<7-char sha>`; release by pinning the new SHA in the Squarespace header loader. Roll back by restoring the previous SHA.
