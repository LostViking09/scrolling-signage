const { contextBridge, webFrame } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    // Set zoom level to 200%
    webFrame.setZoomFactor(1.0);


    // Hide scrollbars while maintaining scroll functionality
    const style = document.createElement('style');
    style.textContent = `
        body {
            user-select: none;
            cursor: none;
        }

        ::-webkit-scrollbar {
            display: none;
        }
        
        .eu-cookie-panel, #skin_BoxV_1, #skin_Container_4 {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // Wait for content to load before starting scroll
    setTimeout(() => {
        const scrollScript = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const currentScroll = window.scrollY;
            const scrollPixels = document.documentElement.clientHeight * 0.25;
            
            // If we're near the bottom, pause for a moment before jumping back to top
            if (currentScroll + clientHeight >= scrollHeight - 10) {
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 2000); // Pause for 2 seconds at the bottom
            } else {
                // Smooth scroll down
                window.scrollBy({ top: scrollPixels, behavior: 'smooth' });
            }
        };

        // Run the scroll function every 50ms for smooth animation
        setInterval(scrollScript, 2000);
    }, 2000); // Wait 2 seconds for content to load
});
