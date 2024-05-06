import { useNavigate } from "react-router-dom";
// import { auth } from "../Firebase-config";
import "../App.css";
import styles from './Menu.module.css'
import Motivation from "../Motivation/Motivation";
import SettingsSVG from '../assets/settings.svg'
import RouteSVG from '../assets/route.svg'
import GameSVG from '../assets/game.svg'
import VoiceSVG from '../assets/voice.svg'
import InstructionsSVG from '../assets/instructions.svg'
import LogoutButton from "../Login/LogoutButton";

function Menu() {
  const navigate = useNavigate();
  // const user = auth.currentUser;

  // const goBack = () => {
  //   navigate(-1);
  // };
  // const goForward = () => {
  //   navigate("./home");
  // };

  const goTest = () => {
    navigate("./test");
  };
  const goPro = () => {
    navigate("./prounciation");
  };
  const goGame = () => {
    navigate("./game");
  };
  const goChoice = () => {
    navigate("./choice");
  };
  const goInstructions = () => {
    navigate("./instructions");
  };
  const goSettings = () => {
    navigate("./settings");
  };

  return (
    <>
      <div className={styles["admin-dashboard-container"]}>
        {/* {user && <h2 className="">Hello {user.displayName}</h2>} */}
        <Motivation />
        <div className={styles["btn-container"]}>
        <button  className={styles["flexed-button"]} onClick={goInstructions}>
        <img  src={InstructionsSVG} alt="" />
          Instructions
        </button>
        <button  className={styles["flexed-button"]}onClick={goTest}>
        <img src={RouteSVG} alt="" />
          Test
        </button>
        <button  className={styles["flexed-button"]} onClick={goPro}>
        <img className={styles["bounce-animation"]} src={VoiceSVG} alt="" />
          Pronouncition
        </button>
        <button  className={styles["flexed-button"]} onClick={goGame}>
        <img className={styles["bounce-rotate-animation"]} src={GameSVG} alt="" />
          Word Wobble
        </button>
        <button  className={styles["flexed-button"]} onClick={goChoice}>
        <img className={styles["bounce-rotate-animation"]} src={GameSVG} alt="" />
          Word Quest
        </button>
        <button className={styles["flexed-button"]} onClick={goSettings}>
          <img className={styles["spin-animation"]} src={SettingsSVG} alt="" />
          Settings
        </button>
        </div>
      </div>
      <div>
        {/* <button
          className={`${styles["menu-button"]} ${styles["back-button"]}`}
          onClick={goBack}
        >
          Back
        </button>
        <button
          className={`${styles["menu-button"]} ${styles["forward-button"]}`}
          onClick={goForward}
        >
          Forward
        </button> */}
        <LogoutButton/>
      </div>
    </>
  );
}

export default Menu;
