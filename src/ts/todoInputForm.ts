import { format } from "date-fns";
import { getLargestNumericKey } from "./todo_item";

export default function todoInputForm() {
	const body = document.querySelector("body");
	const dialog = document.createElement("dialog");
	dialog.id = "todoInputFormDialog";
	body?.appendChild(dialog);
	const form = document.createElement("form");
	form.method = "post";
	dialog.appendChild(form);

	const legend = document.createElement("legend");
	legend.innerText = "Add Todo Details";
	form.appendChild(legend);

	const input = addLabel(form, "ID", "text", "ID");
	input.setAttribute("readOnly", "");
	input.setAttribute("disabled", "true");
	input.classList.add("uid");

	addLabel(form, "Title", "text", "Title");
	addLabel(form, "Description", "text", "Description");
	addLabel(form, "Priority", "number", "Priority");
	addLabel(form, "Due Date", "date", "Due Date");
	addLabel(form, "Story Points", "number", "Story Points");
	addLabel(form, "Project", "string", "Project");

	const div = document.createElement("div");
	const confirmAddButton = document.createElement("button");
	confirmAddButton.innerText = "Create";
	confirmAddButton.type = "submit";
	confirmAddButton.value = "Normal close";
	confirmAddButton.id = "addButtonInDialog";
	const cancelButton = document.createElement("button");
	cancelButton.innerText = "Cancel";
	cancelButton.value = "cancel";
	cancelButton.formMethod = "dialog";
	div.appendChild(confirmAddButton);
	div.appendChild(cancelButton);
	form.appendChild(div);
}

function addLabel(
	form: HTMLFormElement,
	innerText: string,
	type: string,
	name: string
) {
	const p = document.createElement("p");
	form.appendChild(p);
	const label = document.createElement("label");
	label.innerText = innerText;
	const input = document.createElement("input");
	input.type = type;
	input.name = name;
	p.appendChild(label);
	label.appendChild(input);
	return input;
}
