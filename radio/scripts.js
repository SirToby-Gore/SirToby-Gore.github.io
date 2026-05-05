document.addEventListener('DOMContentLoaded', async () => {
    const mainContent = document.getElementById('mainScroll');
    const popoverContainer = document.getElementById('dynamic-popovers');
    if (!mainContent || !popoverContainer)
        return;
    try {
        const data = getData();
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
        const trackListContainer = document.getElementById('dynamic-track-list');
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
    }
    catch (error) {
        console.error('Failed to load site data:', error);
        mainContent.innerHTML =
            '<p class="text-primary">Critical Error: Signal lost.</p>';
    }
});
function initParallax() {
    const primaryOrb = document.querySelector('.orb-primary');
    const secondaryOrb = document.querySelector('.orb-secondary');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        if (primaryOrb)
            primaryOrb.style.transform = `translate(${mouseX * 40}px, ${mouseY * 40}px)`;
        if (secondaryOrb)
            secondaryOrb.style.transform = `translate(${mouseX * -60}px, ${mouseY * -60}px)`;
    });
}
function getData() {
    return {
        branding: {
            name: 'TOBY GORE',
            role: 'Head of Station Sound',
            tagline: 'The pulse of Nerve Radio requires architectural integrity.',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Toby',
        },
        rationale: [
            'I do not accept the status quo; I demand sonic integrity. Crafting a station sound is much like chopping wood; you must respect the grain of the frequency. I will engineer brilliant, joyous sonic palettes; I will build our audio from the ground up and from the foundations we stand on already.',
            'Gold will not be enough to satisfy my ambition; I seek to set a new platinum standard for prizes in station sound.',
        ],
        tracks: [
            {
                id: 'pledge',
                index: '01',
                title: 'My Pledge',
                content: 'As Head of Station Sound, it is my responsibility to ensure that every jingle is mastered to perfection, creating a seamless professional standard for the station.',
            },
            {
                id: 'prog',
                index: '02',
                title: 'Vibrant Programming',
                content: 'I will supply the Heads of Programming with bespoke soundscapes: morning shows will absolutely pop, evening transitions will be beautifully laid back, and mid-days will be high-energy. The listener experience will be immaculate.',
            },
            {
                id: 'music',
                index: '03',
                title: 'Musical Synergy',
                content: 'Jingles and beds must respect the music; they must never fight it. I will work alongside the Head of Music to ensure our audio-beds perfectly complement the A-list and B-list rotations.',
            },
            {
                id: 'brand',
                index: '04',
                title: 'Sync Branding',
                content: 'Audio and visual logic must align; I will provide pristine audio assets. The Heads of Social Media, Branding, and Events will receive high-energy, broadcast-ready stings so our digital campaigns sound as brilliant as they look.',
            },
            {
                id: 'pods',
                index: '05',
                title: 'Podcast Integrity',
                content: 'Radio formatting fails in podcasts; they require an entirely different paradigm. I will empower the Head of Podcasts by curating joyous, long-form soundscapes specifically for our creators.',
            },
            {
                id: 'influence',
                index: '06',
                title: 'My Influence',
                content: 'My vision for this role is fueled by the legendary sonic craftsmanship of artists like Daft Punk and Earth, Wind & Fire, bringing that same funk and precision to our airwaves.',
            },
            {
                id: 'supersonic',
                index: '07',
                title: 'Going Supersonic',
                content: 'I aim to bring a supersonic edge to our themes here at Nerve Radio, introducing fresh, cutting-edge sounds that will leave our listeners truly amazed.',
            },
            {
                id: 'jingles',
                index: '08',
                title: 'Revamp The Jingles',
                content: 'I will involve the entire Nerve Radio team to create new iconic jingles, breathing fresh life into our classic sounds while respecting our heritage.',
            },
            {
                id: 'collaborations',
                index: '09',
                title: 'Collaborations',
                content: 'I will seek out internal collaborations across Nerve, BU, and AUB, as well as reaching out to universities nationwide to bring in diverse tastes and new grooves that keep our sound unique.',
            },
        ],
        voting: {
            text: 'Support the Sonic Vision',
            link: 'https://nerveradio.co.uk/vote',
            buttonLabel: 'Vote for Toby Gore',
        },
    };
}
