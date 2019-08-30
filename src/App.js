import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import Notes from './components/Notes';

function App() {
  return (
    <div className='container'>
      <h2 className='owner-greetings'>
        <i>Welcome</i>
        {' '}MR.VAIBHAV
      </h2>
      <div className='wrapper'>
        <Todo/>
        <Notes />
      </div>
    </div>
  );
}

export default App;
