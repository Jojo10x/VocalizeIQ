import { useNavigate } from 'react-router-dom';
import { auth} from '../Firebase-config'
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
      const goGame = () => {
        navigate('./game');
      };
      const goChoice = () => {
        navigate('./choice');
      };
      const goInstructions = () => {
        navigate('./instructions');
      };
      const goSettings = () => {
        navigate('./settings');
      };
      const user = auth.currentUser;
     
     
  return (
    <div className="admin-dashboard-container">
      <h2 className="">Hello {user.displayName}</h2>
      <button className="back-button" onClick={goBack}>
        Back
      </button>
      <button className="forward-button" onClick={goForward}>
        Forward
      </button>
      <h1>Hello I am the Menu</h1>
      <button onClick={goInstructions}>Instructions</button>
      <button onClick={goTest}>Test</button>
      <button onClick={goPro}>Prouncition</button>
      <button onClick={goGame}>Game</button>
      <button onClick={goChoice}>Choice</button>
      <button onClick={goSettings}>Settings</button>
    </div>
  );
}

export default Menu;