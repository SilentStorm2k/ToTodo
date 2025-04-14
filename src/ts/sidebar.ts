import { assert } from "chai";
import { todoList } from "./todo_list";

const sidebar = () => {
	const addProject = (project: string) => {
		todoList.addProject(project);
	};
};
