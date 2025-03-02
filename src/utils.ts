import { Todo } from './types'

export function getSaveList(): Todo[] {
	const saveList = localStorage.getItem('list')
	if (saveList) {
		return JSON.parse(saveList)
	} else {
		return []
	}
}
