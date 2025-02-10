#include <Servo.h>

Servo myServo;
const int trigPin = 7;
const int echoPin = 6;
int currentAngle = 90; // Start at 90°

void setup() {
    Serial.begin(115200);
    myServo.attach(9);
    myServo.write(currentAngle);

    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
}

void loop() {
    // Ultrasonic Sensor Logic
    long duration;
    int distance;

    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH);
    distance = duration * 0.034 / 2; // Convert to cm

    Serial.println(distance); // Send distance over Serial

    // Servo Motor Logic
    if (Serial.available()) {
        String input = Serial.readStringUntil('\n');
        input.trim();

        if (input.equalsIgnoreCase("left")) {
            currentAngle = min(currentAngle + 30, 180); // Move left by 30° (max 180°)
        } else if (input.equalsIgnoreCase("right")) {
            currentAngle = max(currentAngle - 30, 0); // Move right by 30° (min 0°)
        } else if (input.equalsIgnoreCase("reset")) {
            currentAngle = 90; // Reset to center (90°)
        }

        myServo.write(currentAngle);
    }

    delay(500); // Reduce load on Serial communication
}
