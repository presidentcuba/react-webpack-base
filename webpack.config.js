const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('./package.json').dependencies
const Dotenv = require('dotenv-webpack')

const PORT = 3004

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].js',
		chunkFilename: '[name].js',
		publicPath: 'http://localhost:' + PORT + '/',
		crossOriginLoading: 'anonymous',
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './public/assets'),
		},
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							lessOptions: {
								modifyVars: {
									'@primary-color': '#f05a94',
									'@link-color': '#009ADA',
									'@link-hover-color': '#009adacc',
									'@table-header-bg': '#FCABCA',
									'@btn-border-radius-base': '6px',
									'@btn-link-hover': '#009adacc',
									'@control-border-radius': '6px,',
									'@switch-color': 'rgba(29, 198, 56, 1)',
									'@success-color': '#1DC638',
									'@warning-color': '#F59129',
									'@error-color': '#EA001B',
								},
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.ts?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				exclude: /\.module.(scss)$/,
				use: ['css-loader', 'sass-loader'],
			},
			{
				test: /\.module\.scss$/i,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								mode: 'local',
								localIdentName: 'vv-[local]-[hash:base64:5]',
							},
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: './images/[name].[ext]',
				},
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: './svg/[name].[ext]',
						},
					},
				],
			},
			{
				type: 'javascript/auto',
				test: /\.json$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: './json/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: './fonts/[name].[ext]',
						},
					},
				],
			},
		],
	},
	devServer: {
		open: false,
		hot: true,
		historyApiFallback: true,
		port: PORT,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		},
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve('public/index.html'),
			filename: './index.html',
			chunksSortMode: 'none',
		}),
		new Dotenv(),
	],
}
