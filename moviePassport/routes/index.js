var express = require('express');
var router = express.Router();

const request = require('request');
const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";


router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get('/', async function(req, res, next) {
  request.get(nowPlayingUrl, (err, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render('index', { parsedData: parsedData.results });
  })
});

router.get('/login', (req, res, next) => {})

router.get('/movie/:id', (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request(thisMovieUrl, (err, response, movieData) => {
    if (err) {
      console.error("API Request Error:", err);
      return res.status(500).send("Failed to fetch data from the API.");
    }

    if (!movieData || movieData.trim() === "") {
      console.warn(`Empty response body received. HTTP Status: ${response && response.statusCode}`);
      return res.status(500).send("API returned an empty response. Try a hard refresh (Ctrl+F5).");
    }

    try {
      const parsedData = JSON.parse(movieData);
      res.render('single-movie', { parsedData });
    } catch (parseError) {
      console.error("JSON Parse Error. Raw Data:", movieData);
      res.status(500).send("Invalid data format received from the API.");
    }
  });
});
router.post('/search', (req, res, next) => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  request(movieUrl, (err, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    if(cat === 'person'){
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', { parsedData: parsedData.results });
  });
});
module.exports = router;
