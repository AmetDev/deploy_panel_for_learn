import React, { useState } from 'react'
import style from './PanelAdmin.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import day from '../../assets/day.svg'
import addChild from '../../assets/panelAdmin/addChild.svg'
import addChild2 from '../../assets/panelAdmin/addChild2.svg'
import childs from '../../assets/panelAdmin/childs.svg'
import childs2 from '../../assets/panelAdmin/childs2.svg'
import home from '../../assets/panelAdmin/home.svg'
import home2 from '../../assets/panelAdmin/home2.svg'

import { setPageParent } from '../../redux/slices/SelectedPageParentSlice.js'

const ParentPanelBtn = () => {
	const dispatch = useDispatch()
	const initialState = [
		{ icon: home, icon2: home2, label: 'Панель родителя', state: false },

		{ icon: childs, icon2: childs2, label: 'ваши дети', state: false },
		{
			icon: addChild,
			icon2: addChild2,
			label: 'Добавить ребенка',
			state: false,
		},
	]

	const [buttons, setButtons] = useState(initialState)
	const [selectedButton, setSelectedButton] = useState(null)

	const toggleButtonState = index => {
		dispatch(setPageParent(initialState[index]))
		setSelectedButton(index)
	}

	const { pages } = useSelector(state => state.parentSelectedPage)

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
		</div>
	)
}

export default ParentPanelBtn
