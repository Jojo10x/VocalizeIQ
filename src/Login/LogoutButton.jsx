import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { signOut} from 'firebase/auth'
import { auth} from '../Firebase-config'
import styles from "./Login.module.css";

const LogoutButton = ({ onClick }) => {
    const navigate = useNavigate();  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button className={styles["logout-button"]} onClick={onClick || handleLogout}>
      Logout
    </button>
  );
};

LogoutButton.propTypes = {
  onClick: PropTypes.func 
};

export default LogoutButton;


