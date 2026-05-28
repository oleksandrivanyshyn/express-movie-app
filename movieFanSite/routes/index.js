var express = require('express');
var router = express.Router();

const request = require('request')
const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';



/* GET home page. */
router.get('/', async function(req, res, next) {
  request.get(nowPlayingUrl, (err, response, movieData) => {
    console.error(err);
    console.log(response);
  })

  res.render('index', {});
});

module.exports = router;
