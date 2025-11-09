import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import TaskBoard from './components/TaskBoard/TaskBoard';
import './styles/index.css';

function App(){
  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="app-header">
          <h1>Taskify</h1>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Your smart task management solution
          </div>
        </header>
        <TaskBoard />
      </div>
    </Provider>
  );
}

export default App;
