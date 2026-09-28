// Shared behavior for both pages: sidebar toggle and search box

document.getElementById("menuBtn").addEventListener("click", () => {
  document.body.classList.toggle("sidebar-open");
});

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("searchInput").value.trim();
  window.location.href = q ? "index.html?q=" + encodeURIComponent(q) : "index.html";
});

// Pre-fill the search box if we arrived from a search
const pageParams = new URLSearchParams(window.location.search);
if (pageParams.get("q")) {
  document.getElementById("searchInput").value = pageParams.get("q");
}
