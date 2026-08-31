/* =========================================
   MY EDITS
   SHORT + LONG FORM
========================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =========================================
     ELEMENTS
  ========================================= */

  const shortContainer =
    document.getElementById("shortEdits");

  const longContainer =
    document.getElementById("longEdits");

  const shortCount =
    document.getElementById("shortCount");

  const longCount =
    document.getElementById("longCount");


  /* =========================================
     LOAD JSON FILES
  ========================================= */

  async function loadPortfolioVideos() {

    try {

      const [
        shortResponse,
        longResponse
      ] = await Promise.all([

        fetch("data/short-form.json"),

        fetch("data/long-form.json")

      ]);


      if (!shortResponse.ok) {

        throw new Error(
          "short-form.json could not be loaded."
        );

      }


      if (!longResponse.ok) {

        throw new Error(
          "long-form.json could not be loaded."
        );

      }


      const shortData =
        await shortResponse.json();


      const longData =
        await longResponse.json();


      const shortVideos =
        Array.isArray(shortData.videos)
          ? shortData.videos
          : [];


      const longVideos =
        Array.isArray(longData.videos)
          ? longData.videos
          : [];


      /* =====================================
         COUNTS
      ===================================== */

      shortCount.textContent =
        `${String(shortVideos.length).padStart(2, "0")} PROJECTS`;


      longCount.textContent =
        `${String(longVideos.length).padStart(2, "0")} PROJECTS`;


      /* =====================================
         RENDER
      ===================================== */

      renderShortVideos(shortVideos);

      renderLongVideos(longVideos);


    } catch (error) {

      console.error(
        "Portfolio video loading error:",
        error
      );


      shortContainer.innerHTML = `
        <div class="no-edits">
          Unable to load short-form edits.
        </div>
      `;


      longContainer.innerHTML = `
        <div class="no-edits">
          Unable to load long-form edits.
        </div>
      `;

    }

  }


  /* =========================================
     RENDER SHORT VIDEOS
  ========================================= */

  function renderShortVideos(videos) {

    shortContainer.innerHTML = "";


    if (!videos.length) {

      shortContainer.innerHTML = `
        <div class="no-edits">
          No short-form edits available.
        </div>
      `;

      return;

    }


    videos.forEach((video, index) => {

      const card =
        createShortCard(
          video,
          index
        );


      shortContainer.appendChild(card);

    });


    initializeVideos(shortContainer);

  }


  /* =========================================
     RENDER LONG VIDEOS
  ========================================= */

  function renderLongVideos(videos) {

    longContainer.innerHTML = "";


    if (!videos.length) {

      longContainer.innerHTML = `
        <div class="no-edits">
          No long-form edits available.
        </div>
      `;

      return;

    }


    videos.forEach((video, index) => {

      const card =
        createLongCard(
          video,
          index
        );


      longContainer.appendChild(card);

    });


    initializeVideos(longContainer);

  }


  /* =========================================
     POSTER ATTRIBUTE
     
     If poster exists:
       poster="..."

     If not:
       no poster attribute
  ========================================= */

  function getPosterAttribute(video) {

    if (
      typeof video.poster === "string" &&
      video.poster.trim() !== ""
    ) {

      return `poster="${escapeAttribute(video.poster)}"`;

    }


    return "";

  }


  /* =========================================
     CREATE SHORT CARD
  ========================================= */

  function createShortCard(video, index) {

    const article =
      document.createElement("article");


    article.className =
      "short-edit-card";


    const poster =
      getPosterAttribute(video);


    article.innerHTML = `

      <div class="short-edit-media">

        <video
          src="${escapeAttribute(video.src)}"
          ${poster}
          playsinline
          webkit-playsinline
          preload="metadata"
        ></video>


        <div class="short-edit-overlay"></div>


        <span class="edit-video-number">
          ${String(index + 1).padStart(2, "0")}
        </span>


        <span class="edit-video-type">
          ${formatText(video.type)}
        </span>


        <button
          class="video-play-button"
          type="button"
          aria-label="Play ${escapeAttribute(video.title)}"
        >
          ▶
        </button>

      </div>


      <div class="short-edit-info">

        <div>

          <span class="short-edit-category">
            SHORT FORM
          </span>


          <h4 class="short-edit-title">
            ${escapeHTML(video.title)}
          </h4>

        </div>


        <span class="short-edit-arrow">
          ↗
        </span>

      </div>

    `;


    return article;

  }


  /* =========================================
     CREATE LONG CARD
  ========================================= */

  function createLongCard(video, index) {

    const article =
      document.createElement("article");


    article.className =
      "long-edit-card";


    const poster =
      getPosterAttribute(video);


    article.innerHTML = `

      <div class="long-edit-media">

        <video
          src="${escapeAttribute(video.src)}"
          ${poster}
          playsinline
          webkit-playsinline
          preload="metadata"
        ></video>


        <div class="long-edit-overlay"></div>


        <span class="edit-video-number">
          ${String(index + 1).padStart(2, "0")}
        </span>


        <span class="edit-video-type">
          ${formatText(video.type)}
        </span>


        <button
          class="video-play-button"
          type="button"
          aria-label="Play ${escapeAttribute(video.title)}"
        >
          ▶
        </button>

      </div>


      <div class="long-edit-info">

        <div>

          <span class="long-edit-category">
            LONG FORM
          </span>


          <h4 class="long-edit-title">
            ${escapeHTML(video.title)}
          </h4>

        </div>


        <span class="long-edit-arrow">
          ↗
        </span>

      </div>

    `;


    return article;

  }


  /* =========================================
     INITIALIZE ALL VIDEOS
  ========================================= */

  function initializeVideos(container) {

    const cards =
      container.querySelectorAll(
        ".short-edit-card, .long-edit-card"
      );


    cards.forEach(card => {

      const video =
        card.querySelector("video");


      const button =
        card.querySelector(".video-play-button");


      const media =
        card.querySelector(
          ".short-edit-media, .long-edit-media"
        );


      if (!video || !button || !media) {

        return;

      }


      /* =====================================
         VIDEO ERROR
      ===================================== */

      video.addEventListener(
        "error",
        () => {

          console.error(
            "Video could not be loaded:",
            video.currentSrc || video.src
          );


          card.classList.add(
            "video-error"
          );

        }
      );


      /* =====================================
         VIDEO METADATA
         
         This gets the REAL dimensions.
      ===================================== */

      video.addEventListener(
        "loadedmetadata",
        () => {

          const width =
            video.videoWidth;

          const height =
            video.videoHeight;


          if (
            !width ||
            !height
          ) {

            return;

          }


          const ratio =
            width / height;


          /*
            SHORT FORM
          */

          if (
            card.classList.contains(
              "short-edit-card"
            )
          ) {

            setShortVideoWidth(
              card,
              ratio
            );

          }


          /*
            LONG FORM
          */

          if (
            card.classList.contains(
              "long-edit-card"
            )
          ) {

            setLongVideoWidth(
              card,
              ratio
            );

          }

        }
      );


      /* =====================================
         PLAY BUTTON
      ===================================== */

      button.addEventListener(
        "click",
        async event => {

          event.preventDefault();

          event.stopPropagation();


          await toggleVideo(
            video,
            card,
            button
          );

        }
      );


      /* =====================================
         CLICK VIDEO ITSELF
      ===================================== */

      video.addEventListener(
        "click",
        async event => {

          event.preventDefault();


          await toggleVideo(
            video,
            card,
            button
          );

        }
      );


      /* =====================================
         VIDEO PLAY
      ===================================== */

      video.addEventListener(
        "play",
        () => {

          card.classList.add(
            "video-playing"
          );


          button.textContent =
            "Ⅱ";

        }
      );


      /* =====================================
         VIDEO PAUSE
      ===================================== */

      video.addEventListener(
        "pause",
        () => {

          card.classList.remove(
            "video-playing"
          );


          button.textContent =
            "▶";

        }
      );


      /* =====================================
         VIDEO ENDED
      ===================================== */

      video.addEventListener(
        "ended",
        () => {

          card.classList.remove(
            "video-playing"
          );


          button.textContent =
            "▶";

        }
      );

    });

  }


  /* =========================================
     SET SHORT VIDEO WIDTH

     Tall videos:
       narrower

     Landscape:
       wider

     But we NEVER stretch/crop them.
  ========================================= */

  function setShortVideoWidth(
    card,
    ratio
  ) {

    const screenWidth =
      window.innerWidth;


    let width;


    /*
      Desktop
    */

    if (screenWidth > 900) {

      /*
        9:16 → around 205px

        4:5 → around 225px

        1:1 → around 250px

        16:9 → around 290px
      */

      const baseHeight = 365;

      width =
        baseHeight * ratio;


      width =
        Math.max(
          185,
          Math.min(
            width,
            300
          )
        );

    }


    /*
      Mobile
    */

    else {

      const baseHeight = 300;

      width =
        baseHeight * ratio;


      width =
        Math.max(
          155,
          Math.min(
            width,
            225
          )
        );

    }


    card.style.width =
      `${Math.round(width)}px`;

  }


  /* =========================================
     SET LONG VIDEO WIDTH

     Landscape videos use more width.

     Tall videos get a sensible max width
     instead of taking the entire screen.
  ========================================= */

  function setLongVideoWidth(
    card,
    ratio
  ) {

    const media =
      card.querySelector(
        ".long-edit-media"
      );


    if (!media) return;


    /*
      Portrait video
    */

    if (ratio < 0.8) {

      media.style.width =
        "min(100%, 430px)";

      media.style.marginLeft =
        "auto";

      media.style.marginRight =
        "auto";

    }


    /*
      Square-ish video
    */

    else if (ratio < 1.25) {

      media.style.width =
        "min(100%, 620px)";

      media.style.marginLeft =
        "auto";

      media.style.marginRight =
        "auto";

    }


    /*
      Landscape video
    */

    else {

      media.style.width =
        "100%";

      media.style.marginLeft =
        "0";

      media.style.marginRight =
        "0";

    }

  }


  /* =========================================
     TOGGLE VIDEO
  ========================================= */

  async function toggleVideo(video, card, button) {

  try {

    /* Pause all other videos */
    pauseOtherVideos(video);


    if (video.paused) {

      /*
        User clicked, so audio is allowed.
      */
      video.muted = false;

      video.volume = 1;


      await video.play();


      card.classList.add(
        "video-playing"
      );

      button.textContent = "Ⅱ";

    } else {

      video.pause();

      card.classList.remove(
        "video-playing"
      );

      button.textContent = "▶";

    }

  } catch (error) {

    console.error(
      "Unable to play video:",
      error
    );

  }

}


  /* =========================================
     PAUSE OTHER VIDEOS
  ========================================= */

  function pauseOtherVideos(
    currentVideo
  ) {

    const allVideos =
      document.querySelectorAll(
        "#shortEdits video, #longEdits video"
      );


    allVideos.forEach(video => {

      if (
        video !== currentVideo &&
        !video.paused
      ) {

        video.pause();

      }

    });

  }


  /* =========================================
     DESKTOP HOVER PREVIEW
     
     This is ONLY an enhancement.
     
     Clicking still works if hover
     doesn't work.
  ========================================= */

  function enableDesktopHover() {

    const supportsHover =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;


    if (!supportsHover) {

      return;

    }


    const cards =
      document.querySelectorAll(
        ".short-edit-card, .long-edit-card"
      );


    cards.forEach(card => {

      const video =
        card.querySelector("video");

      const button =
        card.querySelector(
          ".video-play-button"
        );


      if (!video) return;


      card.addEventListener(
        "mouseenter",
        () => {

          /*
            Only preview if the video
            has enough data available.
          */

          if (
            video.readyState >= 2 &&
            video.paused
          ) {

            pauseOtherVideos(video);


            video.play()
              .then(() => {

                button.textContent =
                  "Ⅱ";

              })
              .catch(() => {

                /*
                  Ignore hover autoplay
                  failure.

                  User can still click.
                */

              });

          }

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          /*
            Don't reset currentTime.

            This makes stopping much
            smoother.
          */

          if (!video.paused) {

            video.pause();

          }

        }
      );

    });

  }


  /* =========================================
     TEXT HELPERS
  ========================================= */

  function formatText(value) {

    if (
      typeof value !== "string"
    ) {

      return "";

    }


    return value
      .replace(/-/g, " ")
      .toUpperCase();

  }


  /* =========================================
     ESCAPE HTML
  ========================================= */

  function escapeHTML(value) {

    if (
      typeof value !== "string"
    ) {

      return "";

    }


    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* =========================================
     ESCAPE ATTRIBUTE
  ========================================= */

  function escapeAttribute(value) {

    return escapeHTML(value);

  }


  /* =========================================
     INITIALIZE
  ========================================= */

  loadPortfolioVideos()
    .then(() => {

      enableDesktopHover();

    });


});