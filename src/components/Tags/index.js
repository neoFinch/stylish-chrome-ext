import React, { useState } from 'react';
import './style.css';

function Tags({ text }) {
  console.log('text : ', text);
  const [tags, setTags] = useState(['Priority 1', 'Priority 2']);

  return (
    <div className='tags-wrapper'>
      {
        tags.map((tag, index) => <div className='tag' key={index}>{tag}</div>)
      }
    </div>
  )
}

export default Tags;