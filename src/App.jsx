import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const iframeRef = useRef(null);
  const [messageFromIframe, setMessageFromIframe] = useState("");

  // Function to send message to the iframe
  const sendMessageToIframe = () => {
    const message = document.getElementById("parentMessageInput").value;
    iframeRef.current.contentWindow.postMessage(message, "*");
  };

  // Function to handle messages received from iframe
  const handleMessageFromIframe = (event) => {
    console.log("Message from iframe:", event.data);
    // Display the message received from iframe
    setMessageFromIframe(JSON.stringify(event.data));
  };

  // Add event listener to handle messages from iframe
  window.addEventListener("message", handleMessageFromIframe);

  return (
    <div>
      <h2>Parent Component</h2>
      <input type="text" id="parentMessageInput" placeholder="Enter message" />
      <button onClick={sendMessageToIframe}>Send Message to Iframe</button>
      <p>Message from iframe:{messageFromIframe}</p>
      <iframe
        ref={iframeRef}
        title="Child Iframe"
        src="iframe.html"
        style={{ width: "100%", height: "200px", border: "1px solid #ccc" }}
      />
    </div>
  );
}

export default App;
