import React, {useState, useEffect, useContext} from 'react';
import './style.css';
import UserContext from '../../context/user';
import {Observable} from 'rxjs'


const Settings = () => {

  const [firstName, setFirstName] = useState('');

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  }

  useEffect(() => {
    // startObserver();
    const userDetails = JSON.parse(localStorage.getItem('user-details'));
    if (userDetails) {
      const { firstName } = userDetails;
      setFirstName(firstName);
    }
  }, []);

  const user = useContext(UserContext);
  console.log('user : ', user);


  const saveFirstName = () => {
    user.changeName(firstName);
    console.log('fname : ', firstName);
    localStorage.setItem('user-details', JSON.stringify({firstName}));
  }

  const onFileUpload = (e) => {
    console.log('e : ', e.target.files[0]);
    let tmpPath = URL.createObjectURL(e.target.files[0]);
    console.log('tmp path  :', tmpPath);
  }
  return(
    <div className='settings-wrapper'>
      <h2>Settings</h2>
      <div className='settings-wrapper__upload-img-wrapper'>
        <label htmlFor='settings-wrapper__bg-img' className='settings-wrapper__bg-img-label'> 
          Upload Background Image 
        </label>
        <input id='settings-wrapper__bg-img' name='bg-img' type='file' onChange={onFileUpload}/>
      </div>
      <div className='settings-wrapper__first-name-wrapper'>
        <label>Enter First Name</label>
        <input
          value={firstName}
          onChange={handleFirstName}
          className='settings-wrapper__first-name'
          type='text'
        />
        <button onClick={saveFirstName} className='settings-wrapper__save'>Save</button>
      </div>
    </div>
  )
};

export default Settings;