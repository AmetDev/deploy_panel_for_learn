import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import user from '../../../../assets/user.png'
import { __VALUE__ } from '../../../../conf.js'
import style from './OurStudents.module.scss'

const OurStudents = () => {
	const [students, setStudents] = useState([])
	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const token = await Cookies.get('token')
				const data2 = await axios.get(`${__VALUE__}/auth_teacher/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log(data2.data._id)
				const { data } = await axios.get(`${__VALUE__}/auth_student/students`, {
					params: {
						Teacher_uuid: data2.data._id,
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log(data)
				setStudents(...data)
			} catch (error) {
				console.log(error)
				setStudents([])
			}
		}
		fetchStudents()
	}, [])
	console.log('students', students)
	return (
		<div className={style.wrapperOurStudents}>
			{students.length == 0 && <div>у вас нету учеников</div>}
			{students.length !== 0 && (
				<div className={style.wrapperElementStudent}>
					{students.map(element => {
						return (
							<div key={element._id}>
								<img src={user} width={'50px'} height={'50px'} alt='' />
								<div>
									<div>
										<span>{element.fullName}</span>
									</div>
									<div>
										<span>{element.email}</span>
									</div>
								</div>
								{/* <button className={style.btnDelete}>
									<img src={deleteIcon} alt='delete student' />
								</button> */}
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default OurStudents
