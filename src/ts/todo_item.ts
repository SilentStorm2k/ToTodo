export interface TodoItem {
	id: string;
	title: string;
	description: string;
	priority: number;
	dueDate: Date;
	storyPoints: number;
	project: string;
	completed: boolean;
	toArray(): Array<string | number | Date | Boolean>;
}

export default function createTodo(
	id: string,
	title: string,
	description: string,
	priority: number,
	dueDate: Date,
	storyPoints: number,
	project: string,
	completed: boolean
): TodoItem {
	return {
		id,
		title,
		description,
		priority,
		dueDate,
		storyPoints,
		project,
		completed,
		toArray() {
			return [
				id,
				title,
				description,
				priority,
				dueDate,
				storyPoints,
				project,
			];
		},
	};
}

export function createTodoObject(todoItem: TodoItem): TodoItem {
	return {
		...todoItem,
		toArray(): (string | number | Date | Boolean)[] {
			return [
				todoItem.id,
				todoItem.title,
				todoItem.description,
				todoItem.priority,
				todoItem.dueDate,
				todoItem.storyPoints,
				todoItem.project,
				todoItem.completed,
			];
		},
	};
}

export function getLargestNumericKey(): number {
	let largest: number | undefined = 0;

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key && !isNaN(Number(key)))
			largest = Math.max(largest, Number(key));
	}
	return largest;
}
