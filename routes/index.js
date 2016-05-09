var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Record = require("../models/record.js"); // our db model
var twilio = require('twilio');

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {
    console.log('home page requested!');
    res.render('record.html')
});

// simple route to show an HTML page for adding data
router.get('/record', function(req, res) {
    res.render('record.html')
})

// simple route to show an HTML page for recorded data
router.get('/admin', function(req, res) {
    res.render('admin.html')
})

// simple route to show an HTML page for recorded data
router.get('/remember', function(req, res) {
    res.render('remember.html')
})

// simple route to show an HTML page for entry confirmation
router.get('/success', function(req, res) {
    res.render('success.html')
})

// /**
//  * POST '/api/create'
//  * Receives a POST request of the new user and location, saves to db, responds back
//  * @param  {Object} req. An object containing the different attributes of the Person
//  * @return {Object} JSON
//  */
router.post('/api/create', function(req, res) {
    console.log(req.body);
    var recordObj = {
        til: req.body.til
    }
    var record = new Record(recordObj);
    record.save(function(err, data) {
        if (err) {
            var error = {
                status: "ERROR",
                message: err
            }
            return res.json(err)
        }
        return res.redirect('/success');
    })
})

//get api
router.get('/api/get', function(req, res) {
    Record.find(function(err, data) {
        if (err) {
            var error = {
                status: "ERROR",
                message: err
            }
            return res.json(err)
        }
        var jsonData = {
            status: "OK",
            record: data
        }
        return res.json(jsonData);
    })
})

//get id
router.get('/api/get/:id', function(req, res) {
    var requestedId = req.param('id');
    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
    Record.findById(requestedId, function(err, data) {
        // if err or no user found, respond with error 
        if (err || data == null) {
            var error = {
                status: 'ERROR',
                message: 'Could not find that record'
            };
            return res.json(error);
        }
        // otherwise respond with JSON data of the animal
        var jsonData = {
            status: 'OK',
            record: data
        }
        return res.json(jsonData);
    })
})

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the animal to delete
 * @param  {String} req.param('id'). The animalId
 * @return {Object} JSON
 */
router.get('/api/delete/:id', function(req, res) {
    var requestedId = req.param('id');
    // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
    Record.findByIdAndRemove(requestedId, function(err, data) {
        if (err || data == null) {
            var error = {
                status: 'ERROR',
                message: 'Could not find that record to delete'
            };
            return res.json(error);
        }
        // otherwise, respond back with success
        var jsonData = {
            status: 'OK',
            message: 'Successfully deleted id ' + requestedId
        }
        res.json(jsonData);
    })
})

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the animal to update, updates db, responds back
//  * @param  {String} req.param('id'). The animalId to update
//  * @param  {Object} req. An object containing the different attributes of the Animal
//  * @return {Object} JSON
//  */
router.post('/api/update/:id', function(req, res) {
    var requestedId = req.param('id');
    var dataToUpdate = {}; // a blank object of data to update
    // pull out the information from the req.body and add it to the object to update
    var til;

    if (req.body.til) {
        til = req.body.til;
        // add to object that holds updated data
        dataToUpdate['til'] = til;
    }

    if (req.body.dateAdded) {
        dateAdded = req.body.dateAdded;
        // add to object that holds updated data
        dataToUpdate['dateAdded'] = dateAdded;
    }

    console.log('the data to update is ' + JSON.stringify(dataToUpdate));

    // now, update that record
    // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
    Record.findByIdAndUpdate(requestedId, dataToUpdate, function(err, data) {
        // if err saving, respond back with error
        if (err) {
            var error = {
                status: 'ERROR',
                message: 'Error updating record'
            };
            return res.json(error);
        }
        console.log('Updated the record!');
        console.log(data);

        // now return the json data of the new person
        var jsonData = {
            status: 'OK',
            record: data
        }
        return res.json(jsonData);
    })
})

// this route gets called whenever Twilio receives a message
router.post('/twilio-callback', function(req, res) {
    // there's lots contained in the body
    console.log(req.body);
    // the actual message is contained in req.body.Body
    var incomingMsg = req.body.Body;
    var til = incomingMsg;
    var recordObj = {
        til: til
    }

    var record = new Record(recordObj)

    record.save(function(err, data) {
        // set up the twilio response
        var twilioResp = new twilio.TwimlResponse();
        if (err) {
            // respond to user
            twilioResp.sms('There was an error and this wasn\'t saved. The message: ' + incomingMsg);
            // respond to twilio
            res.set('Content-Type', 'text/xml');
            res.send(twilioResp.toString());
        } else {
            // respond to user
            twilioResp.sms('Thanks for this memory! Received: ' + incomingMsg);
            // respond to twilio
            res.set('Content-Type', 'text/xml');
            res.send(twilioResp.toString());
        }
    })
})

module.exports = router;
