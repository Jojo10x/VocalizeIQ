import { useNavigate } from 'react-router-dom';
import { auth} from '../Firebase-config'
import { updateProfile} from 'firebase/auth'
import { useEffect, useState } from 'react';

function Setttings() {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [newDisplayName, setNewDisplayName] = useState('');
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setDisplayName(user.displayName || '');
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const updateDisplayName = () => {
      const user = auth.currentUser;
      console.log(user)
      if (user) {
        updateProfile(user, {
          displayName: newDisplayName 
        }).then(() => {
          setDisplayName(newDisplayName);
          setNewDisplayName('');
        }).catch(error => {
          console.error('Error updating display name:', error);
        });
      }
    };
  
    const handleChange = (event) => {
      setNewDisplayName(event.target.value);
    };
  
    const goBack = () => {
      navigate('/menu');
    };
  
    return (
      <>
      <h1>Settings</h1>
        <button className="back-button" onClick={goBack}>
          Back
        </button>
        <div>
          <p>Current Display Name: {displayName}</p>
          <input type="text" value={newDisplayName} onChange={handleChange} />
          <button onClick={updateDisplayName}>Update Display Name</button>
        </div>
      </>
    );
  }
  
  export default Setttings;