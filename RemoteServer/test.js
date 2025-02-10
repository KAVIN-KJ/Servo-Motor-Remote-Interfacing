const SerialPort = require("serialport");
const readline = require("readline");

const ARDUINO_PORT = "COM3"; // Change this based on your setup
const ARDUINO_BAUDRATE = 115200;

const arduinoPort = new SerialPort.SerialPort({ path: "/dev/ttyUSB1", baudRate: ARDUINO_BAUDRATE });

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to send command to Arduino
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

// Infinite loop for user input
const askForCommand = () => {
  rl.question("Enter command (L=Left, R=Right, S=Stop, Q=Quit): ", (command) => {
    if (command.toUpperCase() === "Q") {
      console.log("Exiting...");
      arduinoPort.close();
      rl.close();
      process.exit(0);
    } else if (["L", "R", "S"].includes(command.toUpperCase())) {
      sendCommand(command.toUpperCase());
    } else {
      console.log("Invalid command. Please enter L, R, S, or Q.");
    }
    askForCommand(); // Repeat the loop
  });
};

// Start the loop
askForCommand();
