import axios from 'axios'
import { Interweave } from 'interweave'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setPages } from '../../../../../../redux/slices/FetchLessonSlice'
import { fetchOneLesson } from '../../../../../../redux/slices/FetchOneLessonSlice'
import style from './PanelLesson.module.scss'

const PanelLesson = () => {
	const data = useParams()
	const dispatch = useDispatch()
	const { dataOnePage } = useSelector(state => state.dataOnePageSlice)
	console.log(dataOnePage)
	const navigate = useNavigate()

	const [result2, setResult2] = useState('')
	useEffect(() => {
		const fetchTeacher = async () => {
			try {
				const token = await Cookies.get('token')
				console.log('Fetching with token:', token) // Добавьте логирование
				const { data } = await axios.get(`${__VALUE__}/auth_student/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log('data', data)
				return data
			} catch (error) {
				console.log(error)
			}
		}
		const initializeData = async () => {
			const result = await fetchTeacher()
			console.log('resulttt', result)
			const object = { Teacher_uuid: result.Teacher_uuid, counter: data.id }
			dispatch(fetchOneLesson(object))
			dispatch(setPages())
		}

		initializeData()
	}, [])
	useEffect(() => {
		if (dataOnePage && dataOnePage.pageContent) {
			function updateImageSource(text) {
				return text.replace(/src=uploads/g, `src=http://localhost:4444/uploads`)
			}

			const result1 = updateImageSource(dataOnePage.pageContent)
			setResult2(result1)
		} else {
			console.warn('dataOnePage or dataOnePage.pageContent is undefined')
		}
	}, [dataOnePage])

	console.log(result2)

	return (
		<div className={style.fullDataPageWrapper}>
			<Interweave content={result2} />
			<button
				onClick={() => {
					navigate(-1)
					dispatch(setPages())
				}}
			>
				Вернуться назад
			</button>
		</div>
	)
}

export default PanelLesson
