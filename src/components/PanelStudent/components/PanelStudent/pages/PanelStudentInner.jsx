import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { __VALUE__ } from '../../../../../conf'
import {
	fetchPages,
	setPages,
} from '../../../../../redux/slices/FetchLessonSlice'
import style from './PanelTeacher.module.scss'

const PanelStudentInner = () => {
	const dispatch = useDispatch()
	const [user, setUser] = useState({})
	const [isAddedTeacher, setIsAddedTeacher] = useState(false)
	const [teacherUuid, setTeacherUuid] = useState('')

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
				if (data.Teacher_uuid) {
					setIsAddedTeacher(true)
					setTeacherUuid(data.Teacher_uuid)
				} else {
					setIsAddedTeacher(false)
				}
				setUser(data)
			} catch (error) {
				console.log(error)
				setUser(null)
				setIsAddedTeacher(false)
			}
		}
		fetchStudent()
	}, [])

	useEffect(() => {
		dispatch(setPages())
		if (isAddedTeacher) {
			dispatch(fetchPages(teacherUuid))
		}
	}, [isAddedTeacher, teacherUuid]) // Добавляем зависимости

	const { dataPage } = useSelector(state => state.dataPages)
	console.log(dataPage)

	return (
		<div className={style.PanelTeacher}>
			{isAddedTeacher ? (
				<div>
					{dataPage.length !== 0 &&
						dataPage.map(element => {
							return (
								<div key={element.pageUrl}>
									<div>
										<div className={style.wrapperTtitleAndButton}>
											<Link to={`/student/panel/lessons/${element.pageUrl}`}>
												{' '}
												{element.pageTitle}
											</Link>
										</div>
										<img
											style={{
												width: '200px',
												height: '200px',
												borderRadius: 10,
											}}
											src={`${__VALUE__}${element.pageImage}`}
											alt='picture author'
										/>
									</div>
								</div>
							)
						})}
					{dataPage.length == 0 && (
						<div>к сожалению учитель еще не добавил уроков или тестов</div>
					)}
				</div>
			) : (
				<div>Добавьте, пожалуйста, учителя</div>
			)}
		</div>
	)
}

export default PanelStudentInner
