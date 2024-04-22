import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchMe } from '../../redux/slices/FetchUserTeacherSlice'
import AddStudent from './IsAdmin/PanelPages/AddStudent'
import CreateLesson from './IsAdmin/PanelPages/CreateLesson'
import CreateTest from './IsAdmin/PanelPages/CreateTest'
import OurStudents from './IsAdmin/PanelPages/OurStudents'
import PanelTeacher from './IsAdmin/PanelPages/PanelTeacher/PanelTeacher'
import RemoveStudent from './IsAdmin/PanelPages/RemoveStudent'

const PanelContent = () => {
	const { pages } = useSelector(state => state.teacherSelectedPage)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchMe())
	}, [])
	const { me, status } = useSelector(state => state.fetchUser)
	console.log(me)

	return (
		status === 'success' &&
		me.isTeacher && (
			<div>
				{pages.label === 'Панель учителя' && <PanelTeacher />}
				{pages.label === 'статистика' && <Chart />}
				{pages.label === 'создание теста' && <CreateTest />}
				{pages.label === 'создание урока' && <CreateLesson />}
				{pages.label === 'Ваши ученики' && <OurStudents />}
				{pages.label === 'Добавить ученика' && <AddStudent />}
				{pages.label === 'Убрать ученика' && <RemoveStudent />}
			</div>
		)
	)
}

export default PanelContent
