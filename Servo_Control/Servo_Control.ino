#include <Servo.h>

Servo myServo;

void setup() {
    Serial.begin(115200);
    myServo.attach(9);
}

void loop() {
    if (Serial.available()) {
        char command = Serial.read();
        
        // Flush any remaining input in the buffer
        while (Serial.available()) Serial.read();
        
        if (command == 'L') {
            myServo.write(0);
        } else if (command == 'R') {
            myServo.write(180);
        } else if (command == 'S') {
            myServo.write(90);
        }
        
        delay(200); // Allow time for servo to settle
    }
}
