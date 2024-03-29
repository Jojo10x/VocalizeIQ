import { useNavigate } from 'react-router-dom';
// import styles from "./Menu.module.css";
import '../App.css'
import TestLevel from './TestLevel';


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
      <h1>Hello I am the Menu</h1>
      <TestLevel />
    </div>
  );
}

export default Menu;