import React, { Component } from 'react';
import './style.css';
import Moment from 'react-moment';
import _ from 'underscore';
import moment from 'moment';
import helper from '../../services/helper';
import ReactTooltip from 'react-tooltip';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Tags from '../Tags';
import { Observable, Subscriber } from 'rxjs';
import { MdContentCopy } from 'react-icons/md'

class Todo extends Component {
  constructor(props) {
    let todo = localStorage.getItem('todo');
    todo = (todo === null || todo === '') ? [] : JSON.parse(todo);
    console.log('todo : ', todo);
    super(props);
    this.state = {
      todo: todo,
      task: '',
      activeTab: 3,
      showTags: false,

    }
  }

  startObserver = () => {
    const observable = new Observable(subscriber => {
      subscriber.next(localStorage.getItem('todo'));
    });

    console.log('just before subscribe');
    observable.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
    console.log('just after subscribe');
  }

  componentDidMount() {
    this.startObserver();
    let scrollable = document.getElementById('scrollable');
    let scrollHeight = scrollable.scrollHeight;
    let x = 3;
    let custInterval = setInterval( () => {
      scrollable.scrollTo({behavior: 'smooth', top: scrollHeight-x});
      if(x <= 0 ) {
        clearInterval(custInterval);
      }else {
        --x;
      }
    }, 300);
    
  }

  deleteTask = (index, timestamp) => {
    let {todo} = this.state;
    console.log('to delete : ', todo[index]);
    todo[index].tasks = todo[index].tasks.filter(task => task.timestamp !== timestamp);
    this.setState({ todo });
    localStorage.setItem('todo', JSON.stringify([...todo]));
  }

  changeTaskStatus = (index, timestamp) => {
    console.log('timestamp : ', timestamp);
    let {todo} = this.state;

    console.log('task to change ', todo[index] );

    todo[index].tasks.map(task => {
      if( task.timestamp === timestamp ) {
        task.status = !task.status;
      }
    });
    this.setState({ todo });
    localStorage.setItem('todo', JSON.stringify([...todo]));
  }

  keyDown = (e) => {

    console.log('state : ', this.state);
    let key = e.nativeEvent.key;
    let task = e.target.value;
    // Manage showing tags  
    console.log('key : ', key);  
    if(key === '#') {
      this.setState({ showTags: true })
    }
    
    if(key === ' ') {
      this.setState({ showTags: false })
    }

    if(key === 'ArrowUp') {

    }
    
    // end of managing tags

    let {todo} = this.state;
    if(key === 'Enter' && task != '') {
      let id = todo.length + 1;
      let title = task;
      let status = false;
      let timestamp = Date.now();
      let date = helper.getTodayDate();

      let object = { date, tasks: [] };

      let count = 0;
      todo.map((task, index) => {
        if(task.date === date) {
          console.log('task matched : ', task);
          task.tasks.push({title, status, timestamp});
          ++count;
        } 
      })
      
      if(count === 0) {
        console.log('if');
        todo.push({ date, tasks: [{title, status, timestamp}] });
      } 

      e.target.value = '';
      localStorage.setItem('todo', JSON.stringify([...todo]));
      let scrollable = document.getElementById('scrollable');
      let scrollHeight = scrollable.scrollHeight + 200;
      this.setState({ todo }, () => { scrollable.scrollTo(0, scrollHeight); });
    }
  }

  showCustomDates = (tasks, filterBy, date) => {
    let taskDate = moment(date, 'DD/MM/YYYY');
    let currentDate = moment(helper.getTodayDate(), 'DD/MM/YYYY');
    let days = currentDate.diff(taskDate, 'days');
    let day = '';
    if(days === 0) {
      day = 'today';
    } else if (days === 1) {
      day = 'yesterday';
    } else {
      day = date;
    }
    if(filterBy === 'pending') {
      return <CSSTransition 
        unmountOnExit
        in={tasks.filter(task => task.status === false).length ? true: false} timeout={500} 
        classNames='animate'>
        <span data-tip={date} data-for='custom-dates' >
          {day}
        </span>
      </CSSTransition>
    } else if (filterBy === 'completed') {
      return <CSSTransition 
        unmountOnExit
        in={tasks.filter(task => task.status === true).length ? true: false} timeout={500} 
        classNames='animate'>
        <span data-tip={date} data-for='custom-dates' >
          {day}
        </span>
      </CSSTransition>
    } else {
      return (
        <CSSTransition 
          unmountOnExit
          in={tasks.length ? true: false} timeout={500} 
          classNames='animate'>
          <span data-tip={date} data-for='custom-dates' >
            {day}
          </span>
        </CSSTransition>
      )
    }
  }

  listTasks = (filterBy = 'all') => {
    let {todo} = this.state;
    let todos = todo;
    return (
      <div>
        <ReactTooltip id='custom-dates' getContent={() => { return }}/>
        {todos.map((todo, index) => {
          return (
            <div id={todo.date} key={todo.date}>
              <div className='show-date'>
                {this.showCustomDates(todo.tasks, filterBy, todo.date)}
              </div>
              <TransitionGroup>
                {this.filterListAndRender(todo.tasks, index, filterBy)}
              </TransitionGroup>
            </div>
          )
        })}
      </div>
    )
  }

  copyTask = (e) => {
    e.stopPropagation();
    let currentElement = e.target;
    let oldColor = currentElement.style.color;
    currentElement.style.color = '#08f';
    let parentElement = e.target.parentElement;
    let taskTitle = parentElement.querySelector('.task-title');
    let tempTextarea = document.createElement('textarea');
    tempTextarea.value = taskTitle.innerHTML;    
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    let suc = document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    helper.createSnackbar(`Copied : <b>${taskTitle.innerHTML}</b>`, 3000, '#08f');
    setTimeout(() => {
      currentElement.style.color = oldColor;
    }, 200)
  }

  editTask = (e) => {
    e.stopPropagation();
    let parentElement = e.target.parentElement;
    let editableTask = parentElement.querySelector('.task-title')
    editableTask.setAttribute('contenteditable', true);
    editableTask.focus();
  }

  filterListAndRender = (tasks, index, filterBy = 'all') => {
    let {animate} = this.state;
    if(filterBy === 'pending') {
      tasks = tasks.filter(task => task.status === false);
    } else if (filterBy === 'completed') {
      tasks = tasks.filter(task => task.status === true);
    } else {
      // nothing
    }
    return (tasks.map((task) => {
      return (
        <CSSTransition 
          key={task.timestamp} 
          timeout={500} 
          classNames='animate'>
          <div className='task' onClick={() => this.changeTaskStatus(index, task.timestamp)}>
            {task.status === false ? 
              <i className='material-icons'>check_box_outline_blank</i> 
              : 
              <i className='material-icons success-icon'>check_box</i>
            }
            <span 
              style={{textDecoration: task.status ? 'line-through': ''}}
              className='task-title'>
              {task.title}
            </span>
            <i 
              className='edit-task material-icons' 
              style={{fontSize: '20px'}} 
              onClick={this.editTask}>
                edit
            </i>
            <i 
              className='copy-task material-icons' 
              style={{fontSize: '20px'}} 
              onClick={this.copyTask}>
                content_copy
            </i>
            <i 
              onClick={() => this.deleteTask(index,task.timestamp)}
              className='delete-task material-icons'>
              cancel
            </i>
            {/* <i className='material-icons'>drag_handle</i> */}
          </div>
        </CSSTransition>
      )
    })) 
  }

  resetSomething = (e) => {
    e.stopPropagation();
    console.log('resetSomething');
    e.stopPropagation();
    console.log('resetSomething app js');
    let allTaskElems = document.querySelectorAll('.task-title');
    console.log('allTaskElems : ', allTaskElems);
    allTaskElems.forEach((elem, i) => {
      console.log(`${i} : `, elem);
      elem.removeAttribute('contenteditable');
    });
  }

  handleTaskChange = (e) => {
    let task = e.target.value;
    this.setState({ task });
  }
  
  render() {
    let {todo, task, activeTab} = this.state;
    return ( 
      <div className='todo-wrapper' onClick={this.resetSomething}>
        {/* <div className='blur-effect' ></div> */}
        <h2>TODO LIST</h2>
        <div className='tabs'>
          <div onClick={()=>{this.setState({ activeTab: 3 })}} key={3} className={activeTab===3 ? 'active':''}>
            All
          </div>
          <div onClick={()=>{this.setState({ activeTab: 1 })}} key={1} className={activeTab===1 ? 'active':''}>
            Pending
          </div>
          <div onClick={()=>{this.setState({ activeTab: 2 })}} key={2} className={activeTab===2 ? 'active':''}>
            Completed
          </div>
        </div>
        <div id='scrollable'>
          {
            activeTab === 1 ? this.listTasks('pending') : null
          }
          {
            activeTab === 2 ? this.listTasks('completed') : null
          }
          {
            activeTab === 3 ? this.listTasks() : null
          }
        </div> 
        <div className='create-task-wrapper'>
          <CSSTransition 
            unmountOnExit 
            in={this.state.showTags} 
            classNames='animate'
            timeout={500}>
            <Tags text={this.state.task}/>
          </CSSTransition>
          <input 
            onChange={this.handleTaskChange}
            onKeyDown={this.keyDown} 
            type='text' 
            placeholder='Type here...' />
        </div>
      </div>
    );
  }
}
 
export default Todo;
