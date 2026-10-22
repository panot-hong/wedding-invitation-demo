# Wedding invitation demo

Open index.html through a static server. For local media seeking tests, run `node server.cjs` (supports byte ranges, defaults to port 4173).

The site uses English throughout. The initial envelope has no bird. Tap anywhere or use Enter/Space to begin. Intro playback supports skipping, replay, media failure fallback, and retries. The final decoded video frame stays fixed behind the scrolling content. A separate canvas layer adds a gentle breeze to the left botanical artwork; reduced-motion preferences disable it.

The active clip is assets/intro-v4.mp4 (720x1280, about 10 seconds). It starts with no bird, shows the dove arriving and touching the wax seal with its beak around 3.2 seconds, followed by gold sparkles and the envelope opening. intro-v4-start.png and intro-v4-end.png were captured from this clip for the gate/poster and media fallback. Normal playback retains the actual decoded last frame. intro-motion-brief.txt records the animation direction.

Names, date, schedule and venue are sample content. The map is a sample Bangkok search. RSVP stores demo responses in the visitor's browser only; it does not send data to the hosts.
