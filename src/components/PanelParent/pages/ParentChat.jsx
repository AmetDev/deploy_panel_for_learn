import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { __VALUE_SEX__, __VALUE__ } from '../../../conf.js'
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
			const room = id
			console.log(room)
			if (room && socket) {
				socket.emit('join-room', room)
				displayMessage(`Joined room: ${room}`)
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

		newSocket.on('connect', () => {
			displayMessage(`You connected with id: ${newSocket.id}`)
		})

		newSocket.on('connect_error', error => {
			displayMessage(`Connection error: ${error.message}`)
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
		const message = messageInputRef.current.value
		const room = id

		if (message === '') return

		displayMessage(`You: ${message}`)

		if (socket) {
			socket.emit('send-message', message, room)
		}

		setMessage('')
	}

	// const handleJoinRoom = () => {
	// 	const room = params.id
	// 	console.log(room)
	// 	if (room && socket) {
	// 		socket.emit('join-room', room)
	// 		displayMessage(`Joined room: ${room}`)
	// 	}
	// }

	return (
		<div>
			<div>
				<ul>
					{messages.map((msg, index) => (
						<li key={index}>{msg}</li>
					))}
				</ul>
			</div>
			<form id='form' onSubmit={handleFormSubmit}>
				<div>
					<span>Message</span>
					<input
						type='text'
						id='message-input'
						ref={messageInputRef}
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
					<button type='submit'>Send</button>
				</div>
			</form>
			<div>
				<span>Room</span>
				<input type='text' id='room-input' ref={roomInputRef} />
				{/* <button type='button' onClick={handleJoinRoom}>
					Join
				</button> */}
			</div>
		</div>
	)
}

export default ParentChat
