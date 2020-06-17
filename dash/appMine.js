const {PubSub} = require('@google-cloud/pubsub');   //google cloud pub/sub module
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

function predict(x, y, z){
    let magnitude = Math.hypot(x, y, z);
    if(magnitude > 9.05 && magnitude < 9.95) return 1;
    else return 0;
}
    
// Imports the Google Cloud client library
io.on('connection', function(socket){
    let values = Values.find(
        { date: { $gt: parseInt(Date.now()/1000) - 3600 } }
    ).sort({date:-1}).then(values => {
        io.emit("lastvalues", values);
});
    
const subscriptionName1 = 'projects/awesome-sylph-271611/subscriptions/my-subscription1';
const subscriptionName2 = 'projects/awesome-sylph-271611/subscriptions/assignment4-subscription';
// Creates a client; cache this for further use
const pubSubClient = new PubSub();
    
function listenForMessages() {
        // References an existing subscription
        const subscription1 = pubSubClient.subscription(subscriptionName1);
        const subscription2 = pubSubClient.subscription(subscriptionName2);
        // Create an event handler to handle messages

        /********************************************* ENVIRONMENTAL STATIONS *********************************************/
        const messageHandler1 = message => {
            console.log(`Received message ${message.id}:`);
            console.log('\tData:' + message.data);
            console.log(`\tAttributes: ${message.attributes}`);
            var payload = JSON.parse(message.data);

            const newValue = {
                deviceId: payload.deviceId,
                temperature: payload.temperature,
                humidity: payload.humidity,
                wind_direction: payload.wind_direction,
                wind_intensity: payload.wind_intensity,
                rain_height: payload.rain_height,
                date: payload.date
        };

        // TEMPERATURE
        io.emit("temperature", (payload.deviceId + ";" + payload.temperature + ";" + payload.date).toString());
        // HUMIDITY
        io.emit("humidity", (payload.deviceId + ";" + payload.humidity + ";" + payload.date).toString());
        // WIND DIRECTION
        io.emit("wind-dir", (payload.deviceId + ";" + payload.wind_direction + ";" + payload.date).toString());
        // WIND INTENSITY
        io.emit("wind-int", (payload.deviceId + ";" + payload.wind_intensity + ";" + payload.date).toString());
        // RAIN HEIGHT
        io.emit("rain", (payload.deviceId + ";" + payload.rain_height + ";" + payload.date).toString());
        // "Ack" (acknowledge receipt of) the message
        message.ack();
        };
        // Listen for new messages until timeout is hit
        subscription2.on('message', messageHandler2);
        subscription1.on('message', messageHandler1);
    }
    listenForMessages();
});

// Starting Server
const port = process.env.PORT || 5000;
http.listen(port, ()=>{
console.log(`Server started on port ${port}`);
} );