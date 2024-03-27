import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth} from '../Firebase-config'
import styles from "./Login.module.css";

function Login() {
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resPassword, setResPassword] = useState('');

  const [user,setUser]= useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe;
  },[])

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

  const login =  async () =>{
    try {
      const user = await signInWithEmailAndPassword(auth,logEmail,logPassword);
      console.log(user)
      handleLogin();
    } catch (error) {
      console.log(error.message)

    }
    
  };

  const logout =  async ()=>{
    
    await signOut(auth);
    
  };

  return (
    <div className={styles["login-container"]}>
      <h2 className={styles.title}>Register</h2>

      <input
        className={styles["input-field"]}
        type="text"
        placeholder="Username"
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

      <button className={styles["action-button"]} onClick={register}>
        Register
      </button>

      <h2 className={styles.title}>Login</h2>
      <input
        className={styles["input-field"]}
        type="text"
        placeholder="Username"
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
      <h2 className={styles.title}>User Logged In: {user?.email}</h2>

      <button className={styles["logout-button"]} onClick={logout}>
        LogOut
      </button>
    </div>
  );
}

export default Login;
