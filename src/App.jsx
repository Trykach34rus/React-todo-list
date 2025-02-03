import { useEffect, useState } from 'react'
import Empty from './components/Empty/Empty'
import Filter from './components/Filter/Filter'
import Modal from './components/Modal/Modal'
import TodoItem from './components/TodoItem/TodoItem'
import { getSaveList } from './utils'

function App() {
	const [theme, setTheme] = useState('light')
	const [list, setList] = useState(getSaveList())
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState('All')
	const [editId, setEditId] = useState(null)
	const [editText, setEditText] = useState('')

	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list))
	}, [list])

	function changeTheme() {
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	function addTodo(text) {
		setList(prev => [...prev, { id: Date.now(), title: text, complete: false }])
	}

	function deleteTodo(id) {
		setList(prev => prev.filter(item => item.id !== id))
	}

	function completeTodo(id) {
		setList(prev =>
			prev.map(item =>
				item.id === id ? { ...item, complete: !item.complete } : item
			)
		)
	}

	function handleSearch(value) {
		setSearch(value.toLowerCase())
	}

	function startEditing(id, text) {
		setEditId(id)
		setEditText(text)
	}

	function updateTodoText(id, newText) {
		setList(prev =>
			prev.map(item => (item.id === id ? { ...item, title: newText } : item))
		)
		setEditId(null)
		setEditText('')
	}

	const filteredList = list
		.filter(item =>
			filter === 'Complete'
				? item.complete
				: filter === 'Incomplete'
				? !item.complete
				: true
		)
		.filter(item => item.title.toLowerCase().includes(search))

	return (
		<div className={theme === 'light' ? 'body light' : 'body dark'}>
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
