import React from 'react';
import helper from '../../services/helper';
import './style.css';
import Calendar from 'react-calendar';
import moment from 'moment';

class TimeTracker extends React.Component {

  constructor(props) {

    super(props);
    const currentDate = new Date();
    console.log('current Date : ', currentDate);
    this.state = {
      showTimeLogger: 0,
      selectedDate: currentDate,
      timeLog: {}
    };
  }
 
  handleDayClick = (e) => {
    let {selectedDate, timeLog, showTimeLogger} = this.state;
    this.setState({ showTimeLogger: 1 })
    selectedDate = moment(e).format('DD/MM/YYYY');
    this.setState({ selectedDate });
    if(localStorage.getItem('time-logs') !== null) {
      timeLog = JSON.parse(localStorage.getItem('time-logs'));
      this.setState({ timeLog });
    }
  }

  closeTimeLogger = () => {
    let { timeLog } = this.state;
    localStorage.setItem('time-logs', JSON.stringify(timeLog));
    this.setState({ showTimeLogger: 0 });
  }

  logTime = (e, index) => {
    let {timeLog, selectedDate} = this.state;
    let value = e.target.value;
    let temp = timeLog === null ? {} : timeLog;
    if (temp[selectedDate] === undefined) {
      timeLog[selectedDate] = {};
      timeLog[selectedDate][index] = value;
      this.setState({timeLog});
    } else {
      timeLog[selectedDate][index] = value;
      this.setState({timeLog});
    }
  }

  renderTimeline = () => {
    let {timeLog, selectedDate} = this.state;
    const timeline = [];
    for(let i=0; i < 24; i++) {
      let time;
      if(i === 0) {
        time = `12 am - ${i+1} am`
      } 
      else if( i === 11) {
        time = `${i} am - ${i+1} pm`
      }
      else if( i === 12) {
        time = `${i} pm - ${i -12 +1} pm`
      }
      else if (i > 12 && i !== 23) {
        time = `${i-12} pm - ${i-12+1} pm`
      } 
      else if (i === 23) {
        time = `${i-12} pm - 11:59 pm`
      } 
      else {
        time = `${i} am - ${i+1} am`
      }
      timeline.push(
        <div key={selectedDate+'-'+i} className='timeline-box'>
          <div>
            { time }
          </div>
          <input 
            className='content' 
            contentEditable={true} 
            placeholder='write here...'
            onChange={(e) => this.logTime(e, i)}
            value={timeLog[selectedDate] !== undefined ?  timeLog[selectedDate][i] : ''}
          />
        </div>
      );
    }
    return timeline;
  }

  render() {
    let {showTimeLogger, selectedDate} = this.state;
    return (<div className='time-container'>
      <div className='time-tracker-container'>
        <div className='grid-wrapper'>
          <Calendar
            value={new Date()}
            onClickDay={this.handleDayClick}
            className='full-width' 
            tileClassName='custom-tile'
          />
        </div>
      </div>  
      {
        showTimeLogger ?
          <div className='time-logger'>
            <div className='action-bar'>
              <div><h2 className='title'>Time Logger ({selectedDate}) </h2></div>
              <div className='icon-wrapper'>
                <i className='material-icons' onClick={this.closeTimeLogger}>
                  cancel
                </i>
              </div>
            </div>
            <div className='timeline'>
              {this.renderTimeline()}
            </div>
          </div>
          :
          null
      }
    </div>);
  }
}

export default TimeTracker;