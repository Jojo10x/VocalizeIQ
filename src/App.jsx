import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import './App.css'
import Menu from './Menu/Menu'
import Home from './Home/Home'

function App() {

  return (
    <>
 <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
