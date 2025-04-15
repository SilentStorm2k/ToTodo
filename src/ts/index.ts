import "../css/styles.css";
import { Footer } from "./footer";
import { Header } from "./header";
import todoInputForm from "./todoInputForm";
import reset, { cleanElement } from "./reset";
import createTodo from "./todo_item";
import { todoList } from "./todo_list";
import { Render } from "./renderTodos";

function test() {
	let todo = createTodo(
		"1",
		"title",
		"description",
		1,
		new Date(),
		3,
		"Proj",
		false
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

	console.log("TEST ENDS");
	localStorage.setItem("Projects", "default");
}

test();

export function init() {
	const body = document.querySelector("body");
	cleanElement(body);
	// addFavicon();
	body?.appendChild(Header());

	const todoContainer = document.createElement("div");
	todoContainer.classList.add("todoContainer");
	body?.appendChild(todoContainer);

	body?.appendChild(todoInputForm()); // this creates the input form in html (sets up dialog modal, etc.)
	Render.setupTodoInputForm(); // this adds the functionality of the input form (buttons, default values, etc.)
	Render.showTodos(todoList.getAllTodos()); // shows all todos
	body?.appendChild(Footer());
}

init();
