const webpack = require('webpack'); //to access webpack runtime
const myEnv = require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	// the starting point for our program
	entry: ['@babel/polyfill', './client/index.js'],

	// affects several default webpack settings
	mode: isDev ? 'development' : 'production',

	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	context: __dirname,

	// Creates "source map" files (ex. "bundle.js.map"). Modern browsers can automatically
	// request these to "rebuild" your original source code in your dev tools (i.e. the Sources tab).
	// This makes debugging much, much nicer
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			// use the style-loader/css-loader combos for anything matching the .css extension
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				OMDB_API_KEY: JSON.stringify(myEnv.parsed.OMDB_API_KEY)
			}
		})
	]
};
