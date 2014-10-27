var express = require('express');
var router = express.Router();

var candidates = [];
var reservations = [];

/* GET home page. */
router.get('/json', function(req, res) {
    res.status(200).json( { message: 'Hello World!' });
    // res.render('index', { title: 'Express' });
});

router.post('/json', function(req, res) {
    candidates.push(req.body);
    console.log(candidates);

    // send back the candidates
    res.status(200).json({message: 'Thanks for the info',
                        candidates: candidates});
});

router.get('/scheduler', function(req, res) {
    res.render('scheduler');
});

router.get('/reservation', function(req, res) {
    res.render('flight_reserve');
});

//todo: store reservation post obj in array
router.post('/reservation', function(req, res) {
    console.log('Reservation accepted');

    reservations.push(req.body);
    console.log(reservations);
    // send back the candidates
    res.status(200).json({message: 'Thanks for the info'});
});

//get reservations
router.post('/getreservations', function(req, res) {
    // send back the candidates
    res.status(200).json(reservations);
});

module.exports = router;
