import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	pages: { label: 'Панель ученика', state: false },
}
//
const selectedPageStudentSlice = createSlice({
	name: 'selectedPage',
	initialState,
	reducers: {
		setPageStudent(state, action) {
			state.pages = action.payload
		},
		deletePageStudent(state) {
			state.pages = {}
		},
	},
})
export const { setPageStudent, deletePageStudent } =
	selectedPageStudentSlice.actions

export default selectedPageStudentSlice.reducer
