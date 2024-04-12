import {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db , auth} from "../Firebase-config"; 
import { doc, setDoc, getDoc ,onSnapshot} from "firebase/firestore";
import data from '../Data/tonguetwisster.json';
import '../App.css'


function Game() {
    const [recognizedText, setRecognizedText] = useState('');
    const [feedback, setFeedback] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [accent, setAccent] = useState('en-US');
    const [wordCount, setWordCount] = useState(0);
    const [synthesisStatus, setSynthesisStatus] = useState('Idle');
    const [recognitionStatus, setRecognitionStatus] = useState('Idle');
    const [randomWord, setRandomWord] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [totalCorrectGuesses, setTotalCorrectGuesses] = useState(0); 
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };


    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

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
        recognition.lang = accent;
        recognition.start();
    };

    const NextWord = ()=>{
        const randomIndex = Math.floor(Math.random() * data.words.length);
        setRandomWord(data.words[randomIndex]);
        setRecognizedText('');
        setConfirmation('');
        recognition.start();
    }

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
    const [gameData, setGameData] = useState({});

    useEffect(() => {
      const fetchGameData = async () => {
        if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const docRef = doc(db, "Game", userId);

          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setGameData(data);
            }
          } catch (error) {
            console.error("Error fetching game data: ", error);
          }

          const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              setGameData(data);
            }
          });

          return () => unsubscribe();
        }
      };

      fetchGameData();
    }, []);

    const saveTotalCorrectGuesses = async () => {
      console.log("Save button clicked");
      console.log("Current user:", auth.currentUser);

      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const currentDate = new Date().toISOString();

        try {
          const docRef = doc(db, "Game", userId);
          const docSnap = await getDoc(docRef);
          let newTotalCorrectGuesses = 0;
          let updateData = {};

          if (docSnap.exists()) {
            const data = docSnap.data();
            const lastUpdatedDate = data.lastUpdated;

            if (lastUpdatedDate === currentDate) {
              newTotalCorrectGuesses = data.totalCorrectGuesses;
            } else {
              newTotalCorrectGuesses = correctCount;
            }
            updateData = { ...data };
          } else {
            newTotalCorrectGuesses = correctCount;
          }

          updateData[currentDate] = {
            totalCorrectGuesses: correctCount,
          };
          updateData.totalCorrectGuesses = newTotalCorrectGuesses;
          updateData.lastUpdated = currentDate;

          await setDoc(docRef, updateData);

          console.log("Total correct guesses updated successfully for today");
          setTotalCorrectGuesses(newTotalCorrectGuesses);
        } catch (error) {
          console.error("Error saving total correct guesses: ", error);
        }

        setCorrectCount(0);
      }
    };

    const playText = () => {
      const textToRead = randomWord.trim();
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = accent;
      utterance.rate = parseFloat(document.getElementById("speechRate").value);
      utterance.pitch = parseFloat(
        document.getElementById("speechPitch").value
      );

      setSynthesisStatus("Playing...");
      synth.cancel();
      synth.speak(utterance);

      utterance.onend = () => {
        setSynthesisStatus("Idle");
        synth.cancel();
      };

      utterance.onerror = (event) => {
        setSynthesisStatus("Error");
        setFeedback("Error occurred during speech synthesis: " + event.error);
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
    console.log()
    
    return (
      <>
        <div className="container">
          <button className="back-button" onClick={goBack}>
            Back
          </button>
          <label>Random Word:</label>
          <div id="randomWord">{randomWord}</div>

          <label htmlFor="languageSelect">Select Language:</label>
          <select
            id="languageSelect"
            onChange={(e) => setAccent(e.target.value)}
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="en-AU">English (Australia)</option>
          </select>

          <button onClick={startListening}>Start Listening</button>
          <button onClick={stopListening}>Stop Listening</button>
          <button onClick={saveTotalCorrectGuesses}>Save</button>
          <button onClick={playText}>Play Text</button>
          <button onClick={resetGame}>Reset</button>
          <button onClick={NextWord}>Next</button>

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
          <div
            id="confirmation"
            className={
              correctCount > 0 || incorrectCount > 0
                ? correctCount > 0
                  ? "correct"
                  : "incorrect"
                : ""
            }
          >
            {confirmation}
          </div>
          <div id="feedback" style={{ color: "#ffa500" }}>
            {feedback}
          </div>
          <div id="wordCount">Word Count: {wordCount}</div>
          <div id="totalCorrectGuesses">
            Total Correct Guesses: {totalCorrectGuesses}
          </div>
          <div id="synthesisStatus">Synthesis Status: {synthesisStatus}</div>
          <div id="recognitionStatus">
            Recognition Status: {recognitionStatus}
          </div>
          <h1>History</h1>
          <div className="container">
            <p>
              Total Correct Guesses:{" "}
              <span id="total-correct-guesses">
                {gameData.totalCorrectGuesses || 0}
              </span>
            </p>
            <div id="history">
              {Object.entries(gameData).map(([date, data]) => (
                <div className="history-item" key={date}>
                    <p>Date: <span className="colorful-text">{date}</span></p>
                    <p>Total Correct Guesses: <span className="colorful-text">{data.totalCorrectGuesses}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default Game;