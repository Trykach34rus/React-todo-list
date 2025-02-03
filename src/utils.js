export function getSaveList() {
	const saveList = localStorage.getItem('list')
	if (saveList) {
		return JSON.parse(saveList)
	} else {
		return []
	}
}
