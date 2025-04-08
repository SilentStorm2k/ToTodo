import "../css/styles.css";
import { Footer } from "./footer";
import { Header } from "./header";
import todoInputForm from "./todoInputForm";
import reset from "./reset";
import createTodo from "./todo_item";
import { todoList } from "./todo_list";
import { Render } from "./renderTodos";
function test() {
    let todo = createTodo("1", "title", "description", 1, new Date(), 3, "Proj", false);
    todoList.addTodo(todo);
    todoList.addTodo(Object.assign(Object.assign({}, todo), { id: "2", priority: 5 }));
    todoList.addTodo(Object.assign(Object.assign({}, todo), { id: "3", priority: 3 }));
    todoList.addTodo(Object.assign(Object.assign({}, todo), { id: "4" }));
    todoList.addTodo(Object.assign(Object.assign({}, todo), { id: "5" }));
    console.log(todoList.getTodo("1"));
    console.log("hello world");
    console.log(todoList.getAllTodos());
    let todos = todoList.getAllTodos();
    todos.sort((a, b) => a.priority - b.priority);
    console.log(todos);
    console.log("TEST ENDS");
}
test();
export function init() {
    reset();
    // addFavicon();
    Header();
    // body();
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todoContainer");
    const body = document.querySelector("body");
    body === null || body === void 0 ? void 0 : body.appendChild(todoContainer);
    todoInputForm(); // this creates the input form in html (sets up dialog modal, etc.)
    Render.setupTodoInputForm(); // this adds the functionality of the input form (buttons, default values, etc.)
    Render.showTodos(todoList.getAllTodos()); // shows all todos
    Footer();
}
init();
