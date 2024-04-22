import React from 'react'
import HeaderInfoStudent from './pages/HeaderInfoStudent'
import PanelContentStudent from './PanelContentStudent'
import StudentPanelBtn from './StudentBtnPanel'
import style from './studentPanel.module.scss'
const StudentPanel = () => {
	return (
		<div className={style.wrapperStudentPanel}>
			<div>
				<StudentPanelBtn />
				<HeaderInfoStudent />
			</div>
			<div>
				<PanelContentStudent />
			</div>
		</div>
	)
}

export default StudentPanel
