import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import ChangePassword from './components/forgot/ChangePassword';
import ApplicationPage from './components/Application/ApplicationPage';
import UserHome from './components/userHome/UserHome';
import ApplicationDetail from './components/Application/ApplicationDetail';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/forgot' element={<ChangePassword/>}/>
        <Route path='/home' element={<UserHome/>}/>
        <Route path='/application' element={<ApplicationPage/>}/>
        <Route path='/applicationDetail/:tinNumber' element={<ApplicationDetail/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
