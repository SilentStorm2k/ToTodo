export default function reset() {
	const body = document.querySelector("body");
	cleanElement(body);
}

export function cleanElement(element: HTMLElement | HTMLBodyElement | null) {
	while (element?.firstChild) element.removeChild(element.firstChild);
}
