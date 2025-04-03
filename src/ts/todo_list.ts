import { TodoItem } from "./todo_item";
import { PriorityQueue } from "priority-queue-typescript";
import { differenceInDays, isSameDay } from "date-fns";

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
			if (key && getTodo(key)) todos.push(getTodo(key) as TodoItem);
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
		let sortedTodos = new PriorityQueue<TodoItem>(
			10,
			(a: TodoItem, b: TodoItem) => {
				if (isSameDay(a.dueDate, b.dueDate))
					return a.priority - b.priority;
				return differenceInDays(a.dueDate, b.dueDate);
			}
		);
		for (let todo of todos) sortedTodos.add(todo);
		return sortedTodos.toArray();
	};

	return { addTodo, removeTodo, getTodo, getAllTodos, getProject };
})();
