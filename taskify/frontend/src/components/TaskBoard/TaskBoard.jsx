import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../../features/tasks/tasksSlice';
import Dashboard from '../Dashboard/Dashboard';
import TaskModal from '../TaskModal/TaskModal';

export default function TaskBoard(){
  const dispatch = useDispatch();
  const tasks = useSelector(s => s.tasks.list);
  const status = useSelector(s => s.tasks.status);
  const error = useSelector(s => s.tasks.error);
  const user = useSelector(s => s.auth.user) || 'demoUser';

  useEffect(()=>{ 
    if (user) {
      dispatch(fetchTasks(user)); 
    }
  }, [dispatch, user]);

  const [title, setTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const create = () => {
    if (!title.trim()) return;
    dispatch(addTask({ 
      title, 
      description: '', 
      userId: user, 
      status: 'todo', 
      completed: false,
      priority: 'medium'
    }));
    setTitle('');
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

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleSaveEdit = (updatedTask) => {
    dispatch(updateTask({
      id: updatedTask.id,
      task: updatedTask
    }));
    setShowModal(false);
    setEditingTask(null);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#f47174';
      case 'medium': return '#ffb26b';
      case 'low': return '#4dd599';
      default: return '#a084e8';
    }
  };

  return (
    <div className="main-content">
      <div className="task-section">
        <h2>My Tasks</h2>
        
        {/* Add Task Input */}
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

        {/* Search and Filters */}
        <div className="filters-container">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select 
            className="filter-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>

        {/* Task List */}
        {status === 'loading' ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <div className="error-text">{error}</div>
            <button className="btn btn-primary" onClick={() => dispatch(fetchTasks(user))}>
              🔄 Retry
            </button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' ? '🔍' : '📝'}
            </div>
            <div className="empty-state-text">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' 
                ? 'No tasks match your filters' 
                : 'No tasks yet. Create your first task!'}
            </div>
          </div>
        ) : (
          <ul className="task-list">
            {filteredTasks.map(task => (
              <li 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
                style={{ borderLeftColor: getPriorityColor(task.priority) }}
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
                    <span 
                      className="task-badge priority-badge"
                      style={{ 
                        backgroundColor: `${getPriorityColor(task.priority)}33`,
                        color: getPriorityColor(task.priority),
                        borderColor: getPriorityColor(task.priority)
                      }}
                    >
                      {task.priority === 'high' && '🔴'}
                      {task.priority === 'medium' && '🟡'}
                      {task.priority === 'low' && '🟢'}
                      {' '}{task.priority || 'medium'}
                    </span>
                    {task.category && (
                      <span className="task-badge category-badge">
                        🏷️ {task.category}
                      </span>
                    )}
                    {task.dueAt && (
                      <span className="task-badge date-badge">
                        📅 {new Date(task.dueAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="task-actions">
                  <button 
                    className="btn btn-edit" 
                    onClick={() => handleEdit(task)}
                    title="Edit task"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(task.id)}
                    title="Delete task"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <Dashboard tasks={tasks} />

      {/* Edit Modal */}
      {showModal && editingTask && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
              }
