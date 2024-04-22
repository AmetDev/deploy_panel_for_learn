import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import deleteIcon from '../../../../../assets/panelAdmin/adminicons/deleteicon.svg'
import { __VALUE__ } from '../../../../../conf.js'
import { setPages } from '../../../../../redux/slices/FetchLessonSlice'
import style from '../TestPage.module.scss'

const TestList = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [tests, setTests] = useState([])
	const [teacher, setTeacher] = useState(null)
	useEffect(() => {
		const fetchTest = async () => {
			try {
				const token = await Cookies.get('token')

				const data1 = await axios.get(`${__VALUE__}/auth_teacher/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log(data1.data._id)
				setTeacher(data1.data)
				const { data } = await axios.get(`${__VALUE__}/testing/tests`, {
					params: {
						Teacher_uuid: data1.data._id,
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
	const deleteTest = async id => {
		try {
			alert('Вы действительно хотите удалить тест?')
			const token = await Cookies.get('token')
			const resposne = await axios.delete(`${__VALUE__}/testing/delete`, {
				params: {
					id,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			console.log(resposne)
		} catch (error) {}
	}

	{
		return (
			tests.length !== 0 && (
				<div className={style.wrapperTestLanding}>
					<div>
						<h2>Список тестов</h2>
						<ul>
							{tests.map(test => (
								<li key={test._id}>
									<Link to={`/TeacherPanel/tests/${test._id}`}>
										{test.testName}
									</Link>
									{teacher && (
										<button onClick={() => deleteTest(test._id)}>
											<img src={deleteIcon} alt='deleteicon' />
										</button>
									)}
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

export default TestList
