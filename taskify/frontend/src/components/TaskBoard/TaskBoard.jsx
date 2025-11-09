import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../../features/tasks/tasksSlice';
import Dashboard from '../Dashboard/Dashboard';

export default function TaskBoard(){
  const dispatch = useDispatch();
  const tasks = useSelector(s => s.tasks.list);
  const status = useSelector(s => s.tasks.status);
  const user = useSelector(s => s.auth.user) || 'demoUser';

  useEffect(()=>{ dispatch(fetchTasks(user)); }, [dispatch, user]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const create = () => {
    if (!title.trim()) return;
    dispatch(addTask({ 
      title, 
      description, 
      userId: user, 
      status: 'todo', 
      completed: false 
    }));
    setTitle('');
    setDescription('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      create();
    }
  };

  const toggleComplete = (task) => {
    dispatch(updateTask({
      id: task.id, 
      task: {
        ...task, 
        completed: !task.completed,
        status: !task.completed ? 'completed' : 'todo'
      }
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div className="main-content">
      <div className="task-section">
        <h2>My Tasks</h2>
        
        <div className="task-input-container">
          <input 
            className="task-input"
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?" 
          />
          <button className="btn btn-primary" onClick={create}>
            ➕ Add Task
          </button>
        </div>

        {status === 'loading' ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <div className="empty-state-text">No tasks yet. Create your first task!</div>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <input 
                  type="checkbox" 
                  className="task-checkbox"
                  checked={task.completed} 
                  onChange={() => toggleComplete(task)} 
                />
                <div className="task-content">
                  <div className="task-title">{task.title}</div>
                  {task.description && (
                    <div className="task-description">{task.description}</div>
                  )}
                  <div className="task-meta">
                    <span className={`task-badge status-${task.status || 'todo'}`}>
                      {task.status || 'todo'}
                    </span>
                    {task.dueAt && (
                      <span className="task-badge" style={{ background: '#fee2e2', color: '#991b1b' }}>
                        📅 {new Date(task.dueAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="task-actions">
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(task.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <Dashboard tasks={tasks} />
    </div>
  );
}
