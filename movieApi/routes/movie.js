var express = require('express');
var router = express.Router();
const movieDetails = require('../data/movieDetails');

router.get('/:movieId', function(req, res, next) {
    const movieId = Number(req.params.movieId);
    const results = movieDetails.find(movie => movie.id === movieId);
    if(!results){
        return res.status(404).json({msg: 'Movie not found', production_companies: []});
    }
    res.json(results)
});

module.exports = router;
