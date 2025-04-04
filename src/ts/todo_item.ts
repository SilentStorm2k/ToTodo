export interface TodoItem {
	id: string;
	title: string;
	description: string;
	priority: number;
	dueDate: Date;
	storyPoints: number;
	project: string;
}

let curId: number = getLargestNumericKey();

export default function createTodo(
	title: string,
	description: string,
	priority: number,
	dueDate: Date,
	storyPoints: number,
	project: string
): TodoItem {
	curId++;
	const id: string = curId.toString();
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

export function getLargestNumericKey(): number {
	let largest: number | undefined = 0;

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key && !isNaN(Number(key)))
			largest = Math.max(largest, Number(key));
	}
	return largest;
}
