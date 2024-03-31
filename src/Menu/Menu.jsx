import { useNavigate } from 'react-router-dom';
// import styles from "./Menu.module.css";
import '../App.css'


function Menu() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };
    const goForward = () => {
        navigate('./home');
      };

      const goTest = () => {
        navigate('./test');
      };
      const goPro = () => {
        navigate('./prounciation');
      };
     
  return (
    <div className="admin-dashboard-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <button className="forward-button" onClick={goForward}>Forward</button>
      <h1>Hello I am the Menu</h1>
      <button>Instructions</button>
      <button onClick={goTest}>Test</button>
      <button onClick={goPro}>Prouncition</button>
      <button></button>
    </div>
  );
}

export default Menu;