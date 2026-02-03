// Initialize Lucide Icons
lucide.createIcons();

// Handle YouTube Facades
document.addEventListener("DOMContentLoaded", () => {
	const facades = document.querySelectorAll(".youtube-facade");

	facades.forEach(facade => {
		const button = facade.querySelector(".play-button");
		const videoId = facade.getAttribute("data-youtube-id");
		const videoUrl = facade.getAttribute("data-video-url");
		const startTime = facade.getAttribute("data-start-time");

		const loadVideo = () => {
			if (videoUrl) {
				window.open(videoUrl, '_blank');
				return;
			}

			// Fallback for YouTube IDs (opens in new tab due to protocol restrictions)
			if (videoId) {
				const url = `https://www.youtube.com/watch?v=${videoId}${startTime ? '&t=' + startTime + 's' : ''}`;
				window.open(url, '_blank');
			}
		};

		button.addEventListener("click", loadVideo);
	});
});
