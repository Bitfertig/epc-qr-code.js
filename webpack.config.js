const webpack = require('webpack')
const path = require('path')
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin')

const esm = {
	//uniqueName: 'esm',
	path: path.resolve(__dirname, 'dist'),
	filename: '[name].esm.js',
	library: 'LIB',
	libraryTarget: 'var',
}
var outputObj = esm

module.exports = env => {
	return {
		target: 'web',
		// the environment in which the bundle should run
		resolve: {
			// options for resolving module requests
			mainFields: ['browser', 'module', 'main'],
		},
		mode: process.env.mode || 'development',
		//watch: true,
		watchOptions: {
			ignored: /node_modules/,
			aggregateTimeout: 200, // after build
			poll: 1000, // every
		},
		entry: {
			index: ['./src/index.js'],
		},
		output: outputObj,
		optimization: {
			minimize: true,
		},
		//devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: 'babel-loader',
				},
			],
		},
		plugins: [new EsmWebpackPlugin()],
	}
}
