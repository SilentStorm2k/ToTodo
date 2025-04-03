export interface TodoItem {
	id: string;
	title: string;
	description: string;
	priority: number;
	dueDate: Date;
	storyPoints: number;
	project: string;
}

export function createTodo(
	id: string,
	title: string,
	description: string,
	priority: number,
	dueDate: Date,
	storyPoints: number,
	project: string
): TodoItem {
	return {
		id,
		title,
		description,
		priority,
		dueDate,
		storyPoints,
		project,
	};
}
