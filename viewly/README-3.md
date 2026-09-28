# Viewly — YouTube Clone (Static UI)

A front-end recreation of YouTube's home page and video page, built with vanilla HTML, CSS and JavaScript using fake data. Fan-made for learning — not affiliated with YouTube.

## Features
- Home page with a responsive video grid
- Category chips that filter videos
- Working search box (filters by title or channel)
- Slide-out sidebar
- Video page with a simulated player (play/pause, clickable progress bar)
- Subscribe and like toggles
- Comment section where you can add comments
- "Up next" recommendations

## Tech Stack
- HTML5
- CSS3 (Grid, Flexbox, custom properties, media queries)
- Vanilla JavaScript (DOM manipulation, URLSearchParams)

## Getting Started
1. Clone the repo
2. Open `index.html` in your browser. No build step needed.

## Project Structure
- `data.js` — fake video data and small helper functions
- `common.js` — header behavior shared by both pages
- `home.js` — home page grid, chips, and search filtering
- `watch.js` — video page player, comments, and recommendations

## Next Version: YouTube Data API
The plan is to replace `data.js` with live results from the [YouTube Data API](https://developers.google.com/youtube/v3) and swap the simulated player for the real embedded player.
