const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Render assigns a dynamic port

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Allow JSON payloads

let lastCommand = "S"; // Default to "Stop"

// Endpoint to get the latest command
app.get("/command", (req, res) => {
    res.json({ command: lastCommand });
});

// Endpoint to update the command
app.post("/send-command", (req, res) => {
    const { command } = req.body;
    if (["L", "R", "S"].includes(command)) {
        lastCommand = command;
        res.json({ message: `Command updated to ${command}` });
    } else {
        res.status(400).json({ error: "Invalid command" });
    }
});

// Endpoint for local server to retrieve the latest command
app.get("/latest-command", (req, res) => {
    res.json({ command: lastCommand });
});

// Start the server
app.listen(PORT, () => console.log(`Remote server running on port ${PORT}`));
