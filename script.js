// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {
	// --- Video Facades (YouTube & Vimeo) ---
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
				facade.classList.add("video-active");
			}
		};

		facade.addEventListener("click", loadVideo);
	});

	// --- Smart Tag Filter ---
	const filterBtns = document.querySelectorAll(".filter-btn");
	const projects = document.querySelectorAll(".project-card");

	filterBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			// 1. Remove active class from all buttons
			filterBtns.forEach(b => b.classList.remove("active"));
			// 2. Add active class to clicked button
			btn.classList.add("active");

			const filterValue = btn.getAttribute("data-filter");

			projects.forEach(project => {
				if (filterValue === "all") {
					project.style.display = "block"; // Show all
					project.style.opacity = "1";
					project.style.transform = "scale(1)";
				} else {
					// Check if any tag inside the project matches the filter
					// Use Array.from to convert NodeList to Array for .some()
					const tags = Array.from(project.querySelectorAll(".tag"));
					const hasTag = tags.some(tag => tag.textContent.trim() === filterValue);

					if (hasTag) {
						project.style.display = "block";
						// Optional: Simple fade-in animation reset
						project.style.opacity = "0";
						project.style.transform = "scale(0.95)";
						setTimeout(() => {
							project.style.opacity = "1";
							project.style.transform = "scale(1)";
						}, 50);
					} else {
						project.style.display = "none";
					}
				}
			});
		});
	});
});
