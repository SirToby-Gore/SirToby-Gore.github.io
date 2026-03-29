function createTestContent(): HTMLDivElement {
    const form: HTMLDivElement = document.createElement(`div`);
    form.className = `form`;
    
    const loginTitle: HTMLHeadingElement = document.createElement(`h1`);
    loginTitle.innerText = `Login`;
    form.appendChild(loginTitle);

    const emailInput: HTMLInputElement = document.createElement(`input`);
    emailInput.placeholder = `email`;
    emailInput.type = `email`;
    emailInput.name = `email`;
    form.appendChild(emailInput);

    const passwordInput: HTMLInputElement = document.createElement(`input`);
    passwordInput.placeholder = `password`;
    passwordInput.type = `password`;
    passwordInput.name = `password`;
    form.appendChild(passwordInput);

    const loginButton: HTMLButtonElement = document.createElement(`button`);
    loginButton.innerText = `Login`;
    loginButton.type = `button`;
    loginButton.addEventListener('click', () => alert('this is a placeholder button'))
    form.appendChild(loginButton);

    return form;
}

function calcCords(numberOfPoints: number, radius: number, i: number): {x: number, y: number} {
    const cords: {x: number, y:number} = {
        x: 0,
        y: 0
    };

    const angle = (Math.PI * 2 / numberOfPoints) * i;

    cords.x = Math.cos(angle) * radius;
    cords.y = Math.sin(angle) * radius;

    return cords;
}

async function createBar(numberOfItems: number, radius: number, index: number, barWidth: number, barLength: number, barContainer: HTMLDivElement) {
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
    bar.style.setProperty('--animation-length', `${animationLength}s`)
    bar.style.setProperty('--delay', `${((index / numberOfItems) * animationLength).toFixed(3)}s`);

    barContainer.appendChild(bar);  
}

async function main(numberOfItems: number, radius: number = 20): Promise<void> {
    const box: HTMLDivElement = document.createElement(`div`);
    document.body.appendChild(box);
    box.className = `box`;
    box.id = `box`;

    // --- remove as needed ---
    const testContent: HTMLElement = createTestContent();
    box.appendChild(testContent);
    // ------------------------

    const barContainer: HTMLDivElement = document.createElement(`div`);
    barContainer.className = `bar-container`;
    box.appendChild(barContainer);

    for (let index = 0; index < numberOfItems; index++) {
        createBar(numberOfItems, radius, index, barWidth, barLength, barContainer);
    }
}

// the length of each bar, recommended: 200
const barLength: number = 200;

// the width of each bar, recommended: 10
const barWidth: number = 10;

// length of the animation to complete one full rotation, recommended: 5
const animationLength: number = 5;

// the number of bars to display, recommended: 45
const numberOfBars: number = 45;

// the radius of circle in pixels, recommended: 300
const radius: number = 300;

main(
    numberOfBars,
    radius
);