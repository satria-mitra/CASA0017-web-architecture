var mqtt_server = "mqtt://mqtt.cetools.org";
var client = mqtt.connect(mqtt_server + ":8080");

client.on("connect", function () {
  console.log("We are connected to the server");
  client.subscribe("UCL/OPS/Garden/WST/dvp2/loop")
});

client.on("message", function (topic, message) {
    var decoded_msg = new TextDecoder("utf-8").decode(message);
    message = JSON.parse(decoded_msg.toString());
    console.log(message);
    
    // Access the parameters
    var outTemp_C = message.outTemp_C;
    var outHumidity = message.outHumidity;
    var barometer_mbar = message.barometer_mbar;
    var windSpeed10_kph = message.windSpeed10_kph;
    var windDir = message.windDir;
    var rain24_cm = message.rain24_cm;
    var radiation_Wpm2 = message.radiation_Wpm2;
    var consBatteryVoltage_volt = message.consBatteryVoltage_volt;
;   var uv = message.UV;





    // Display the formatted values in the corresponding elements
    addLiveMessage(".outTemp_C", Number(outTemp_C).toFixed(2) + "  Celcius");
    addLiveMessage(".outHumidity", Number(outHumidity).toFixed(2) + "  % Rh");
    addLiveMessage(".barometer_mbar", Number(barometer_mbar).toFixed(2) + " mBar");
    addLiveMessage(".windSpeed10_kph", Number(windSpeed10_kph).toFixed(1) + " Kph");
    addLiveMessage(".windDir", Number(windDir).toFixed(0) + " degree");
    addLiveMessage(".rain24_cm", Number(rain24_cm).toFixed(1) + " cm");
    addLiveMessage(".radiation_Wpm2", Number(radiation_Wpm2).toFixed(2) + " W/m2");
    addLiveMessage(".consBatteryVoltage_volt", Number(consBatteryVoltage_volt).toFixed(2) + " Volt");
    addLiveMessage(".uv", Number(uv).toFixed(2) + " W/m2");



});

function addLiveMessage(id, msg) {
    // Append the formatted message to the element with the specified class
    $(id).text(msg);
}

var currentdate = new Date();

    var datetime = "Last Sync: " + currentdate.getDate() + "/"+(currentdate.getMonth()+1) 
    + "/" + currentdate.getFullYear() + " @ " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();;

    document.write(datetime.toLocaleString());
    document.write(".subTime");