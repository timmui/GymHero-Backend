//var config = require('../.private/config.js');

var express = require('express');

var api = express.Router();

var rp = require("request-promise");

var avalibleEquipment= ['Treadmill', 'Free Weights', 'Elliptical', 'Bench Press'];

var pushKey = process.env.PUSH_KEY;

//MONGODB VARIABLES
var mongoKey = process.env.MONGO_KEY;   //API key
var mongoose = require('mongoose');
var mongoURI = process.env.MONGO_URI;
var MongoDB = mongoose.connect(mongoURI).connection;

var users = {
  'joe' : [0],
  'jane' : [0]
  }; 


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

api.get('/testNotif', function(req, res){
  var options = {
    method: 'POST',
    uri: 'https://gcm-http.googleapis.com/gcm/send',
    headers: {
        "Authorization": "key="+pushKey ,
        "Content-Type": "application/json"
    },
    body: {
        to: req.param("token"),
        data: {
          message: "Test Notifcation!"
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

// Add articles
// api.get('/add_article', function(req,res){
//   parsed_title = {
//     topic: req.param('topic'),
//     title: req.param('title'),
//     publisher: req.param('publisher'),
//     publisher_url: req.param('publisher_url') ,
//     image_url: req.param('content_html'),
//     type: req.param('type')
//   }

//   var topic_details = new ArticlesInfo(parsed_title);

//   topic_details.save(function (err) {
//       if (err) {
//           res.send(err)
//           return;
//       }
//       console.log({message: 'Article details been added to MongoDB'})
//   })
// })

MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

module.exports = api;
