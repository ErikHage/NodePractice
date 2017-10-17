const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './app/index.jsx', //input file
	output: { //output file
		path: __dirname, 
		filename: 'dist/bundle.js' 
	},	
	module: {
		loaders: [
		  {
			test: /.jsx?$/, //matches all jsx files
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react'] //uses babel ES2015 and React plugins
			}
	  	  }
		]
	}
};

