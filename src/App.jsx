import './App.css'
import Nav from './components/layout/nav'
import Footer from './components/layout/Footer';
import Router from './components/Router/router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <div className='overflow-x-hidden'>
     <ToastContainer />
     <Nav/>
     <Router/>
     <Footer/>
    </div>
  )
}

export default App
