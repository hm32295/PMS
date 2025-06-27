import React, { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './sharts.css';
import { AuthContext } from '../../../context/AuthContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Charts = () => {
  

   const {statuss}=useContext(AuthContext)
const{infoo}=useContext(AuthContext)
  const pieData = {
    labels: ['Progress', 'Tasks', 'Done'],
    datasets: [{
      data: [infoo?.inProgress??0, infoo?.toDo ??0, infoo?.done??0],
      backgroundColor: ['rgba(14,56,47,1)', 'rgb(115, 67, 0)', 'rgba(239,155,40,1)'],
      hoverOffset: 4
    }]
  };

  const barData = {
    labels: ['Active','inactive'],
    datasets: [{
      data: [statuss?.activatedEmployeeCount ??0,statuss?.deactivatedEmployeeCount ??0],
      backgroundColor: [
       'rgba(14,56,47,1)',  'rgba(239,155,40,1)',
       
      ],
      borderColor: [
        '#000', 'rgb(255,159,64)', 'rgb(255,205,86)',
        
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      }
    }
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

console.log(statuss)
  return (
    <div className="charts-section">
      <div className="charts-container">
        <div className="charts-header">
          <h2 className="charts-title">Statistics Dashboard</h2>
          <p className="charts-subtitle">A comprehensive overview of data and reports</p>
        </div>
        
        <div className="charts-grid">
          <div className="chart-card pie-chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Task distribution</h3>
            </div>
            <div className="chart-wrapper">
              <Pie
                data={pieData}
                options={chartOptions}
              />
            </div>
          </div>

          <div className="chart-card bar-chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Status of users</h3>
            </div>
            <div className="chart-wrapper">
              <Bar
                data={barData}
                options={barOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
