const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

let lastCommand = "S"; 

app.get("/command", (req, res) => {
    res.json({ command: lastCommand });
});

app.post("/send-command", (req, res) => {
    const { command } = req.body;
    if (["L", "R", "S"].includes(command)) {
        lastCommand = command;
        res.json({ message: `Command updated to ${command}` });
    } else {
        res.status(400).json({ error: "Invalid command" });
    }
});

app.get("/latest-command", (req, res) => {
    res.json({ command: lastCommand });
});

app.listen(PORT, () => console.log(`Remote server running on port ${PORT}`));
