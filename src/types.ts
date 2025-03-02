export enum Theme {
	light = 'light',
	dark = 'dark',
}
export type Todo = {
	id: number
	title: string
	complete: boolean
}
export enum FilterT {
	all = 'All',
	complete = 'Complete',
	incomplete = 'Incomplete',
}

export interface ITodoItem {
	item: Todo
	deleteTodo: (id: number) => void
	completeTodo: (id: number) => void
	startEditing: (id: number, title: string) => void
	editId: number | null
	editText: string
	setEditText: (text: string) => void
	updateTodoText: (id: number, newText: string) => void
}
export interface IModal {
	addTodo: (text: string) => void
}

export interface IFilter {
	theme: Theme
	changeTheme: () => void
	handleSearch: (searchText: string) => void
	setFilter: React.Dispatch<React.SetStateAction<FilterT>>
}
