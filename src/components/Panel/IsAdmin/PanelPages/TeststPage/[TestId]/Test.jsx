import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { __VALUE__ } from '../../../../../../conf.js'
import style from './Test.module.scss'

const TestDetail = () => {
	const navigate = useNavigate()
	const data1 = useParams()
	const [test, setTest] = useState(null)
	const [selectedAnswers, setSelectedAnswers] = useState({})
	const [isFinished, setIsFinished] = useState(false)
	const [correctCount, setCorrectCount] = useState(0)

	useEffect(() => {
		const fetchOneTest = async () => {
			try {
				const token = await Cookies.get('token')
				const data2 = await axios.get(`${__VALUE__}/auth_teacher/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log(data2.data._id)

				const { data } = await axios.get(`${__VALUE__}/testing/test`, {
					params: {
						id: data1.id,
						Teacher_uuid: data2.data._id,
					},
				})
				setTest(data)
				console.log('id', data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchOneTest()
	}, [])

	const handleAnswerSelect = (questionId, answerId, isCorrect) => {
		const updatedAnswers = {
			...selectedAnswers,
			[questionId]: {
				answerId,
				isCorrect,
			},
		}
		setSelectedAnswers(updatedAnswers)
	}

	const handleFinish = () => {
		if (test.questions.length !== Object.keys(selectedAnswers).length) {
			alert('Пожалуйста, ответьте на все вопросы перед завершением теста.')
			return
		}

		let correctAnswers = 0
		for (const questionId in selectedAnswers) {
			if (selectedAnswers[questionId].isCorrect) {
				correctAnswers += 1
			}
		}
		setCorrectCount(correctAnswers)
		setIsFinished(true)
	}

	console.log('test', test)
	return (
		test && (
			<div className={style.testPage}>
				<h2>{test.testName}</h2>
				{test.questions.map(question => (
					<div className={style.arrQuestions} key={question._id}>
						<h3>{question.question}</h3>
						<ul className={style.ListQuestion}>
							{question.answers.map(answer => (
								<li
									key={answer._id}
									className={`${style.answerItem} ${
										selectedAnswers[question._id]?.answerId === answer._id
											? style.selectedAnswer
											: ''
									}`}
									onClick={() =>
										handleAnswerSelect(
											question._id,
											answer._id,
											answer.isCorrect
										)
									}
								>
									<img
										width={'150px'}
										height={'150px'}
										src={`${__VALUE__}${answer.image}`}
										alt='Answer'
									/>
									{isFinished &&
										selectedAnswers[question._id]?.answerId === answer._id && (
											<div
												className={
													selectedAnswers[question._id]?.isCorrect
														? style.isCorrectly
														: style.isError
												}
											>
												<span>
													{selectedAnswers[question._id]?.isCorrect
														? 'верно'
														: 'ошибка'}
												</span>
											</div>
										)}
								</li>
							))}
						</ul>
					</div>
				))}
				<button className={style.btnFinish} onClick={handleFinish}>
					Завершить
				</button>
				{isFinished && (
					<div className={style.results}>
						<h3>
							Верных ответов: {correctCount} из {test.questions.length}
						</h3>
					</div>
				)}
				<button className={style.btnStyle} onClick={() => navigate(-1)}>
					Вернуться назад
				</button>
			</div>
		)
	)
}

export default TestDetail
