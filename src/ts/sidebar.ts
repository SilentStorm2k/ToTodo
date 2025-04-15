import { todoList } from "./todo_list";
import "../css/sidebar.styles.css";
import { cleanElement } from "./reset";
import { Render } from "./renderTodos";
import { assert } from "chai";

export const Sidebar = (function () {
	const addProject = (project: string) => {
		todoList.addProject(project);
	};

	const createSidebarContainer = () => {
		const container = document.createElement("div");
		container.classList.add("sidebar-closed");
		container.classList.add("sidebar");
		const expandButton = document.createElement("button");
		expandButton.addEventListener("click", toggleSidebar);
		container.appendChild(expandButton);
		return container;
	};

	const toggleSidebar = (event: MouseEvent) => {
		const expandButton = event.target as HTMLElement;
		const sidebar = expandButton.parentElement;
		if (sidebar?.classList.contains("sidebar-closed")) {
			sidebar.classList.remove("sidebar-closed");
			sidebar?.classList.add("sidebar-open");
		} else {
			sidebar?.classList.add("sidebar-closed");
			sidebar?.classList.remove("sidebar-open");
		}
	};

	const createInbox = () => {
		const inboxButton = document.createElement("button");
		inboxButton.innerText = "Inbox";
		inboxButton.classList.add("button-outline");
		inboxButton.addEventListener("click", openInbox);
		return inboxButton;
	};

	const openInbox = (e: MouseEvent) => {
		const todoContainer = document.querySelector(
			".todoContainer"
		) as HTMLElement;
		cleanElement(todoContainer);
		const allTodos = todoList.getAllTodos();
		localStorage.setItem("state", "");
		Render.showTodos(allTodos);
	};

	const createProjects = () => {
		const projects = document.createElement("div");
		const projectText = document.createElement("div");
		const projectButtonContainer = document.createElement("div");
		const projectDropdownButton = document.createElement("button");
		const projectDropdown = document.createElement("div");
		projectButtonContainer.appendChild(projectText);
		projectButtonContainer.appendChild(projectDropdownButton);
		projectDropdown.classList.add("projectDropdownOpen");
		projects.appendChild(projectButtonContainer);
		projects.appendChild(projectDropdown);
		projectDropdownButton.addEventListener("click", toggleProjectDropdown);
		populateProjectDropdown(projectDropdown);

		projectText.innerText = "Projects";
		projectText.addEventListener("click", () => Render.showProjects());
		projectText.classList.add("button-outline");
		return projects;
	};

	const toggleProjectDropdown = (e: MouseEvent) => {
		const projectDropdownButton = e.target as HTMLElement;
		const projectButtonContainer = projectDropdownButton.parentElement;

		const projectDropdownDiv =
			projectButtonContainer?.nextSibling as HTMLElement;
		if (projectDropdownDiv?.classList.contains("projectDropdownClose")) {
			projectDropdownDiv.classList.add("projectDropdownOpen");
			projectDropdownDiv.classList.remove("projectDropdownClose");
			projectDropdownButton.style.backgroundImage =
				"url('../assets/images/down-arrow.png')";
		} else {
			assert(
				projectDropdownDiv?.classList.contains("projectDropdownOpen")
			);
			projectDropdownDiv?.classList.remove("projectDropdownOpen");
			projectDropdownDiv?.classList.add("projectDropdownClose");
			projectDropdownButton.style.backgroundImage =
				"url('../assets/images/up-arrow.png')";
		}
	};

	const populateProjectDropdown = (projectDropdown: HTMLElement) => {
		const projects = todoList.getProjectNames();
		const unorderedList = document.createElement("ul");
		for (const projectId in projects) {
			const listElement = document.createElement("li");
			const projectButton = document.createElement("button");
			console.log(todoList.getProject(projects[projectId]));
			projectButton.addEventListener("click", () => {
				localStorage.setItem("state", projects[projectId]);
				Render.showTodos(todoList.getProject(projects[projectId]));
			});
			projectButton.innerText = projects[projectId];
			projectButton.classList.add("button-outline");
			listElement.appendChild(projectButton);
			unorderedList.appendChild(listElement);
		}
		projectDropdown.appendChild(unorderedList);
	};

	const init = () => {
		const sidebarContainer = createSidebarContainer();
		const inbox = createInbox();
		const projects = createProjects();
		sidebarContainer.appendChild(inbox);
		sidebarContainer.appendChild(projects);
		return sidebarContainer;
	};

	return { init };
})();
