import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { __VALUE__ } from '../../conf.js'

const MainPageStudent = () => {
	const [user, setUser] = useState({})
	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const token = await Cookies.get('token')
				const { data } = await axios.get(`${__VALUE__}/auth_student/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log('studentdata', data)
				setUser(data)
			} catch (error) {
				console.log(error)
				setUser(null)
			}
		}
		fetchStudent()
	}, [])
	{
		return user ? <Outlet /> : <Navigate to='/login' />
	}
}

export default MainPageStudent
