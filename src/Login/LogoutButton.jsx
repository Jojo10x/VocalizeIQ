import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { signOut} from 'firebase/auth'
import { auth} from '../Firebase-config'
import styles from "./Login.module.css";

const LogoutButton = ({ onClick }) => {

  const user = auth.currentUser;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {user && (
        <div className={styles.loggedInMessage}>
          <h2 className={`${styles.title} ${styles.animatedEmoji}`}>
            Welcome {user.displayName} 🎉
          </h2>
          <h3 className={styles["secondary-title"]}> {user.email}</h3>
          <button
            className={styles["logout-button"]}
            onClick={onClick || handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

LogoutButton.propTypes = {
  onClick: PropTypes.func 
};

export default LogoutButton;


