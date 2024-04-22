import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import lesson from '../../../../../assets/lesson.svg'
import test from '../../../../../assets/test.svg'
import User from '../../../../../assets/user.png'
import { __VALUE__ } from '../../../../../conf.js'
import style from './HeaderInfo.module.scss'

const HeaderInfoStudent = () => {
	const [user, setUser] = useState({})
	const [activeItem, setActiveItem] = useState('lessons') // Состояние для хранения текущего активного элемента
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

	return (
		user && (
			<div className={style.HeaderInfo}>
				<div className={style.userWrapper}>
					<div>
						<img src={User} alt='user' />
					</div>
					<div>
						<span>{user.fullName}</span>
						<span>{user.email}</span>
					</div>
				</div>
				<div className={style.WrapperSwitcher}>
					<div className={activeItem === 'lessons' ? style.active : ''}>
						<img src={lesson} alt='' />
						<button onClick={() => setActiveItem('lessons')}>
							<Link to='/student/panel'>Уроки</Link>
						</button>
					</div>
					<div className={activeItem === 'tests' ? style.active : ''}>
						<img src={test} alt='' />
						<button onClick={() => setActiveItem('tests')}>
							<Link to='/student/panel/tests'>Тесты</Link>
						</button>
					</div>
				</div>
			</div>
		)
	)
}

export default HeaderInfoStudent
