import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const BASE_URL = "https://arduino-interfacing.onrender.com";
export default function ServoControl() {
  const [status, setStatus] = useState("Waiting for command...");
  const [distance, setDistance] = useState(0);

  const sendCommand = async (command) => {
    try {
      const response = await axios.post(`${BASE_URL}/send-command`, { command });
      setStatus(response.data.message);
    } catch (error) {
      setStatus("Error: Unable to communicate with Arduino");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/distance`);
        setDistance(response.data.distance);
      } catch (error) {
        console.error("Error fetching distance:", error);
      }
    };

    const interval = setInterval(fetchDistance, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heading">
      <h1 className="">Arduino Servo Motor Control</h1>
      <div className="buttons">
        <button onClick={() => sendCommand("left")} className="">{"<"}</button>
        <button onClick={() => sendCommand("reset")} className="">{"^"}</button>
        <button onClick={() => sendCommand("right")} className="">{">"}</button>
      </div>
      <p className="status">{status}</p>
      <p className="status">Object detected at Distance : {distance}</p>
    </div>
  );
}
