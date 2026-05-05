interface SiteData {
	branding: {
		name: string;
		role: string;
		tagline: string;
		profileImage: string;
	};
	rationale: string[];
	tracks: Array<{
		id: string;
		index: string;
		title: string;
		content: string;
	}>;
	voting: {
		text: string;
		link: string;
		buttonLabel: string;
	};
}

document.addEventListener('DOMContentLoaded', async () => {
	const mainContent = document.getElementById('mainScroll');
	const popoverContainer = document.getElementById('dynamic-popovers');

	if (!mainContent || !popoverContainer) return;

	try {
		const response = await fetch('/data.json');
		if (!response.ok) throw new Error('Data file not found');

		const data: SiteData = await response.json();

		const introHTML = `
            <section class="section" id="intro">
                <div class="brand-container">
                    <div class="profile-header">
                        <div>
                            <h1 class="brand-name">${data.branding.name}</h1>
                            <span class="brand-role">${data.branding.role}</span>
                        </div>
                        <img src="${data.branding.profileImage}" alt="${data.branding.name}" class="profile-pic" onerror="this.style.display='none'">
					</div>
					<a href="${data.voting.link}" target="_blank" class="vote-button">${data.voting.buttonLabel}</a>
                </div>
                <h2 class="display-text">${data.branding.tagline}</h2>
                <div class="rationale-block">
                    ${data.rationale.map((p) => `<p>${p}</p>`).join('')}
                </div>
            </section>
            <div id="dynamic-track-list" class="track-list-interactive"></div>
            
            <footer class="voting-footer">
                <div class="footer-content">
                    <p>${data.voting.text}</p>
                    <a href="${data.voting.link}" target="_blank" class="vote-button">${data.voting.buttonLabel}</a>
                </div>
            </footer>
        `;
		mainContent.innerHTML = introHTML;

		const trackListContainer =
			document.getElementById('dynamic-track-list');

		data.tracks.forEach((track) => {
			const popoverId = `popover-${track.index}`;

			if (trackListContainer) {
				const trackItem = document.createElement('div');
				trackItem.className = 'track-item';
				trackItem.innerHTML = `
                    <button popovertarget="${popoverId}" class="track-info">
                        <span class="track-num">${track.index}</span>
                        <h3 class="track-title">${track.title}</h3>
                    </button>
                `;
				trackListContainer.appendChild(trackItem);
			}

			const popoverDiv = document.createElement('div');
			popoverDiv.setAttribute('popover', 'auto');
			popoverDiv.id = popoverId;
			popoverDiv.innerHTML = `
                <button class="close-button" popovertarget="${popoverId}" popovertargetaction="close"></button>
                <h3 class="track-title">${track.title}</h3>
                <p>${track.content}</p>
            `;
			popoverContainer.appendChild(popoverDiv);
		});

		initParallax();
	} catch (error) {
		console.error('Failed to load site data:', error);
		mainContent.innerHTML =
			'<p class="text-primary">Critical Error: Signal lost.</p>';
	}
});

function initParallax() {
	const primaryOrb = document.querySelector('.orb-primary') as HTMLElement;
	const secondaryOrb = document.querySelector(
		'.orb-secondary',
	) as HTMLElement;
	window.addEventListener('mousemove', (e) => {
		const mouseX = e.clientX / window.innerWidth - 0.5;
		const mouseY = e.clientY / window.innerHeight - 0.5;
		if (primaryOrb)
			primaryOrb.style.transform = `translate(${mouseX * 40}px, ${mouseY * 40}px)`;
		if (secondaryOrb)
			secondaryOrb.style.transform = `translate(${mouseX * -60}px, ${mouseY * -60}px)`;
	});
}
