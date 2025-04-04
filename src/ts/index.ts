import "../css/styles.css";
import { Footer } from "./footer";
import { Header } from "./header";
import todoInputForm from "./todoInputForm";
import reset from "./reset";
import createTodo from "./todo_item";
import { todoList } from "./todo_list";
import { Render } from "./renderTodos";

function test() {
	let todo = createTodo(
		"title",
		"description",
		1,
		new Date(2025, 4, 3),
		3,
		"Proj"
	);

	todoList.addTodo(todo);
	todoList.addTodo({ ...todo, id: "2", priority: 5 });
	todoList.addTodo({ ...todo, id: "3", priority: 3 });
	todoList.addTodo({ ...todo, id: "4" });
	todoList.addTodo({ ...todo, id: "5" });

	console.log(todoList.getTodo("1"));

	console.log("hello world");

	console.log(todoList.getAllTodos());

	let todos = todoList.getAllTodos();

	todos.sort((a, b) => a.priority - b.priority);

	console.log(todos);
}

test();

export function init() {
	reset();
	// addFavicon();
	Header();
	// body();
	todoInputForm();
	Render.setupTodoInputForm();
	Footer();
}

init();
