import { useNavigate } from "react-router-dom";
import styles from "./Instructions.module.css";
import ScrollToTopButton from "../components/ScrollToTop/ScrollToTopButton";

function Instructions() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/menu");
  };

  return (
    <div className={styles["documentation-container"]}>
      <h1>Instructions for Using the App</h1>
      <button className={styles["back-button"]} onClick={goBack}>
        Back
      </button>
      <div className={styles["function-section"]}>
      <h2>1. Start Listening</h2>
        <p>
          <strong>Description:</strong> Initiates the app&apos;s speech recognition feature, allowing it to transcribe spoken words into text.
        </p>
        <p>
          <strong>How to Use:</strong> Click on the &quot;Start Listening&quot; button to activate speech recognition. Speak clearly into the microphone to input text.
        </p>

        <h2>2. Stop Listening</h2>
        <p>
          <strong>Description:</strong> Stops the app&apos;s speech recognition feature, halting the transcription of spoken words.
        </p>
        <p>
          <strong>How to Use:</strong> Click on the &quot;Stop Listening&quot; button to deactivate speech recognition.
        </p>

        <h2>3. Play Text</h2>
        <p>
          <strong>Description:</strong> Converts the written text into speech and plays it back audibly.
        </p>
        <p>
          <strong>How to Use:</strong> Click on the &quot;Play Text&quot; button to hear the currently displayed text being spoken aloud.
        </p>

        <h2>4. Reset</h2>
        <p>
          <strong>Description:</strong> Resets the app to its default settings or clears any input data.
        </p>
        <p>
          <strong>How to Use:</strong> Click on the &quot;Reset&quot; button to revert the app to its initial state.
        </p>

        <h2>5. Save</h2>
        <p>
          <strong>Description:</strong> Saves the current progress or input data within the app.
        </p>
        <p>
          <strong>How to Use:</strong> Click on the &quot;Save&quot; button to store your current work or settings for future reference.
        </p>

        <h2>6. Next</h2>
        <p>
          <strong>Description:</strong> Navigates to the next step, page, or section within the app.
        </p>
        <p>
          <strong>How to Use:</strong> Click on the &quot;Next&quot; button to proceed forward in the app&apos;s workflow or content.
        </p>

        <h2>7. Speech Rate</h2>
        <p>
          <strong>Description:</strong> Adjusts the speed at which the app speaks the text aloud.
        </p>
        <p>
          <strong>How to Use:</strong> Utilize the &quot;Speech Rate&quot; function to increase or decrease the speaking speed according to your preference.
        </p>

        <h2>8. Speech Pitch</h2>
        <p>
          <strong>Description:</strong> Modifies the pitch or tone of the app&apos;s spoken output.
        </p>
        <p>
          <strong>How to Use:</strong> Adjust the &quot;Speech Pitch&quot; function to alter the tonal quality of the spoken text, making it higher or lower as desired.
        </p>
      </div>
      <ScrollToTopButton/>
    </div>
  );
}

export default Instructions;
