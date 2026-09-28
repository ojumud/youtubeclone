const videoId = new URLSearchParams(window.location.search).get("v");

// ---------- Player ----------
function mountPlayer(id) {
  const frame = document.createElement("iframe");
  frame.src = "https://www.youtube.com/embed/" + encodeURIComponent(id) + "?rel=0";
  frame.title = "Video player";
  frame.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  document.getElementById("player").appendChild(frame);
}

// ---------- Details ----------
function renderDetails(video) {
  document.title = video.title + " - Viewly";
  document.getElementById("videoTitle").textContent = video.title;
  document.getElementById("channelAvatar").textContent = initials(video.channel);
  document.getElementById("channelName").textContent = video.channel;
  document.getElementById("descMeta").textContent = formatViews(video.views) + " • " + video.age;

  const descText = document.getElementById("descText");
  descText.textContent = video.description || "No description.";

  const toggle = document.getElementById("descToggle");
  toggle.addEventListener("click", () => {
    const collapsed = descText.classList.toggle("collapsed");
    toggle.textContent = collapsed ? "Show more" : "Show less";
  });

  const likeBtn = document.getElementById("likeBtn");
  let liked = false;
  const renderLike = () => {
    likeBtn.textContent = "👍 " + formatCount(video.likes + (liked ? 1 : 0));
  };
  likeBtn.addEventListener("click", () => {
    liked = !liked;
    likeBtn.classList.toggle("liked", liked);
    renderLike();
  });
  renderLike();

  document.getElementById("commentCount").textContent =
    video.commentCount.toLocaleString() + " Comments";
}

const subBtn = document.getElementById("subBtn");
subBtn.addEventListener("click", () => {
  const subscribed = subBtn.classList.toggle("subscribed");
  subBtn.textContent = subscribed ? "Subscribed" : "Subscribe";
});

// ---------- Comments ----------
const commentList = document.getElementById("commentList");

function createCommentEl(c) {
  const row = el("div", "comment");
  row.appendChild(el("div", "avatar", initials(c.user.replace("@", ""))));
  const body = el("div", "comment__body");
  const head = el("p", "comment__head");
  head.appendChild(el("strong", "", c.user));
  head.appendChild(el("span", "comment__age", " " + c.age));
  body.append(head, el("p", "comment__text", c.text));
  row.appendChild(body);
  return row;
}

async function loadComments() {
  try {
    const comments = await getComments(videoId);
    commentList.replaceChildren();
    comments.forEach((c) => commentList.appendChild(createCommentEl(c)));
  } catch (err) {
    // Comments being off is normal, so show it inline instead of as a page error
    commentList.replaceChildren(el("p", "empty", err.message));
  }
}

// Posting real comments needs Google sign-in (OAuth), so this only adds one to your screen
document.getElementById("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("commentInput");
  const text = input.value.trim();
  if (!text) return;
  commentList.prepend(createCommentEl({ user: "You", text, age: "just now" }));
  input.value = "";
});

// ---------- Up next ----------
async function loadUpNext() {
  const upNext = document.getElementById("upNext");
  try {
    const videos = await getPopularVideos(null);
    videos
      .filter((v) => v.id !== videoId)
      .slice(0, 8)
      .forEach((v) => {
        const link = el("a", "next-card");
        link.href = "watch.html?v=" + encodeURIComponent(v.id);

        const thumb = el("div", "next-card__thumb");
        const img = el("img", "thumb-img");
        img.src = v.thumb;
        img.alt = "";
        img.loading = "lazy";
        thumb.appendChild(img);
        thumb.appendChild(el("span", "video-card__duration", v.duration));

        const text = el("div", "next-card__text");
        text.appendChild(el("h3", "next-card__title", v.title));
        text.appendChild(el("p", "video-card__channel", v.channel));
        text.appendChild(el("p", "video-card__meta", formatViews(v.views) + " • " + v.age));

        link.append(thumb, text);
        upNext.appendChild(link);
      });
  } catch {
    // Up next is optional: leave it empty if it fails
  }
}

// ---------- Init ----------
if (!videoId) {
  window.location.href = "index.html";
} else {
  mountPlayer(videoId); // the embed doesn't use the API key, so it works even before setup
  if (apiReady()) {
    getVideo(videoId)
      .then(renderDetails)
      .catch((err) => showStatus(err.message, "error"));
    loadComments();
    loadUpNext();
  }
}
