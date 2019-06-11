const router = require('express').Router();
const { Movie, Comment } = require('../db/models');

// A route to serve up all movies

router.get('/', async (req, res, next) => {
	try {
		const movies = await Movie.findAll();
		res.json(movies);
	} catch (err) {
		next(err);
	}
});

// A route to search for a specific movie or create it if not available

router.post('/', async (req, res, next) => {
	try {
		const { imdbId } = req.body;
		const movie = await Movie.findOrCreate({
			where: { imdbId },
			defaults: {
				...req.body
			}
		});
		res.status(200).json(movie);
	} catch (error) {
		res.sendStatus(500);
	}
});

// Consider using app.param to automatically load in the Movie whenever a param :id is detected
router.param('id', async (req, res, next, id) => {
	try {
		// Fetch the movie by its ID (movieId) from a database
		const movie = await Movie.findByPk(id, {
			include: [
				{
					model: Comment
				}
			]
		});
		if (!movie) {
			const error = new Error('Not found');
			error.status = 404;
			throw error;
		}
		// Save the found movie object into request object
		req.movie = movie;
		req.id = id;
		next();
	} catch (error) {
		next(error);
	}
});

// A route to serve up a single movie (based on its id), _including that movies' comments_

router.get('/:id', async (req, res, next) => {
	const movie = req.movie;
	res.json(movie);
});

// A route to remove a movie (based on its id)

router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.id;
		await Movie.destroy({
			where: {
				id
			}
		});
		res.status(204).end();
	} catch (error) {
		res.sendStatus(500);
	}
});

// A route to update existing movie's ratings (based on its id)

router.put('/:id/', async (req, res, next) => {
	const movie = req.movie;
	const ratings = req.body.ratings;
	try {
		const updatedMovie = await movie.update({
			...req.body,
			ratings
		});
		res.json(updatedMovie);
	} catch (error) {
		res.sendStatus(500);
	}
});

// A route to add a new comment

router.post('/:id/comments', async (req, res, next) => {
	try {
		const newComment = await Comment.create(req.body);
		res.status(200).json(newComment);
	} catch (error) {
		res.sendStatus(500);
	}
});

module.exports = router;
