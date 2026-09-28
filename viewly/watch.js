const params = new URLSearchParams(window.location.search);
const video = VIDEOS.find((v) => v.id === params.get("v")) || VIDEOS[0];

document.title = video.title + " - Viewly";

// ---------- Player (fake) ----------
// A placeholder player. In the API version, replace this whole block with
// the real YouTube iframe embed.
const player = document.getElementById("player");
player.style.background = video.gradient;

const playBtn = document.getElementById("playBtn");
const progressFill = document.getElementById("progressFill");
const timeLabel = document.getElementById("timeLabel");

function toSeconds(str) {
  return str.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}
function toClock(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const pad = (n) => String(n).padStart(2, "0");
  return (h ? h + ":" + pad(m) : m) + ":" + pad(s);
}

const totalSeconds = toSeconds(video.duration);
let elapsed = 0;
let timer = null;

function updateProgress() {
  progressFill.style.width = (elapsed / totalSeconds) * 100 + "%";
  timeLabel.textContent = toClock(elapsed) + " / " + video.duration;
}

function togglePlay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "Play");
    return;
  }
  playBtn.textContent = "❚❚";
  playBtn.setAttribute("aria-label", "Pause");
  timer = setInterval(() => {
    elapsed += 1;
    if (elapsed >= totalSeconds) {
      elapsed = totalSeconds;
      togglePlay();
    }
    updateProgress();
  }, 1000);
}

playBtn.addEventListener("click", togglePlay);
document.getElementById("progressBar").addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  elapsed = Math.floor(((e.clientX - rect.left) / rect.width) * totalSeconds);
  updateProgress();
});
updateProgress();

// ---------- Video details ----------
document.getElementById("videoTitle").textContent = video.title;
document.getElementById("channelAvatar").textContent = initials(video.channel);
document.getElementById("channelName").textContent = video.channel;
document.getElementById("descMeta").textContent = formatViews(video.views) + " • " + video.age;
document.getElementById("descText").textContent = video.description;

// Subscribe and like toggles (state only, resets on refresh)
const subBtn = document.getElementById("subBtn");
subBtn.addEventListener("click", () => {
  const subscribed = subBtn.classList.toggle("subscribed");
  subBtn.textContent = subscribed ? "Subscribed" : "Subscribe";
});

const likeBtn = document.getElementById("likeBtn");
let likes = Math.round(video.views / 40);
function renderLikes(liked) {
  likeBtn.textContent = "👍 " + (likes + (liked ? 1 : 0)).toLocaleString();
}
let liked = false;
likeBtn.addEventListener("click", () => {
  liked = !liked;
  likeBtn.classList.toggle("liked", liked);
  renderLikes(liked);
});
renderLikes(false);

// ---------- Comments ----------
const seedComments = [
  { user: "maya_builds", text: "This finally made it click for me. Thank you!", age: "2 days ago" },
  { user: "devon.k", text: "Great pacing, and the examples were easy to follow.", age: "1 week ago" },
  { user: "sam_reads", text: "Would love a follow-up going deeper on this topic.", age: "3 weeks ago" }
];

const commentList = document.getElementById("commentList");
const commentCount = document.getElementById("commentCount");
const comments = [...seedComments];

function renderComments() {
  commentCount.textContent = comments.length + " Comments";
  commentList.replaceChildren();
  comments.forEach((c) => {
    const row = el("div", "comment");
    row.appendChild(el("div", "avatar", c.user.slice(0, 2).toUpperCase()));
    const body = el("div", "comment__body");
    const head = el("p", "comment__head");
    head.appendChild(el("strong", "", "@" + c.user));
    head.appendChild(el("span", "comment__age", " " + c.age));
    body.append(head, el("p", "comment__text", c.text));
    row.appendChild(body);
    commentList.appendChild(row);
  });
}

document.getElementById("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("commentInput");
  const text = input.value.trim();
  if (!text) return;
  comments.unshift({ user: "you", text, age: "just now" });
  input.value = "";
  renderComments();
});
renderComments();

// ---------- Up next ----------
const upNext = document.getElementById("upNext");
VIDEOS.filter((v) => v.id !== video.id).slice(0, 8).forEach((v) => {
  const link = el("a", "next-card");
  link.href = "watch.html?v=" + v.id;

  const thumb = el("div", "next-card__thumb");
  thumb.style.background = v.gradient;
  thumb.appendChild(el("span", "video-card__duration", v.duration));

  const text = el("div", "next-card__text");
  text.appendChild(el("h3", "next-card__title", v.title));
  text.appendChild(el("p", "video-card__channel", v.channel));
  text.appendChild(el("p", "video-card__meta", formatViews(v.views) + " • " + v.age));

  link.append(thumb, text);
  upNext.appendChild(link);
});
