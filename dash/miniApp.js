const express = require('express');
const {PubSub} = require('@google-cloud/pubsub');   //google cloud pub/sub module

const app = express();
const http = require('http').Server(app);
//const io = require('socket.io')(http);


// Imports the Google Cloud client library
//io.on('connection', function(socket){
    // let values = Values.find({ date: { $gt: parseInt(Date.now()/1000) - 3600 } }).sort({date:-1}).then(values => {
    //     io.emit("lastvalues", values);
    // });

    
    function listenForMessages() {
        const subscriptionPath = 'projects/test-pub-sub-iot/subscriptions/my-subscription-wsd';
        // Creates a client; cache this for further use
        const pubSubClient = new PubSub();
        // References an existing subscription
        const subscriptionToWsd = pubSubClient.subscription(subscriptionPath);
        const messageHandler1 = (message) => {
            console.log(`Received message ${message.id}:`);
            console.log('\tData:' + message.data);
            console.log(`\tAttributes: ${message.attributes}`);
            let payload = JSON.parse(message.data);

            // TEMPERATURE
            // io.emit("temperature", (payload.deviceId + ";" + payload.temperature + ";" + payload.date).toString());
            // // HUMIDITY
            // io.emit("humidity", (payload.deviceId + ";" + payload.humidity + ";" + payload.date).toString());
            // // WIND DIRECTION
            // io.emit("wind-dir", (payload.deviceId + ";" + payload.wind_direction + ";" + payload.date).toString());
            // // WIND INTENSITY
            // io.emit("wind-int", (payload.deviceId + ";" + payload.wind_intensity + ";" + payload.date).toString());
            // // RAIN HEIGHT
            // io.emit("rain", (payload.deviceId + ";" + payload.rain_height + ";" + payload.date).toString());

            // "Ack" (acknowledge receipt of) the message
            message.ack();
        }   
        // Listen for new messages until timeout is hit
        subscriptionToWsd.on('message', messageHandler1);
    };

    listenForMessages();
//})    

// Starting Server
const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});