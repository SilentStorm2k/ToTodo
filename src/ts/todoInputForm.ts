import { format } from "date-fns";

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

	const p = document.createElement("p");
	form.appendChild(p);
	const label = document.createElement("label");
	label.innerText = "ID";
	p.appendChild(label);

	addLabel(form, "Title", "text", "Title", "Title");
	addLabel(form, "Description", "text", "Description", "Description");
	addLabel(form, "Priority", "number", "Priority", "1");
	const today = format(new Date(), "yyyy-MM-dd");
	addLabel(form, "Due Date", "date", "Due Date", today);
	addLabel(form, "Story Points", "number", "Story Points", "1");
	addLabel(form, "Project", "string", "Project", "default");

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
	name: string,
	placeholder: string
) {
	const p = document.createElement("p");
	form.appendChild(p);
	const label = document.createElement("label");
	label.innerText = innerText;
	const input = document.createElement("input");
	input.type = type;
	input.name = name;
	input.placeholder = placeholder;
	input.value = placeholder;
	p.appendChild(label);
	p.appendChild(input);
}
