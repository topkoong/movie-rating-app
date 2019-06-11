//importing all models

const Movie = require('./movie');
const Comment = require('./comment');

// The purpose of this module is to bring my Sequelize instance (`db`) together
// with my models (which I had defined in separate modules in this directory).

/* 


Movie/Comment association
==========================
 Comments may be associated with at most one movie.
 Likewise, movies may be associated with many comments

*/

Comment.belongsTo(Movie);
Movie.hasMany(Comment);

/**
 * I'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {Movie} = require('../db/models')
 * instead of: const Movie = require('../db/models/movie')
 */

//export all models

module.exports = {
	Movie,
	Comment
};
