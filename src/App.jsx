import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import './App.css'
import Menu from './Menu/Menu'
import Home from './Home/Home'
import TestLevel from './TestLevel/TestLevel';
import Prouncition from './Pronounciation/Pronouncition';
import Game from './Games/TongueTwisterGame';
import MultipleChoiceGame from './Games/MultipleChoiceGame';
import Instructions from './Instructions/Instructions';

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
          <Route path="/menu/choice" element={<MultipleChoiceGame/>} />
          <Route path="/menu/instructions" element={<Instructions/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
