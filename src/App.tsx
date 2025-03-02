import { useEffect, useState } from 'react'
import Empty from './components/Empty/Empty.tsx'
import Filter from './components/Filter/Filter.tsx'
import Modal from './components/Modal/Modal.tsx'
import TodoItem from './components/TodoItem/TodoItem.tsx'
import { FilterT, Theme, Todo } from './types.ts'
import { getSaveList } from './utils.ts'

function App() {
	const [theme, setTheme] = useState<Theme>(Theme.light)
	const [list, setList] = useState<Todo[]>(getSaveList())
	const [search, setSearch] = useState<string>('')
	const [filter, setFilter] = useState<FilterT>(FilterT.all)
	const [editId, setEditId] = useState<number | null>(null)
	const [editText, setEditText] = useState<string>('')

	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list))
	}, [list])

	function changeTheme(): void {
		setTheme(prev => (prev === Theme.light ? Theme.dark : Theme.light))
	}

	function addTodo(text: string): void {
		setList(prev => [...prev, { id: Date.now(), title: text, complete: false }])
	}

	function deleteTodo(id: number): void {
		setList(prev => prev.filter(item => item.id !== id))
	}

	function completeTodo(id: number): void {
		setList(prev =>
			prev.map(item =>
				item.id === id ? { ...item, complete: !item.complete } : item
			)
		)
	}

	function handleSearch(value: string): void {
		setSearch(value.toLowerCase())
	}

	function startEditing(id: number, text: string): void {
		setEditId(id)
		setEditText(text)
	}

	function updateTodoText(id: number, newText: string): void {
		setList(prev =>
			prev.map(item => (item.id === id ? { ...item, title: newText } : item))
		)
		setEditId(null)
		setEditText('')
	}

	const filteredList: Todo[] = list
		.filter(item =>
			filter === 'Complete'
				? item.complete
				: filter === 'Incomplete'
				? !item.complete
				: true
		)
		.filter(item => item.title.toLowerCase().includes(search))

	return (
		<div className={theme === Theme.light ? 'body light' : 'body dark'}>
			<div className='container'>
				<header>
					<h1 className='title'>Todo List</h1>
					<Filter
						theme={theme}
						changeTheme={changeTheme}
						handleSearch={handleSearch}
						setFilter={setFilter}
					/>
				</header>
				<main>
					<section className='todo-container'>
						{filteredList.length === 0 ? (
							<Empty />
						) : (
							filteredList.map(item => (
								<TodoItem
									key={item.id}
									deleteTodo={deleteTodo}
									completeTodo={completeTodo}
									item={item}
									startEditing={startEditing}
									editId={editId}
									editText={editText}
									setEditText={setEditText}
									updateTodoText={updateTodoText}
								/>
							))
						)}
					</section>
					<section>
						<Modal addTodo={addTodo} />
					</section>
				</main>
			</div>
		</div>
	)
}

export default App
