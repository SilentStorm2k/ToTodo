export default function reset() {
	const body = document.querySelector("body");
	while (body?.firstChild) body.removeChild(body.firstChild);
}
