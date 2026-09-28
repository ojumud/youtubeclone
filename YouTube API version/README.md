# Viewly — YouTube Clone (Data API version)

The static Viewly UI, now powered by the real [YouTube Data API v3](https://developers.google.com/youtube/v3). Fan-made for learning — not affiliated with YouTube.

## Features
- Home page showing trending videos, with category chips (Music, Gaming, Sports, Science & Tech, Entertainment)
- Real search results
- Watch page with the official embedded YouTube player
- Real video details: views, likes, description, upload date
- Real top comments (read-only)
- "Up next" recommendations from trending videos
- Friendly error messages for missing keys, quota limits, and disabled comments
- Responses cached in sessionStorage to save API quota

## Tech Stack
- HTML5, CSS3, vanilla JavaScript (fetch, async/await, URLSearchParams)
- YouTube Data API v3 + YouTube iframe embed

## Setup

### 1. Get an API key
1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2. Open **APIs & Services > Library**, search for **YouTube Data API v3**, and click **Enable**.
3. Open **APIs & Services > Credentials**, click **Create credentials > API key**.
4. Click **Edit API key** and add restrictions (important, see Security below):
   - **Application restrictions:** Websites. Add `http://localhost:*/*` (and your deployed site's address later).
   - **API restrictions:** Restrict key, then choose **YouTube Data API v3**.

### 2. Add the key to the project
Copy `config.example.js` to `config.js` and paste your key:
```js
const CONFIG = {
  API_KEY: "your-key-here",
  REGION: "US"
};
```

### 3. Run it with a local server
Don't double-click `index.html`. Opening it as a `file://` page can make the YouTube player show an error, and it won't match your key's referrer restriction. Use one of:
```bash
npx serve
```
or the **Live Server** extension in VS Code, then open the address it shows.

## Quota
Every key gets 10,000 units per day. Trending, video details, and comments cost 1 unit per request. **Search costs 100 units**, so about 100 searches a day. Results are cached for 10 minutes to help.

## Security
API keys in front-end code are visible to anyone who opens the browser's dev tools. That's normal for a project like this, which is why the referrer and API restrictions above matter: a restricted key is useless on any other website. `config.js` is gitignored so you don't commit your key by accident. If you host on GitHub Pages, the file has to be deployed, so use a restricted key. A more secure upgrade is a small backend or serverless function that holds the key and forwards requests.

## Limitations
- Posting comments, subscribing, and liking need Google sign-in (OAuth). Those buttons only change what you see on screen.
- YouTube removed the "related videos" endpoint, so "Up next" uses trending videos instead.

## Possible Next Steps
- Pagination or infinite scroll using `nextPageToken`
- Channel pages using `channels.list`
- Real channel avatars
- A proxy backend to hide the API key
- Google sign-in to enable likes, comments, and subscriptions
