import React from 'react'
import { useSelector } from 'react-redux'
import AddParent from './pages/AddParent'
import AddTeacher from './pages/AddTeacher'
import OurParent from './pages/OurParent'
import OurTeacher from './pages/OurTeacher'
import PanelStudentInner from './pages/PanelStudentInner'
const PanelContentStudent = () => {
	const { pages } = useSelector(state => state.studentSelectedPage)

	return (
		<div>
			{pages.label === 'Панель ученика' && <PanelStudentInner />}
			{pages.label === 'ваши родители' && <OurParent />}
			{pages.label === 'Добавить родителя' && <AddParent />}
			{pages.label === 'Добавить учителя' && <AddTeacher />}
			{pages.label === 'Ваш учитель' && <OurTeacher />}
		</div>
	)
}

export default PanelContentStudent
