function createAndReturnNewStar() {
    const star = document.createElement('div');
    star.id = 'star';
    document.getElementById('output')?.appendChild(star);
    return star;
}
function createAndReturnNewCode() {
    const code = document.createElement('code');
    code.id = 'code';
    document.getElementById('output')?.appendChild(code);
    return code;
}
function calcCords(numberOfPoints, radius, i, maxRadius) {
    const cords = { x: 0, y: 0 };
    const scale = maxRadius > 50 ? 50 / maxRadius : 1;
    const adjustedRadius = radius * scale;
    const angle = (Math.PI * 2 / numberOfPoints) * i;
    cords.x = Math.cos(angle) * adjustedRadius + 50;
    cords.y = Math.sin(angle) * adjustedRadius + 50;
    return cords;
}
function calculateStar() {
    const innerRadiusInput = document.getElementById('inner-radius');
    const outerRadiusInput = document.getElementById('outer-radius');
    const numberOfPointsInput = document.getElementById('number-of-points');
    const innerRadius = Number.parseFloat(innerRadiusInput.value) || 0;
    const outerRadius = Number.parseFloat(outerRadiusInput.value) || 0;
    const numberOfPoints = Number.parseFloat(numberOfPointsInput.value) || 0;
    const maxRadius = Math.max(innerRadius, outerRadius);
    let star = document.getElementById('star') ?? createAndReturnNewStar();
    star.innerHTML = '';
    const points = [];
    for (let i = 0; i < numberOfPoints; i++) {
        points.push(calcCords(numberOfPoints, outerRadius, i - 0.25, maxRadius));
        points.push(calcCords(numberOfPoints, innerRadius, i + 0.25, maxRadius));
    }
    const codeOutput = document.getElementById('code') ?? createAndReturnNewCode();
    const clipPathString = pointsToClipPath(points);
    codeOutput.innerText = clipPathString;
    star.style.setProperty('clip-path', clipPathString);
}
function pointsToClipPath(points) {
    return `polygon(${points.map(e => `${e.x}% ${e.y}%`).join(', ')})`;
}
function main() {
    const inputForm = document.getElementById('measurement-inputs');
    inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateStar();
    });
}
main();
