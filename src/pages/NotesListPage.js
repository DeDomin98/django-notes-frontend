import React, { useState, useEffect, useContext } from 'react'
// import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'



const NotesListPage = () => {
  
  let [notes, setNotes] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)
  let [user, setUser] = useState(null);

  useEffect(()=> {
    getNotes()
  }, [])

  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async () => {
    let response = await fetch('https://django-notes-backend-f75a2q30c-domink-s-team.vercel.app/api/notes/',{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
      }
    })

    let data = await response.json()
    setNotes(data)
    console.log(data)
  }
  const handleAddNote = async () => {
    const newNote = { body: '', user: authTokens.userId};
    const response = await fetch('https://django-notes-backend-f75a2q30c-domink-s-team.vercel.app/api/notes/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify(newNote),
    });
    const data = await response.json();
    setNotes([...notes, data]);
  };


  return (
    <div className="notes">
    <div className="notes-header">
      <h2 h2 className="notes-title">  <Link to='/'> &#9782; Notes</Link></h2>
      <h3 onClick={logoutUser}> Logout </h3>
    </div>
    <p className="notes-count">Notes count: {notes.length}</p>

    <div className="notes-list App-header">
      {notes.map((note) => (
        <ListItem key={note.id} note={note} />
      ))}
    </div>
    <AddButton onClick={handleAddNote} />
  </div>
  )
}

export default NotesListPage