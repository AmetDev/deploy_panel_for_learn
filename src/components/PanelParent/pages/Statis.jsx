import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {element} from '../pages/Diagram/FakeData.js';
import { __VALUE__ } from '../../../conf.js';
import Cookies from 'js-cookie';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
    labels: element.map((item) => (item.totalQuestions)), // totalQuestions
    datasets: [
      {
        label: 'Верные ответы',
        backgroundColor: 'rgba(214,96,205,0.3)',
        borderColor: 'rgba(214,96,205,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(214,96,205,0.5)',
        hoverBorderColor: 'rgba(214,96,205,1)',
        data: element.map((item) => (item.correctAnswers)), // correctAnswers
      },
    ],
  };
  
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
                const namesTests = element.map((item) => item.name);
                if (tooltipItems.length > 0) {
                  const index = tooltipItems[0].dataIndex;
                  return namesTests[index];
                }
                return '';
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
  };


const Statis = () => {
  useEffect(()=>{
  const fetchData = async () => {
    try {
        const token = Cookies.get('token')
     await axios.get(`${__VALUE__}/testing/all_tests`) 
    } catch (error) {
      
    }
  }
  },[])
  return (
    <div style={{ width: '900px', height: '900px', display: 'flex', justifyContent: 'center', position: 'absolute' }}>
      <Bar data={data} options={options} />
      <span>testing</span>
    </div>
  );
};

export default  Statis;
