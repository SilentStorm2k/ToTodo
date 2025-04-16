import "../css/styles.css";
import { Footer } from "./footer";
import { Header } from "./header";
import todoInputForm from "./todoInputForm";
import { cleanElement } from "./reset";
import createTodo from "./todo_item";
import { todoList } from "./todo_list";
import { Render } from "./renderTodos";
import { Sidebar } from "./sidebar";
import favicon from "./favicon";
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
    localStorage.setItem("Projects", "default");
}
// test();
export function init() {
    // setup
    const head = document.querySelector("head");
    const body = document.querySelector("body");
    const header = Header();
    const footer = Footer();
    const content = document.createElement("div");
    content.classList.add("content");
    const sidebar = Sidebar.init();
    const todoInputFormDiv = todoInputForm(); // this creates the input form in html (sets up dialog modal, etc.)
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todoContainer");
    content.appendChild(sidebar);
    content.appendChild(todoContainer);
    const faviconElement = favicon();
    localStorage.setItem("state", "");
    // adding elements in order to body
    head === null || head === void 0 ? void 0 : head.appendChild(faviconElement);
    cleanElement(body);
    body === null || body === void 0 ? void 0 : body.appendChild(header);
    body === null || body === void 0 ? void 0 : body.appendChild(content);
    body === null || body === void 0 ? void 0 : body.appendChild(todoInputFormDiv);
    body === null || body === void 0 ? void 0 : body.appendChild(footer);
    // populating the elements
    Render.setupTodoInputForm(); // this adds the functionality of the input form (buttons, default values, etc.)
    Render.showTodos(todoList.getAllTodos()); // shows all todos
}
test();
init();
