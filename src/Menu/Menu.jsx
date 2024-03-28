import { useNavigate } from 'react-router-dom';
// import styles from "./Menu.module.css";
import '../App.css'
import SpeechRecognitionApp from './SpeechRecognitionApp';


function Menu() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };
    const goForward = () => {
        navigate('./home');
      };
  return (
    <div className="admin-dashboard-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <button className="forward-button" onClick={goForward}>Forward</button>
      <h1>Instructions</h1>
      <SpeechRecognitionApp />


      <h1>Test Level</h1>
      <button></button>
      <h1>Practice Pronounction</h1>
      <button></button>
      <h1>Practice Speaking</h1>
      <button></button>

    </div>
  );
}

export default Menu;