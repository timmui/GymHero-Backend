//var config = require('../.private/config.js');

var express = require('express');

var api = express.Router();

var rp = require("request-promise");

var avalibleEquipment= ['Treadmill', 'Free Weights', 'Elliptical', 'Bench Press'];

var pushKey = process.env.PUSH_KEY;

// [equipment,device token]
var users = {
  'joe' : [-1,null],
  'jane' : [-1,null]
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

api.get('/registerUser', function(req, res){
    var username = req.param('user');
    var token = req.param('token');
    users[username] = [-1,token];
    
  res.send(JSON.stringify(users));
})

api.get('/testNotifUser', function(req,res){
   var options = {
    method: 'POST',
    uri: 'https://gcm-http.googleapis.com/gcm/send',
    headers: {
        "Authorization": "key="+pushKey ,
        "Content-Type": "application/json"
    },
    body: {
        to: users[req.param("user")][1],
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

module.exports = api;
