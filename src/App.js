import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import RegistrationForm from './pages/RegisterPage'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext';

function App() {

   
  return (
    <Router>

        <AuthProvider>
       
        <div className="container dark">
          <div className="app">
            {/* <Header /> */}
            <Routes>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<NotesListPage/>}/>
              </Route>
              <Route path="/note/:id"  element={<NotePage />} /> 
              <Route path="/login/" element={<LoginPage />} /> 
              <Route path="/register/" element={<RegistrationForm />} /> 
            </Routes>
            </div>
        </div>
        </AuthProvider>
    </Router>
  );
}

export default App;
