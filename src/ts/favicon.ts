import faviconImg from "../assets/images/logo.png";

export default function favicon() {
	const linkToFavicon = document.createElement("link");
	linkToFavicon.href = faviconImg;
	linkToFavicon.rel = "icon";
	linkToFavicon.type = "image/x-icon";
	return linkToFavicon;
}
