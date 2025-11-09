import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ tasks }){
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = total - completed - inProgress;
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const data = {
    labels: ['Completed', 'In Progress', 'To Do'],
    datasets: [{
      data: [completed, inProgress, todo],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(99, 102, 241, 0.8)',
      ],
      borderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(99, 102, 241, 1)',
      ],
      borderWidth: 2,
      hoverOffset: 10
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="dashboard">
      <h3>Progress Overview</h3>
      
      {total > 0 ? (
        <>
          <div className="chart-container">
            <div style={{ maxWidth: '280px', margin: '0 auto' }}>
              <Pie data={data} options={options} />
            </div>
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-value">{total}</span>
            </div>
            <div className="stat-item stat-completed">
              <span className="stat-label">✅ Completed</span>
              <span className="stat-value">{completed}</span>
            </div>
            <div className="stat-item stat-progress">
              <span className="stat-label">⏳ In Progress</span>
              <span className="stat-value">{inProgress}</span>
            </div>
            <div className="stat-item stat-todo">
              <span className="stat-label">📝 To Do</span>
              <span className="stat-value">{todo}</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">
              <span>Overall Progress</span>
              <span style={{ fontWeight: 700, color: '#6366f1' }}>
                {completionPercentage}%
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <div className="empty-state-text" style={{ fontSize: '0.875rem' }}>
            No data to display yet
          </div>
        </div>
      )}
    </div>
  );
}
