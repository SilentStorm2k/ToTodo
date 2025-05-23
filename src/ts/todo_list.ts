import createTodo, { createTodoObject, TodoItem } from "./todo_item";
import { isBefore, isSameDay, set } from "date-fns";
import { assert } from "chai";
import { ProjectItem } from "./project_item";

export const todoList = (function () {
	const delimiter = ">/\\<";
	const addTodo = (todo: TodoItem): void => {
		if (!isValidTodo(todo)) return;
		localStorage.setItem(todo.id, JSON.stringify(todo));
	};

	const removeTodo = (todo: TodoItem): void =>
		localStorage.removeItem(todo.id);

	const getTodo = (id: string): TodoItem | undefined => {
		const storedTodo = localStorage.getItem(id);
		if (storedTodo) {
			try {
				const parsedTodo = JSON.parse(storedTodo) as TodoItem;
				return createTodoObject(parsedTodo);
			} catch (error) {
				console.error(`Error parsing Todo item with ID ${id}`, error);
			}
		}
		return undefined;
	};

	const getAllTodos = (): TodoItem[] => {
		let todos: TodoItem[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (key && !isNaN(Number(key)))
				todos.push(getTodo(key) as TodoItem);
		}
		return sortTodos(todos);
	};

	const getProject = (project: string): TodoItem[] => {
		let todos = getAllTodos();
		let projectTodos = [];
		for (let todo of todos) {
			if (todo.project == project) projectTodos.push(todo);
		}
		return sortTodos(projectTodos);
	};

	const sortTodos = (todos: TodoItem[]): TodoItem[] => {
		return todos.sort(sortForTodoList);
	};

	const sortForTodoList = (todoA: TodoItem, todoB: TodoItem): number => {
		const priorityA = todoA.priority;
		const priorityB = todoB.priority;
		const dueDateA = todoA.dueDate;
		const dueDateB = todoB.dueDate;
		const idA = todoA.id;
		const idB = todoB.id;
		const completedA = todoA.completed;
		const completedB = todoB.completed;

		if (completedA && !completedB) return 1;
		else if (completedB && !completedA) return -1;
		else {
			if (isSameDay(dueDateA, dueDateB)) {
				if (priorityA == priorityB) return Number(idA) - Number(idB);
				else return priorityA - priorityB;
			}
			return isBefore(dueDateA, dueDateB) ? -1 : 1;
		}
	};

	const isValidTodo = (todo: TodoItem): boolean => {
		try {
			assert(
				!isNaN(Number(todo.id)) && Number(todo.id) > 0,
				`Id value ${todo.id} is invalid, must be a number > 0`
			);
			assert(
				todo.priority >= 1 && todo.priority <= 3,
				`Priority must take a value between 1-3, the Todo with id: ${todo.id} has priority of ${todo.priority}`
			);
		} catch (error) {
			console.error(error);
			return false;
		}
		return true;
	};

	const addProject = (project: string) => {
		assert(
			!project.includes(delimiter),
			`Project should not contain the delimiter ${delimiter}`
		);
		let projects = getProjectNames();
		if (projects.includes(project)) return;
		else {
			let projectVal = localStorage.getItem("Projects");
			projectVal = projectVal + delimiter + project;
			localStorage.setItem("Projects", projectVal);
		}
	};

	// const getProjectNames = (): string[] => {
	// 	const projectVal = localStorage.getItem("Projects");
	// 	const projects = projectVal?.split(delimiter);
	// 	return projects ? projects : [];
	// };

	const getProjectNames = (): string[] => {
		let projects = new Set<string>();
		for (const todo of getAllTodos()) projects.add(todo.project);
		syncProjects([...projects]);
		const allProjects = localStorage.getItem("Projects") as string;
		console.log("projects = ", allProjects.split(delimiter));
		return allProjects.split(delimiter);
	};

	const syncProjects = (todoProjects: string[]) => {
		let localProjects =
			localStorage.getItem("Projects") != null
				? (localStorage.getItem("Projects") as string)
				: "";
		const projects = new Set(localProjects.split(delimiter));
		for (const project of todoProjects) projects.add(project);
		let newProjects = Array.from(projects);
		localStorage.setItem("Projects", newProjects.join(delimiter));
	};

	const getAllProjectsMetadata = (): Map<String, ProjectItem> => {
		let projects = new Map<String, ProjectItem>();
		for (const project of getProjectNames()) {
			projects.set(project, {
				name: project,
				completedTodos: 0,
				pendingTodos: 0,
				totalStoryPoints: 0,
			} as ProjectItem);
		}

		for (const todo of getAllTodos()) {
			if (projects.has(todo.project)) {
				let projectMetadata = projects.get(todo.project) as ProjectItem;
				projectMetadata.completedTodos += todo.completed ? 1 : 0;
				projectMetadata.pendingTodos += todo.completed ? 0 : 1;
				projectMetadata.totalStoryPoints += todo.storyPoints;
			} else {
				const projectMetadata = {
					name: todo.project,
					completedTodos: todo.completed ? 1 : 0,
					pendingTodos: todo.completed ? 0 : 1,
					totalStoryPoints: todo.storyPoints,
				} as ProjectItem;
				projects.set(todo.project, projectMetadata);
			}
		}
		return projects;
	};

	return {
		addTodo,
		addProject,
		delimiter,
		removeTodo,
		getTodo,
		getAllTodos,
		getProject,
		getProjectNames,
		getAllProjectsMetadata,
	};
})();
