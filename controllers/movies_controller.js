const express = require('express');
const movie = require('../models/movie.js');
const moment = require('moment');

const router = express.Router();

//get route on root displays all movies 
router.get('/', (req,res) => {
	movie.selectAll('movies', result => {		
		res.render('index', {movies: result})
	});
});

//post api route inserts movie in to database
router.post('/api/movie', (req,res) => {
	let name = req.body.movie_name,
		myDate =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	movie.insertOne('movies', 'movie_name', name, result => {
		console.log(`One row inserted at id ${result.insertId}`);
		res.status(200).end();
	});
});

//put api route modifies watched boolean of selected movie
router.put('/api/:movie', (req,res) => {
	let id = req.params.movie,
		myDate =  moment(new Date()).format("MM-DD-YYYY, h:mm a");
	
	movie.updateOne('movies', 'watched', 1, 'id', id, result => {	

	});

	movie.updateTime('movies', 'watchedAt', myDate, 'id', id, timeResult => {
		console.log('Result from put request: ',timeResult.message);
		console.log("Rows updated: "+timeResult.affectedRows)
		res.status(200).end();
	});
});

module.exports = router;