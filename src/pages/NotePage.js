import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useParams, Link  } from 'react-router-dom';
// import notes from '../assets/data'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import AuthContext from '../context/AuthContext';


const NotePage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let { authTokens } = useContext(AuthContext);
  let [note, setNote] = useState({});
  // let note = notes.find(note => note.id === Number(id))

  useEffect(() => {
    getNote()
  }, [id]);

  let getNote = async () => {
        if (id === 'new') return 
        let response = await fetch(`https://django-notes-backend-f75a2q30c-domink-s-team.vercel.app/api/notes/${id}`);
        let data = await response.json();
        setNote(data);
      }

      let createNote = async () => {
        await fetch('https://django-notes-backend-f75a2q30c-domink-s-team.vercel.app/api/notes/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
          body: JSON.stringify(note),
        });
      };


  let updateNote = async () => {
     await fetch(`https://django-notes-backend-f75a2q30c-domink-s-team.vercel.app/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify(note)
     })
  };

  let deleteNote = async () => {
    await fetch(`https://django-notes-backend-f75a2q30c-domink-s-team.vercel.app/api/notes/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
     })
     navigate('/')
  }



  let handleSubmit = () => {
    if (id !== 'new' && note.body == '') {
      deleteNote()
    } else if (id !== 'new') {
        updateNote()
    } else if (id === 'new' && note.body !== null) {
        createNote()
    }
    navigate('/')
  }

  let handleChange = (value) => {
    setNote(note => ({ ...note, 'body': value }))
    console.log('Handle Change:', note)
  }

  return (
    <div className="note" >
    <div className="note-header">
        <h3>
            <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
        ) : (
            <button onClick={handleSubmit}>Done</button>
        )}

    </div>
    <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
  </div>
  );
};

export default NotePage;
