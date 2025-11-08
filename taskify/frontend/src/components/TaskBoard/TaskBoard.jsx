import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../../features/tasks/tasksSlice';
import Dashboard from '../Dashboard/Dashboard';

export default function TaskBoard(){
  const dispatch = useDispatch();
  const tasks = useSelector(s => s.tasks.list);
  const user = useSelector(s => s.auth.user) || 'demoUser';

  useEffect(()=>{ dispatch(fetchTasks(user)); }, [dispatch, user]);

  const [title, setTitle] = useState('');
  const create = () => {
    if (!title) return;
    dispatch(addTask({ title, description:'', userId:user, status:'todo', completed:false }));
    setTitle('');
  };

  return (
    <div style={{display:'flex',gap:20}}>
      <div>
        <h2>Tasks</h2>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task" />
        <button onClick={create}>Add</button>
        <ul>
          {tasks.map(t=> (
            <li key={t.id}>
              <input type="checkbox" checked={t.completed} onChange={()=>dispatch(updateTask({id:t.id, task:{...t, completed:!t.completed}}))} />
              {t.title}
              <button onClick={()=>dispatch(deleteTask(t.id))}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <Dashboard tasks={tasks} />
    </div>
  );
}
