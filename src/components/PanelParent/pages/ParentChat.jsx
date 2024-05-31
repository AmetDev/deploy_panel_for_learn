import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { __VALUE_SEX__, __VALUE__ } from '../../../conf.js'
import style from '../parentPage.module.scss'

const ParentChat = () => {
	const [id, setId] = useState(null)
	const [socket, setSocket] = useState(null)
	const [message, setMessage] = useState('')
	const [room, setRoom] = useState('')
	const [messages, setMessages] = useState([])
	const messageInputRef = useRef(null)
	const roomInputRef = useRef(null)

	useEffect(() => {
		const fetchParent = async () => {
			try {
				const token = Cookies.get('token')
				const data1 = await axios.get(`${__VALUE__}/auth_parent/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (data1.status === 200) {
					setId(data1.data._id)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchParent()
	}, [])
	useEffect(() => {
		if (id !== null) {
			console.log('id', id)
			const room = id
			console.log(room)
			if (room && socket) {
				socket.emit('join-room', room)
			}
		}
	}, [id])
	console.log(id)
	useEffect(() => {
		const newSocket = io(`${__VALUE_SEX__}/user`, {
			auth: {
				token: 'test',
			},
		})

		newSocket.on('receive-message', message => {
			displayMessage(message)
		})

		setSocket(newSocket)

		return () => newSocket.close()
	}, [])

	const displayMessage = message => {
		setMessages(prevMessages => [...prevMessages, message])
	}

	const handleFormSubmit = e => {
		e.preventDefault()
		console.log('work')
		const message = messageInputRef.current.value
		const room = id

		if (message === '') return

		displayMessage(`You: ${message}`)

		if (socket) {
			socket.emit('send-message', message, room)
		}

		setMessage('')
	}

	return (
		<div className={style.wrapperParent}>
			<div>
				<ul>
					{messages.map((msg, index) => (
						<li key={index}>{msg}</li>
					))}
				</ul>
			</div>

			<form id='form' onSubmit={handleFormSubmit}>
				<div>
					<span>Сообщение</span>
					<input
						type='text'
						id='message-input'
						ref={messageInputRef}
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
					<button type='submit'>Отправить</button>
				</div>
			</form>
		</div>
	)
}

export default ParentChat
