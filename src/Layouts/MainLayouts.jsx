import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderInfo from '../components/Panel/IsAdmin/HeaderInfo'
import PanelAdmin from '../components/Panel/IsAdmin/PanelAdmin'
import PanelContent from '../components/Panel/PanelContent'
import { fetchMe } from '../redux/slices/FetchUserTeacherSlice'
import style from './TeacherPanel.module.scss'

const MainLayouts = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchMe())
	}, [dispatch])

	const { me, status } = useSelector(state => state.fetchUser)

	return (
		me && (
			<div>
				<div className={style.wrapperPanelTeacher}>
					<div className={style.wrapperPanelInfo}>
						<HeaderInfo />
					</div>
					<div className={style.wrapperPanelAdmin}>
						<PanelAdmin />
					</div>
					<div className={style.content}>
						<PanelContent />
					</div>
				</div>
			</div>
		)
	)
}

export default MainLayouts
