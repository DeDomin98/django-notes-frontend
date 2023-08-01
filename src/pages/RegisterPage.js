import React, { useState } from 'react';
import { Link }from 'react-router-dom'
import { useNavigate  } from'react-router-dom'

const RegistrationForm = () => {
 
    const [passwordError, setPasswordError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [userExistsError, setUserExistsError] = useState('');
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    const username = e.target.username.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    e.preventDefault();
    
    if (password.length < 8) {
        setPasswordError('Hasło musi mieć minimum 8 znaków.');
        return;
      } 
      else {
        setPasswordError('');
      }
  
    if (password !== password2) {
        setPasswordMatchError('Hasła nie są identyczne.');
        return;
      } else {
        setPasswordMatchError('');
      }


     // Sprawdzamy czy użytkownik z taką nazwą już istnieje
     fetch(`https://django-notes-backend-f75a2q30c-domink-s-team.vercel.app/api/check-username/?username=${username}`)
     .then((response) => response.json())
     .then((data) => {
       if (data.error === 'UserAlreadyExists') {
         setUserExistsError('Użytkownik z taką nazwą już istnieje.');
       } else {
         setUserExistsError('');
         // Wykonujemy żądanie fetch do backendu w celu zarejestrowania użytkownika
         fetch('https://django-notes-backend-f75a2q30c-domink-s-team.vercel.app/api/register/', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             username: username,
             password: password,
             password2: password2,
           }),
         })
           .then((response) => response.json())
           .then((data) => {
             // Obsługa odpowiedzi z backendu
             console.log(data);
           })
           .catch((error) => {
             // Obsługa błędów
             console.error('Error:', error);
           });
       }
     })
     .catch((error) => {
       // Obsługa błędów
       console.error('Error:', error);
     });
     navigate('/login')
  };

  return (
    <div>
        <div className="notes-header">
        <h2 className="notes-title">  <Link to='/'> &#9782; Notes</Link></h2>
        </div>
        <div className="auth-form">
        <form onSubmit={handleSubmit}>
            <h1 className="auth-header"> Registration</h1>

            <div>
            <label>Username:</label>
            <input
                type="text"
                name="username"
            />
            </div>
            {userExistsError && <p style={{ color: 'red' }}>{userExistsError}</p>}
            <div>
            <label>Password:</label>
            <input
                type="password"
                name="password"

            />
            </div>
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            <div>
            <label>Repeat password:</label>
            <input
                type="password"
                name="password2"

            />
            </div>
            {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}
            <button type="submit">Register</button>
            <span>You have already account?  <Link to='/login'>Log in here </Link></span> 

        </form>
        </div>
    </div>
  );
};

export default RegistrationForm;
