import { TodoItem } from "./todo_item";
import { isBefore, isSameDay } from "date-fns";

export const todoList = (function () {
	const addTodo = (todo: TodoItem): void =>
		localStorage.setItem(todo.id, JSON.stringify(todo));

	const removeTodo = (todo: TodoItem): void =>
		localStorage.removeItem(todo.id);

	const getTodo = (id: string): TodoItem | undefined => {
		const storedTodo = localStorage.getItem(id);
		if (storedTodo) {
			try {
				return JSON.parse(storedTodo) as TodoItem;
			} catch (error) {
				console.error(`Error parsing Todo item with ID ${id}`, error);
			}
		}
		return undefined;
	};

	const getAllTodos = (): TodoItem[] => {
		let todos: TodoItem[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (key && !isNaN(Number(key)))
				todos.push(getTodo(key) as TodoItem);
		}
		return sortTodos(todos);
	};

	const getProject = (project: string): TodoItem[] => {
		let todos = getAllTodos();
		let projectTodos = [];
		for (let todo of todos) {
			if (todo.project == project) projectTodos.push(todo);
		}
		return sortTodos(projectTodos);
	};

	const sortTodos = (todos: TodoItem[]): TodoItem[] => {
		return todos.sort(sortForTodoList);
	};

	const sortForTodoList = (todoA: TodoItem, todoB: TodoItem): number => {
		const priorityA = todoA.priority;
		const priorityB = todoB.priority;
		const dueDateA = todoA.dueDate;
		const dueDateB = todoB.dueDate;
		const idA = todoA.id;
		const idB = todoB.id;

		if (isSameDay(dueDateA, dueDateB)) {
			if (priorityA == priorityB) return Number(idA) - Number(idB);
			else return priorityA - priorityB;
		}
		return isBefore(dueDateA, dueDateB) ? -1 : 1;
	};

	return { addTodo, removeTodo, getTodo, getAllTodos, getProject };
})();
