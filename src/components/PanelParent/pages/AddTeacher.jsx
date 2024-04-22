import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import style from './AddTeacher.module.scss'

const AddTeacher = () => {
	const [teacherUuid, setTeacherUuid] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)
	const [isError, setIsError] = useState(false)

	const handleChange = e => {
		setTeacherUuid(e.target.value)
	}

	const handleSubmit = async () => {
		try {
			const token = await Cookies.get('token')
			const { data } = await axios.get(`${__VALUE__}/auth_student/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (data) {
				const result = await axios.put(
					`${__VALUE__}/auth_student/student`,
					{
						Teacher_uuid: teacherUuid,
						email: data.email,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)

				if (result.status === 200) {
					setIsSuccess(true)
					setIsError(false)
				} else {
					setIsSuccess(false)
					setIsError(true)
				}
			}
		} catch (error) {
			console.log(error)
			setIsSuccess(false)
			setIsError(true)
		}
	}

	return (
		<div className={style.wrapperDisplayTeacher}>
			<span>Добавьте сюда UUID вашего учителя</span>
			<div>
				<input type='text' value={teacherUuid} onChange={handleChange} />
				<button onClick={handleSubmit}>сохранить</button>
			</div>
			{isSuccess && <p>UUID учителя успешно сохранен!</p>}
			{isError && <p>Произошла ошибка при сохранении UUID учителя!</p>}
		</div>
	)
}

export default AddTeacher
