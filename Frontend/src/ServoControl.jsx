import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://arduino-interfacing.onrender.com"; // Replace with your actual Render server URL

export default function ServoControl() {
  const [status, setStatus] = useState("Waiting for command...");

  const sendCommand = async (command) => {
    try {
      const response = await axios.post(`${BASE_URL}/send-command`, { command });
      setStatus(response.data.message);
    } catch (error) {
      setStatus("Error: Unable to communicate with Arduino");
      console.error(error);
    }
  };

  return (
    <div className="">
      <h1 className="heading">Servo Motor Interfacing</h1>
      <div className="buttons">
        <button
          onClick={() => sendCommand("L")}
          className=""
        >
          Rotate Left
        </button>
        <button
          onClick={() => sendCommand("S")}
          className=""
        >
          Look Straight
        </button>
        <button
          onClick={() => sendCommand("R")}
          className=""
        >
          Rotate Right 
        </button>
      </div>
      <p className="status">{status}</p>
    </div>
  );
}
