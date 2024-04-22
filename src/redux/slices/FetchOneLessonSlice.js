import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { __VALUE__ } from '../../conf'

export const fetchOneLesson = createAsyncThunk(
	'getonepage/fetchOnePageStatus',
	async obj => {
		try {
			console.log('Teacher_uuid', obj)
			const { data } = await axios.get(`${__VALUE__}/page/getonepage`, {
				params: {
					url: obj.counter,
					Teacher_uuid: obj.Teacher_uuid,
				},
			})
			return data.result
		} catch (error) {
			console.log(error)
		}
	}
)

const initialState = {
	dataOnePage: {},
	status: 'loading', // loading | success | error
}

const FetchOneLessonSlice = createSlice({
	name: 'dataOnePage',
	initialState,
	reducers: {
		setOnePage(state, action) {
			state.dataOnePage = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchOneLesson.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchOneLesson.fulfilled, (state, action) => {
				// Добавление новых данных к существующему массиву
				state.dataOnePage = action.payload
				state.status = 'success'
			})
			.addCase(fetchOneLesson.rejected, (state, action) => {
				state.status = 'error'
			})
	},
})

export const { setOnePage } = FetchOneLessonSlice.actions

export default FetchOneLessonSlice.reducer
