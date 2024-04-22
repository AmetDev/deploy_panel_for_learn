import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import { __VALUE__ } from '../../conf.js'

export const fetchMe = createAsyncThunk('me/fetchMeStatus', async () => {
	try {
		const token = await Cookies.get('token')
		console.log('Fetching with token:', token) // Добавьте логирование
		const { data } = await axios.get(`${__VALUE__}/auth_teacher/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log('Fetched data:', data) // Добавьте логирование
		return data
	} catch (error) {
		return error
	}
})

const initialState = {
	me: {},
	status: 'loading', //loading | success | error
}
const FetchMeSlice = createSlice({
	name: 'me',
	initialState,
	reducers: {
		setItems(state, action) {
			state.me = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMe.pending, (state, action) => {
				state.status = 'loading'
				state.me = {}
			})
			.addCase(fetchMe.fulfilled, (state, action) => {
				console.log('ok', state)
				state.me = action.payload
				state.status = 'success'
			})
			.addCase(fetchMe.rejected, (state, action) => {
				state.status = 'error'
				state.me = {}
			})
	},
})
export const { setItems } = FetchMeSlice.actions
//export const selectorMenu = state => state.FetchMeSlice
export default FetchMeSlice.reducer
