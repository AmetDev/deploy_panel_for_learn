import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import { __VALUE__ } from '../../conf'

export const fetchUser = createAsyncThunk('me/fetchMeStatus', async obj => {
	if (obj.userType == 'teacher') {
		const { data } = await axios.post(`${__VALUE__}/auth_teacher/login`, {
			email: obj.email,
			password: obj.password,
		})

		Cookies.set('token', data.token, { expires: 7 })
		return data
	}
	if (obj.userType === 'parent') {
		const { data } = await axios.post(`${__VALUE__}/auth_parent/login`, {
			email: obj.email,
			password: obj.password,
		})

		Cookies.set('token', data.token, { expires: 7 })
		return data
	}
	if (obj.userType === 'student') {
		const { data } = await axios.post(`${__VALUE__}/auth_student/login`, {
			email: obj.email,
			password: obj.password,
		})

		Cookies.set('token', data.token, { expires: 7 })

		return data
	}
})

const initialState = {
	user: [],
	status: 'loading', //loading | success | error
}
const FetchUser = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.me = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, (state, action) => {
				state.status = 'loading'
				state.me = []
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				console.log('ok', state)
				state.me = action.payload
				state.status = 'success'
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'error'
				state.me = []
			})
	},
})
export const { setUser } = FetchUser.actions
//export const selectorMenu = state => state.FetchUser
export default FetchUser.reducer
