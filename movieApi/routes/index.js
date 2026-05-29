var express = require('express');
var router = express.Router();

const movies = require('../data/movies');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/most_popular', (req, res, next) => {
  let page = req.query.page || 1;
  if(req.query.api_key !== '123456789'){
    res.json('invalid api key');
  }
  let results = movies.filter(movie => movie.most_popular);
  results = results.slice((page - 1) * 20, page * 20);
  res.json({results, page})
})
module.exports = router;
