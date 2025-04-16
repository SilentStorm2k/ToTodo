import { format } from "date-fns";
import { getLargestNumericKey } from "./todo_item";
import { todoList } from "./todo_list";

export default function todoInputForm() {
	const dialog = document.createElement("dialog");
	dialog.id = "todoInputFormDialog";
	const form = document.createElement("form");
	form.method = "post";
	dialog.appendChild(form);

	const legend = document.createElement("legend");
	legend.innerText = "Add Todo Details";
	form.appendChild(legend);

	const label = addLabel(form, "ID", "text", "id", true);
	const input = label.children[0] as HTMLElement;
	input.setAttribute("readOnly", "");
	label.setAttribute("hidden", "true");
	input.classList.add("uid");

	addLabel(form, "Title", "text", "title", true);
	addLabel(form, "Description", "text", "description");
	const priorityLabel = addLabel(
		form,
		"Priority",
		"number",
		"priority",
		true
	);
	const priorityInput = priorityLabel.children[0] as HTMLInputElement;
	priorityInput.min = "1";
	priorityInput.max = "3";
	const dateLabel = addLabel(form, "Due Date", "date", "dueDate", true);
	const dateInput = dateLabel.children[0] as HTMLInputElement;
	dateInput.min = format(new Date(), "yyyy-MM-dd");

	const storyPointsLabel = addLabel(
		form,
		"Story Points",
		"number",
		"storyPoints"
	);
	const storyPointsInput = storyPointsLabel.children[0] as HTMLInputElement;
	storyPointsInput.min = "1";
	storyPointsInput.max = "10";
	addProjectDropdown(form);

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
	cancelButton.addEventListener("click", () => {
		const form = document.getElementById(
			"todoInputFormDialog"
		) as HTMLDialogElement;
		form?.close();
	});
	return dialog;
}

function addLabel(
	form: HTMLFormElement,
	innerText: string,
	type: string,
	name: string,
	required: boolean = false
) {
	const p = document.createElement("p");
	form.appendChild(p);
	const label = document.createElement("label");
	label.innerText = innerText;
	const input = document.createElement("input");
	input.type = type;
	input.name = name;
	input.required = required;
	p.appendChild(label);
	label.appendChild(input);
	return label;
}

function addProjectDropdown(form: HTMLFormElement) {
	const p = document.createElement("p");
	form.appendChild(p);
	const label = document.createElement("label");
	label.innerText = "Project";
	const select = document.createElement("select");
	select.required = true;
	select.name = "project";
	select.innerText = "Project";
	const projects = todoList.getProjectNames();
	for (const projId in projects) {
		const option = document.createElement("option");
		option.value = projects[projId];
		option.innerText = projects[projId];
		select.appendChild(option);
	}
	p.appendChild(label);
	label.appendChild(select);
}
