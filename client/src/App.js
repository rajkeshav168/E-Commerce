import {Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Pagenotfound from './pages/Pagenotfound';
import  Policyy  from './pages/Policyy';
import Contactt from './pages/Contact';
import Register from './pages/Auth/Register';

  import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private.js';
import ForgotPassword from './pages/Auth/ForgottPassword.js';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<Homepage/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/forgot-password' element = {<ForgotPassword/>}/>
      <Route path='/dashboard' element = {<PrivateRoute/>}> 
      <Route path='' element = {<Dashboard/>}/>
      </Route>

      
      <Route path='/about' element = {<About/>}/>
      
      <Route path='/policy' element = {<Policyy/>}/>
      <Route path='/contact' element = {<Contactt/>}/>
      <Route path='*' element = {<Pagenotfound/>}/>


    </Routes>
    </>
  );
}

export default App;
