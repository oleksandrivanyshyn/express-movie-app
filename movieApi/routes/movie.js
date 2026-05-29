var express = require('express');
var router = express.Router();
const movieDetails = require('../data/movieDetails');

const requireJSON = (req, res, next) =>{
    if(!req.is('application/json')){
        res.json({msg: 'Content-Type must be application/json'});
    }
    else{
        next();
    }

}


router.param('movieId', (req, res, next) => {
    console.log('someone hit a route that used the movieId param');
    next();
})

router.get('/movie/top_rated', (req, res, next) => {
    let page = req.query.page || 1;
    const results = movieDetails.sort((a, b) => b.vote_average - a.vote_average).slice((page - 1) * 20, page * 20);
    res.json(results);
})
router.get('/:movieId', function(req, res, next) {
    const movieId = Number(req.params.movieId);
    const results = movieDetails.find(movie => movie.id === movieId);
    if(!results){
        return res.status(404).json({msg: 'Movie not found', production_companies: []});
    }
    res.json(results)
});

router.post('/:movieId/rating', requireJSON,(req, res, next) => {
    const movieId = Number(req.params.movieId);
    const userRating = req.body.value;
    if((userRating < .5) || (userRating > 10)){
        res.status(400).json({msg: 'Rating must be between .5 and 10'});
    }
    else{
        res.status(200).json({msg: 'Thanks for your rating!'});
    }

})
router.delete('/:movieId/rating', requireJSON,(req, res, next) => {
    res.json({msg: 'Rating deleted'});
})

module.exports = router;
