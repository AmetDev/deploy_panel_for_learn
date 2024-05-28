import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { __VALUE__ } from '../../../../../../conf.js'
import style from '../../../../../Panel/IsAdmin/PanelPages/TeststPage/[TestId]/Test.module.scss'

const TestDetailStudent = () => {
	const navigate = useNavigate()
	const params = useParams()
	const data1 = useParams()
	const [test, setTest] = useState(null)
	const [selectedAnswers, setSelectedAnswers] = useState({})
	const [isFinished, setIsFinished] = useState(false)
	const [correctCount, setCorrectCount] = useState(0)
	const [results, setResults] = useState([])
	const [isAnswered, setIsAnswered] = useState(false)
	const [dataResult, setDataResult] = useState({
		correctAnswers: null,
		totalQuestions: null,
		time: null,
		name: null,
	})
	useEffect(() => {
		const fetchResultTest = async () => {
			try {
				const token = Cookies.get('token')
				const resultResponse = await axios.get(
					`${__VALUE__}/testing/result_test`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						params: {
							test_uuid: params.id,
						},
					}
				)
				if (resultResponse.status === 200) {
					setIsAnswered(true)
					console.log('resultResponse', resultResponse.data.result)
					setDataResult({
						...dataResult,
						correctAnswers: resultResponse.data.result.correctAnswers,
						totalQuestions: resultResponse.data.result.totalQuestions,
						time: new Date(
							resultResponse.data.result.createdAt
						).toLocaleString(),
						testName: resultResponse.data.result.test_name,
					})
				}
			} catch (error) {
				console.log(error)
				setIsAnswered(false)
				return error
			}
		}
		fetchResultTest()
	}, [])
	useEffect(() => {
		const fetchOneTest = async () => {
			try {
				const token = await Cookies.get('token')
				const data2 = await axios.get(`${__VALUE__}/auth_student/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log(data2.data._id)

				const { data } = await axios.get(`${__VALUE__}/testing/test`, {
					params: {
						id: data1.id,
						Teacher_uuid: data2.data.Teacher_uuid,
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
		if (isFinished) return // Prevent further selection if test is finished
		setSelectedAnswers({
			...selectedAnswers,
			[questionId]: {
				answerId,
				isCorrect,
			},
		})
	}
	const makeDate = something => {
		console.log('something', something)
		const result = new Date(something)
		return result
	}

	const saveResults = async (correctAnswers, totalQuestions) => {
		try {
			const token = await Cookies.get('token')
			console.log('test.testName', test.testName)
			const resultData = {
				correctAnswers,
				totalQuestions,
				results: Object.keys(selectedAnswers).map(questionId => ({
					questionId,
					isCorrect: selectedAnswers[questionId].isCorrect,
				})),
				test_uuid: params.id,
				test_name: test.testName,
			}
			await axios.post(`${__VALUE__}/testing/result_test`, resultData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})

			console.log('Results saved:', resultData, token, params)
			setResults(resultData.results)
		} catch (error) {
			console.log('Error saving results:', error)
		}
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
		saveResults(correctAnswers, test.questions.length)
	}

	console.log('test', test)
	return test && isAnswered === false ? (
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
									handleAnswerSelect(question._id, answer._id, answer.isCorrect)
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
			<button
				className={style.btnFinish}
				onClick={handleFinish}
				disabled={isFinished}
			>
				{isFinished ? 'Завершено' : 'Завершить'}
			</button>
			{isFinished && (
				<div className={style.results}>
					<h3>
						Верных ответов: {correctCount} из {test.questions.length}
					</h3>
					<ul>
						{results.map((result, index) => (
							<li key={index}>
								Вопрос {index + 1}: {result.isCorrect ? 'верно' : 'ошибка'}
							</li>
						))}
					</ul>
				</div>
			)}
			<button className={style.btnStyle} onClick={() => navigate(-1)}>
				Вернуться назад
			</button>
		</div>
	) : (
		<div className={style.resultIsDoneWrapper}>
			<div className={style.wrapperBlock}>
				<span>Название теста:</span>
				<span>{dataResult.testName}</span>
			</div>
			<div className={style.wrapperBlock}>
				<span>Количество верных ответов:</span>
				<span>{dataResult.correctAnswers}✔️</span>
			</div>
			<div className={style.wrapperBlock}>
				<span>Общие количество вопросов:</span>
				<span>{dataResult.totalQuestions}✍</span>
			</div>
			<div className={style.wrapperBlock}>
				<span>Время сдачи:</span>
				<span>{dataResult.time}⌚</span>
			</div>
			<button className={style.btnStyle} onClick={() => navigate(-1)}>
				Вернуться назад
			</button>
		</div>
	)
}

export default TestDetailStudent
