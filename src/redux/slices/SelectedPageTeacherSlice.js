import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	pages: { label: 'Панель учителя', state: false },
}
//
const selectedPageTeacher = createSlice({
	name: 'selectedPage',
	initialState,
	reducers: {
		setPage(state, action) {
			state.pages = action.payload
		},
		deletePage(state) {
			state.pages = {}
		},
	},
})
export const { setPage, deletePage } = selectedPageTeacher.actions

export default selectedPageTeacher.reducer
