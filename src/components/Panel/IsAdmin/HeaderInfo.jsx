import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import lesson from '../../../assets/lesson.svg'
import test from '../../../assets/test.svg'
import User from '../../../assets/user.png'
import { fetchMe } from '../../../redux/slices/FetchUserTeacherSlice'
import style from './HeaderInfo.module.scss'

const HeaderInfo = () => {
	const dispatch = useDispatch()
	const [activeItem, setActiveItem] = useState('lessons') // Состояние для хранения текущего активного элемента

	useEffect(() => {
		dispatch(fetchMe())
	}, [])

	const { me, status } = useSelector(state => state.fetchUser)
	console.log(me)

	return (
		status === 'success' &&
		me.isTeacher && (
			<div className={style.HeaderInfo}>
				<div className={style.userWrapper}>
					<div>
						<img src={User} alt='user' />
					</div>
					<div>
						<span>{me.fullName}</span>
						<span>{me.email}</span>
					</div>
				</div>
				<div className={style.WrapperSwitcher}>
					<div className={activeItem === 'lessons' ? style.active : ''}>
						<img src={lesson} alt='' />
						<button onClick={() => setActiveItem('lessons')}>
							<Link to='/TeacherPanel'>Уроки</Link>
						</button>
					</div>
					<div className={activeItem === 'tests' ? style.active : ''}>
						<img src={test} alt='' />
						<button onClick={() => setActiveItem('tests')}>
							<Link to='/TeacherPanel/tests'>Тесты</Link>
						</button>
					</div>
				</div>
			</div>
		)
	)
}

export default HeaderInfo
