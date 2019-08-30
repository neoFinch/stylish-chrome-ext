import React, { Component } from 'react';
import './style.css';

class Notes extends Component {
  
  constructor(props) {
    super(props);
    let notes = localStorage.getItem('notes');
    notes = (notes === null || notes === '') ? [{id: 0, desc: 'Jot Down Things', timestamp: ''}] : JSON.parse(notes);
    console.log('sds : ', notes);
    this.state = {
      notes,
      activeNote: 0,
      showAllNotes: false
    }
  }

  saveNote = (e, index) => {
    let { notes } =  this.state;
    console.log(e.target.value);
    //  notes[index].timestamp = Date.now();
    //  notes[index].id = notes.length - 1;
     notes[index].desc = e.target.value; 
    this.setState({ notes });
    console.log('notes: ', notes);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  addNote = () => {
    let {notes} = this.state;
    let id = notes.length + 1;
    let activeNote = notes.length;
    let timestamp = Date.now();
    let note = {id, desc: 'Jot Down Things', timestamp};
    console.log('notes before push : ', notes);
    notes.push(note);
    console.log('NOTES : ', note);
    this.setState({ notes, activeNote }, () => {console.log( this.state )});
    localStorage.setItem('notes', JSON.stringify([...notes]));
  }

  changeNote = (val) => {
    let {activeNote, notes} = this.state;
    if(val === 'increase') {
      console.log('if : ', val);
      console.log('active note :', activeNote);
      activeNote = activeNote+1 < notes.length ? activeNote+1: activeNote;
      this.setState({ activeNote });
    } else {
      console.log('else : ', val);
      console.log('active note :', activeNote);
      activeNote = activeNote-1 >= 0 ? activeNote-1: activeNote;
      this.setState({ activeNote });
    }
  }

  showAllNotes = () => {
    let {showAllNotes} = this.state;
    showAllNotes = !showAllNotes;
    this.setState({ showAllNotes });
  }

  deleteNote = (index) => {
    let {notes} = this.state;
    console.log('index : ', index);
    console.log('nots: ', notes);
    notes = notes.filter((note, i) => i!==index);
    console.log('nots: ', notes);
    this.setState({notes, activeNote: 0});
    localStorage.setItem('notes', JSON.stringify([...notes]));
  }

  renderAllNotes = () => {
    let {notes} = this.state;
    return (
      <div style={{width: '100%', height: '530px', overflow: 'scroll'}}>
        {notes.map((note, index) => {
          return (
          <div key={note.timestamp} className='scaled-down-note-wrapper scaled-down'>  
            <textarea disabled={true} defaultValue={note.desc} >
            </textarea>
            <div className='select-note'>
              <span 
                className='edit-note' 
                onClick={() => this.setState({ activeNote: index, showAllNotes: false })}>
                  Edit
              </span>
              <i 
              className='material-icons delete-note'
              onClick={() => this.deleteNote(index)}>
                cancel
              </i>
            </div>
          </div>
          )
        })}
      </div>
    )
  }

  render() { 
    let {notes, activeNote, showAllNotes} = this.state;
    return ( 
    <div className='notes-wrapper'>
        <h2>
          NOTES 
          <i title='add note' onClick={this.addNote} className='add-note material-icons'>add_box</i>
        </h2>
        <div className='notes-action'>
          <div className='btn' onClick={() => this.changeNote('decrease')}>prev</div>  
          <div className='btn' onClick={() => this.changeNote('increase')}>next</div>  
          <div className='btn' onClick={this.showAllNotes} style={{color: showAllNotes ? 'greenyellow': ''}}>
            <i style={{verticalAlign: 'middle'}} className='material-icons'>view_module</i>
            show all
          </div>  
        </div>
      {
        showAllNotes ?
          this.renderAllNotes()
          :
          notes.map((note, index) => 
            <textarea 
              style={{display: activeNote === index ? 'block':'none' }}
              defaultValue={note.desc} 
              key={index} 
              onChange={(e) => this.saveNote(e, index)}>
            </textarea>
          )
          
          
      }
      
    </div> );
  }
}
 
export default Notes;