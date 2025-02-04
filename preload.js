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

        // If we're near the bottom, pause for a moment before jumping back to top
        if (currentScroll + clientHeight >= scrollHeight - 10) {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 2000); // Pause for 2 seconds at the bottom
        } else {
          // Smooth scroll down
          window.scrollBy({ top: scrollPixels, behavior: "smooth" });
        }
      };

      setInterval(scrollScript, options.scrollinterval);
    }, 2000); // Wait 2 seconds for content to load

    // Reload the page every X minutes
    setInterval(() => {
      window.location.reload();
    }, options.reloadinterval * 60 * 1000);
  })
  .catch((error) => {
    console.error("Error initializing:", error);
  });
