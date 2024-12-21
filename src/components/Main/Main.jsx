import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Main() {
  const {
    onSent,
    recentPromt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [isRecording, setIsRecording] = useState(false); // State for mic recording
  const [fileName, setFileName] = useState(""); // State for file name display

  // Handle voice input
  const handleVoiceInput = () => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = (event) => alert(`Error: ${event.error}`);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prevInput) => (prevInput ? `${prevInput} ${transcript}` : transcript));
    };

    recognition.start();
  };

  // Handle file selection
  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // Add logic to process the file here
      console.log("Selected File:", file);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : !showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Muhammad</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {[
                {
                  text: "Suggest beautiful places to see on an upcoming road trip",
                  icon: assets.compass_icon,
                },
                {
                  text: "Briefly summarize this concept: urban planning.",
                  icon: assets.bulb_icon,
                },
                {
                  text: "Brainstorm team bonding activities for our work retreat.",
                  icon: assets.message_icon,
                },
                {
                  text: "Improve the readability of the following code.",
                  icon: assets.code_icon,
                },
              ].map((card, index) => (
                <div className="card" key={index}>
                  <p>{card.text}</p>
                  <img src={card.icon} alt="Card Icon" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPromt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            </div>
          </div>
        )}
      </div>

      <div className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
          />
          <div className="icons">
            <label htmlFor="file-input">
              <img src={assets.gallery_icon} alt="Gallery Icon" />
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
            <img
              src={assets.mic_icon}
              alt="Mic Icon"
              onClick={handleVoiceInput}
              className={isRecording ? "recording" : ""}
            />
            {input ? (
              <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt="Send Icon"
              />
            ) : null}
          </div>
          {fileName && <p className="file-name">Selected File: {fileName}</p>}
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so
          double-check its responses.
        </p>
      </div>
    </div>
  );
}

export default Main;
