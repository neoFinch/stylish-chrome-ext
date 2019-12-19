import React from 'react';
import './style.css';

const Settings = () => {

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
    </div>
  )
};

export default Settings;