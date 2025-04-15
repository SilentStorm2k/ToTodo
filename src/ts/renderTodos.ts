import { add, format, parse } from "date-fns";
import create_todo, {
	createTodoObject,
	getLargestNumericKey,
	TodoItem,
} from "./todo_item";
import { todoList } from "./todo_list";
import "../css/renderTodos.styles.css";
import { cleanElement } from "./reset";
import { ProjectItem } from "./project_item";

export const Render = (function () {
	const createTodo = () => {
		const todoInputFormDialog = document.getElementById(
			"todoInputFormDialog"
		) as HTMLDialogElement;

		const defaultPlaceholders = [
			(getLargestNumericKey() + 1).toString(),
			"Title",
			"Description",
			"1",
			format(new Date(), "yyyy-MM-dd"),
			"1",
			"default",
		];
		setModalDefaults(todoInputFormDialog, defaultPlaceholders);
		todoInputFormDialog.showModal();
	};

	const setModalDefaults = (
		todoInputFormDialog: HTMLElement | null,
		placeholders: string[]
	) => {
		const inputs = todoInputFormDialog?.querySelectorAll("input");
		if (inputs) {
			for (let i = 0; i < inputs.length; i++) {
				inputs[i]?.setAttribute("value", placeholders[i]);
				inputs[i]?.setAttribute("placeholder", placeholders[i]);
			}
		}
	};

	const showTodos = (todos: TodoItem[]) => {
		const todoContainer: HTMLElement | null =
			document.querySelector(".todoContainer");
		cleanElement(todoContainer);
		for (const todo of todos) todoContainer?.appendChild(todoDiv(todo));
	};

	const todoDiv = (todo: TodoItem) => {
		const div = document.createElement("div");
		div.classList.add("todo-card");
		div.id = `TodoId-${todo.id}`;
		div.classList.add("p" + String(todo.priority));

		const completed = document.createElement("input");
		completed.classList.add("todo-checkbox");
		completed.type = "checkbox";
		completed.checked = todo.completed ? true : false;
		const title = document.createElement("div");
		title.innerText = todo.title;
		title.classList.add("todo-title");
		const description = document.createElement("div");
		description.classList.add("todo-description");
		description.innerText = todo.description;
		const dueDate = document.createElement("div");
		dueDate.innerText = format(todo.dueDate, "dd-MM-yyyy");
		const storyPoints = document.createElement("div");
		storyPoints.innerText = String(todo.storyPoints);
		const project = document.createElement("div");
		project.innerText = todo.project;

		const contentContainer = document.createElement("div");
		contentContainer.appendChild(title);
		contentContainer.appendChild(description);
		contentContainer.classList.add("todo-information");

		const additionalInformation = document.createElement("div");
		additionalInformation.appendChild(storyPoints);
		additionalInformation.appendChild(dueDate);
		additionalInformation.classList.add("todo-additional-info");

		const detailsDiv = document.createElement("div");
		detailsDiv.appendChild(contentContainer);
		detailsDiv.appendChild(additionalInformation);
		detailsDiv.classList.add("mainContainer");

		const deleteTodoButton = document.createElement("button");
		deleteTodoButton.style.backgroundImage =
			"url(../assets/images/delete.png)";
		deleteTodoButton.addEventListener("click", (e) => {
			todoList.removeTodo(todo);
			const curState = localStorage.getItem("state") as string;
			if (curState == "") Render.showTodos(todoList.getAllTodos());
			else Render.showTodos(todoList.getProject(curState));
		});

		div.appendChild(completed);
		div.appendChild(detailsDiv);
		div.appendChild(deleteTodoButton);

		// div.innerText = `${todo.id}, Priority = ${todo.priority}, Title = ${todo.title}`;

		detailsDiv.addEventListener("click", expandTodo);
		completed.addEventListener("change", updateCompletedTodo);

		return div;
	};

	const updateCompletedTodo = (e: Event) => {
		const todoCheckbox = e.target as HTMLInputElement;
		let todoId: string | null = null;
		let idHoldingParent: HTMLElement | null = todoCheckbox;
		while (idHoldingParent) {
			if (idHoldingParent.id) {
				todoId = idHoldingParent.id.split("-")[1];
				break;
			}
			idHoldingParent = idHoldingParent.parentElement;
		}
		if (!todoId) return;
		let todo = todoList.getTodo(todoId);
		if (!todo) return;
		if (todoCheckbox.checked) todo.completed = true;
		else todo.completed = false;
		todoList.addTodo(todo); // updates the value
		const state = localStorage.getItem("state") as string;
		if (state != "") Render.showTodos(todoList.getProject(state));
		else Render.showTodos(todoList.getAllTodos());
	};

	const expandTodo = (e: MouseEvent) => {
		const todoDiv = e.target as HTMLElement;
		let todoId: string | null = null;
		let idHoldingParent: HTMLElement | null = todoDiv;
		while (idHoldingParent) {
			if (idHoldingParent.id) {
				todoId = idHoldingParent.id.split("-")[1];
				break;
			}
			idHoldingParent = idHoldingParent.parentElement;
		}
		if (todoId == null) return;
		const todo: TodoItem | undefined = todoList.getTodo(todoId);
		console.log(todoDiv, todoId, todo);
		if (todo) {
			const todoInputFormDialog = document.getElementById(
				"todoInputFormDialog"
			) as HTMLDialogElement;
			const todoParameters = todo.toArray().map((item) => String(item));
			const dateIndex = 4;
			todoParameters[dateIndex] = format(
				todoParameters[dateIndex],
				"yyyy-MM-dd"
			); // correctly formatting date to show on modal dialogue form
			setModalDefaults(todoInputFormDialog, todoParameters);
			todoInputFormDialog.showModal();
		}
	};

	const setupTodoInputForm = () => {
		const todoInputFormDialog = document.getElementById(
			"todoInputFormDialog"
		) as HTMLDialogElement;
		const todoInputForm = todoInputFormDialog?.querySelector("form");

		todoInputForm?.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = new FormData(
				todoInputForm ? todoInputForm : undefined
			);
			const enteredDetails = Object.fromEntries(formData);
			const todoItem = create_todo(
				enteredDetails.id as string,
				enteredDetails.title as string,
				enteredDetails.description as string,
				Number(enteredDetails.priority) as number,
				parse(
					enteredDetails.dueDate as string,
					"yyyy-MM-dd",
					format(new Date(), "yyyy-MM-dd")
				) as Date,
				Number(enteredDetails.storyPoints) as number,
				enteredDetails.project as string,
				false
			);
			const newTodo = createTodoObject(todoItem);
			todoList.addTodo(newTodo);
			todoInputFormDialog?.close();

			// const defaultProjectTodos = todoList.getProject("default");
			// showTodos(defaultProjectTodos);
			showTodos(todoList.getAllTodos());
		});
		todoInputFormDialog?.addEventListener("close", (e) => {
			console.log(todoInputFormDialog.returnValue);
		});
	};

	const showProjects = () => {
		const todoContainer: HTMLElement = document.querySelector(
			".todoContainer"
		) as HTMLElement;
		cleanElement(todoContainer);
		const projects = todoList.getAllProjectsMetadata();
		for (const project of projects)
			todoContainer?.appendChild(projectDiv(project));
	};

	const projectDiv = (projectMetadata: [String, ProjectItem]) => {
		const project = projectMetadata[1];

		const cardDiv = document.createElement("div");
		cardDiv.className = "project-card";

		const projectName = document.createElement("h3");
		projectName.className = "project-name";
		projectName.textContent = project.name;
		cardDiv.appendChild(projectName);

		const projectDetails = document.createElement("div");
		projectDetails.className = "project-details";

		// Completed Todos
		const todosCompletedDiv = document.createElement("div");
		todosCompletedDiv.className = "todos";
		const completedLabel = document.createElement("span");
		completedLabel.textContent = "Completed:";
		const completedCountSpan = document.createElement("span");
		completedCountSpan.className = "completed-count";
		completedCountSpan.textContent = String(project.completedTodos);
		todosCompletedDiv.appendChild(completedLabel);
		todosCompletedDiv.appendChild(completedCountSpan);
		projectDetails.appendChild(todosCompletedDiv);

		// Pending Todos
		const todosPendingDiv = document.createElement("div");
		todosPendingDiv.className = "todos";
		const pendingLabel = document.createElement("span");
		pendingLabel.textContent = "Pending:";
		const pendingCountSpan = document.createElement("span");
		pendingCountSpan.className = "pending-count";
		pendingCountSpan.textContent = String(project.pendingTodos);
		todosPendingDiv.appendChild(pendingLabel);
		todosPendingDiv.appendChild(pendingCountSpan);
		projectDetails.appendChild(todosPendingDiv);

		// Total Story Points
		const storyPointsDiv = document.createElement("div");
		storyPointsDiv.className = "story-points";
		const pointsLabel = document.createElement("span");
		pointsLabel.textContent = "Story Points:";
		const pointsCountSpan = document.createElement("span");
		pointsCountSpan.className = "points-count";
		pointsCountSpan.textContent = String(project.totalStoryPoints);
		storyPointsDiv.appendChild(pointsLabel);
		storyPointsDiv.appendChild(pointsCountSpan);
		projectDetails.appendChild(storyPointsDiv);

		cardDiv.appendChild(projectDetails);

		cardDiv.addEventListener("click", () => {
			localStorage.setItem("state", project.name);
			Render.showTodos(todoList.getProject(project.name));
		});

		return cardDiv;
	};

	return { createTodo, setupTodoInputForm, showTodos, showProjects };
})();
