const SerialPort = require("serialport");
const readline = require("readline");

const ARDUINO_PORT = "COM3";
const ARDUINO_BAUDRATE = 115200;

const arduinoPort = new SerialPort.SerialPort({ path: "/dev/ttyUSB0", baudRate: ARDUINO_BAUDRATE });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
    askForCommand();
  });
};

askForCommand();
