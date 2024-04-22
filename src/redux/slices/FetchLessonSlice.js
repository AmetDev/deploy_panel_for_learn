import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { __VALUE__ } from '../../conf'

export const fetchPages = createAsyncThunk(
	'pages/fetchPagesStatus',
	async Teacher_uuid => {
		const { data } = await axios.get(`${__VALUE__}/page/pages`, {
			params: {
				Teacher_uuid,
			},
		})

		return data.result
	}
)

const initialState = {
	dataPage: [],
	status: 'loading', // loading | success | error
}

const FetchLessonSlice = createSlice({
	name: 'dataPage',
	initialState,
	reducers: {
		setPages(state, action) {
			state.dataPage = []
			state.status = 'success'
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPages.pending, (state, action) => {
				state.dataPage = []
				state.status = 'loading'
			})
			.addCase(fetchPages.fulfilled, (state, action) => {
				// Добавление новых данных к существующему массиву
				state.dataPage = action.payload
				state.status = 'success'
			})
			.addCase(fetchPages.rejected, (state, action) => {
				state.dataPage = []
				state.status = 'error'
			})
	},
})

export const { setPages } = FetchLessonSlice.actions

export default FetchLessonSlice.reducer
