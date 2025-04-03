import { init } from ".";
import "../css/header.styles.css";
import todoInputForm from "./todoInputForm";
import { Render } from "./renderTodos";

export function Header() {
	// home button, expand button, searchbar?, addTodo, user
	const body = document.querySelector("body");
	const header = document.createElement("header");
	body?.appendChild(header);
	addHeaderButtons(header);
}

function addHeaderButtons(header: HTMLElement) {
	const nav = document.createElement("nav");
	header.appendChild(nav);

	addHomeButton(nav);
	// addExpandButton(nav);
	// addSearchBar(nav);
	addTodoButton(nav);
	// addUser(nav);
}

function addHomeButton(nav: HTMLElement) {
	const homeButton = document.createElement("button");
	homeButton.classList.add("homeButton");
	nav.appendChild(homeButton);
	homeButton.addEventListener("click", init);
}

// function addExpandButton(nav: HTMLElement) {
// 	const expandButton = document.createElement("button");
// 	expandButton.classList.add("expandButton");
// 	nav.appendChild(expandButton);
// 	expandButton.addEventListener("click", toggleSideMenu);
// }

// function addSearchBar(nav: HTMLElement) {

// }

function addTodoButton(nav: HTMLElement) {
	const addButton = document.createElement("button");
	addButton.classList.add("addButton");
	nav.appendChild(addButton);
	addButton.addEventListener("click", Render.createTodo);
}
