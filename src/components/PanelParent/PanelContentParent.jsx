import React from 'react'
import { useSelector } from 'react-redux'
import AddParentV2 from './pages/AddParentv2'
import OurChildren from './pages/OurChildren'
import PanelParentInner from './pages/PanelParentInner'
import Statis from './pages/Statis'

const PanelContentParent = () => {
	const { pages } = useSelector(state => state.parentSelectedPage)

	return (
		<div>
			{pages.label === 'Панель родителя' && <PanelParentInner />}
			{pages.label === 'ваши дети' && <OurChildren />}
			{pages.label === 'Добавить ребенка' && <AddParentV2 />}
      {pages.label === 'Статистика' && <Statis/> }  
		</div>
	)
}

export default PanelContentParent
