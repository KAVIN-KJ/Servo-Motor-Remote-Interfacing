const express = require("express");
const axios = require("axios");
const SerialPort = require("serialport");
const cors = require("cors");

const app = express();
const PORT = 5000;
const REMOTE_SERVER_URL = "https://arduino-interfacing.onrender.com";
const ARDUINO_PORT = "/dev/ttyUSB0";
const BAUD_RATE = 115200;

app.use(cors());
app.use(express.json());

const arduinoPort = new SerialPort.SerialPort({ path: ARDUINO_PORT, baudRate: BAUD_RATE });

const sendCommandToArduino = (command) => {
    if (!arduinoPort || !arduinoPort.isOpen) {
        console.error("Serial port is not open. Cannot send command.");
        return;
    }
    arduinoPort.write(command, (err) => {
        if (err) {
            console.error("Error sending to Arduino:", err);
        } else {
            console.log(`Command sent to Arduino: ${command}`);
        }
    });
};

const pollRemoteServer = async () => {
    try {
        const response = await axios.get(`${REMOTE_SERVER_URL}/latest-command`);
        const command = response.data.command;
        if (command) {
            console.log(command)
            sendCommandToArduino(command);
        }
    } catch (error) {
        console.error("Error fetching command from remote server:", error);
    }
};

setInterval(pollRemoteServer, 1000);

app.listen(PORT, () => console.log(`🚀 Local server running on http://localhost:${PORT}`));
