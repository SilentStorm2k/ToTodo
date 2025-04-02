export interface TodoItem {
    id: number,
    title: string,
    description: string,
    priority: number,
    dueDate: string,
    storyPoints: number,
    project: string
}

export let todoList: Map<number, TodoItem> = new Map() 

export function create_todo(id: number, title: string, description: string, priority: number, dueDate: string, storyPoints: number, project: string): TodoItem {
    return {
        id, 
        title,
        description,
        priority, 
        dueDate,
        storyPoints,
        project
    }
}

export function add_todo(todo: TodoItem): void {
    todoList.set(todo.id, todo)
}

export function delete_todo(id: number): void {
    todoList.delete(id) 
}

export function modify_todo(id: number, todo: TodoItem): void {
    // modify todo basically does this????
    todoList.set(id, todo)
}