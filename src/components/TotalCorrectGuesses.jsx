import { useEffect, useState } from 'react';
import { db , auth} from "../Firebase-config"; 
import { doc, getDoc } from "firebase/firestore";

const TotalCorrectGuesses = () => {
    const [totalCorrectGuesses, setTotalCorrectGuesses] = useState(null);

    useEffect(() => {
        const fetchTotalCorrectGuesses = async () => {
            if (auth.currentUser) {
                const userId = auth.currentUser.uid;
                const docRef = doc(db, "Guesses", userId);
                
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const currentTotalCorrectGuesses = data.totalCorrectGuesses;
                        console.log("Current total correct guesses in Firebase:", currentTotalCorrectGuesses);
                        setTotalCorrectGuesses(currentTotalCorrectGuesses);
                    }
                } catch (error) {
                    console.error("Error fetching total correct guesses: ", error);
                }
            } else {
                console.warn("User is not authenticated."); 
            }
        };

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                fetchTotalCorrectGuesses(); 
            }
        });

        fetchTotalCorrectGuesses(); // Initial fetch

        return () => unsubscribe();
    }, []); // Empty dependency array to ensure the effect runs only once

    return (
        <div>
            <p>Total Correct Guesses: {totalCorrectGuesses !== null ? totalCorrectGuesses : 'Loading...'}</p>
        </div>
    );
};
export default TotalCorrectGuesses;
