import PanelContentParent from './PanelContentParent'
import style from './ParentPanel.module.scss'
import ParentPanelBtn from './ParentPanelBtn'
import HeaderInfoParent from './pages/HeaderInfoParent'

const ParentPanel = () => {
	return (
		<div className={style.wrapperStudentPanel}>
			<div>
				<ParentPanelBtn />
				<HeaderInfoParent />
			</div>
			<div>
				<PanelContentParent />
			</div>
		</div>
	)
}

export default ParentPanel
