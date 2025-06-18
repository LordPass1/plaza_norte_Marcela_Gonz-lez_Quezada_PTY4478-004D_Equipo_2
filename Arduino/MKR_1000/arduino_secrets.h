void setup() {
  Serial.begin(115200);
  while(!Serial);
  pinMode(A0, INPUT);
  Serial.println("Test CSM v1.2");
}

void loop() {
  int raw = analogRead(A0);
  Serial.print("Raw A0 = ");
  Serial.println(raw);
  delay(500);
}