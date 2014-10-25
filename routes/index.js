var express = require('express');
var router = express.Router();

var candidates = [];

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


module.exports = router;
