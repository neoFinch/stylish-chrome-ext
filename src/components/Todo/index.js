import React, { Component } from 'react';
import './style.css';
import Moment from 'react-moment';
import _ from 'underscore';
import moment from 'moment';
import helper from '../../services/helper';
import ReactTooltip from 'react-tooltip';

class Todo extends Component {
  constructor(props) {
    let todo = localStorage.getItem('todo');
    todo = (todo === null || todo === '') ? [] : JSON.parse(todo);
    console.log('todo : ', todo);
    super(props);
    this.state = {
      todo: todo,
      task: '',
      activeTab: 3
    }
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
    let key = e.nativeEvent.key;
    console.log('task = ', e.target.value);
    let task = e.target.value;
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

      console.log('todo list : ', todo);
      console.log(todo);
      this.setState({ todo }); 
      e.target.value = '';
      localStorage.setItem('todo', JSON.stringify([...todo]));
    }
  }

  showCustomDates = (date) => {
    let taskDate = moment(date, 'DD/MM/YYYY');
    let currentDate = moment(helper.getTodayDate(), 'DD/MM/YYYY');
    let days = currentDate.diff(taskDate, 'days');
    console.log('days: ', days);
    if(days === 0) {
      return 'today';
    } else if (days === 1) {
      return 'yesterday';
    } else {
      return date;
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
            <div key={index}>
              <div key={index} className='show-date'>
                <span data-tip={todo.date} data-for='custom-dates' >{this.showCustomDates(todo.date)}</span>
                {/* <span>{todo.date}</span> */}
              </div>
              {this.filterListAndRender(todo.tasks, index, filterBy)}
            </div>
          )
        })}
      </div>
    )
  }

  filterListAndRender = (tasks, index, filterBy = 'all') => {
    if(filterBy === 'pending') {
      tasks = tasks.filter(task => task.status === false);
    } else if (filterBy === 'completed') {
      tasks = tasks.filter(task => task.status === true);
    } else {
      // nothing
    }


      return (tasks.map((task) => {
        return (
          <div 
            id={task.timestamp}
            key={task.timestamp} 
            className='task' 
            draggable={true} 
            onDrag={this.onDragStart}>
            {task.status === false ? 
              <i className='material-icons'>check_box_outline_blank</i> 
              : 
              <i className='material-icons success-icon'>check_box</i>
            }
            <span 
              style={{textDecoration: task.status ? 'line-through': ''}}
              className='task-title' 
              onClick={() => this.changeTaskStatus(index, task.timestamp)}>
              {task.title}
            </span>
            <i 
              onClick={() => this.deleteTask(index,task.timestamp)}
              className='delete-task material-icons'>
              cancel
            </i>
            <i className='material-icons'>drag_handle</i>
          </div>
        )
      })) 
  }

  onDragStart = (e) => {
    console.log('drag X: ', e);
  } 
  
  render() {
    let {todo, task, activeTab} = this.state;
    return ( 
      <div className='todo-wrapper'>
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
        <div className='scrollable'>
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
          <input 
            onKeyDown={this.keyDown} 
            type='text' 
            placeholder='Type here...' />
        </div>
      </div>
    );
  }
}
 
export default Todo;
