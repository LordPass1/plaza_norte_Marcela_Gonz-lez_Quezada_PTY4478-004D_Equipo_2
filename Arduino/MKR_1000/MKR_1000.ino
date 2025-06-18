#include <SPI.h>
#include <WiFi101.h>
#include <Firebase_ESP_Client.h>
#include <addons/RTDBHelper.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h>

// —========= Configuration =========—
// Wi-Fi credentials
static const char* SSID     = "Pompis";
static const char* PASS     = "1010101010";
// Firebase
#define API_KEY       "AIzaSyCWZN6XVLFtP7EtkJZs34dtMTdwUz-3kZE"
#define DB_URL        "gardensync-4174d-default-rtdb.firebaseio.com"
#define DB_SECRET     "U8nr6HQEHG5vVNd58nhvlpIGt9zbGZb00UjdbM5J"

// Pin definitions
constexpr uint8_t LED_CONNECTING = 0;
constexpr uint8_t LED_CONNECTED  = 2;
constexpr uint8_t LED_FAIL       = 3;
constexpr uint8_t DHT_PIN        = 4;     // digital
constexpr uint8_t SOIL_PIN       = A0;    // analog
constexpr uint8_t LIGHT_PIN      = A1;    // analog I/O for optional LDR

// DHT11
#define DHTTYPE DHT11
DHT dht(DHT_PIN, DHTTYPE);

// Soil Moisture CSM v1.2 calibration
constexpr int SOIL_DRY_RAW   = 720;  // in air
constexpr int SOIL_WET_RAW   = 340;  // in water

// TSL2561
Adafruit_TSL2561_Unified tsl(TSL2561_ADDR_FLOAT, 12345);

// Firebase objects
FirebaseAuth   auth;
FirebaseConfig config;
FirebaseData   fbdo;

// State
static String ip_key;
static IPAddress ip;  // temporary storage for IPAddress
static uint32_t last_update = 0;
static constexpr uint32_t UPDATE_INTERVAL = 6000; // ms

// —========= Helper Functions =========—
void blinkLed(uint8_t pin, uint16_t times, uint16_t delayMs) {
  for (uint16_t i = 0; i < times; i++) {
    digitalWrite(pin, HIGH);
    delay(delayMs);
    digitalWrite(pin, LOW);
    delay(delayMs);
  }
}

void initLedPins() {
  pinMode(LED_CONNECTING, OUTPUT);
  pinMode(LED_CONNECTED,  OUTPUT);
  pinMode(LED_FAIL,       OUTPUT);
  digitalWrite(LED_CONNECTING | LED_CONNECTED | LED_FAIL, LOW);
}

bool connectWiFi() {
  blinkLed(LED_CONNECTING, 3, 200);
  WiFi.begin(SSID, PASS);
  uint32_t start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(200);
  }
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(LED_CONNECTED, HIGH);
    return true;
  }
  digitalWrite(LED_FAIL, HIGH);
  return false;
}

void initTSL() {
  if (!tsl.begin()) {
    Serial.println("⚠ TSL2561 not found");
    return;
  }
  tsl.enableAutoRange(true);
  tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_101MS);
  Serial.println("✔ TSL2561 ready");
}

int readSoilPct() {
  int raw = analogRead(SOIL_PIN);
  int pct = map(raw, SOIL_DRY_RAW, SOIL_WET_RAW, 0, 100);
  return constrain(pct, 0, 100);
}

float readLux() {
  sensors_event_t evt;
  tsl.getEvent(&evt);
  return evt.light ? evt.light : NAN;
}

// —========= Setup & Loop =========—
void setup() {
  Serial.begin(115200);
  while (!Serial);

  initLedPins();
  if (!connectWiFi()) {
    Serial.println("Wi-Fi connection failed");
    while (true);
  }
  Serial.print("IP: "); Serial.println(WiFi.localIP());
  
  // Prepare key from IP
  ip = WiFi.localIP();
  ip_key = ip.toString();  // convert IPAddress to string
  ip_key.replace('.', '_');

  // Init sensors
  dht.begin();
  Wire.begin();
  initTSL();

  // Firebase
  config.api_key                    = API_KEY;
  config.database_url               = DB_URL;
  config.signer.tokens.legacy_token = DB_SECRET;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  uint32_t now = millis();
  if (now - last_update < UPDATE_INTERVAL) return;
  last_update = now;

  // Read DHT11
  float hum = dht.readHumidity();
  float temp = dht.readTemperature();
  if (isnan(hum) || isnan(temp)) {
    Serial.println("⚠ DHT read error");
    return;
  }

  // Read soil moisture
  int soil = readSoilPct();

  // Read lux
  float lux = readLux();
  if (isnan(lux)) {
    Serial.println("⚠ TSL2561 read error");
    lux = -1;
  }

  // Optional analog light
  int lightAnalog = analogRead(LIGHT_PIN);

  // Build JSON
  FirebaseJson doc;
  doc.add("air_humidity", hum);
  doc.add("temperature_c", temp);
  doc.add("soil_humidity_pct", soil);
  doc.add("lux", lux);
  doc.add("light_raw", lightAnalog);
  doc.add("ip", ip_key);

  String path = "/sensores/" + ip_key;
  if (Firebase.RTDB.setJSON(&fbdo, path.c_str(), &doc)) {
    Serial.println("✅ Data sent to " + path);
  } else {
    Serial.println("❌ Firebase error: " + fbdo.errorReason());
  }
}
