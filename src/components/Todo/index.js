import React, { Component } from 'react';
import './style.css';

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


  addTask = (e) => {
    let task = e.target.value;
    this.setState({ task });
  }

  deleteTask = (id) => {
    let {todo} = this.state;
    todo = todo.filter(task => task.id !== id);
    this.setState({ todo });
    localStorage.setItem('todo', JSON.stringify([...todo]));
  }

  changeTaskStatus = (timestamp) => {
    console.log('timestamp : ', timestamp);
    let {todo} = this.state;
    todo = todo.map(task => {
      if( task.timestamp === timestamp ) {
        task.status = !task.status;
      }
      return task;
    });
    // console.log(todo[id-1]);
    // todo[id-1].status = !todo[id-1].status;
    // console.log(todo[id-1].status);
    this.setState({ todo });
    localStorage.setItem('todo', JSON.stringify([...todo]));
  }

  keyDown = (e) => {
    let key = e.nativeEvent.key;
    if(key === 'Enter') {
      let {todo, task} = this.state;
      let id = todo.length + 1;
      let title = task;
      let status = false;
      let timestamp = new Date().toUTCString();
      console.log('todo list : ', todo);
      todo.push({ id, title, status, timestamp });
      console.log(todo);
      this.setState({ todo, task: '' }); 
      localStorage.setItem('todo', JSON.stringify([...todo]));
    }
  }

  pendingTasks = () => {
    let {todo} = this.state;
    let pendingTasks = todo.filter(task => task.status === false);

    return (
      <div>
        {pendingTasks.map((task, index) => {
          return (
            <div key={index} className='task'>
            {task.status === false ? 
              <i className='material-icons'>check_box_outline_blank</i> 
              : 
              <span className='task-status-icon success-icon'>check_box</span>
            }
            <span 
              className='task-title' 
              onClick={() => this.changeTaskStatus(task.timestamp)}>
              {task.title}
            </span>
            {/* <span style={{width: '10%', background: 'yellow'}} >{task.timestamp}</span> */}
            <i 
              onClick={() => this.deleteTask(task.id)}
              className='delete-task material-icons'
            >
              cancel
            </i>
          </div>
          )
        })}
      </div>
    )
  }

  completedTasks = () => {
    let {todo} = this.state;
    let pendingTasks = todo.filter(task => task.status === true);

    return (
      <div>
        {pendingTasks.map((task, index) => {
          return (
            <div key={index} className='task'>
            {task.status === false ? 
              <i className='material-icons'>check_box_outline_blank</i> 
              : 
              <i className='material-icons success-icon'>check_box</i>
            }
            <span 
              className='task-title' 
              onClick={() => this.changeTaskStatus(task.timestamp)}>
              {task.title}
            </span>
            {/* <span style={{width: '10%', background: 'yellow'}} >{task.timestamp}</span> */}
            <i 
              onClick={() => this.deleteTask(task.id)}
              className='delete-task material-icons'
            >
              cancel
            </i>
            
          </div>
          )
        })}
      </div>
    )
  }
  

  allTasks = () => {
    let {todo} = this.state;
    // let pendingTasks = todo.filter(task => task.status === true);

    return (
      <div>
        {todo.map((task, index) => {
          return (
            <div 
              key={index} 
              className='task' 
              draggable={true} 
              onDrag={this.onDragStart}
            >
            {task.status === false ? 
              <i className='material-icons'>check_box_outline_blank</i> 
              : 
              <i className='material-icons success-icon'>check_box</i>
            }
            <span 
              className='task-title' 
              onClick={() => this.changeTaskStatus(task.timestamp)}>
              {task.title}
            </span>
            {/* <span style={{width: '10%', background: 'yellow'}} >{task.timestamp}</span> */}
            <i 
              onClick={() => this.deleteTask(task.id)}
              className='delete-task material-icons'
            >
              cancel
            </i>
            <i className='material-icons'>drag_handle</i>
          </div>
          )
        })}
      </div>
    )
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
            activeTab === 1 ? this.pendingTasks() : null
          }
          {
            activeTab === 2 ? this.completedTasks() : null
          }
          {
            activeTab === 3 ? this.allTasks() : null
          }
        </div> 
        <div className='create-task-wrapper'>
          <input 
            onKeyDown={this.keyDown} 
            onChange={this.addTask} 
            value={task} 
            type='text' 
            placeholder='Type here...' />
        </div>
      </div>
    );
  }
}
 
export default Todo;

// function Todo(params) {
//   const []
// }