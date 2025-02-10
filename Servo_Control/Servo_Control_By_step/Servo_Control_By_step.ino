#include <Servo.h>

Servo myServo;
int currentAngle = 90; // Start at the middle position (90 degrees)

void setup() {
    Serial.begin(115200);
    myServo.attach(9);
    myServo.write(currentAngle); // Set initial position
}

void loop() {
    if (Serial.available()) {o
        String input = Serial.readStringUntil('\n'); // Read command from Serial
        input.trim(); // Remove any trailing newline or spaces

        if (input.equalsIgnoreCase("left")) {
            currentAngle = min(currentAngle + 30, 180); // Increase angle by 30 but not beyond 180
        } else if (input.equalsIgnoreCase("right")) {
            currentAngle = max(currentAngle - 30, 0); // Decrease angle by 30 but not below 0
        } else if (input.equalsIgnoreCase("reset")) {
            currentAngle = 90; // Reset to the middle position
        } else {
            Serial.println("Invalid command! Use 'left', 'right', or 'reset'.");
            return;
        }

        myServo.write(currentAngle); // Move servo to new position
        Serial.print("Servo moved to: ");
        Serial.println(currentAngle);
    }
}
