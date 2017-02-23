'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const projectRoot = path.resolve('./');

module.exports = {
    entry: {
        app: './src/app/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        path: path.join(projectRoot, 'dist'),
    },
    module: {
        loaders: [
            { test: /\.js$/, include: [path.resolve(projectRoot)], loader: 'babel-loader' },
            { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('style', 'css!sass'), include: path.resolve(projectRoot),},
            { test: /\.(sass|scss)$/, exclude: path.resolve(projectRoot), loader: ExtractTextPlugin.extract('style', 'css sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass') },
            { test: /\.html$/, loader: 'raw' },
        ],
    },
    resolve: {
        extensions: ['', '.json', '.jsx', '.js'],
    },
    plugins: [
        // Automatically move all modules defined outside of application directory to vendor bundle.
        // If you are using more complicated project structure, consider to specify common chunks manually.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => module.resource && module.resource.indexOf(path.join(projectRoot, 'src')) === -1,
        }),
        new ExtractTextPlugin('[name].[hash].css', { allChunks: true })
    ],
};