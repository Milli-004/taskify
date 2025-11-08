import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ tasks }){
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = total - completed - inProgress;

  const data = {
    labels: ['Completed','In Progress','To Do'],
    datasets: [{ data: [completed, inProgress, todo], hoverOffset: 4 }]
  };

  return (
    <div style={{width:300}}>
      <h3>Progress</h3>
      <Pie data={data} />
      <div>Total tasks: {total}</div>
      <div>Completed: {completed}</div>
    </div>
  );
}
