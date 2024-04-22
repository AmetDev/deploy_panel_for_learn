import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { __VALUE__ } from '../../../../conf.js'
import style from './AddStudent.module.scss'

const AddStudent = () => {
	const [meUUID, setMeUUID] = useState(null)
	useEffect(() => {
		const fetchMe = async () => {
			try {
				const token = await Cookies.get('token')
				const data2 = await axios.get(`${__VALUE__}/auth_teacher/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				setMeUUID(data2.data._id)
			} catch (error) {
				alert('Не удалось получить данные')
			}
		}
		fetchMe()
	}, [])
	return (
		<div className={style.wrapperAddStudent}>
			<p>
				Предоставьте ученику данный UUID-код и предложите добавить его в свой
				раздел “учителя”. После того, как он добавит данный код, ему будут
				доступны ваши уроки.
			</p>
			{meUUID !== null ? (
				<div className={style.uuidWrapper}>{meUUID}</div>
			) : (
				<div>не удалось получить ваш UUID</div>
			)}
		</div>
	)
}

export default AddStudent
