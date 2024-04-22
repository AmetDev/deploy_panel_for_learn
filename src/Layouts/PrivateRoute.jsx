import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { fetchMe } from '../redux/slices/FetchUserTeacherSlice'

const PrivateRoute = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('Dispatching fetchMe')
		dispatch(fetchMe())
	}, [])

	const { me, status } = useSelector(state => state.fetchUser)
	console.log('me', me)
	console.log('is work')
	console.log(status)

	// let isTeacher = false

	return me ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
