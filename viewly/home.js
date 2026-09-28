const grid = document.getElementById("videoGrid");
const chipBar = document.getElementById("chipBar");
const query = (new URLSearchParams(window.location.search).get("q") || "").toLowerCase();

let activeCategory = "All";

function createVideoCard(video) {
  const link = el("a", "video-card");
  link.href = "watch.html?v=" + video.id;

  const thumb = el("div", "video-card__thumb");
  thumb.style.background = video.gradient;
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

function renderGrid() {
  const filtered = VIDEOS.filter((v) => {
    const matchesCategory = activeCategory === "All" || v.category === activeCategory;
    const matchesQuery = !query || v.title.toLowerCase().includes(query) || v.channel.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  grid.replaceChildren();

  if (filtered.length === 0) {
    grid.appendChild(el("p", "empty", "No videos match your search. Try a different word or category."));
    return;
  }
  filtered.forEach((v) => grid.appendChild(createVideoCard(v)));
}

function renderChips() {
  CATEGORIES.forEach((cat) => {
    const chip = el("button", "chip" + (cat === activeCategory ? " active" : ""), cat);
    chip.addEventListener("click", () => {
      activeCategory = cat;
      chipBar.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.textContent === cat));
      renderGrid();
    });
    chipBar.appendChild(chip);
  });
}

renderChips();
renderGrid();
