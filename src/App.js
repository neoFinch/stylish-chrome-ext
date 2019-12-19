import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import Notes from './components/Notes';
import {CSSTransition, TransitionGroup, Transition} from 'react-transition-group';
import Settings from './components/Settings';

function App() {

  const [show, setShow] = useState(true);
  const [showTodo, setShowTodo] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // setTimeout(() => setShow(true), 2500);
  

  const handleSettings = () => {
    console.log('called madar');
    if (showSettings) {
      setShowSettings(false);
      setTimeout(() => {
        setShowNotes(true);
        setShowTodo(true);
      }, 500)
      
    } else {
      setShowNotes(false);
      setShowTodo(false);
      setTimeout(() => {
        setShowSettings(true);
      }, 700)
    }
  }

  const resetSomething = (e) => {
    e.stopPropagation();
    console.log('resetSomething app js');
    let allTaskElems = document.querySelectorAll('.task-title');
    console.log('allTaskElems : ', allTaskElems);
    allTaskElems.forEach((elem, i) => {
      console.log(`${i} : `, elem);
      elem.removeAttribute('contenteditable');
    });
  }

  return (
    <div>
      {
        show ?
          <div className='container' onClick={resetSomething}>
            <div className='header'>
              <h2>
                <i>Welc<span>ome</span></i>
                {' '}MR.VAIBHAV
              </h2>
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
                  className={`custom-icon tab`} 
                  onClick={handleSettings}>
                  <span className='material-icons'>
                    settings_applications
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
            </div>
          </div>
          : 
          <div className='container' 
            style={{height: '100vh', background: '#000', padding: '0 2.5%'}}
          >
            <img
              src={require('./assets/images/loader.gif')}
              style={{width: '300px', height: '300px', alignSelf: 'center', margin: '0 auto'}}
            />
          </div>
      }
      
    </div>
  );
}

export default App;
