import { useEffect, useState } from 'react';
import { db , auth} from "../Firebase-config"; 
import { doc, getDoc } from "firebase/firestore";

const ShowLevel = () => {
    const [level, setLevel] = useState(null);

    useEffect(() => {
        const fetchLevel = async () => {
            if (auth.currentUser) {
                const userId = auth.currentUser.uid;
                const docRef = doc(db, "Guesses", userId);
                
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const levelFromDB = data.level;
                        console.log("Level from Firebase:", levelFromDB);
                        setLevel(levelFromDB);
                    }
                } catch (error) {
                    console.error("Error fetching level: ", error);
                }
            } else {
                console.warn("User is not authenticated."); 
            }
        };

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                fetchLevel(); 
            }
        });

        fetchLevel(); // Initial fetch

        return () => unsubscribe();
    }, []); 

    return (
        <div>
            <p>Level: {level !== null ? level : 'Loading...'}</p>
        </div>
    );
};

export default ShowLevel;
