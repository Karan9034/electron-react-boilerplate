const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { spawn } = require('child_process')

const defaultInclude = path.resolve(__dirname, 'src')

module.exports = {
	module: {
	    rules: [
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
				include: defaultInclude
			},
			{
				test: /\.jsx?$/,
				use: [{ loader: 'babel-loader' }],
				include: defaultInclude
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
				include: defaultInclude
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
				include: defaultInclude
			}
	    ]
	},
	target: 'electron-renderer',
	plugins: [
	    new HtmlWebpackPlugin({
	    	template: './src/index.html'
	    }),
	    new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production')
	    })
	],
	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false
	},
	optimization: {
		minimize: true
	}
}