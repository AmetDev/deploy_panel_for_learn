import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { __VALUE__ } from '../../../conf.js'
import { fetchPages, setPages } from '../../../redux/slices/FetchLessonSlice.js'
import style from './PanelTeacher.module.scss'

const PanelParentInner = () => {
	const dispatch = useDispatch()
	const [user, setUser] = useState({})
	const [isAddedTeacher, setIsAddedTeacher] = useState(false)
	const [teacherUuid, setTeacherUuid] = useState('')
	useEffect(() => {
		const fetchStudent = async () => {
			// Get the token from the cookie
			const token = await Cookies.get('token')

			// Fetch the parent's data
			const data1 = await axios.get(`${__VALUE__}/auth_parent/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			// Fetch the student's data for the parent
			const { data } = await axios.get(
				`${__VALUE__}/auth_student/studentforparent`,
				{
					params: {
						Parent_uuid: data1.data._id,
					},
				}
			)

			const newAr = [...data[0]] // assuming studentData is the array you want
			console.log(newAr)

			if (newAr[0] && newAr[0].Teacher_uuid) {
				setIsAddedTeacher(true)
				setTeacherUuid(newAr[0].Teacher_uuid)
			} else {
				setIsAddedTeacher(false)
			}

			setUser(newAr[0] || {})
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
					<h2>здесь вы можете увидеть какие уроки смотрит ваш ребенок</h2>
					{dataPage.length !== 0 &&
						dataPage.map(element => {
							return (
								<div key={element.pageUrl}>
									<div>
										<div className={style.wrapperTtitleAndButton}>
											<span> {element.pageTitle}</span>
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
				<div>Добавьте, пожалуйста, ребенка</div>
			)}
		</div>
	)
}

export default PanelParentInner
