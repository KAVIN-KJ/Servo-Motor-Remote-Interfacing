# 🚀 Web-Controlled Servo & Distance Monitoring with Arduino

## 📌 Project Overview
This project enables **remote control of a servo motor** and **real-time distance monitoring** using an **Arduino**, **Node.js backend**, and a **React frontend**. The system allows users to control the motor from **any device**, while continuously measuring the distance of nearby objects using an **ultrasonic sensor**.

## 🛠️ How It Works
1️⃣ **User selects a command (Turn Left, Turn Right, Reset) from the web app.**  
2️⃣ **Frontend sends the command to the Remote Server** (hosted on Render).  
3️⃣ **Remote Server stores the latest command.**  
4️⃣ **Local Server fetches the command** and sends it to the Arduino.  
5️⃣ **Arduino moves the servo** by **30° per command**.  
6️⃣ **Arduino reads distance data** from the ultrasonic sensor.  
7️⃣ **Local Server posts distance to Remote Server**.  
8️⃣ **Frontend fetches distance data** from Remote Server and displays it.

## 📁 Project Structure
```
📦 project-folder
├── frontend/        # React Web App (UI)
├── remote_server/   # Remote Node.js Server (Render-hosted API)
├── local_server/    # Local Node.js Server (Handles Serial Communication)
└── Servo_Control # Arduino Code (Servo + Ultrasonic Sensor)
```

## 🔌 Hardware Requirements
- **Arduino Uno**
- **180° Servo Motor**
- **HC-SR04 Ultrasonic Sensor**
- **USB Cable** (for Arduino connection)

## 🛠️ Setup & Installation
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/KAVIN-KJ/Servo-Motor-Remote-Interfacing.git
cd Servo-Motor-Remote-Interfacing

```

### 2️⃣ **Install Dependencies in Each Folder**
#### 🔹 Remote Server
```sh
cd RemoteServer
npm install
```
#### 🔹 Local Server
```sh
cd ../Local_server
npm install
```
#### 🔹 Frontend
```sh
cd ../Frontend
npm install
```

### 3️⃣ **Run the Servers**
#### 🖥️ Start Local Server (on your laptop)
```sh
cd Local_server
npm start
```
#### ☁️ Start Remote Server (on Render)
- Deploy the `RemoteServer` folder to [Render](https://render.com/).

#### 🌐 Start Frontend
```sh
cd Frontend
npm run dev
```

### 4️⃣ **Upload Arduino Code**
- Open `Servo_And_Ultrasonic.ino` located at `/Servo_Control/Servo_And_Ultrasonic/` in the Arduino IDE.
- Select the correct **Board & Port**.
- Upload the code.

## 📡 Accessing the Web App
Once the servers are running:
- **Frontend URL** (Netlify or Localhost)
- **API Endpoint** (Render-hosted Remote Server)

## 🔮 Future Enhancements
- **Add a Live Graph** to visualize distance changes.
- **Implement WebSockets** for instant data updates.
- **Introduce AI-based automation** (e.g., moving the servo automatically based on distance).

---

💡 This project showcases **IoT, Full-Stack Development, and Automation.**

