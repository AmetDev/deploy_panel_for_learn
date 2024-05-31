import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { __VALUE_SEX__ } from '../../../../../../conf.js'
import style from './ChatId.module.scss'
function ChatId() {
	const [socket, setSocket] = useState(null)
	const [message, setMessage] = useState('')
	const [room, setRoom] = useState('')
	const [messages, setMessages] = useState([])
	const messageInputRef = useRef(null)
	const roomInputRef = useRef(null)
	const params = useParams()

	useEffect(() => {
		const newSocket = io(`${__VALUE_SEX__}:4425/user`, {
			auth: {
				token: 'test',
			},
		})

		newSocket.on('receive-message', message => {
			console.log('Received message:', message)
			displayMessage(message)
		})

		setSocket(newSocket)

		return () => newSocket.close()
	}, [])

	useEffect(() => {
		const room = params.id
		if (room && socket) {
			socket.emit('join-room', room)
			// displayMessage(`Joined room: ${room}`)
		}
	}, [socket, params.id])

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

	return (
		<div className={style.wrapperChatId}>
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

export default ChatId
