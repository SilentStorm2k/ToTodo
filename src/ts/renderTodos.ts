import { parse } from "date-fns";
import create_todo from "./todo_item";
import { todoList } from "./todo_list";

export const Render = (function () {
	const createTodo = () => {
		// alert("this is a simple alert");
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
				Number(enteredDetails.storyPoints) as number,
				enteredDetails.project as string
			);
			todoList.addTodo(newTodo);
		});
		todoInputFormDialog?.showModal();
		todoInputFormDialog?.addEventListener("close", (e) => {
			console.log(todoInputFormDialog.returnValue);
		});
	};

	return { createTodo };
})();
