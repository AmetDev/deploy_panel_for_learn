import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import usericon from '../../../../../assets/user.png'
import { __VALUE__ } from '../../../../../conf'
import style from './OurTeacher.module.scss'

const OurTeacher = () => {
	const [yourTeacher, setYourTeacher] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const deleteTeacher = async () => {
		try {
			const token = await Cookies.get('token')
			const data1 = await axios.get(`${__VALUE__}/auth_student/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			console.log(data1.data.email)
			if (data1.data) {
				console.log('issadodidfasiodu')
				const token = await Cookies.get('token')
				const { data } = await axios.put(
					`${__VALUE__}/auth_student/student`,
					{
						email: data1.data.email,
						Teacher_uuid: null,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				console.log(data)
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		const fetchMeOne = async () => {
			try {
				const token = await Cookies.get('token')
				const { data } = await axios.get(`${__VALUE__}/auth_student/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log(data)
				return data.Teacher_uuid
			} catch (error) {
				console.log(error)
				setError('Ошибка при получении данных о студенте')
				setIsLoading(false)
			}
		}

		const initAsync = async () => {
			try {
				const result = await fetchMeOne()
				const { data } = await axios.get(
					`${__VALUE__}/auth_teacher/teacherforstudent`,
					{
						params: {
							Teacher_uuid: result,
						},
					}
				)
				setYourTeacher(data)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
				setError('Ошибка при получении данных о учителе')
				setIsLoading(false)
			}
		}

		initAsync()
	}, [])

	if (isLoading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<div className={style.wrapperOurTeacher}>
			{yourTeacher && (
				<div>
					<div className={style.wrapperOur}>
						<div>
							<img src={usericon} width={'32px'} height={'32px'} alt='user' />
						</div>
						<div>
							<span>{yourTeacher.fullName}</span>
							<span>{yourTeacher.email}</span>
						</div>
					</div>
					<button
						onClick={() => {
							let isClicked = alert('Вы действительно хотите удалить?')
							if (isClicked) {
								deleteTeacher()
							}
						}}
					>
						удалить
					</button>
				</div>
			)}
		</div>
	)
}

export default OurTeacher
