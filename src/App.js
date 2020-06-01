import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import Notes from './components/Notes';
import {CSSTransition, TransitionGroup, Transition} from 'react-transition-group';
import Settings from './components/Settings';
import UserContext from './context/user';
import TimeTracker from './components/TimeTracker';

function App() {

  let user = {
    name: '',
    changeName: (val) => {
      console.log('val : ', val);
      setUserName(val);
    }
  };

  const [showTodo, setShowTodo] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState('');
  const [showTimeTracker, setShowTimeTracker] = useState(false);

  const handleSettings = () => {
    if (showSettings) {
      setShowSettings(false);
      setTimeout(() => {
        setShowNotes(true);
        setShowTodo(true);
        setShowTimeTracker(false);
      }, 500)
      
    } else {
      setShowNotes(false);
      setShowTodo(false);
      setShowTimeTracker(false);
      setTimeout(() => {
        setShowSettings(true);
      }, 700)
    }
  }

  const handleTimeTracker = () => {
    if (showTimeTracker) {
      setShowTimeTracker(false);
      setTimeout(() => {
        setShowSettings(false);
        setShowNotes(true);
        setShowTodo(true);
      }, 500)
      
    } else {
      setShowSettings(false);
      setShowNotes(false);
      setShowTodo(false);
      setTimeout(() => {
        setShowTimeTracker(true);
      }, 700)
    }
  }

  const resetSomething = (e) => {
    e.stopPropagation();
    let allTaskElems = document.querySelectorAll('.task-title');
    allTaskElems.forEach((elem, i) => {
      elem.removeAttribute('contenteditable');
    });
  }

  useEffect(() => {
    console.log( JSON.parse(localStorage.getItem('user-details')) );
    const userDetails = JSON.parse(localStorage.getItem('user-details'));
    console.log('userDetails : ', userDetails);
    if(userDetails) {
      setUserName(userDetails.firstName);
    } else {
      setUserName('John Doe')
    }
    
  }, []);

  return (
    <UserContext.Provider  value={user}>
      <div>
        <div className='container' onClick={resetSomething}>
          <div className='header'>
            <div
                className= { showSettings ? `custom-icon settings-tab tab active` : 'custom-icon settings-tab tab'} 
                onClick={handleSettings}>
                <span className='material-icons'>
                  settings
                </span>
            </div>
            <h2>
              <i>Welc<span>ome</span></i>
              {' ' + userName}
            </h2> */}
            <div className='tabs-wrapper'>
              <div 
                className={ showTodo ? 'custom-icon tab active' : 'custom-icon tab'} 
                onClick={() => setShowTodo(!showTodo)}>
                <span >Todo</span>
              </div>
              <div 
                className={ showNotes ? 'custom-icon tab active' : 'custom-icon tab'}  
                onClick={() => setShowNotes(!showNotes)}>
                <span >Notes</span>
              </div>
              <div 
                className={ showTimeTracker ? `custom-icon tab active` : 'custom-icon tab'} 
                onClick={handleTimeTracker}>
                <span>
                  Time Tracker
                </span>
              </div>
              
            </div>
          </div>
          <div className='wrapper'>
            <CSSTransition 
              unmountOnExit
              in={showTodo} 
              timeout={500} 
              classNames='todo-animate'>
              <Todo/> 
            </CSSTransition>
            <CSSTransition 
              unmountOnExit
              in={showNotes} 
              timeout={500} 
              classNames='notes-animate'>
              <Notes/> 
            </CSSTransition>
            <CSSTransition 
              unmountOnExit
              in={showSettings} 
              timeout={300} 
              classNames='settings-animate'>
              <Settings/> 
            </CSSTransition> 
            <CSSTransition 
              unmountOnExit
              in={showTimeTracker} 
              timeout={500} 
              classNames='settings-animate'>
              <TimeTracker/> 
            </CSSTransition>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
