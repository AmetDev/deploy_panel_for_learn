import axios from 'axios'
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { __VALUE__ } from '../../../../../../conf.js'

const StatisStudent = () => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	)
	const [data2, setData2] = useState([])
	const params = useParams()
	console.log('params', params.id)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const Student_uuid = params.id
				const token = Cookies.get('token')
				const result = await axios.get(
					`${__VALUE__}/testing/all_tests_teacher`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						params: { Student_uuid }, // Ensure params is an object
					}
				)

				if (result.status === 200) {
					setData2(result.data.result || []) // Ensure it's an array
				}
			} catch (error) {
				console.log(error)
				setData2([]) // Fallback to empty array on error
			}
		}
		fetchData()
	}, [params.id])

	// Check if data2 is an array before using .map()
	const labels = Array.isArray(data2)
		? data2.map(item => item.totalQuestions)
		: []
	const dataValues = Array.isArray(data2)
		? data2.map(item => item.correctAnswers)
		: []

	const data = {
		labels: labels, // totalQuestions
		datasets: [
			{
				label: 'Верные ответы',
				backgroundColor: 'rgba(214,96,205,0.3)',
				borderColor: 'rgba(214,96,205,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(214,96,205,0.5)',
				hoverBorderColor: 'rgba(214,96,205,1)',
				data: dataValues, // correctAnswers
			},
		],
	}

	const options = {
		scales: {
			x: {
				type: 'category',
				title: {
					display: true,
					text: 'Общее количество вопросов в тесте',
					color: '#FFEDB5',
					font: {
						size: 16,
					},
				},
				ticks: {
					color: '#FFFFFF',
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Правильные ответы',
					color: '#FFEDB5',
					font: {
						size: 16,
					},
				},
				ticks: {
					color: '#FFFFFF',
				},
			},
		},
		plugins: {
			title: {
				display: true,
				text: 'Статистика успеваемости',
				font: {
					size: 24,
				},
				color: '#FFFFFF',
			},
			tooltip: {
				enabled: true,
				mode: 'index',
				intersect: false,
				callbacks: {
					title: function (tooltipItems, data) {
						if (Array.isArray(data2)) {
							const namesTests = data2.map(item => item.test_name)
							if (tooltipItems.length > 0) {
								const index = tooltipItems[0].dataIndex
								return namesTests[index]
							}
						}
						return ''
					},
				},
				backgroundColor: 'rgba(255,237,181,0.8)',
				titleColor: 'rgba(214,96,205)',
				bodyColor: 'rgba(214,96,205)',
				footerColor: 'rgba(214,96,205,1)',
			},
			legend: {
				display: true,
				position: 'top',
				labels: {
					color: '#FFEDB5',
				},
			},
		},
	}

	return (
		<div
			style={{
				width: '900px',
				height: '900px',
				display: 'flex',
				justifyContent: 'center',
				position: 'absolute',
				top: '60%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<Bar data={data} options={options} />
		</div>
	)
}

export default StatisStudent
