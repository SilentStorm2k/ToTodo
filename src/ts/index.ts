import "../css/styles.css";
import { createTodo } from "./todo_item";
import { todoList } from "./todo_list";

let todo = createTodo(
	"1",
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
