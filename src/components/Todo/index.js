import React, { Component } from 'react';
import './style.css';
import Moment from 'react-moment';
import _ from 'underscore';
import moment from 'moment';
import helper from '../../services/helper';

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

  deleteTask = (id) => {
    let {todo} = this.state;
    todo = todo.filter(task => task.id !== id);
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

  listTasks = (filterBy = 'all') => {
    let {todo} = this.state;
    let todos = todo;
    return (
      <div>
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <div key={index} className='show-date'>
                <span>{todo.date}</span>
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

    if(tasks.length) {
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
              onClick={() => this.deleteTask(task.timestamp)}
              className='delete-task material-icons'>
              cancel
            </i>
            <i className='material-icons'>drag_handle</i>
          </div>
        )
      })) 
    } else {
      return null;
    }
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
