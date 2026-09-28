// Fake data for the static version. In the API version, this gets replaced
// by real results from the YouTube Data API.
const VIDEOS = [
  { id: "v1", title: "Build a Responsive Website in 30 Minutes", channel: "Code Canvas", views: 1240000, age: "2 weeks ago", duration: "31:08", category: "Coding", gradient: "linear-gradient(135deg,#0f2027,#2c5364)", description: "A start-to-finish walkthrough of building a responsive landing page with HTML and CSS Grid." },
  { id: "v2", title: "CSS Grid vs Flexbox: When to Use Which", channel: "Code Canvas", views: 860000, age: "3 months ago", duration: "12:44", category: "Coding", gradient: "linear-gradient(135deg,#5b2a86,#2b1055)", description: "Two layout systems, one clear rule of thumb for choosing between them." },
  { id: "v3", title: "Lo-fi Beats to Focus and Study", channel: "Quiet Hours", views: 5300000, age: "1 year ago", duration: "3:02:10", category: "Music", gradient: "linear-gradient(135deg,#654ea3,#eaafc8)", description: "Three hours of mellow instrumentals for deep work." },
  { id: "v4", title: "I Cooked Only With a Camping Stove for a Week", channel: "Trail Kitchen", views: 2100000, age: "5 days ago", duration: "18:27", category: "Food", gradient: "linear-gradient(135deg,#b91d1d,#3a0d0d)", description: "Seven days, one burner, and a lot of improvised dinners." },
  { id: "v5", title: "JavaScript Closures Explained Simply", channel: "Dev Daily", views: 640000, age: "8 months ago", duration: "9:15", category: "Coding", gradient: "linear-gradient(135deg,#1e3c72,#2a5298)", description: "What a closure actually is, with three small examples you can run yourself." },
  { id: "v6", title: "Top 10 Hidden Gems in Lisbon", channel: "Wander Notes", views: 970000, age: "1 month ago", duration: "14:52", category: "Travel", gradient: "linear-gradient(135deg,#f2994a,#f2c94c)", description: "Viewpoints, cafes, and side streets most visitors walk right past." },
  { id: "v7", title: "Full Body Workout, No Equipment", channel: "Move Better", views: 3400000, age: "6 months ago", duration: "25:00", category: "Fitness", gradient: "linear-gradient(135deg,#11998e,#38ef7d)", description: "A 25 minute routine you can do in a living room." },
  { id: "v8", title: "How Do Search Engines Actually Work?", channel: "Explained Visually", views: 1800000, age: "4 months ago", duration: "11:36", category: "Tech", gradient: "linear-gradient(135deg,#232526,#414345)", description: "Crawling, indexing, and ranking, drawn out step by step." },
  { id: "v9", title: "Learn React in One Hour", channel: "Dev Daily", views: 2900000, age: "1 year ago", duration: "1:02:19", category: "Coding", gradient: "linear-gradient(135deg,#00c6ff,#0072ff)", description: "Components, props, state, and hooks with a small project." },
  { id: "v10", title: "Sunrise Hike Above the Clouds", channel: "Wander Notes", views: 420000, age: "3 weeks ago", duration: "8:41", category: "Travel", gradient: "linear-gradient(135deg,#ff9966,#ff5e62)", description: "A 4am start that turned into the best morning of the trip." },
  { id: "v11", title: "Piano Improvisation in a Rainy Studio", channel: "Quiet Hours", views: 780000, age: "2 months ago", duration: "6:33", category: "Music", gradient: "linear-gradient(135deg,#373b44,#4286f4)", description: "One take, no editing, rain on the window." },
  { id: "v12", title: "Sourdough From Scratch: Complete Guide", channel: "Trail Kitchen", views: 1500000, age: "9 months ago", duration: "22:10", category: "Food", gradient: "linear-gradient(135deg,#8e2de2,#4a00e0)", description: "Starter, stretch and folds, shaping, and baking, all in one video." }
];

const CATEGORIES = ["All", "Coding", "Music", "Food", "Travel", "Fitness", "Tech"];

function formatViews(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M views";
  if (n >= 1e3) return Math.round(n / 1e3) + "K views";
  return n + " views";
}

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
