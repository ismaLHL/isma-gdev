// Initialize Lucide Icons
lucide.createIcons();

// Handle YouTube Facades
// Handle Video Facades (YouTube & Vimeo)
document.addEventListener("DOMContentLoaded", () => {
	const facades = document.querySelectorAll(".youtube-facade");

	facades.forEach(facade => {
		const videoId = facade.getAttribute("data-youtube-id");
		const videoUrl = facade.getAttribute("data-video-url");
		const startTime = facade.getAttribute("data-start-time");

		const loadVideo = (e) => {
			e.preventDefault();
			e.stopPropagation();

			let iframeSrc = "";

			if (videoId) {
				// YouTube
				iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
				if (startTime) {
					iframeSrc += `&start=${startTime}`;
				}
			} else if (videoUrl) {
				// Vimeo check
				const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
				if (vimeoMatch && vimeoMatch[1]) {
					iframeSrc = `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
				} else {
					// Fallback for other URLs
					window.open(videoUrl, '_blank');
					return;
				}
			}

			if (iframeSrc) {
				const iframe = document.createElement("iframe");
				iframe.setAttribute("src", iframeSrc);
				iframe.setAttribute("width", "100%");
				iframe.setAttribute("height", "100%");
				iframe.setAttribute("frameborder", "0");
				iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
				iframe.setAttribute("allowfullscreen", "");
				
				// Clear facade and append iframe
				facade.innerHTML = "";
				facade.appendChild(iframe);
				facade.classList.add("video-active"); // Optional: for styling if needed
			}
		};

		// Make the entire card clickable
		facade.addEventListener("click", loadVideo);
	});
});
