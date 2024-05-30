import React, { useEffect, useState } from 'react'
import style from './PanelAdmin.module.scss'

import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import day from '../../../assets/day.svg'
import addChild from '../../../assets/panelAdmin/addChild.svg'
import addChild2 from '../../../assets/panelAdmin/addChild2.svg'
import childs from '../../../assets/panelAdmin/childs.svg'
import childs2 from '../../../assets/panelAdmin/childs2.svg'
import doc from '../../../assets/panelAdmin/doc.svg'
import doc2 from '../../../assets/panelAdmin/doc2.svg'
import home from '../../../assets/panelAdmin/home.svg'
import home2 from '../../../assets/panelAdmin/home2.svg'
import question from '../../../assets/panelAdmin/question.svg'
import question2 from '../../../assets/panelAdmin/question2.svg'
import { setPage } from '../../../redux/slices/SelectedPageTeacherSlice'
import chat from './../../../assets/panelAdmin/chat.svg'
import chat1 from './../../../assets/panelAdmin/chatZero.svg'
const PanelAdmin = () => {
	const dispatch = useDispatch()
	const [isDeleted, setIsDeleted] = useState(false)
	const initialState = [
		{ icon: home, icon2: home2, label: 'Панель учителя', state: false },

		{ icon: question, icon2: question2, label: 'создание теста', state: false },
		{ icon: doc, icon2: doc2, label: 'создание урока', state: false },
		{ icon: childs, icon2: childs2, label: 'Ваши ученики', state: false },
		{
			icon: addChild,
			icon2: addChild2,
			label: 'Добавить ученика',
			state: false,
		},
		{
			icon: chat1,
			icon2: chat,
			label: 'Чат',
			state: false,
		},
	]

	const [buttons, setButtons] = useState(initialState)
	const [selectedButton, setSelectedButton] = useState(null)

	const toggleButtonState = index => {
		dispatch(setPage(initialState[index]))
		setSelectedButton(index)
	}

	const { pages } = useSelector(state => state.teacherSelectedPage)
	const { me, status } = useSelector(state => state.fetchUser)

	useEffect(() => {
		if (isDeleted) {
			setButtons(initialState)
			setSelectedButton(null)
		}
	}, [isDeleted])

	const deleteUser = () => {
		Cookies.remove('token')
		location.reload()
	}

	return (
		<div className={style.wrapperPanel}>
			<div className={style.wrapperIcon}>
				<img src={day} alt='' />
				<span>ДАЙ ПЯТЬ!</span>
			</div>
			{buttons.map((button, index) => (
				<button
					key={index}
					onClick={() => toggleButtonState(index)}
					className={`${style.btnPanel} ${
						selectedButton === index ? style.selectedButton : ''
					}`}
				>
					<div
						className={
							selectedButton === index ? style.btnImg : style.btnImagesNonClick
						}
					>
						<img
							src={selectedButton === index ? button.icon2 : button.icon}
							alt=''
						/>
					</div>
					<span>{button.label}</span>
				</button>
			))}
			<button onClick={deleteUser}>
				<Link style={{ color: '#d660cc' }} to='/login'>
					Выход
				</Link>
			</button>
		</div>
	)
}

export default PanelAdmin
