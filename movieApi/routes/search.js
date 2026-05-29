var express = require('express');
var router = express.Router();

const movies = require('../data/movies');
const people = require('../data/people');

function queryRequired(req, res, next){
    const searchTerm = req.query.query;
    if(!searchTerm){
        return res.json({msg: "Query is required."});
    }

    next();
}

router.use(queryRequired)

router.get('/movie',(req, res, next)=>{
    const searchTerm = req.query.query;
    const results = movies.filter((movie)=>{
        let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
        return found;
    })
    res.json({results})
})

router.get('/person',(req, res, next)=>{
    const searchTerm = req.query.query;
    const results = people.filter((person)=>{
        let found = person.name.includes(searchTerm);
        return found;
    })
    res.json({results})
})


module.exports = router;