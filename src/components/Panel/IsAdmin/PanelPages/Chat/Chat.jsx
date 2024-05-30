import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { __VALUE__ } from '../../../../../conf'

const Chat = () => {
	const [idUser, setIdUser] = useState(null)
	const [parents, setParents] = useState([])
	const [parentData, setParentData] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = Cookies.get('token')
				const data2 = await axios.get(`${__VALUE__}/auth_teacher/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (data2.status) {
					setIdUser(data2.data._id)
				}
			} catch (error) {
				console.log(error)
				setIdUser('')
			}
		}

		const fetchStudents = async () => {
			try {
				const token = Cookies.get('token')
				if (idUser) {
					const result = await axios.get(`${__VALUE__}/auth_student/students`, {
						params: {
							Teacher_uuid: idUser,
						},
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
				}
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		if (idUser) {
			const fetchStudents = async () => {
				try {
					const token = Cookies.get('token')
					const result = await axios.get(`${__VALUE__}/auth_student/students`, {
						params: {
							Teacher_uuid: idUser,
						},
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					let arr = []
					const result1 = result.data[0].map(element => {
						if (element.Parent_uuid) {
							return element.Parent_uuid
						}
					})
					setParents(result1)
				} catch (error) {
					console.log(error)
				}
			}
			fetchStudents()
		}
	}, [idUser])
	const fetchData = async Parent_uuid => {
		try {
			const result = await axios.get(`${__VALUE__}/auth_parent/parentuser`, {
				params: { Parent_uuid: Parent_uuid }, // Adjust the key to match the expected parameter name by the API
			})
			if (result.status === 200) {
				setParentData([result.data])
			}
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	useEffect(() => {
		parents.forEach(element => {
			fetchData(element)
		})
	}, [parents])
	console.log(parentData)
	return (
		<div>
			{parentData.length > 0 &&
				parentData.map(element => {
					return (
						<div key={element._id}>
							<Link to={`parent/${element._id}`}>{element.fullName}</Link>
						</div>
					)
				})}
		</div>
	)
}

export default Chat
