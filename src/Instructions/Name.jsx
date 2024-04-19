import { auth} from '../Firebase-config'
import { updateProfile} from 'firebase/auth'
import {  useState } from 'react';

function Name() {
    const [newDisplayName, setNewDisplayName] = useState('');

  
    const updateDisplayName = () => {
      const user = auth.currentUser;
      console.log(user)
      if (user) {
        updateProfile(user, {
          displayName: newDisplayName 
        }).then(() => {
          setNewDisplayName('');
        }).catch(error => {
          console.error('Error updating display name:', error);
        });
      }
    };
  
    const handleChange = (event) => {
      setNewDisplayName(event.target.value);
    };
  
    return (
      <>
        <div>
          <input type="text" value={newDisplayName} onChange={handleChange} />
          <button onClick={updateDisplayName}>Update Display Name</button>
        </div>
      </>
    );
  }
  
  export default Name;