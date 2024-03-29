import {  useState, useEffect } from 'react';
import data from '../data.json';
import { db , auth} from "../Firebase-config"; 
import { doc, updateDoc,setDoc, getDoc, } from "firebase/firestore";

const TestLevel = () => {
    const [recognizedText, setRecognizedText] = useState('');
    const [feedback, setFeedback] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [language, setLanguage] = useState('en-US');
    const [wordCount, setWordCount] = useState(0);
    const [synthesisStatus, setSynthesisStatus] = useState('Idle');
    const [recognitionStatus, setRecognitionStatus] = useState('Idle');
    const [randomWord, setRandomWord] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [totalCorrectGuesses, setTotalCorrectGuesses] = useState(0); 

    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * data.words.length);
        setRandomWord(data.words[randomIndex]);
    }, []); 

    useEffect(() => {
        if (data && data.words && data.words.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.words.length);
            setRandomWord(data.words[randomIndex]);
        } else {
            console.error("Data is not in the expected format");
        }
    }, []); 

    recognition.onstart = () => {
        setRecognitionStatus('Listening...');
    };

    recognition.onresult = (event) => {
        const recognized = event.results[0][0].transcript;
        setRecognizedText(recognized);
        clearTimeout(feedbackTimeout);
        setFeedback('');
    };

    recognition.onend = () => {
        setRecognitionStatus('Idle');
        clearTimeout(feedbackTimeout);
        setFeedback('');
    };

    recognition.onerror = (event) => {
        setRecognitionStatus('Error');
        clearTimeout(feedbackTimeout);
        setFeedback('Error occurred during speech recognition: ' + event.error);
    };

    let feedbackTimeout;

    const startListening = () => {
        recognition.lang = language;
        recognition.start();
    };

    const stopListening = () => {
        recognition.stop();
        const userInput = recognizedText.trim().toLowerCase();
        const isCorrect = userInput === randomWord.trim().toLowerCase();
        if (isCorrect) {
            setCorrectCount(prevCount => prevCount + 1);
            setConfirmation('Correct!');
        } else {
            setIncorrectCount(prevCount => prevCount + 1);
            setConfirmation('Incorrect. Try again.');
        }
        setWordCount(prevCount => prevCount + 1); 
        
    };


    
    
    
    const saveTotalCorrectGuesses = async () => {
        console.log("Save button clicked");
        console.log("Current user:", auth.currentUser);
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const newTotalCorrectGuesses = totalCorrectGuesses + correctCount;
            console.log("New total correct guesses:", newTotalCorrectGuesses);
            
            try {
                const docRef = doc(db, "Guesses", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const currentTotalCorrectGuesses = data.totalCorrectGuesses;
                    console.log("Current total correct guesses in Firebase:", currentTotalCorrectGuesses);
                    if (currentTotalCorrectGuesses !== newTotalCorrectGuesses) {
                        await updateDoc(docRef, {
                            totalCorrectGuesses: newTotalCorrectGuesses
                        });
                        console.log("Total correct guesses updated successfully");
                        setTotalCorrectGuesses(newTotalCorrectGuesses); 
                    } else {
                        console.log("Total correct guesses in Firebase is already up to date");
                    }
                } else {
                    await setDoc(docRef, {
                        totalCorrectGuesses: newTotalCorrectGuesses
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
    };
    
    
    

    const playText = () => {
        const textToRead = randomWord.trim(); 
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = language;
        utterance.rate = parseFloat(document.getElementById('speechRate').value);
        utterance.pitch = parseFloat(document.getElementById('speechPitch').value);

        setSynthesisStatus('Playing...');
        synth.cancel(); 
        synth.speak(utterance);

        utterance.onend = () => {
            setSynthesisStatus('Idle');
            synth.cancel();
        };

        utterance.onerror = (event) => {
            setSynthesisStatus('Error');
            setFeedback('Error occurred during speech synthesis: ' + event.error);
        };
    };
    const resetGame = () => {
        setWordCount(0);
        setRecognizedText('');
        setFeedback('');
        setConfirmation('');

        const randomIndex = Math.floor(Math.random() * data.words.length);
        setRandomWord(data.words[randomIndex]);
    };
    
    return (
      <>
        <div className="container">
          <label>Random Word:</label>
          <div id="randomWord">{randomWord}</div>

          <label htmlFor="languageSelect">Select Language:</label>
          <select
            id="languageSelect"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en-US">English (US)</option>
            <option value="ru">Russian</option>
          </select>

          <button onClick={startListening}>Start Listening</button>
          <button onClick={stopListening}>Stop Listening</button>
          <button onClick={playText}>Play Text</button>
          <button onClick={resetGame}>Reset</button>
          <button onClick={saveTotalCorrectGuesses}>Save</button>

          <label htmlFor="speechRate">Speech Rate:</label>
          <input
            type="range"
            id="speechRate"
            min="0.5"
            max="2"
            step="0.1"
            defaultValue="1"
          />

          <label htmlFor="speechPitch">Speech Pitch:</label>
          <input
            type="range"
            id="speechPitch"
            min="0"
            max="2"
            step="0.1"
            defaultValue="1"
          />

          <div id="recognizedText">Recognized Text: {recognizedText}</div>
          <div id="correctCount">Correct Guesses: {correctCount}</div>
            <div id="incorrectCount">Incorrect Guesses: {incorrectCount}</div>
            <div id="confirmation" className={correctCount > 0 || incorrectCount > 0 ? (correctCount > 0 ? 'correct' : 'incorrect') : ''}>
                {confirmation}
            </div>
          <div id="feedback" style={{ color: "#ffa500" }}>
            {feedback}
          </div>
          <div id="wordCount">Word Count: {wordCount}</div>
          <div id="totalCorrectGuesses">Total Correct Guesses: {totalCorrectGuesses}</div> 
          <div id="synthesisStatus">Synthesis Status: {synthesisStatus}</div>
          <div id="recognitionStatus">
            Recognition Status: {recognitionStatus}
          </div>
        </div>
      </>
    );
}
export default TestLevel;


