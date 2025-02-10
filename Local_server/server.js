const express = require("express");
const axios = require("axios");
const SerialPort = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const cors = require("cors");
// sudo chmod 666 /dev/ttyUSB0
const app = express();
const PORT = 5000; 
const REMOTE_SERVER_URL = "https://arduino-interfacing.onrender.com"; 
const ARDUINO_PORT = "/dev/ttyUSB0";
const BAUD_RATE = 115200;

app.use(cors()); 
app.use(express.json());

const arduinoPort = new SerialPort.SerialPort({ path: ARDUINO_PORT, baudRate: BAUD_RATE });
const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on('data',async (data) => {
    const distance = parseInt(data.trim(), 10);
    if (!isNaN(distance)) {
        lastDistance = distance;
        console.log(`Distance: ${lastDistance} cm`);
        try {
            await axios.post(`${REMOTE_SERVER_URL}/update-distance`, { distance });
            console.log("Distance posted to remote server : "+distance);
        } catch (error) {
            console.error("Error posting distance to remote server:", error.message);
        }
    }
});

const pollRemoteServer = async () => {
    try {
        const response = await axios.get(`${REMOTE_SERVER_URL}/latest-command`);
        const command = response.data.command;
        if (command) {
            arduinoPort.write(command + "\n");
            console.log(`Sent command: ${command}`);
        }
    } catch (error) {
        console.error("Error fetching command from remote server:", error);
    }
};



setInterval(pollRemoteServer, 1000); // Poll every second

app.listen(PORT, () => console.log(`Local server running on http://localhost:${PORT}`));
