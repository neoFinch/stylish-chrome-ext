import React, {useEffect, useState} from 'react';
import helper from '../../services/helper';
import './style.css';
import Calendar from 'react-calendar';

const TimeTracker = () => {

  const [numDays, setNumDays] = useState(30);
  const [today, setToday] = useState('');
  useEffect(() => {
    const date = new Date();
    setToday(date);
  }, []);

  return (
    <div className='time-tracker-container'>
      <div className='grid-wrapper'>
        <Calendar className='full-width' tileClassName='custom-tile'/>
      </div>
    </div>  
  )
};

export default TimeTracker;