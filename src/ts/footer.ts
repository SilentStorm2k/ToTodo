import { format } from "date-fns";
import "../css/footer.styles.css";

export function Footer() {
	const body = document.querySelector("body");
	const footer = document.createElement("footer");
	const curYear = format(new Date(), "yyyy");
	footer.innerHTML = `
        <p>Created by SilentStorm2k</p>
        <a id="github" href="https://github.com/SilentStorm2k"></a>
        <p>&#169 2025 - ${curYear}</p>
    `;
	body?.appendChild(footer);
}
