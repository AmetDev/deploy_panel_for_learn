import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from '../../../../../Panel/IsAdmin/PanelPages/TeststPage/[TestId]/Test.module.scss'

const TestDetailStudent = () => {
	const navigate = useNavigate()

	const data1 = useParams()
	const [test, setTest] = useState(null)
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

	const [selectedAnswers, setSelectedAnswers] = useState({})

	const handleAnswerSelect = (questionId, answerId, isCorrect) => {
		setSelectedAnswers({
			...selectedAnswers,
			[questionId]: {
				answerId,
				isCorrect,
			},
		})
	}
	console.log('test', test)
	{
		return (
			test && (
				<div className={style.testPage}>
					<h2>{test.testName}</h2>
					{/* <p>Teacher UUID: {test.Teacher_uuid}</p> */}

					{test.questions.map(question => (
						<div className={style.arrQuestions} key={question._id}>
							<h3>{question.question}</h3>

							<ul className={style.ListQuestion}>
								{question.answers.map(answer => (
									<li
										key={answer._id}
										className={
											selectedAnswers[question._id]?.answerId === answer._id
												? selectedAnswers[question._id]?.isCorrect
													? 'верно'
													: 'неверно'
												: ''
										}
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
										{selectedAnswers[question._id]?.answerId === answer._id &&
											(selectedAnswers[question._id]?.isCorrect ? (
												<div className={style.isCorrectly}>
													<span>верно</span>
												</div>
											) : (
												<div className={style.isError}>
													<span>ошибка</span>
												</div>
											))}
									</li>
								))}
							</ul>
						</div>
					))}
					<button className={style.btnStyle} onClick={() => navigate(-1)}>
						Вернуться назад
					</button>
				</div>
			)
		)
	}
}

export default TestDetailStudent
