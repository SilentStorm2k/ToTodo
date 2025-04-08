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

	const label = addLabel(form, "ID", "text", "id");
	const input = label.children[0] as HTMLElement;
	input.setAttribute("readOnly", "");
	label.setAttribute("hidden", "true");
	input.classList.add("uid");

	addLabel(form, "Title", "text", "title");
	addLabel(form, "Description", "text", "description");
	addLabel(form, "Priority", "number", "priority");
	addLabel(form, "Due Date", "date", "dueDate");
	addLabel(form, "Story Points", "number", "storyPoints");
	addLabel(form, "Project", "string", "project");

	const div = document.createElement("div");
	const confirmAddButton = document.createElement("button");
	confirmAddButton.innerText = "Confirm";
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
	return label;
}
