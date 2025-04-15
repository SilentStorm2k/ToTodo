import { todoList } from "./todo_list";
import "../css/sidebar.styles.css";

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
		const inbox = document.createElement("div");

		return inbox;
	};

	const createProjects = () => {
		const projects = document.createElement("div");

		return projects;
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
