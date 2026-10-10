/* =========================================================
   LAMIYA BIRTHDAY WEBSITE
========================================================= */

/* =========================================================
   ⭐ CHANGE ONLY THIS DATE/TIME ⭐
=========================================================

   Format:

   YYYY-MM-DDTHH:MM:SS+06:00

   Bangladesh = +06:00

   Example:
   15 October 2026, 12:00 AM

   "2026-10-15T00:00:00+06:00"

========================================================= */

const TARGET_DATE = "2026-09-15T00:00:00+06:00";

/* =========================================================
   SOCIAL LINKS
========================================================= */

const FACEBOOK_URL = "";
const INSTAGRAM_URL = "";

/* =========================================================
   PAGE ELEMENTS
========================================================= */

const countdownPage = document.getElementById("countdownPage");

const birthdayPage = document.getElementById("birthdayPage");

const explorePage = document.getElementById("explorePage");

/* =========================================================
   INNER PAGES
========================================================= */

const allPages = document.querySelectorAll(".screen");

/* =========================================================
   STATE
========================================================= */

let countdownTimer = null;

let currentPage = "countdownPage";

let pageHistory = [];

/* =========================================================
   TARGET TIME
========================================================= */

function getTargetTime() {
  return new Date(TARGET_DATE).getTime();
}

/* =========================================================
   CHECK WHETHER BIRTHDAY TIME HAS ARRIVED
========================================================= */

function birthdayStarted() {
  const target = getTargetTime();

  return Date.now() >= target;
}

/* =========================================================
   COUNTDOWN UPDATE
========================================================= */

function updateCountdown() {
  const target = getTargetTime();

  const now = Date.now();

  const difference = target - now;

  /*
       If target time is reached,
       remove countdown immediately.
    */

  if (difference <= 0) {
    removeCountdown();

    return;
  }

  const days = Math.floor(difference / 86400000);

  const hours = Math.floor((difference / 3600000) % 24);

  const minutes = Math.floor((difference / 60000) % 60);

  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");

  document.getElementById("hours").textContent = String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

/* =========================================================
   REMOVE COUNTDOWN
========================================================= */

function removeCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);

    countdownTimer = null;
  }

  countdownPage.classList.remove("active");

  countdownPage.style.display = "none";

  birthdayPage.style.display = "block";

  birthdayPage.classList.add("active");

  currentPage = "birthdayPage";

  pageHistory = [];

  birthdayPage.scrollTop = 0;

  resetCandles();
}

/* =========================================================
   SHOW COUNTDOWN
========================================================= */

function showCountdown() {
  allPages.forEach((page) => {
    page.classList.remove("active");

    page.style.display = "none";
  });

  countdownPage.style.display = "block";

  countdownPage.classList.add("active");

  currentPage = "countdownPage";

  pageHistory = [];

  if (countdownTimer) {
    clearInterval(countdownTimer);
  }

  countdownTimer = setInterval(updateCountdown, 1000);

  updateCountdown();
}

/* =========================================================
   CANDLE RESET
========================================================= */

function resetCandles() {
  const flames = document.querySelectorAll(".flame");

  flames.forEach((flame) => {
    flame.classList.remove("off");
  });

  document.getElementById("afterCelebrate").classList.remove("show");

  document.getElementById("celebrateButton").textContent = "🎉 Celebrate";

  document.getElementById("celebrateMessage").textContent =
    "Make a wish and celebrate the moment! ✨";
}

/* =========================================================
   CELEBRATE BUTTON
========================================================= */

document
  .getElementById("celebrateButton")
  .addEventListener("click", function () {
    const flames = document.querySelectorAll(".flame");

    /*
               First click:
               extinguish candles.
            */

    const alreadyOff = [...flames].every((flame) =>
      flame.classList.contains("off"),
    );

    if (!alreadyOff) {
      flames.forEach((flame, index) => {
        setTimeout(() => {
          flame.classList.add("off");
        }, index * 90);
      });

      this.textContent = "🎊 Celebrate Again";

      document.getElementById("celebrateMessage").textContent =
        "🎉 The celebration has begun!";

      document.getElementById("afterCelebrate").classList.add("show");
    }

    /*
               Every click creates more confetti.
            */

    createConfetti(alreadyOff ? 90 : 150);
  });

/* =========================================================
   RESET BUTTON
========================================================= */

document.getElementById("resetButton").addEventListener("click", function () {
  /*
               Reset only candles and celebration state.
               Countdown will NOT return.
            */

  resetCandles();
});

/* =========================================================
   CONFETTI
========================================================= */

function createConfetti(amount = 100) {
  const container = document.getElementById("confetti");

  const symbols = ["✦", "✧", "•", "★", "◆", "❀"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = Math.random() * 100 + "%";

    piece.style.fontSize = Math.random() * 9 + 5 + "px";

    piece.style.setProperty("--duration", Math.random() * 3 + 3 + "s");

    piece.style.setProperty("--drift", Math.random() * 260 - 130 + "px");

    piece.style.setProperty("--rotation", Math.random() * 900 - 450 + "deg");

    piece.style.opacity = Math.random() * 0.6 + 0.4;

    container.appendChild(piece);

    setTimeout(() => piece.remove(), 6500);
  }
}

/* =========================================================
   OPEN PAGE
========================================================= */

function openPage(pageId) {
  const target = document.getElementById(pageId);

  if (!target) {
    return;
  }

  if (currentPage !== pageId) {
    pageHistory.push(currentPage);
  }

  allPages.forEach((page) => {
    page.classList.remove("active");

    page.style.display = "none";
  });

  target.style.display = "block";

  requestAnimationFrame(() => {
    target.classList.add("active");
  });

  currentPage = pageId;

  target.scrollTop = 0;

  /*
       Browser history support
    */

  history.pushState(
    {
      page: pageId,
    },
    "",
    "#" + pageId,
  );
}

/* =========================================================
   EXPLORE WORLD BUTTON
========================================================= */

document.getElementById("exploreButton").addEventListener("click", function () {
  openPage("explorePage");
});

/* =========================================================
   WISH BUTTON
========================================================= */

document.getElementById("wishButton").addEventListener("click", function () {
  openPage("wishPage");
});

/* =========================================================
   EXPLORE CARDS
========================================================= */

document.querySelectorAll(".explore-card").forEach((card) => {
  card.addEventListener("click", function () {
    const pageId = this.dataset.page;

    openPage(pageId);
  });
});

/* =========================================================
   BACK BUTTONS
========================================================= */

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", function () {
    goBack();
  });
});

/* =========================================================
   GO BACK
========================================================= */

function goBack() {
  if (pageHistory.length > 0) {
    const previousPage = pageHistory.pop();

    allPages.forEach((page) => {
      page.classList.remove("active");

      page.style.display = "none";
    });

    const previous = document.getElementById(previousPage);

    if (previous) {
      previous.style.display = "block";

      requestAnimationFrame(() => {
        previous.classList.add("active");
      });

      currentPage = previousPage;

      previous.scrollTop = 0;
    }
  }
}

/* =========================================================
   BROWSER BACK BUTTON
========================================================= */

window.addEventListener("popstate", function () {
  goBack();
});

/* =========================================================
   SOCIAL LINKS
========================================================= */

function setupSocialLinks() {
  const facebook = document.getElementById("facebookLink");

  const instagram = document.getElementById("instagramLink");

  if (FACEBOOK_URL) {
    facebook.href = FACEBOOK_URL;

    facebook.style.display = "inline-flex";
  } else {
    facebook.style.display = "none";
  }

  if (INSTAGRAM_URL) {
    instagram.href = INSTAGRAM_URL;

    instagram.style.display = "inline-flex";
  } else {
    instagram.style.display = "none";
  }
}

/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

function initializeWebsite() {
  /*
       IMPORTANT:

       No LocalStorage is used here.

       Therefore:

       Future target
       -> Countdown stays.

       Target reached
       -> Birthday page appears.

       Refresh after target
       -> Birthday page stays.

       Change TARGET_DATE to another future date
       -> Countdown appears again automatically.
    */

  if (birthdayStarted()) {
    removeCountdown();

    return;
  }

  showCountdown();
}

/* =========================================================
   PAGE SHOW PROTECTION
========================================================= */

window.addEventListener("pageshow", function () {
  if (birthdayStarted()) {
    removeCountdown();
  }
});

/* =========================================================
   START
========================================================= */

setupSocialLinks();

initializeWebsite();
// ================================
// CELEBRATE AGAIN - CONFETTI
// ================================

const celebrateBtn = document.getElementById("celebrateBtn");
const confettiBox = document.querySelector(".celebration-confetti");

if (celebrateBtn && confettiBox) {
  celebrateBtn.addEventListener("click", () => {
    // আগের animation পরিষ্কার
    confettiBox.classList.remove("confetti-active");

    // Re-trigger করার জন্য ছোট delay
    void confettiBox.offsetWidth;

    // নতুন করে animation শুরু
    confettiBox.classList.add("confetti-active");
  });
}
/* =========================================================
   MEMORIES PAGE SCRIPT
   Only controls memoriesPage
   ========================================================= */

(function(){

    const memoryImages = [
        "lamiya.jpg",
        "lamiya1.jpg",
        "lamiya2.jpg",
        "lamiya3.jpg",
        "lamiya4.jpg",
        "lamiya5.jpg",
        "lamiya6.jpg",

        "family.jpg",
        "family1.jpg",

        "sister.jpg",
        "sister1.jpg",
        "sister2.jpg",

        "funny.jpg",
        "funny1.jpg"
        
       
    ];


    const clickButton =
        document.getElementById("memoryClickHere");

    const intro =
        document.getElementById("memoryIntro");

    const photoIntro =
        document.getElementById("memoryPhotoIntro");

    const gallery =
        document.getElementById("memoryGallery");

    const galleryImage =
        document.getElementById("memoryGalleryImage");

    const galleryCount =
        document.getElementById("memoryGalleryCount");

    const galleryProgress =
        document.getElementById("memoryGalleryProgress");

    const introPhotos =
        document.querySelectorAll(".intro-photo");


    let currentMemory = 0;

    let galleryTimer = null;

    const MEMORY_TIME = 3000;


    /* ================= PRELOAD ================= */

    memoryImages.forEach(src => {

        const img = new Image();

        img.src = src;

    });


    /* ================= CLICK HERE ================= */

    if(clickButton){

        clickButton.addEventListener("click", function(){

            /*
             * Hide the gift intro
             */
            intro.style.display = "none";

            /*
             * Show photo animation
             */
            photoIntro.classList.add("active");

            /*
             * Start the flying photo sequence
             */
            startPhotoIntro();

        });

    }


    /* ================= PHOTO INTRO ================= */

    function startPhotoIntro(){

        let index = 0;


        function showNextIntroPhoto(){

            if(index >= introPhotos.length){

                /*
                 * Intro animation finished
                 */
                setTimeout(function(){

                    photoIntro.classList.remove("active");

                    openMemoryGallery();

                }, 500);

                return;

            }


            const photo =
                introPhotos[index];


            const image =
                photo.dataset.image;


            /*
             * Set image
             */
            photo.style.backgroundImage =
                `url("${image}")`;


            /*
             * Restart animation
             */
            photo.classList.remove("show");

            void photo.offsetWidth;

            photo.classList.add("show");


            index++;


            /*
             * Next photo
             */
            setTimeout(
                showNextIntroPhoto,
                1800
            );

        }


        showNextIntroPhoto();

    }


    /* ================= OPEN GALLERY ================= */

    function openMemoryGallery(){

        gallery.classList.add("active");

        currentMemory = 0;

        showMemory(currentMemory);

        startGalleryTimer();

    }


    /* ================= SHOW MEMORY ================= */

    function showMemory(index){

        if(!galleryImage) return;


        galleryImage.classList.remove(
            "memory-image-change"
        );

        void galleryImage.offsetWidth;


        galleryImage.src =
            memoryImages[index];


        galleryImage.classList.add(
            "memory-image-change"
        );


        if(galleryCount){

            const number =
                String(index + 1).padStart(2, "0");

            const total =
                String(memoryImages.length)
                    .padStart(2, "0");


            galleryCount.textContent =
                `${number} / ${total}`;

        }


        if(galleryProgress){

            const progress =
                ((index + 1) /
                memoryImages.length) * 100;

            galleryProgress.style.width =
                `${progress}%`;

        }

    }


    /* ================= AUTO CHANGE ================= */

    function startGalleryTimer(){

        clearInterval(galleryTimer);


        galleryTimer =
            setInterval(function(){

                currentMemory++;

                if(
                    currentMemory >=
                    memoryImages.length
                ){

                    currentMemory = 0;

                }


                showMemory(currentMemory);

            }, MEMORY_TIME);

    }


    /* ================= STOP WHEN PAGE HIDDEN ================= */

    document.addEventListener(
        "visibilitychange",
        function(){

            if(
                document.hidden
            ){

                clearInterval(
                    galleryTimer
                );

            }else{

                if(
                    gallery &&
                    gallery.classList.contains("active")
                ){

                    startGalleryTimer();

                }

            }

        }
    );


    /* ================= RESET WHEN LEAVING ================= */

    const memoriesPage =
        document.getElementById(
            "memoriesPage"
        );


    if(memoriesPage){

        const observer =
            new MutationObserver(function(){

                /*
                 * If Memories page becomes hidden,
                 * stop its timer.
                 */

                const isHidden =
                    memoriesPage.classList.contains(
                        "hidden"
                    );

                if(isHidden){

                    clearInterval(
                        galleryTimer
                    );

                }

            });


        observer.observe(
            memoriesPage,
            {
                attributes:true,
                attributeFilter:["class"]
            }
        );

    }

})();
/* ===== Continuous Falling Confetti Rain ===== */

(() => {
  const button = document.getElementById("celebrateButton");

  if (!button) {
    console.warn("Celebrate button was not found.");
    return;
  }

  // Prevent duplicate initialization
  if (button.dataset.confettiReady === "true") return;
  button.dataset.confettiReady = "true";

  const canvas = document.createElement("canvas");
  canvas.id = "confettiRainCanvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const colors = [
    "#ff69b4",
    "#c084fc",
    "#a78bfa",
    "#60a5fa",
    "#facc15",
    "#86efac",
    "#ffffff",
    "#fb7185"
  ];

  let pieces = [];
  let animationId = null;
  let running = false;
  let endTime = 0;
  let lastTime = 0;
  let spawnAccumulator = 0;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createPiece(fromTop = false) {
    const size = 4 + Math.random() * 7;

    return {
      x: Math.random() * window.innerWidth,
      y: fromTop
        ? -Math.random() * window.innerHeight
        : -size - Math.random() * 80,
      width: size * (0.65 + Math.random() * 0.7),
      height: size * (1.1 + Math.random() * 1.5),
      speed: 1.2 + Math.random() * 2.5,
      drift: (Math.random() - 0.5) * 1.5,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.025 + Math.random() * 0.035,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.12,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.25 ? "rect" : "circle"
    };
  }

  function startConfetti() {
    // Restart the rain on each Celebrate click
    pieces = [];
    running = true;
    spawnAccumulator = 0;
    lastTime = 0;

    // Keep the rain going for 10 seconds
    endTime = performance.now() + 10000;

    const isMobile = window.innerWidth < 600;
    const initialCount = isMobile ? 65 : 110;

    for (let i = 0; i < initialCount; i++) {
      pieces.push(createPiece(true));
    }

    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }

    animationId = requestAnimationFrame(animate);
  }

  function animate(now) {
    if (!running) {
      animationId = null;
      return;
    }

    if (now >= endTime || reducedMotion.matches) {
      running = false;
      pieces = [];
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      animationId = null;
      return;
    }

    const delta = lastTime
      ? Math.min((now - lastTime) / 16.67, 2)
      : 1;

    lastTime = now;

    const isMobile = window.innerWidth < 600;
    const maxPieces = isMobile ? 100 : 180;

    // Continuously create falling pieces
    spawnAccumulator += delta * (isMobile ? 2.2 : 3.5);

    while (
      spawnAccumulator >= 1 &&
      pieces.length < maxPieces
    ) {
      pieces.push(createPiece());
      spawnAccumulator--;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];

      p.y += p.speed * delta;
      p.sway += p.swaySpeed * delta;
      p.x += (p.drift + Math.sin(p.sway) * 0.8) * delta;
      p.rotation += p.rotationSpeed * delta;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.ellipse(
          0, 0,
          p.width / 2,
          p.height / 2,
          0, 0, Math.PI * 2
        );
        ctx.fill();
      } else {
        ctx.fillRect(
          -p.width / 2,
          -p.height / 2,
          p.width,
          p.height
        );
      }

      ctx.restore();

      // Remove pieces that have fallen off-screen
      if (
        p.y > window.innerHeight + 20 ||
        p.x < -40 ||
        p.x > window.innerWidth + 40
      ) {
        pieces.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  button.addEventListener("click", startConfetti);

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
})();

/* Favorites showcase media controls */
if (!window.favoriteShowcaseMediaReady) {
    window.favoriteShowcaseMediaReady = true;

    document.addEventListener("click", (event) => {
        const musicButton = event.target.closest(
            '#favoritesPage [data-page="musicShowcasePage"]'
        );

        const backButton = event.target.closest(
            "#musicShowcasePage [data-back]"
        );

        const video = document.getElementById("favoritesMusicVideo");

        if (!video) return;

        if (musicButton) {
            // User clicked Music, so attempt playback.
            video.play().catch(() => {
                // If autoplay is blocked, the video controls remain available.
            });
        }

        if (backButton) {
            video.pause();
            video.currentTime = 0;
        }
    });
}

(() => {
  const container = document.getElementById("confettiContainer");
  const celebrateButton = document.getElementById("celebrateButton");

  // Also supports a Celebrate Again button
  const againButtons = document.querySelectorAll(".celebrate-again");

  if (!container) return;

  const COLORS = [
    "#ff69b4",
    "#d8b4fe",
    "#a78bfa",
    "#60a5fa",
    "#67e8f9",
    "#86efac",
    "#fde047",
    "#fb7185"
  ];

  // Small, staggered streams instead of 200 simultaneous elements
  const ACTIVE_LIMIT = 35;
  const PAPERS_PER_CLICK = 200;
  const SPAWN_INTERVAL = 110;
  const PAPER_LIFETIME = 5000;

  let activePapers = 0;
  let streams = [];

  function createPaper() {
    if (activePapers >= ACTIVE_LIMIT) return;

    const paper = document.createElement("span");
    paper.className = "confetti-paper";

    const width = 3 + Math.random() * 3;
    const height = 5 + Math.random() * 5;

    const x = Math.random() * 100;
    const sway = 5 + Math.random() * 12;
    const duration = 4.5 + Math.random() * 1.5;

    paper.style.setProperty("--w", `${width}px`);
    paper.style.setProperty("--h", `${height}px`);
    paper.style.setProperty("--x", `${x}vw`);
    paper.style.setProperty("--sway", `${sway}px`);
    paper.style.setProperty("--duration", `${duration}s`);
    paper.style.setProperty(
      "--color",
      COLORS[Math.floor(Math.random() * COLORS.length)]
    );

    activePapers++;
    container.appendChild(paper);

    paper.addEventListener("animationend", () => {
      paper.remove();
      activePapers = Math.max(0, activePapers - 1);
    }, { once: true });

    // Safety cleanup in case an animation event is missed
    setTimeout(() => {
      if (paper.isConnected) {
        paper.remove();
        activePapers = Math.max(0, activePapers - 1);
      }
    }, PAPER_LIFETIME + 1000);
  }

  function startStream() {
    let created = 0;

    const stream = setInterval(() => {
      if (created >= PAPERS_PER_CLICK) {
        clearInterval(stream);
        streams = streams.filter(id => id !== stream);
        return;
      }

      createPaper();
      created++;
    }, SPAWN_INTERVAL);

    streams.push(stream);
  }

  if (celebrateButton) {
    celebrateButton.addEventListener("click", startStream);
  }

  againButtons.forEach(button => {
    button.addEventListener("click", startStream);
  });
})();

(() => {
  const container = document.getElementById("confettiContainer");

  const buttons = [
    document.getElementById("celebrateButton"),
    ...document.querySelectorAll(".celebrate-again")
  ].filter(Boolean);

  if (!container || buttons.length === 0) return;

  const colors = [
    "#ff4fa3",
    "#ff80bf",
    "#c084fc",
    "#a78bfa",
    "#6366f1",
    "#60a5fa",
    "#38bdf8",
    "#34d399",
    "#a3e635",
    "#facc15",
    "#fb7185",
    "#ffffff"
  ];

  const PAPERS_PER_CLICK = 100;
  const SPAWN_INTERVAL = 20;
  const MAX_ACTIVE = 180;

  let active = 0;

  function createPaper() {
    const paper = document.createElement("span");
    paper.className = "confetti-paper";

    const width = 6 + Math.random() * 6;
    const height = 8 + Math.random() * 7;
    const x = Math.random() * 100;
    const sway = 8 + Math.random() * 28;
    const duration = 4.5 + Math.random() * 2;

    paper.style.setProperty("--w", `${width}px`);
    paper.style.setProperty("--h", `${height}px`);
    paper.style.setProperty("--x", `${x}vw`);
    paper.style.setProperty("--sway", `${sway}px`);
    paper.style.setProperty("--duration", `${duration}s`);
    paper.style.setProperty(
      "--color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    active++;
    container.appendChild(paper);

    let removed = false;

    function cleanup() {
      if (removed) return;
      removed = true;
      paper.remove();
      active--;
    }

    paper.addEventListener("animationend", cleanup, { once: true });
    setTimeout(cleanup, duration * 1000 + 500);
  }

  function celebrate() {
    let count = 0;

    const stream = setInterval(() => {
      if (count >= PAPERS_PER_CLICK) {
        clearInterval(stream);
        return;
      }

      // Keep the animation lightweight on phones
      if (active < MAX_ACTIVE) {
        createPaper();
        count++;
      }
    }, SPAWN_INTERVAL);
  }

  buttons.forEach(button => {
    button.addEventListener("click", celebrate);
  });
})();

(() => {
  const root = document.getElementById("customFavorites");
  if (!root || root.dataset.initialized === "true") return;
  root.dataset.initialized = "true";

  const pages = [...root.querySelectorAll(".fav-page")];
  const home = root.querySelector("#favHome");

  const sleepVideo = root.querySelector("#sleepVideo");
  const musicVideo = root.querySelector("#musicVideo");

  const sleepStatus = root.querySelector("#sleepStatus");
  const musicTimer = root.querySelector("#musicTimer");
  const musicTimerStatus = root.querySelector("#musicTimerStatus");

  // Change the extension here if your files are .webm or .ogg.
  const sleepFiles = [
    "sleep.mp4",
    "sleep1.mp4",
    "sleep2.mp4",
    "sleep3.mp4",
    "sleep4.mp4"
  ];

  const musicFile = "/ruposh.mp4";

  let sleepIndex = 0;
  let sleepStarted = false;
  let musicTimerId = null;
  let snowCreated = false;

  // Remember the previous Favorites subpage.
  const pageHistory = [];

  function currentPage() {
    return pages.find(page => page.classList.contains("active"));
  }

  function showPage(id, remember = true) {
    const nextPage = root.querySelector(`#${id}`);
    if (!nextPage) return;

    const previousPage = currentPage();

    if (previousPage === nextPage) return;

    if (remember && previousPage) {
      pageHistory.push(previousPage.id);
    }

    pages.forEach(page => {
      page.classList.toggle("active", page === nextPage);
    });

    // Start sleep effects only when entering the sleep page.
    if (id === "sleepPage") {
      createSnow();
      startSleepVideo();
    } else {
      stopSleepVideo();
    }

    if (id !== "musicPage") {
      stopMusicTimer();
      musicVideo.pause();
    }

    // Start music only after the user explicitly presses Play.
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Favorites cards open their corresponding pages.
  root.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.open);
    });
  });

  // Every Back button returns to the actual previous subpage.
  root.querySelectorAll("[data-back]").forEach(button => {
    button.addEventListener("click", () => {
      const previousId = pageHistory.pop() || "favHome";
      showPage(previousId, false);
    });
  });

  // A gentle snowfall made of lightweight CSS elements.
  function createSnow() {
    if (snowCreated) return;

    const snow = root.querySelector("#sleepSnow");
    if (!snow) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 28; i++) {
      const flake = document.createElement("span");
      flake.className = "snowflake";

      flake.style.left = `${Math.random() * 100}%`;
      flake.style.setProperty(
        "--snow-duration",
        `${6 + Math.random() * 8}s`
      );
      flake.style.setProperty(
        "--snow-delay",
        `${-Math.random() * 12}s`
      );

      fragment.appendChild(flake);
    }

    snow.appendChild(fragment);
    snowCreated = true;
  }

  // Sequential sleep videos.
  function loadSleepVideo(index, shouldPlay = true) {
    sleepIndex = (index + sleepFiles.length) % sleepFiles.length;

    const file = sleepFiles[sleepIndex];

    if (sleepVideo.dataset.currentFile !== file) {
      sleepVideo.pause();
      sleepVideo.dataset.currentFile = file;
      sleepVideo.src = file;
      sleepVideo.load();
    }

    if (sleepStatus) {
      sleepStatus.textContent = "A peaceful moment is loading…";
    }

    if (shouldPlay) {
      const playPromise = sleepVideo.play();

      if (playPromise) {
        playPromise.then(() => {
          sleepStarted = true;

          if (sleepStatus) {
            sleepStatus.textContent =
              "Enjoy the moment. The next video plays automatically.";
          }
        }).catch(() => {
          if (sleepStatus) {
            sleepStatus.textContent =
              "Tap Play to start the video and its sound.";
          }
        });
      }
    }
  }

  function startSleepVideo() {
    if (!sleepStarted) {
      loadSleepVideo(sleepIndex, true);
    } else {
      sleepVideo.play().catch(() => {});
    }
  }

  function stopSleepVideo() {
    sleepVideo.pause();
  }

  // When one video ends, move to the next and loop forever.
  sleepVideo.addEventListener("ended", () => {
    loadSleepVideo(sleepIndex + 1, true);
  });

  sleepVideo.addEventListener("error", () => {
    if (sleepStatus && currentPage()?.id === "sleepPage") {
      sleepStatus.textContent =
        "Video unavailable. Check the filename and photos folder.";
    }
  });

  root.querySelector("#sleepPlay").addEventListener("click", () => {
    if (!sleepVideo.getAttribute("src")) {
      loadSleepVideo(sleepIndex, true);
    } else {
      sleepVideo.play().catch(() => {});
    }
  });

  root.querySelector("#sleepPrev").addEventListener("click", () => {
    loadSleepVideo(sleepIndex - 1, true);
  });

  root.querySelector("#sleepNext").addEventListener("click", () => {
    loadSleepVideo(sleepIndex + 1, true);
  });

  // Music video: user-controlled playback.
  musicVideo.src = musicFile;
  musicVideo.load();

  function stopMusicTimer() {
    if (musicTimerId !== null) {
      clearTimeout(musicTimerId);
      musicTimerId = null;
    }
  }

  function startMusicTimer() {
    stopMusicTimer();

    const seconds = Number(musicTimer.value);

    if (!seconds) {
      musicTimerStatus.textContent = "No listening timer is set.";
      return;
    }

    musicTimerStatus.textContent =
      `Playback will stop in ${seconds / 60} minute(s).`;

    musicTimerId = setTimeout(() => {
      musicVideo.pause();
      musicTimerId = null;
      musicTimerStatus.textContent = "Listening timer finished.";
    }, seconds * 1000);
  }

  root.querySelector("#musicPlay").addEventListener("click", () => {
    musicVideo.play().then(() => {
      startMusicTimer();
    }).catch(() => {
      musicTimerStatus.textContent =
        "Unable to play. Check the video file and try again.";
    });
  });

  root.querySelector("#musicPause").addEventListener("click", () => {
    musicVideo.pause();
    stopMusicTimer();
    musicTimerStatus.textContent = "Music paused.";
  });

  musicVideo.addEventListener("ended", () => {
    stopMusicTimer();
    musicTimerStatus.textContent = "The music video has ended.";
  });

  musicVideo.addEventListener("error", () => {
    musicTimerStatus.textContent =
      "Music video unavailable. Check ruposh.mp4.";
  });
})();
