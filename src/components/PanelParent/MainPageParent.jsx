import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { __VALUE__ } from '../../conf.js'

const MainPageParent = () => {
	const [user, setUser] = useState({})
	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const token = await Cookies.get('token')
				const { data } = await axios.get(`${__VALUE__}/auth_parent/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

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

export default MainPageParent
