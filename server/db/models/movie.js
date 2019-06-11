const Sequelize = require('sequelize');
const db = require('../db');

// Make sure you have `postgres` running!

const Movie = db.define('movie', {
	title: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	plot: {
		type: Sequelize.TEXT
	},
	year: {
		type: Sequelize.STRING,
		defaultValue: 1990
	},
	poster: {
		type: Sequelize.STRING,
		validate: {
			isUrl: true
		},
		defaultValue:
			'https://stainedglassbnb.com/wp-content/uploads/2016/09/placeholder-625x375.jpg'
	},
	imdbId: {
		type: Sequelize.STRING
	},
	ratings: {
		type: Sequelize.INTEGER,
		defaultValue: 3,
		validate: {
			min: 0,
			max: 10
		}
	}
});

module.exports = Movie;
