export interface ToDoFromClient {
    title: string
    description: string
    status: boolean
    date: string
}

export interface ToDoFromDatabase extends ToDoFromClient {
    id: number
}