const express = require('express');
const movie = require('../models/movie.js');

const router = express.Router();

//get route on root displays all movies 
router.get('/', (req,res) => {
	movie.selectAll('movies', result => {
		res.render('index', {movies: result})
	});
});

//post api route inserts movie in to database
router.post('/api/movie', (req,res) => {
	let name = req.body.movie_name;
	movie.insertOne('movies', 'movie_name', name, result => {
		console.log(`One row inserted at id ${result.insertId}`);
		res.status(200).end();
	});
	
});

//put api route modifies watched boolean of selected movie
router.put('/api/:movie', (req,res) => {
	let id = req.params.movie
	movie.updateOne('movies', 'watched', 1, 'id', id, result => {
		console.log('Result from put request: ',result.message);
		console.log("Rows updated: "+result.affectedRows)
		res.status(200).end();
	});
});

module.exports = router;