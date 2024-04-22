import { Route, Routes } from 'react-router-dom'
import '../src/scss/index.scss'
import MainLayouts from './Layouts/MainLayouts'
import PrivateRoute from './Layouts/PrivateRoute'
import Login from './components/Login/Login'
import FullDataPage from './components/Panel/IsAdmin/PanelPages/PanelTeacher/[PanelTeacherId]/FullDataPage'
import TestList from './components/Panel/IsAdmin/PanelPages/TeststPage/TestsPage'
import TestDetail from './components/Panel/IsAdmin/PanelPages/TeststPage/[TestId]/Test'
import MainPageParent from './components/PanelParent/MainPageParent'
import ParentPanel from './components/PanelParent/ParentPanel'
import MainPageStudent from './components/PanelStudent/MainPageStudent'
import TestListStudent from './components/PanelStudent/components/PanelStudent/pages/TestsPage'
import PanelLesson from './components/PanelStudent/components/PanelStudent/pages/[PanelStudentInnerId]/PanelLesson'
import TestDetailStudent from './components/PanelStudent/components/PanelStudent/pages/[TestsPageId]/TestDetailStudent'
import StudentPanel from './components/PanelStudent/components/PanelStudent/studentPanel'
function App() {
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/student' element={<MainPageStudent />}>
					<Route path='/student/panel' element={<StudentPanel />} />
					<Route path='/student/panel/lessons/:id' element={<PanelLesson />} />
					<Route path='/student/panel/tests/' element={<TestListStudent />} />
					<Route
						path='/student/panel/tests/:id'
						element={<TestDetailStudent />}
					/>
				</Route>
				<Route path='/parent' element={<MainPageParent />}>
					<Route path='/parent/panel' element={<ParentPanel />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path='/TeacherPanel' element={<MainLayouts />} />
					<Route path='/TeacherPanel/tests' element={<TestList />} />
					<Route path='/TeacherPanel/tests/:id' element={<TestDetail />} />
				</Route>
				<Route path='/PanelTeacher/:id' element={<FullDataPage />} />
			</Routes>
		</>
	)
}

export default App
