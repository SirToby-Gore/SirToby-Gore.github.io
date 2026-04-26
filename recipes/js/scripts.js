import { App } from "./app.js";
window.onload = () => {
    const app = new App();
    window.app = app;
    window.onhashchange = () => app.render();
};
