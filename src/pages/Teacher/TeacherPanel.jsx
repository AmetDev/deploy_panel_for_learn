import React from 'react'
import HeaderInfo from '../../components/Panel/IsAdmin/HeaderInfo'
import PanelAdmin from '../../components/Panel/IsAdmin/PanelAdmin'

import style from '../../components/Panel/IsAdmin/PanelPages/PanelTeacher/PanelTeacher.module.scss'
import PanelContent from '../../components/Panel/PanelContent'
const TeacherPanel = () => {
	{
		return (
			<div className={style.wrapperPanelTeacher}>
				<div></div>
				<div className={style.wrapperPanelInfo}>
					<HeaderInfo />
				</div>
				<div className={style.wrapperPanelAdmin}>
					<PanelAdmin />
				</div>
				<PanelContent />
			</div>
		)
	}
}

export default TeacherPanel
