import { App } from "./app.js";


window.onload = () => {
	const app = new App();
	(window as any).app = app;
	window.onhashchange = () => app.render();
};
