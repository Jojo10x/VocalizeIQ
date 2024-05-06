import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,updateProfile} from 'firebase/auth'
import { auth} from '../Firebase-config'
import styles from "./Login.module.css";

function Login() {
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resPassword, setResPassword] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');

  const [user,setUser]= useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe;
  },[])

  useEffect(() => {
    if (user) {
      navigate('/menu');
    }
  }, [user, navigate]);

  async function initializeUser(user){
    if(user){
      setUser({...user});
    } else{
      setUser(null);
    }

  }

  const handleLogin = () => {
      navigate('/menu');
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth,resEmail,resPassword);
      console.log(user)
    } catch (error) {
      console.log(error.message)

    }
  };
  const registerAndUpdateDisplayName = async () => {
    try {
      await register();
      updateDisplayName();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const login =  async () =>{
    try {
      const user = await signInWithEmailAndPassword(auth,logEmail,logPassword);
      console.log(user)
      handleLogin();
    } catch (error) {
      console.log(error.message)

    }
    
  };


  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); 
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDisplayName = async (user) => {
    try {
      await updateProfile(user, { displayName: newDisplayName });
      setNewDisplayName(''); 
    } catch (error) {
      console.error('Error updating display name:', error);
    }
  };

  const handleChange = (event) => {
    setNewDisplayName(event.target.value);
  };

  return (
    <div className={styles["login-container"]}>
      <h2 className={styles["main-title"]}>
        Hello{" "}
        <span
          className={styles["waving-hand"]}
          role="img"
          aria-label="waving hand"
        >
          👋
        </span>
      </h2>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h2 className={styles.title}>Register</h2>
          <input
            className={styles["input-field"]}
            type="text"
            value={newDisplayName}
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Email"
            value={resEmail}
            onChange={(e) => setResEmail(e.target.value)}
          />
          <input
            className={styles["input-field"]}
            type="password"
            placeholder="Password"
            value={resPassword}
            onChange={(e) => setResPassword(e.target.value)}
          />
          <button
            className={styles["action-button"]}
            onClick={registerAndUpdateDisplayName}
          >
            Register
          </button>
        </div>
        <div className={styles.form}>
          <h2 className={styles.title}>Login</h2>
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Email"
            value={logEmail}
            onChange={(e) => setLogEmail(e.target.value)}
          />
          <input
            className={styles["input-field"]}
            type="password"
            placeholder="Password"
            value={logPassword}
            onChange={(e) => setLogPassword(e.target.value)}
          />
          <button className={styles["action-button"]} onClick={login}>
            Login
          </button>
        </div>
      </div>
      {user && (
        <div className={styles.loggedInMessage}>
          <h2 className={`${styles.title} ${styles.animatedEmoji}`}>
            Welcome {user.displayName} 🎉
          </h2>
          <h3 className={styles["secondary-title"]}> {user.email}</h3>
          <button className={styles["logout-button"]} onClick={logout}>
            Logout 
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
