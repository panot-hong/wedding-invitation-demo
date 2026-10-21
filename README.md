# Wedding invitation draft
Run: node server.cjs then open http://127.0.0.1:4173

Sample names, date, timeline and venue are editable in index.html. Map currently searches Bangkok and must be updated to the actual venue. RSVP is a clearly marked local-browser demo, not a backend submission.

Video integration: place video in assets/intro.mp4 and set settings.introVideo in app.js to assets/intro.mp4. Opening is triggered by a tap. The ended event reveals the real website; skip and media-error fallback are supported. Match the final frame to #f8f4eb, then adjust after the actual video arrives. No music file is included.

Visual direction: ivory #f8f4eb, champagne #a1844e, olive #424738; Cormorant Garamond headings and Noto Sans Thai body; open stationery layouts. Fonts require an internet connection and have local fallbacks.
