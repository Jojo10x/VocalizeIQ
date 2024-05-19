import { db , auth} from "../Firebase-config"; 
import { doc, updateDoc,setDoc, getDoc } from "firebase/firestore";

export default async function SaveGuesses (totalCorrectGuesses, correctCount, setTotalCorrectGuesses, setCorrectCount) {
    console.log("Save button clicked");
    console.log("Current user:", auth.currentUser);

    if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const newTotalCorrectGuesses = totalCorrectGuesses + correctCount;
        console.log("New total correct guesses:", newTotalCorrectGuesses);
        
        let level;
        if (newTotalCorrectGuesses >= 0 && newTotalCorrectGuesses <= 5) {
            level = "beginner";
        } else if (newTotalCorrectGuesses >= 6 && newTotalCorrectGuesses <= 9) {
            level = "pre-intermediate";
        } else if (newTotalCorrectGuesses >= 10 && newTotalCorrectGuesses <= 14) {
            level = "intermediate";
        } else if (newTotalCorrectGuesses >= 15 && newTotalCorrectGuesses <= 18) {
            level = "upper intermediate";
        } else if (newTotalCorrectGuesses >= 19 && newTotalCorrectGuesses <= 22) {
            level = "advanced";
        } else if (newTotalCorrectGuesses >= 23) {
            level = "proficient";
        } else {
            level = "unknown";
        }

        console.log("Level:", level);
        
        try {
            const docRef = doc(db, "Guesses", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const currentTotalCorrectGuesses = data.totalCorrectGuesses;
                console.log("Current total correct guesses in Firebase:", currentTotalCorrectGuesses);
                if (currentTotalCorrectGuesses <= newTotalCorrectGuesses) {
                    await updateDoc(docRef, {
                        totalCorrectGuesses: newTotalCorrectGuesses,
                        level: level 
                    });
                    console.log("Total correct guesses updated successfully");
                    setTotalCorrectGuesses(newTotalCorrectGuesses);

                } else {
                    console.log("Total correct guesses in Firebase is already up to date");
                }
            } else {
                await setDoc(docRef, {
                    totalCorrectGuesses: newTotalCorrectGuesses,
                    level: level 
                });
                console.log("Document added with ID: ", docRef.id);
                console.log("Total correct guesses added successfully");
                setTotalCorrectGuesses(newTotalCorrectGuesses);
            }
        } catch (error) {
            console.error("Error saving total correct guesses: ", error);
        }

        // Optionally reset correctCount after saving
        setCorrectCount(0);
    }
}