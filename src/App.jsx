import './App.css'
import Nav from './components/layout/nav'
import Router from './components/Router/router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <div className='overflow-x-hidden'>
     <ToastContainer />
     <Nav/>
     <Router/>
    </div>
  )
}

export default App
