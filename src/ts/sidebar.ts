import { todoList } from "./todo_list";
import "../css/sidebar.styles.css";

export const Sidebar = (function () {
	const addProject = (project: string) => {
		todoList.addProject(project);
	};

	const createSidebarContainer = () => {
		const container = document.createElement("div");

		return container;
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
