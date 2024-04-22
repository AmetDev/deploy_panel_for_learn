import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	pages: { label: 'Панель родителя', state: false },
}
//
const selectedPageParentSlice = createSlice({
	name: 'selectedPageParent',
	initialState,
	reducers: {
		setPageParent(state, action) {
			state.pages = action.payload
		},
		deletePageParent(state) {
			state.pages = {}
		},
	},
})
export const { setPageParent, deletePageParent } =
	selectedPageParentSlice.actions

export default selectedPageParentSlice.reducer
