
const videos = [

  {
    id: 1,
    title: "The Future of Smartphones Is Actually Crazy",
    channel: "dboss.tech",
    views: "125K views",
    uploaded: "2 days ago",
    duration: "8:42",
    category: "Technology",
    thumbnail: "images/thumbnail1.jpg",
    avatar: "images/avatar.jpg",
    video: "videos/video1.mp4",
  },

  {
    id: 2,
    title: "Learn JavaScript From Scratch",
    channel: "Code Academy",
    views: "320K views",
    uploaded: "1 week ago",
    duration: "15:21",
    category: "Programming",
    thumbnail: "https://picsum.photos/seed/code/800/450",
    avatar: "https://picsum.photos/seed/avatar2/100/100"
  },

  {
    id: 3,
    title: "I Built a Website in 24 Hours",
    channel: "Dev World",
    views: "87K views",
    uploaded: "3 days ago",
    duration: "12:05",
    category: "Programming",
    thumbnail: "https://picsum.photos/seed/website/800/450",
    avatar: "https://picsum.photos/seed/avatar3/100/100"
  },

  {
    id: 4,
    title: "The Best Gaming Setup for 2026",
    channel: "Game Zone",
    views: "450K views",
    uploaded: "4 days ago",
    duration: "10:32",
    category: "Gaming",
    thumbnail: "https://picsum.photos/seed/gaming/800/450",
    avatar: "https://picsum.photos/seed/avatar4/100/100"
  },

  {
    id: 5,
    title: "How AI Is Changing Everything",
    channel: "Future Tech",
    views: "1.2M views",
    uploaded: "1 day ago",
    duration: "18:43",
    category: "Technology",
    thumbnail: "https://picsum.photos/seed/ai/800/450",
    avatar: "https://picsum.photos/seed/avatar5/100/100"
  },

  {
    id: 6,
    title: "Study Smarter, Not Harder",
    channel: "Study Lab",
    views: "230K views",
    uploaded: "5 days ago",
    duration: "9:11",
    category: "Education",
    thumbnail: "https://picsum.photos/seed/study/800/450",
    avatar: "https://picsum.photos/seed/avatar6/100/100"
  },

  {
    id: 7,
    title: "Top 10 Gadgets You Need",
    channel: "Gadget Central",
    views: "560K views",
    uploaded: "6 days ago",
    duration: "11:28",
    category: "Technology",
    thumbnail: "https://picsum.photos/seed/gadgets/800/450",
    avatar: "https://picsum.photos/seed/avatar7/100/100"
  },

  {
    id: 8,
    title: "React Tutorial for Beginners",
    channel: "Frontend Masters",
    views: "780K views",
    uploaded: "2 weeks ago",
    duration: "22:15",
    category: "Programming",
    thumbnail: "https://picsum.photos/seed/react/800/450",
    avatar: "https://picsum.photos/seed/avatar8/100/100"
  },

  {
    id: 9,
    title: "Best Football Moments",
    channel: "Sports Daily",
    views: "900K views",
    uploaded: "3 days ago",
    duration: "14:52",
    category: "Sports",
    thumbnail: "https://picsum.photos/seed/football/800/450",
    avatar: "https://picsum.photos/seed/avatar9/100/100"
  },

  {
    id: 10,
    title: "Top Music Hits This Week",
    channel: "Music World",
    views: "2.3M views",
    uploaded: "1 day ago",
    duration: "20:10",
    category: "Music",
    thumbnail: "https://picsum.photos/seed/music/800/450",
    avatar: "https://picsum.photos/seed/avatar10/100/100"
  },

  {
    id: 11,
    title: "Latest Technology News",
    channel: "Tech News",
    views: "350K views",
    uploaded: "8 hours ago",
    duration: "7:55",
    category: "News",
    thumbnail: "https://picsum.photos/seed/news/800/450",
    avatar: "https://picsum.photos/seed/avatar11/100/100"
  },

  {
    id: 12,
    title: "Build Your First Web App",
    channel: "Coding School",
    views: "150K views",
    uploaded: "1 week ago",
    duration: "16:40",
    category: "Programming",
    thumbnail: "https://picsum.photos/seed/app/800/450",
    avatar: "https://picsum.photos/seed/avatar12/100/100"
  }

];


/* ==========================================
 SHORTS DATA
========================================== */

const shorts = [

  {
    title: "This phone feature is insane!",
    views: "1.2M views",
    image: "https://picsum.photos/seed/short1/400/700"
  },

  {
    title: "Coding tip you need to know",
    views: "800K views",
    image: "https://picsum.photos/seed/short2/400/700"
  },

  {
    title: "The fastest gaming setup",
    views: "540K views",
    image: "https://picsum.photos/seed/short3/400/700"
  },

  {
    title: "AI just changed everything",
    views: "2.1M views",
    image: "https://picsum.photos/seed/short4/400/700"
  },

  {
    title: "Student productivity hack",
    views: "700K views",
    image: "https://picsum.photos/seed/short5/400/700"
  },

  {
    title: "Learn this JavaScript trick",
    views: "920K views",
    image: "https://picsum.photos/seed/short6/400/700"
  }

];


/* ==========================================
 ELEMENTS
========================================== */

const videoGrid =
  document.getElementById("videoGrid");

const shortsGrid =
  document.getElementById("shortsGrid");

const searchInput =
  document.getElementById("searchInput");

const searchButton =
  document.getElementById("searchButton");

const categories =
  document.querySelectorAll(".category");

const menuButton =
  document.getElementById("menuButton");

const sidebar =
  document.getElementById("sidebar");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");


/* ==========================================
 DISPLAY VIDEOS
========================================== */

function displayVideos(videoList) {

  videoGrid.innerHTML = "";

  if (videoList.length === 0) {

    videoGrid.innerHTML = `
          <div class="empty-state">
              <h2>No videos found</h2>
              <p>Try searching for something else.</p>
          </div>
      `;

    return;
  }


  videoList.forEach(video => {

    const card =
      document.createElement("article");

    card.className = "video-card";

    card.innerHTML = `

          <div class="thumbnail-wrapper">

              <img
                  src="${video.thumbnail}"
                  alt="${video.title}"
                  class="thumbnail"
              >

              <span class="duration">
                  ${video.duration}
              </span>

          </div>


          <div class="video-info">

              <img
                  src="${video.avatar}"
                  alt=""
                  class="channel-avatar"
              >


              <div class="video-details">

                  <h3>
                      ${video.title}
                  </h3>

                  <p>
                      ${video.channel}
                  </p>

                  <p>
                      ${video.views}
                      •
                      ${video.uploaded}
                  </p>

              </div>

          </div>

      `;
    /*===========================================
    MAKE CARD CLICKABLE
    ===============================================*/

    card.addEventListener("click", function () {
      localStorage.setItem(
        "selectedVideo",
        JSON.stringify(video)
      );
      window.location.href = "watch.html";
    }
    )

    videoGrid.appendChild(card);

  });

}


/* ==========================================
 DISPLAY SHORTS
========================================== */

function displayShorts() {

  shortsGrid.innerHTML = "";

  shorts.forEach(short => {

    const card =
      document.createElement("div");

    card.className = "short-card";

    card.innerHTML = `

          <img
              src="${short.image}"
              alt="${short.title}"
              class="short-thumbnail"
          >

          <h3>
              ${short.title}
          </h3>

          <p>
              ${short.views}
          </p>

      `;

    shortsGrid.appendChild(card);

  });

}


/* ==========================================
 SEARCH
========================================== */

function searchVideos() {

  const searchTerm =
    searchInput.value
      .toLowerCase()
      .trim();


  const filteredVideos =
    videos.filter(video =>

      video.title
        .toLowerCase()
        .includes(searchTerm)

      ||

      video.channel
        .toLowerCase()
        .includes(searchTerm)

      ||

      video.category
        .toLowerCase()
        .includes(searchTerm)

    );


  displayVideos(filteredVideos);

}


/* SEARCH BUTTON */

searchButton.addEventListener(
  "click",
  searchVideos
);


/* ENTER KEY */

searchInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      searchVideos();

    }

  }
);


/* ==========================================
 CATEGORY FILTERING
========================================== */

categories.forEach(category => {

  category.addEventListener(
    "click",
    () => {

      categories.forEach(button => {

        button.classList.remove(
          "active"
        );

      });


      category.classList.add(
        "active"
      );


      const selectedCategory =
        category.dataset.category;


      if (
        selectedCategory === "All"
      ) {

        displayVideos(videos);

        return;

      }


      const filtered =
        videos.filter(video =>

          video.category ===
          selectedCategory

        );


      displayVideos(filtered);

    }
  );

});


/* ==========================================
 SIDEBAR
========================================== */

menuButton.addEventListener(
  "click",
  () => {

    sidebar.classList.toggle("open");

    sidebarOverlay.classList.toggle(
      "active"
    );

  }
);


sidebarOverlay.addEventListener(
  "click",
  () => {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove(
      "active"
    );

  }
);


/* ==========================================
 INITIAL LOAD
========================================== */

displayVideos(videos);

displayShorts();