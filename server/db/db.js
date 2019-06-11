const Sequelize = require('sequelize');

// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const db = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost:5432/movie-rating',
	{
		logging: false // so we don't see all the SQL queries getting made
	}
);

// Don't forget to change your dbname and createdb

module.exports = db;
