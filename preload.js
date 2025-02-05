const { webFrame, ipcRenderer } = require("electron");

// Create promises for both conditions
const optionsPromise = ipcRenderer.invoke("get-options");
const domLoadedPromise = new Promise((resolve) => {
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", resolve);
  } else {
    resolve();
  }
});

// Wait for both conditions to be met
Promise.all([optionsPromise, domLoadedPromise])
  .then(([options]) => {
    // console.log("Options:", options);
    // console.log("Document loaded:", document.readyState);

    // Set zoom level to 200%
    webFrame.setZoomFactor(options.zoom);

    // Hide scrollbars while maintaining scroll functionality
    const style = document.createElement("style");
    style.textContent = `
            body {
                user-select: none;
                cursor: none;
            }

            ::-webkit-scrollbar {
                display: none;
            }
        `;

    // Hide any additional elements the user wants hidden
    let hideCss = options.hideCss + "{ display: none !important; }";
    style.textContent += hideCss;
    document.head.appendChild(style);

    // Wait for content to load before starting scroll
    setTimeout(() => {
      const scrollScript = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const currentScroll = window.scrollY;
        const scrollPixels =
          document.documentElement.clientHeight * options.scrollpercent;
        const pauseTime = options.scrollinterval/(options.scrollpercent*3)

        // If we're near the bottom, pause for a moment before jumping back to top
        if (currentScroll + clientHeight >= scrollHeight - 10) {
          // setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          // }, pauseTime);
        }
        // If we we're at the top, pause scrolling for a moment
        else if (currentScroll <= 10) {
          clearInterval(intervalID);
          setTimeout(() => {
            window.scrollBy({ top: scrollPixels, behavior: "smooth" });
            intervalID = setInterval(scrollScript, options.scrollinterval);
          }, pauseTime);
        } else {
          // Smooth scroll down
          window.scrollBy({ top: scrollPixels, behavior: "smooth" });
        }
      };

      var intervalID = setInterval(scrollScript, options.scrollinterval);
    }, 500); // Wait 500ms for any additional content to load

    // Reload the page every X minutes
    setInterval(() => {
      window.location.reload();
    }, options.reloadinterval * 60 * 1000);
  })
  .catch((error) => {
    console.error("Error initializing:", error);
  });
