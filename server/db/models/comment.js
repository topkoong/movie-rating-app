const Sequelize = require('sequelize');
const db = require('../db');

// Make sure you have `postgres` running!

const Comment = db.define('comment', {
	user: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	content: {
		type: Sequelize.TEXT
	}
});

module.exports = Comment;
