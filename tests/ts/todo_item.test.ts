import { TodoItem, todoList, create_todo, add_todo, delete_todo, modify_todo } from "../../src/ts/todo_item"

describe('todo_item', () => {

    let todo: TodoItem;
    let id: number
    
    beforeAll(() => {
        id = 1
        todo = create_todo(id, "title", "description", 1, "due date", 3, "Proj")
    }) 

    it('Should create a todo item', () => {
        expect(todo.title).toBe("title")
        expect(todo.description).toBe("description")
        expect(todo.priority).toBe(1)
        expect(todo.dueDate).toBe("due date")
        expect(todo.storyPoints).toBe(3)
        expect(todo.project).toBe("Proj")
    })


    it('Adds todo item to todolist', () => {
        add_todo(todo)
        expect(todoList.has(id)).toBe(true)
        expect(todoList.get(id)).toEqual(todo)
    })
    
    it('Remove todo item', () => {
       add_todo(todo) 
       expect(todoList.has(id)).toBe(true)
       
       delete_todo(id)
       expect(todoList.has(id)).toBe(false)
    })


    it('Modify todo item', () => {
       add_todo(todo) 
       expect(todoList.has(id)).toBe(true)

       let newTodo: TodoItem = create_todo(
        id, "new Title", "new Desc", 2, "new due", 5, "Proj2"
       )
       modify_todo(id, newTodo)
       expect(todoList.has(id)).toBe(true)
       expect(todoList.get(id)).toEqual(newTodo)
 
    })
})