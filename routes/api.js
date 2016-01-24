//var config = require('../.private/config.js');

var express = require('express');

var api = express.Router();

var rp = require("request-promise");

var avalibleEquipment= ['Treadmill', 'Free Weights', 'Elliptical', 'Bench Press'];

var equipmentHelp= ['Treadmill are cool', 'Free Weights are cool', 'Elliptical are cool', 'Bench Press are cool'];

var pushKey = process.env.PUSH_KEY;

var gcmUri = 'https://gcm-http.googleapis.com/gcm/send';

//MONGODB VARIABLES
var mongoKey = process.env.MONGO_KEY;   //API key
var mongoose = require('mongoose');
var mongoURI = process.env.MONGO_URI;
var MongoDB = mongoose.connect(mongoURI).connection;

// [equipment,device token]
var users = {
  'joe' : [-1,null],
  'jane' : [-1,null]
  }; 


// -------------- Production Endpoints ----------------
// Returns static text
api.get('/health', function(req, res){
  res.send(JSON.stringify({health:"It's all good in the hood."}));
})

api.get('/getEquipment', function(req, res){
  res.send(JSON.stringify(avalibleEquipment));
})

api.get('/useEquipment', function(req, res){
    equipmentUsed = req.param('equipment');
    user = req.param('user');

    users[user][0] = equipmentUsed;

    res.send(JSON.stringify({status:"OK"}));
})

api.get('/getUsers', function(req, res){
  res.send(JSON.stringify(users));
})

api.post('/registerUser', function(req, res){
    var username = req.param('user');
    var token = req.param('token');
    users[username] = [-1,token];
    
  res.send(JSON.stringify(users));
})

api.post('/userUsing', function(req, res){
    var username = req.param('user');
    users[username][0] = req.param('equipment');
    
    // Send Push Notification
    var options = {
    method: 'POST',
    uri: gcmUri,
    headers: {
        "Authorization": "key="+pushKey ,
        "Content-Type": "application/json"
    },
    body: {
        to: users[username][1],
        data: {
          message: equipmentHelp[users[username][0]],
          equipment: avalibleEquipment[users[username][0]]
        }
    },
    json: true // Automatically stringifies the body to JSON 
  };
 
  rp(options)
    .then(function (parsedBody) {
        res.send(JSON.stringify({status:"Notification Sent"}));
    })
    .catch(function (err) {
        // POST failed... 
        console.log("Push Error: " +err);
        console.log("Key: " + pushKey)
        res.send(JSON.stringify({status:"Notification Failed"}));
    }); 
    
    
    res.send(JSON.stringify(equipmentHelp[users[username][0]]));
})

api.get('/currentData', function(req,res){
    var output = [];
    var count = 0;
    for(var key in users){
        if (users[key][0] >= 0){
            output[count] = {name: key,
                             equipment:users[key][0]};
            count++;
        }
    }
    
    res.send(JSON.stringify(output));
})
// ---------------- Test endpoints ------------------------
api.get('/testNotifUser', function(req,res){
   var options = {
    method: 'POST',
    uri: gcmUri,
    headers: {
        "Authorization": "key="+pushKey ,
        "Content-Type": "application/json"
    },
    body: {
        to: users[req.param("user")][1],
        data: {
          message: "Test Notifcation!",
          equipment: "Test"
        }
    },
    json: true // Automatically stringifies the body to JSON 
  };
 
  rp(options)
    .then(function (parsedBody) {
        res.send(JSON.stringify({status:"Notification Sent"}));
    })
    .catch(function (err) {
        // POST failed... 
        console.log("Push Error: " +err);
        console.log("Key: " + pushKey)
        res.send(JSON.stringify({status:"Notification Failed"}));
    }); 
})

api.get('/testNotif', function(req, res){
  var options = {
    method: 'POST',
    uri: gcmUri,
    headers: {
        "Authorization": "key="+pushKey ,
        "Content-Type": "application/json"
    },
    body: {
        to: req.param("token"),
        data: {
          message: "Test Notifcation!",
          equipment: "Test"
          
        }
    },
    json: true // Automatically stringifies the body to JSON 
  };
 
  rp(options)
    .then(function (parsedBody) {
        res.send(JSON.stringify({status:"Notification Sent"}));
    })
    .catch(function (err) {
        // POST failed... 
        console.log("Push Error: " +err);
        console.log("Key: " + pushKey)
        res.send(JSON.stringify({status:"Notification Failed"}));
    });

})

// MongoDB Setup

MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

module.exports = api;
