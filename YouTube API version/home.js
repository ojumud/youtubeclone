const grid = document.getElementById("videoGrid");
const chipBar = document.getElementById("chipBar");
const query = (new URLSearchParams(window.location.search).get("q") || "").trim();

let activeCategory = CATEGORIES[0];
let requestCounter = 0; // ignores slow responses if the user clicks another chip quickly

function createVideoCard(video) {
  const link = el("a", "video-card");
  link.href = "watch.html?v=" + encodeURIComponent(video.id);

  const thumb = el("div", "video-card__thumb");
  const img = el("img", "thumb-img");
  img.src = video.thumb;
  img.alt = "";
  img.loading = "lazy";
  thumb.appendChild(img);
  thumb.appendChild(el("span", "video-card__duration", video.duration));

  const info = el("div", "video-card__info");
  info.appendChild(el("div", "avatar", initials(video.channel)));

  const text = el("div", "video-card__text");
  text.appendChild(el("h3", "video-card__title", video.title));
  text.appendChild(el("p", "video-card__channel", video.channel));
  text.appendChild(el("p", "video-card__meta", formatViews(video.views) + " • " + video.age));
  info.appendChild(text);

  link.append(thumb, info);
  return link;
}

async function loadVideos() {
  const myRequest = ++requestCounter;
  grid.replaceChildren();
  showStatus("Loading videos...");

  try {
    const videos = query ? await searchVideos(query) : await getPopularVideos(activeCategory.id);
    if (myRequest !== requestCounter) return;

    clearStatus();
    if (videos.length === 0) {
      grid.appendChild(el("p", "empty", "No videos found. Try a different search."));
      return;
    }
    videos.forEach((v) => grid.appendChild(createVideoCard(v)));
  } catch (err) {
    if (myRequest !== requestCounter) return;
    showStatus(err.message, "error");
  }
}

function renderChips() {
  CATEGORIES.forEach((cat) => {
    const chip = el("button", "chip" + (cat === activeCategory ? " active" : ""), cat.label);
    chip.addEventListener("click", () => {
      activeCategory = cat;
      chipBar.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
      loadVideos();
    });
    chipBar.appendChild(chip);
  });
}

if (apiReady()) {
  if (query) {
    chipBar.hidden = true; // categories don't apply to search results
  } else {
    renderChips();
  }
  loadVideos();
}
