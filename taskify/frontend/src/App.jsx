import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import TaskBoard from './components/TaskBoard/TaskBoard';
import AuthPage from './components/Auth/AuthPage';
import './styles/index.css';

function AppContent() {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  // Show login page if not authenticated
  if (!token) {
    return <AuthPage />;
  }

  // Show main app if authenticated
  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1>Taskify</h1>
          <div className="app-header-subtitle">
            Welcome back, {user || 'User'}! 👋
          </div>
        </div>
        <button 
          className="btn btn-logout"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          🚪 Logout
        </button>
      </header>
      <TaskBoard />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
