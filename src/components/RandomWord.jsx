import  { useState, useEffect } from 'react';
import { db , auth} from "../Firebase-config"; 
import { doc, getDoc } from "firebase/firestore";
import levelData from '../Data/level.json'
import PropTypes from 'prop-types';

const RandomWord = ({ triggerUpdate, onRandomWordChange }) => {
    const [randomWord, setRandomWord] = useState(null);

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
                        // Select random word based on level
                        if (levelFromDB && levelFromDB in levelData) {
                            const words = levelData[levelFromDB];
                            const randomIndex = Math.floor(Math.random() * words.length);
                            const word = words[randomIndex];
                            setRandomWord(word);
                            // Pass random word to parent component
                            onRandomWordChange(word);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching level: ", error);
                }
            } else {
                console.warn("User is not authenticated."); 
            }
        };

        // Fetch new word whenever triggerUpdate changes
        fetchLevel();

    }, [triggerUpdate]); // Listen for changes in triggerUpdate

    return (
        <div>
            <p>Random Word: {randomWord !== null ? randomWord : 'Loading...'}</p>
        </div>
    );
};

RandomWord.propTypes = {
    triggerUpdate: PropTypes.bool.isRequired,
    onRandomWordChange: PropTypes.func.isRequired,
};


export default RandomWord;


