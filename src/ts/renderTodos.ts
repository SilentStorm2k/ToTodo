import { format, parse } from "date-fns";
import create_todo, { getLargestNumericKey, TodoItem } from "./todo_item";
import { todoList } from "./todo_list";
import { cleanElement } from "./reset";

export const Render = (function () {
	const createTodo = () => {
		const todoInputFormDialog = document.getElementById(
			"todoInputFormDialog"
		) as HTMLDialogElement;

		setModalDefaults(todoInputFormDialog);
		todoInputFormDialog.showModal();
	};

	const setModalDefaults = (todoInputFormDialog: HTMLElement | null) => {
		const inputs = todoInputFormDialog?.querySelectorAll("input");
		const placeholders = [
			getLargestNumericKey().toString(),
			"Title",
			"Description",
			"1",
			format(new Date(), "yyyy-MM-dd"),
			"1",
			"default",
		];
		if (inputs) {
			for (let i = 0; i < inputs.length; i++) {
				inputs[i]?.setAttribute("value", placeholders[i]);
				inputs[i]?.setAttribute("placeholder", placeholders[i]);
			}
		}
	};

	const showTodos = (proj: string) => {
		const todoContainer: HTMLElement | null =
			document.querySelector(".todoContainer");
		cleanElement(todoContainer);
		console.log(todoContainer);
		const todos: TodoItem[] = todoList.getProject(proj);
		for (const todo of todos) todoContainer?.appendChild(todoDiv(todo));
	};
	const addTodo = (id: string) => {
		const todoContainer = document.querySelector(".todoContainer");
		console.log(`the todo holder is ${todoContainer}`);
		const todo = todoList.getTodo(id);
		if (todo) todoContainer?.appendChild(todoDiv(todo));
	};

	const todoDiv = (todo: TodoItem) => {
		const div = document.createElement("div");
		div.innerText = todo.id;
		return div;
	};

	const setupTodoInputForm = () => {
		const todoInputFormDialog = document.getElementById(
			"todoInputFormDialog"
		) as HTMLDialogElement;
		const confirmAddButton =
			todoInputFormDialog?.querySelector("#addButtonInDialog");
		const todoInputForm = todoInputFormDialog?.querySelector("form");

		confirmAddButton?.addEventListener("click", (event) => {
			event.preventDefault();
			const formData = new FormData(
				todoInputForm ? todoInputForm : undefined
			);
			const enteredDetails = Object.fromEntries(formData);
			const newTodo = create_todo(
				enteredDetails.Title as string,
				enteredDetails.Description as string,
				Number(enteredDetails.Priority) as number,
				parse(
					enteredDetails["Due Date"] as string,
					"yyyy-MM-dd",
					new Date()
				) as Date,
				Number(enteredDetails["Story Points"]) as number,
				enteredDetails["Project"] as string
			);
			todoList.addTodo(newTodo);
			todoInputFormDialog?.close();
			// addTodo((getLargestNumericKey() - 1).toString());
			showTodos("default");
		});
		todoInputFormDialog?.addEventListener("close", (e) => {
			console.log(todoInputFormDialog.returnValue);
		});
	};

	return { createTodo, setupTodoInputForm };
})();
