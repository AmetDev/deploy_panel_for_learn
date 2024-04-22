import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import usericon from '../../../../../assets/user.png'
import style from './OurParent.module.scss'
const OurParent = () => {
	const [hasParentUuid, setHasParentUuid] = useState(false)
	const [parentData, setParentData] = useState(null)
	const deleteTeacher = async () => {
		try {
			const token = await Cookies.get('token')
			const data1 = await axios.get(`${__VALUE__}/auth_student/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			console.log(data1.data.email)
			if (data1.data) {
				console.log('issadodidfasiodu')
				const token = await Cookies.get('token')
				const { data } = await axios.put(
					`${__VALUE__}/auth_student/studentparent`,
					{
						email: data1.data.email,
						Teacher_uuid: null,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				console.log(data)
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		const fetchMeOne = async () => {
			try {
				const token = await Cookies.get('token')
				const { data } = await axios.get(`${__VALUE__}/auth_student/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log(data)

				if (data && data.Parent_uuid) {
					setHasParentUuid(true)
					await fetchParentData(data.Parent_uuid, token)
				} else {
					setHasParentUuid(false)
				}
			} catch (error) {
				console.log(error)
			}
		}

		const fetchParentData = async (parentUuid, token) => {
			try {
				const { data } = await axios.get(
					`${__VALUE__}/auth_parent/parentuser`,
					{
						params: {
							Parent_uuid: parentUuid,
						},
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setParentData(data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchMeOne()
	}, [])

	return (
		<div className={style.wrapperOurTeacher}>
			{parentData ? (
				<div>
					<div className={style.wrapperOur}>
						<div>
							<img src={usericon} width={'32px'} height={'32px'} alt='user' />
						</div>
						<div>
							<span>{parentData.fullName}</span>
							<span>{parentData.email}</span>
						</div>
					</div>
					<button
						onClick={() => {
							let isClicked = confirm('Вы действительно хотите удалить?')
							if (isClicked) {
								deleteTeacher()
							}
						}}
					>
						удалить
					</button>
				</div>
			) : (
				<span>Вы не добавили родителя</span>
			)}
		</div>
	)
}

export default OurParent
