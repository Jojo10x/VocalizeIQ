import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import './App.css'
import Menu from './Menu/Menu'
import Home from './Home/Home'
import TestLevel from './Menu/TestLevel';
import Prouncition from './Menu/Pronouncition';
import Game from './Menu/Game';
import ChoiceGame from './Menu/ChoiceGame';

function App() {

  return (
    <>
 <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/test" element={<TestLevel />} />
          <Route path="/menu/prounciation" element={<Prouncition />} />
          <Route path="/menu/game" element={<Game/>} />
          <Route path="/menu/choice" element={<ChoiceGame/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
