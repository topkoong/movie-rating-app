const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const db = require('./db');
const PORT = process.env.PORT || 8080;

// Body parsing middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false
	})
);

// Logging middleware
app.use(morgan('dev'));

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./api'));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
	if (path.extname(req.path).length > 0) {
		res.status(404).end();
	} else {
		next();
	}
});

// Sends our index.html (the "single page" of our SPA)
app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// Error handling endware
app.use((err, req, res, next) => {
	console.error(err, typeof next);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

db.sync().then(() => {
  console.log('db synced');
  app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`));
});

module.exports = app;
