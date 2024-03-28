import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'


function Home() {
    const [recognizedText, setRecognizedText] = useState('');
    const [feedback, setFeedback] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [language, setLanguage] = useState('en-US');
    const [wordCount, setWordCount] = useState(0);
    const [synthesisStatus, setSynthesisStatus] = useState('Idle');
    const [recognitionStatus, setRecognitionStatus] = useState('Idle');

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

    const startListening = () => {
        recognition.lang = language;
        recognition.start();
    };

    const stopListening = () => {
        recognition.stop();
        const userInput = document.getElementById('textInput').value.trim().toLowerCase();
        const isCorrect = userInput === recognizedText.trim().toLowerCase();
        setConfirmation(isCorrect ? 'Correct!' : 'Incorrect. Try again.');
        setConfirmation(isCorrect ? '#4CAF50' : '#f44336');
    };

    const playText = () => {
        const textToRead = document.getElementById('textInput').value.trim();
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = language;
        utterance.rate = parseFloat(document.getElementById('speechRate').value);
        utterance.pitch = parseFloat(document.getElementById('speechPitch').value);

        setSynthesisStatus('Playing...');
        synth.cancel(); // Cancel previous speech if any
        synth.speak(utterance);

        utterance.onend = () => {
            setSynthesisStatus('Idle');
            synth.cancel(); // Cancel speech after it ends
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
    };

    const handleTextInput = (event) => {
        setWordCount(event.target.value.trim().split(/\s+/).length);
    };
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };
  return (
    <>
    <div className="admin-dashboard-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <h1>Hello I am the Home</h1>
    </div>
     <div className="container">
     <h1>Advanced Language Learning Application</h1>
     
     <label htmlFor="textInput">Enter a word or phrase:</label>
     <input type="text" id="textInput" placeholder="Type here" onChange={handleTextInput} />

     <label htmlFor="languageSelect">Select Language:</label>
     <select id="languageSelect" onChange={(e) => setLanguage(e.target.value)}>
         <option value="en-US">English (US)</option>
         <option value="ru">Russian</option>
     </select>

     <button onClick={startListening}>Start Listening</button>
     <button onClick={stopListening}>Stop Listening</button>
     <button onClick={playText}>Play Text</button>
     <button onClick={resetGame}>Reset</button>

     <label htmlFor="speechRate">Speech Rate:</label>
     <input type="range" id="speechRate" min="0.5" max="2" step="0.1" defaultValue="1" />

     <label htmlFor="speechPitch">Speech Pitch:</label>
     <input type="range" id="speechPitch" min="0" max="2" step="0.1" defaultValue="1" />

     <div id="recognizedText">Recognized Text: {recognizedText}</div>
     <div id="confirmation" >{confirmation}</div>
     <div id="feedback" style={{ color: '#ffa500' }}>{feedback}</div>
     <div id="wordCount">Word Count: {wordCount}</div>
     <div id="synthesisStatus">Synthesis Status: {synthesisStatus}</div>
     <div id="recognitionStatus">Recognition Status: {recognitionStatus}</div>
 </div>
 </>
  );
}

export default Home;