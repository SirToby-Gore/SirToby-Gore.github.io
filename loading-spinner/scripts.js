function createTestContent() {
    const form = document.createElement(`div`);
    form.className = `form`;
    const loginTitle = document.createElement(`h1`);
    loginTitle.innerText = `Login`;
    form.appendChild(loginTitle);
    const emailInput = document.createElement(`input`);
    emailInput.placeholder = `email`;
    emailInput.type = `email`;
    emailInput.name = `email`;
    form.appendChild(emailInput);
    const passwordInput = document.createElement(`input`);
    passwordInput.placeholder = `password`;
    passwordInput.type = `password`;
    passwordInput.name = `password`;
    form.appendChild(passwordInput);
    const loginButton = document.createElement(`button`);
    loginButton.innerText = `Login`;
    loginButton.type = `button`;
    loginButton.addEventListener('click', () => alert('this is a placeholder button'));
    form.appendChild(loginButton);
    return form;
}
function calcCords(numberOfPoints, radius, i) {
    const cords = {
        x: 0,
        y: 0
    };
    const angle = (Math.PI * 2 / numberOfPoints) * i;
    cords.x = Math.cos(angle) * radius;
    cords.y = Math.sin(angle) * radius;
    return cords;
}
async function createBar(numberOfItems, radius, index, barWidth, barLength, barContainer) {
    const cords = calcCords(numberOfItems, radius, index);
    cords.x -= barLength * 0.5;
    cords.y -= barWidth * -(0.5);
    const bar = document.createElement(`div`);
    bar.className = `bar`;
    bar.style.transform = `
        translate(${-cords.y}px, ${cords.x}px)
        rotate(${(index / numberOfItems) * 360}deg)
    `;
    bar.style.width = `${barWidth}px`;
    bar.style.height = `${barLength}px`;
    bar.style.borderRadius = `${Math.floor(Math.min(barWidth, barLength) / 2)}px`;
    bar.style.setProperty('--animation-length', `${animationLength}s`);
    bar.style.setProperty('--delay', `${((index / numberOfItems) * animationLength).toFixed(3)}s`);
    barContainer.appendChild(bar);
}
async function main(numberOfItems, radius = 20) {
    const box = document.createElement(`div`);
    document.body.appendChild(box);
    box.className = `box`;
    box.id = `box`;
    // --- remove as needed ---
    const testContent = createTestContent();
    box.appendChild(testContent);
    // ------------------------
    const barContainer = document.createElement(`div`);
    barContainer.className = `bar-container`;
    box.appendChild(barContainer);
    for (let index = 0; index < numberOfItems; index++) {
        createBar(numberOfItems, radius, index, barWidth, barLength, barContainer);
    }
}
// the length of each bar, recommended: 200
const barLength = 200;
// the width of each bar, recommended: 10
const barWidth = 10;
// length of the animation to complete one full rotation, recommended: 5
const animationLength = 5;
// the number of bars to display, recommended: 45
const numberOfBars = 45;
// the radius of circle in pixels, recommended: 300
const radius = 300;
main(numberOfBars, radius);
