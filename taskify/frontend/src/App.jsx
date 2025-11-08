import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import TaskBoard from './components/TaskBoard/TaskBoard';

function App(){
  return (
    <Provider store={store}>
      <div style={{padding:20}}>
        <h1>Taskify</h1>
        <TaskBoard />
      </div>
    </Provider>
  );
}

export default App;
