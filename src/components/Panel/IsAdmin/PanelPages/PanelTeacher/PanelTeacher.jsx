import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import deleteicon from '../../../../../assets/panelAdmin/adminicons/deleteicon.svg'
import { __VALUE__ } from '../../../../../conf.js'
import {
	fetchPages,
	setPages,
} from '../../../../../redux/slices/FetchLessonSlice.js'
import style from './PanelTeacher.module.scss'

const PanelTeacher = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await Cookies.get('token')
				const { data } = await axios.get(`${__VALUE__}/auth_teacher/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				return data
			} catch (error) {
				console.log(error)
				return null
			}
		}

		const initializeData = async () => {
			const result = await fetchData()
			if (result) {
				console.log('result', result)

				dispatch(fetchPages(result._id))
				dispatch(setPages())
			}
		}

		initializeData()
	}, [])
	const deletePage = async id => {
		try {
			const token = await Cookies.get('token')
			const result = await axios.delete(`${__VALUE__}/page/pageone`, {
				params: {
					id,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			console.log(result)
			// Перезагрузить список страниц
			dispatch(setPages())
			dispatch(fetchPages())
		} catch (error) {
			console.log(error)
		}
	}

	const { dataPage } = useSelector(state => state.dataPages)
	console.log(dataPage)

	return (
		<div className={style.PanelTeacher}>
			<div>
				{dataPage.length !== 0 &&
					dataPage.map(element => {
						return (
							<div key={element.pageUrl}>
								<div>
									<div className={style.wrapperTtitleAndButton}>
										<Link to={`/PanelTeacher/${element.pageUrl}`}>
											{' '}
											{element.pageTitle}
										</Link>
										<button onClick={() => deletePage(element.pageUrl)}>
											<img src={deleteicon} alt='' />
										</button>
									</div>
									<img
										style={{
											width: '200px',
											height: '200px',
											borderRadius: 10,
										}}
										src={`${__VALUE__}${element.pageImage}`}
										alt='picture author'
									/>
								</div>
							</div>
						)
					})}
			</div>
			{dataPage.length === 0 && <div>Загрузите, пожалуйста, уроки</div>}
		</div>
	)
}

export default PanelTeacher
