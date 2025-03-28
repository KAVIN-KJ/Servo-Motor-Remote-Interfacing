const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let lastCommand = "none";
let lastDistance = 0;
app.get("/latest-command", (req, res) => {
    res.json({ command: lastCommand });
    lastCommand = "none";
});

app.get('/distance',(req,res) =>{
    res.json({distance : lastDistance});
    
})



app.post("/update-distance", (req, res) => {
    const { distance } = req.body;
    if (!isNaN(distance)) {
        lastDistance = distance;
        res.json({ message: `Distance updated to ${distance} cm` });
    } else {
        res.status(400).json({ error: "Invalid distance value" });
    }
});

app.post("/send-command", (req, res) => {
    const { command } = req.body;
    if (["left", "right", "reset"].includes(command)) {
        lastCommand = command;
        res.json({ message: `Command updated to ${command}` });
    } else {
        res.status(400).json({ error: "Invalid command" });
    }
});

app.listen(PORT, () => console.log(`Remote server running on port ${PORT}`));
