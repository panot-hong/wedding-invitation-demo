# Wedding invitation demo

Open index.html through a static server. For local media seeking tests, run `node server.cjs` (supports byte ranges, defaults to port 4173).

The site uses English throughout. The initial envelope has no bird. Tap anywhere or use Enter/Space to begin. Intro playback supports skipping, replay, media failure fallback, and retries. The final decoded video frame stays fixed behind the scrolling content. A separate canvas layer adds a gentle breeze to the left botanical artwork; reduced-motion preferences disable it.

Important remaining media work: assets/intro-v3.mp4 still uses the earlier generated animation. It does NOT yet show a dove arriving from offscreen and pecking the wax seal. intro-motion-brief.txt specifies the replacement sequence. Use assets/envelope-before-arrival.png as its first keyframe and assets/invitation-paper.png as its final composition. Replace the MP4 only after checking visible beak-to-seal contact and gold light AFTER contact.

Names, date, schedule and venue are sample content. The map is a sample Bangkok search. RSVP stores demo responses in the visitor's browser only; it does not send data to the hosts.
