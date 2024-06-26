import {  useState, useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { db , auth} from "../Firebase-config"; 
import { doc, setDoc, getDoc ,onSnapshot} from "firebase/firestore";
import data from '../Data/choice.json';


function MultipleChoiceGame() {
    const [recognizedText, setRecognizedText] = useState('');
    const [feedback, setFeedback] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [accent, setAccent] = useState('en-US');
    const [wordCount, setWordCount] = useState(0);
    const [synthesisStatus, setSynthesisStatus] = useState('Idle');
    const [recognitionStatus, setRecognitionStatus] = useState('Idle');
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [totalCorrectGuesses, setTotalCorrectGuesses] = useState(0); 
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [showWord, setShowWord] = useState(false);
    const navigate = useNavigate();

    const currentSet = data[currentSetIndex];

    const currentWord = currentSet.words[0]; 

    const goBack = () => {
      navigate(-1);
    };

    const selectWord = (userInput) => {
        const word = currentWord.trim().toLowerCase(); 
        const isCorrect = userInput.trim().toLowerCase() === word; 

        if (isCorrect) {
            setCorrectCount(prevCount => prevCount + 1);
            setConfirmation('Correct!');
        } else {
            setIncorrectCount(prevCount => prevCount + 1);
            setConfirmation('Incorrect. Try again.');
        }
        setWordCount(prevCount => prevCount + 1); 
        setCurrentSetIndex(prevIndex => (prevIndex + 1) % data.length); 
    };
    const toggleWordVisibility = () => {
      setShowWord(!showWord);
    };

    const handleReset = () => {
        setCurrentSetIndex(prevIndex => (prevIndex + 1) % data.length); 
        setConfirmation('');
        setCorrectCount(0);
        setIncorrectCount(0);
        setWordCount(0);
    };



    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

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

    const NextWord = () => {
        setCurrentSetIndex(prevIndex => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * data.length);
            } while (randomIndex === prevIndex); 
            return randomIndex;
        }); 
    }
    

    const [gameData, setGameData] = useState({});

    useEffect(() => {
      const fetchGameData = async () => {
        if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const docRef = doc(db, "Choice", userId);

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
        const currentDate = new Date().toLocaleDateString();

        try {
          const docRef = doc(db, "Choice", userId);
          const docSnap = await getDoc(docRef);
          let newTotalCorrectGuesses = 0;
          let updateData = {};

          if (docSnap.exists()) {
            const data = docSnap.data();

            if (data[currentDate]) {
              newTotalCorrectGuesses = data.totalCorrectGuesses;
            } else {
              newTotalCorrectGuesses = correctCount;
            }
            updateData = { ...data };
          } else {
            newTotalCorrectGuesses = correctCount;
          }

          if (correctCount > 0) {
            updateData[currentDate] = {
              totalCorrectGuesses: correctCount,
            };

          await setDoc(docRef, updateData);

          console.log("Total correct guesses updated successfully for today");
          setTotalCorrectGuesses(newTotalCorrectGuesses);
        } } catch (error) {
          console.error("Error saving total correct guesses: ", error);
        }

        setCorrectCount(0);
      }
    };

    const playText = useCallback(() => {
        const textToRead = currentWord.trim();
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = accent;
        utterance.rate = parseFloat(document.getElementById('speechRate').value);
        utterance.pitch = parseFloat(document.getElementById('speechPitch').value);
    
        setSynthesisStatus('Playing...');
        synth.cancel();
        synth.speak(utterance);
    
        utterance.onend = () => {
          setSynthesisStatus('Idle');
          synth.cancel();
        };
    
        // utterance.onerror = (event) => {
        //   setSynthesisStatus('Error');
        //   setFeedback('Error occurred during speech synthesis: ' + event.error);
        // };
      }, [currentWord, accent]);
    
      useEffect(() => {
        if (currentWord.trim() !== '') {
          const timer = setTimeout(() => {
            playText();
          }, 1000); 
      
          return () => clearTimeout(timer); 
        }
      }, [currentWord, playText]);

    //   useEffect(() => {
    //     const fetchTotalCorrectGuesses = async () => {
    //         if (auth.currentUser) {
    //             const userId = auth.currentUser.uid;
    //             const docRef = doc(db, "Guesses", userId);
                
    //             try {
    //                 const docSnap = await getDoc(docRef);
    //                 if (docSnap.exists()) {
    //                     const data = docSnap.data();
    //                     const currentTotalCorrectGuesses = data.totalCorrectGuesses;
    //                     console.log("Current total correct guesses in Firebase:", currentTotalCorrectGuesses);
    //                     setTotalCorrectGuesses(currentTotalCorrectGuesses);
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching total correct guesses: ", error);
    //             }
    //         } else {
    //             console.warn("User is not authenticated."); 
    //         }
    //     };

    //     fetchTotalCorrectGuesses();

     
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             fetchTotalCorrectGuesses(); 
    //         }
    //     });


    //     return () => unsubscribe();
    // }, []); 

 
    console.log()


    
    return (
      <>
        <h1>Word Quest</h1>
        <div className="container">
          <button className="back-button" onClick={goBack}>
            Back
          </button>

          <div>
            <button onClick={toggleWordVisibility} className="toggleButton">
              {showWord ? "Hide" : "Show"}
            </button>
            <div
              id="randomWord"
              style={{ display: showWord ? "block" : "none" }}
            >
              {currentWord}
            </div>
          </div>

          <label htmlFor="languageSelect">Accent:</label>
          <select
            id="languageSelect"
            onChange={(e) => setAccent(e.target.value)}
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="en-AU">English (Australia)</option>
          </select>
          <button
            onClick={saveTotalCorrectGuesses}
            className="actionButton saveButton"
          >
            Save
          </button>
          <button onClick={playText} className="actionButton playButton">
            Play Text
          </button>
          <button onClick={handleReset} className="actionButton resetButton">
            Reset
          </button>
          <button onClick={NextWord} className="actionButton nextButton">
            Next
          </button>
          <p>Please choose one of the options:</p>
          <div className="buttonContainer">
            {currentSet.choice.map((option, index) => (
              <button
                key={index}
                onClick={() => selectWord(option)}
                className="wordButton"
              >
                {option}
              </button>
            ))}
          </div>
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
            <h1>{confirmation}</h1>
          </div>
          <div>
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
          </div>

          <div id="recognizedText">Recognized Text: {recognizedText}</div>
          <div id="correctCount">Correct Guesses: {correctCount}</div>
          <div id="incorrectCount">Incorrect Guesses: {incorrectCount}</div>
          <div id="feedback" style={{ color: "#ffa500" }}>
            {feedback}
          </div>
          <div id="wordCount">Word Count: {wordCount}</div>
          {/* <div id="totalCorrectGuesses">
            Total Correct Guesses: {totalCorrectGuesses}
          </div> */}
          <div id="synthesisStatus">Synthesis Status: {synthesisStatus}</div>
          <div id="recognitionStatus">
            Recognition Status: {recognitionStatus}
          </div>
          <h2>Total Correct Guesses:{totalCorrectGuesses}</h2>
          <h1>History</h1>
          <div className="container">
            <div id="history">
              {Object.entries(gameData).map(([date, data]) => {
                const formattedDate = new Date(date).toLocaleDateString();
                return (
                  <div className="history-item" key={date}>
                    <p>
                      Date:{" "}
                      <span className="colorful-text">{formattedDate}</span>
                    </p>
                    <p>
                      Total Correct Guesses:{" "}
                      <span className="colorful-text">
                        {data.totalCorrectGuesses}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
}

export default MultipleChoiceGame;