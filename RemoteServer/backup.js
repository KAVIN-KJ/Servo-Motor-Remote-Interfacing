const express = require("express");
const SerialPort = require("serialport");
const cors = require("cors");

const app = express();
const PORT = 5000; 

app.use(cors()); 
app.use(express.json());


const arduinoPort = new SerialPort.SerialPort({ path: "/dev/ttyUSB1", baudRate: 115200 });
const sendCommand = (command) => {
    arduinoPort.write(command, (err) => {
      if (err) {
        console.error("Error sending to Arduino:", err);
      } else {
        console.log(`Command sent: ${command}`);
        setTimeout(() => {}, 100);
      }
    });
  };


app.get("/rotate-left", (req, res) => {
    sendCommand("L");
    res.send("Rotating Left");
});

app.get("/rotate-right", (req, res) => {
    sendCommand("R");
    res.send("Rotating Right");
});

app.get("/stop", (req, res) => {
    sendCommand("S");
    res.send("Stopped");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
