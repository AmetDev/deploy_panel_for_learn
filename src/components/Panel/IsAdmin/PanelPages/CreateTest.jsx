import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { __VALUE__ } from '../../../../conf.js'
import style from './CreateTest.module.scss'

const CreateTest = () => {
	const [testName, setTestName] = useState('')
	const [teacherUUID, setTeacherUUID] = useState('')
	const [questions, setQuestions] = useState([
		{ question: '', answers: [{ image: null, isCorrect: false }] },
	])
	const dispatch = useDispatch()
	const [allTest, setAllTest] = useState({})
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

	const handleQuestionChange = (index, value) => {
		const newQuestions = [...questions]
		newQuestions[index].question = value
		setQuestions(newQuestions)
	}

	const handleImageChange = async (questionIndex, answerIndex, file) => {
		const formData = new FormData()
		formData.append('image', file)

		try {
			const token = await Cookies.get('token')

			const response = await axios.post(`${__VALUE__}/upload`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const imageUrl = response.data.imagelink
			console.log(response.data)
			const newQuestions = [...questions]
			newQuestions[questionIndex].answers[answerIndex].image = imageUrl
			setQuestions(newQuestions)
		} catch (error) {
			console.error('Error uploading image:', error)
		}
	}

	const toggleCorrectAnswer = (questionIndex, answerIndex) => {
		const newQuestions = [...questions]
		newQuestions[questionIndex].answers.forEach((answer, index) => {
			answer.isCorrect = index === answerIndex
		})
		setQuestions(newQuestions)
	}

	const addQuestion = () => {
		setQuestions([
			...questions,
			{ question: '', answers: [{ image: null, isCorrect: false }] },
		])
	}

	const addAnswer = questionIndex => {
		const newQuestions = [...questions]
		newQuestions[questionIndex].answers.push({ image: null, isCorrect: false })
		setQuestions(newQuestions)
	}

	const goToNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(prevIndex => prevIndex + 1)
		}
	}

	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(prevIndex => prevIndex - 1)
		}
	}

	const createTest = () => {
		const test = {
			testName: testName,
			questions: questions,
		}

		setAllTest(test)
	}
	useEffect(() => {
		const fetchMe2 = async () => {
			try {
				const token = await Cookies.get('token')
				console.log('Fetching with token:', token) // Добавьте логирование
				const { data } = await axios.get(`${__VALUE__}/auth_teacher/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log('Fetched data:', data) // Добавьте

				addQuestionInServer(allTest.testName, data._id, allTest.questions)
				return data
			} catch (error) {
				return error
			}
		}
		fetchMe2()
	}, [allTest])
	const addQuestionInServer = async (testName, Teacher_uuid, questions) => {
		try {
			console.log('twst')
			const token = await Cookies.get('token')
			const result = await axios.post(
				`${__VALUE__}/testing/create`,
				{
					testName,
					Teacher_uuid,
					questions,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			if (result) {
				alert('Данные были загружены')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={style.wrapperRootTest}>
			<div className={style.listQuestion}>
				<p className={style.labelStyle}>Список вопросов:</p>
				<ul>
					{questions.map((q, index) => (
						<li
							className={style.labelStyle}
							key={index}
							style={{
								color: index === currentQuestionIndex ? '#D660CC' : 'black',
							}}
						>
							Вопрос {index + 1}
						</li>
					))}
				</ul>
			</div>
			<div className={style.wrapperCreaterTest}>
				<div className={style.nameTest}>
					<label className={style.labelStyle} htmlFor='testName'>
						Название теста:
					</label>
					<input
						className={style.InputTest}
						type='text'
						id='testName'
						value={testName}
						onChange={e => setTestName(e.target.value)}
					/>
				</div>

				{questions.map((q, qIndex) => (
					<div
						key={qIndex}
						style={{
							display: qIndex === currentQuestionIndex ? 'block' : 'none',
						}}
					>
						<div>
							<label
								className={style.labelStyle}
								htmlFor={`question-${qIndex}`}
							>
								Вопрос:
							</label>
							<input
								className={style.InputTest}
								type='text'
								id={`question-${qIndex}`}
								value={q.question}
								onChange={e => handleQuestionChange(qIndex, e.target.value)}
							/>
						</div>
						<div>
							<span className={style.labelStyle}>Варианты ответа:</span>
							{q.answers.map((a, aIndex) => (
								<div key={aIndex}>
									<input
										type='file'
										onChange={e =>
											handleImageChange(qIndex, aIndex, e.target.files[0])
										}
									/>
									<button
										className={style.btnStyle}
										onClick={() => toggleCorrectAnswer(qIndex, aIndex)}
									>
										{a.isCorrect
											? 'Сбросить верный ответ'
											: 'Установить верный ответ'}
									</button>
								</div>
							))}
							<button onClick={() => addAnswer(qIndex)}>Добавить ответ</button>
						</div>
					</div>
				))}
				<button className={style.btnStyle} onClick={addQuestion}>
					Добавить вопрос
				</button>
				<div className={style.wrapperPrevAndNext}>
					{currentQuestionIndex > 0 && (
						<button
							className={style.btnStyleReverse}
							onClick={goToPreviousQuestion}
						>
							Предыдущий
						</button>
					)}
					{currentQuestionIndex < questions.length - 1 && (
						<button
							className={style.btnStyleReverse}
							onClick={goToNextQuestion}
						>
							Следующий
						</button>
					)}
				</div>
				<button className={style.btnStyle} onClick={createTest}>
					Создать
				</button>
			</div>
		</div>
	)
}

export default CreateTest
