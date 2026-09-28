// All communication with the YouTube Data API lives in this file.
// Quota: each key gets 10,000 units/day. search = 100 units, everything else here = 1 unit.
// Results are cached in sessionStorage for a few minutes to save quota.

const API_BASE = "https://www.googleapis.com/youtube/v3";
const CACHE_MINUTES = 10;

const CATEGORIES = [
  { label: "All", id: null },
  { label: "Music", id: "10" },
  { label: "Gaming", id: "20" },
  { label: "Sports", id: "17" },
  { label: "Science & Tech", id: "28" },
  { label: "Entertainment", id: "24" }
];

const VIDEO_PARTS = "snippet,contentDetails,statistics";

function hasApiKey() {
  return typeof CONFIG !== "undefined" && CONFIG.API_KEY && CONFIG.API_KEY !== "YOUR_API_KEY_HERE";
}

// Call at the top of each page. Returns false (and shows a message) if there's no key.
function apiReady() {
  if (hasApiKey()) return true;
  showStatus("Add your YouTube API key to config.js to load videos. The README has the steps.", "error");
  return false;
}

function friendlyError(reason, fallback) {
  const messages = {
    quotaExceeded: "Today's API quota is used up. It resets at midnight Pacific time.",
    keyInvalid: "The API key isn't valid. Check config.js.",
    forbidden: "The API refused this request. Check that your key is allowed to use the YouTube Data API v3 and that its referrer restrictions include this address.",
    commentsDisabled: "Comments are turned off for this video.",
    videoNotFound: "That video couldn't be found."
  };
  return messages[reason] || fallback || "Something went wrong talking to YouTube.";
}

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { time, data } = JSON.parse(raw);
    return Date.now() - time < CACHE_MINUTES * 60000 ? data : null;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ time: Date.now(), data }));
  } catch {
    // Storage full or unavailable: skip caching
  }
}

async function apiFetch(endpoint, params) {
  const cacheKey = "yt:" + endpoint + ":" + JSON.stringify(params);
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const url = new URL(API_BASE + "/" + endpoint);
  Object.entries({ ...params, key: CONFIG.API_KEY }).forEach(([k, v]) => url.searchParams.set(k, v));

  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error("Couldn't reach YouTube. Check your internet connection.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const reason = data.error && data.error.errors && data.error.errors[0] && data.error.errors[0].reason;
    const err = new Error(friendlyError(reason, data.error && data.error.message));
    err.reason = reason;
    throw err;
  }

  writeCache(cacheKey, data);
  return data;
}

// Turns a raw API video into the simple shape the UI uses
function normalizeVideo(item) {
  const { snippet, contentDetails, statistics } = item;
  const thumbs = snippet.thumbnails;
  return {
    id: item.id,
    title: snippet.title,
    channel: snippet.channelTitle,
    description: snippet.description,
    age: timeAgo(snippet.publishedAt),
    duration: parseDuration(contentDetails.duration),
    thumb: (thumbs.medium || thumbs.default).url,
    views: Number((statistics && statistics.viewCount) || 0),
    likes: Number((statistics && statistics.likeCount) || 0),
    commentCount: Number((statistics && statistics.commentCount) || 0)
  };
}

async function getPopularVideos(categoryId) {
  const params = {
    part: VIDEO_PARTS,
    chart: "mostPopular",
    regionCode: (typeof CONFIG !== "undefined" && CONFIG.REGION) || "US",
    maxResults: 24
  };
  if (categoryId) params.videoCategoryId = categoryId;
  const data = await apiFetch("videos", params);
  return data.items.map(normalizeVideo);
}

// search.list only returns basic info, so we look up the full details with videos.list
async function searchVideos(query) {
  const found = await apiFetch("search", { part: "snippet", type: "video", q: query, maxResults: 24 });
  const ids = found.items.map((i) => i.id.videoId).join(",");
  if (!ids) return [];
  const data = await apiFetch("videos", { part: VIDEO_PARTS, id: ids });
  return data.items.map(normalizeVideo);
}

async function getVideo(id) {
  const data = await apiFetch("videos", { part: VIDEO_PARTS, id });
  if (!data.items.length) {
    const err = new Error(friendlyError("videoNotFound"));
    err.reason = "videoNotFound";
    throw err;
  }
  return normalizeVideo(data.items[0]);
}

async function getComments(videoId) {
  const data = await apiFetch("commentThreads", {
    part: "snippet",
    videoId,
    maxResults: 20,
    order: "relevance",
    textFormat: "plainText"
  });
  return data.items.map((item) => {
    const c = item.snippet.topLevelComment.snippet;
    return { user: c.authorDisplayName, text: c.textDisplay, age: timeAgo(c.publishedAt) };
  });
}
