import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { __VALUE_SEX__ } from '../../../../../../conf.js'
function ChatId() {
	const [socket, setSocket] = useState(null)
	const [message, setMessage] = useState('')
	const [room, setRoom] = useState('')
	const [messages, setMessages] = useState([])
	const messageInputRef = useRef(null)
	const roomInputRef = useRef(null)
	const params = useParams()
	console.log(params)
	useEffect(() => {
		const room = params.id
		console.log(room)
		if (room && socket) {
			socket.emit('join-room', room)
			displayMessage(`Joined room: ${room}`)
		}
	}, [])

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
		const room = params.id

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

export default ChatId
