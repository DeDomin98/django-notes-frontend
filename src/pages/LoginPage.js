import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext';
import { Link }from 'react-router-dom'


const LoginPage = () => {
  let { loginUser } = useContext(AuthContext)

  return (
    <div>
        <div className="notes-header">
        <h2 className="notes-title">  <Link to='/'> &#9782; Notes</Link></h2>
        </div>
        <div className="auth-form">
        <form onSubmit={loginUser}>

            <h1 class="auth-header">Login</h1>
            <label>Username:</label>
            <input type="text"  name="username" />
            <label>Password:</label>
            <input type="password"  name="password" />
            <button type="submit">Login</button>
            
            <span>You don't have account? You can  <Link to='/register'>Register </Link> now!</span> 
        </form>
        </div>
    </div>
  )
}

export default LoginPage