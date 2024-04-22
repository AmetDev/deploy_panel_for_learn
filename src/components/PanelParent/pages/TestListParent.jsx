import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setPages } from '../../../../../redux/slices/FetchLessonSlice'
import style from '../../../../Panel/IsAdmin/PanelPages/TestPage.module.scss'

const TestListParent = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [tests, setTests] = useState([])
	const [teacher, setTeacher] = useState(null)
	useEffect(() => {
		const fetchTest = async () => {
			try {
				const token = await Cookies.get('token')

				const data1 = await axios.get(`${__VALUE__}/auth_student/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				setTeacher(data1.data)
				const { data } = await axios.get(`${__VALUE__}/testing/tests`, {
					params: {
						Teacher_uuid: data1.data.Teacher_uuid,
					},
				})
				console.log(data)
				setTests(data)
			} catch (error) {
				setTests([])
				console.log(error)
			}
		}
		fetchTest()
		dispatch(setPages())
	}, [])

	{
		return (
			tests.length !== 0 && (
				<div className={style.wrapperTestLanding}>
					<div>
						<h2>Список тестов</h2>
						<ul>
							{tests.map(test => (
								<li key={test._id}>
									<Link to={`/student/panel/tests/${test._id}`}>
										{test.testName}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<button className={style.btnStyle} onClick={() => navigate(-1)}>
						Вернуться назад
					</button>
				</div>
			)
		)
	}
}

export default TestListParent
