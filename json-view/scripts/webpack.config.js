const path = require('path');

const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: './index.js'
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../lib'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.(ico|png|gif|jpg|jpeg|svg)$/,
                loader: 'url-loader'
            }
        ]
    },
    target: 'node',
    externals: {
        react: 'react'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ExtractTextPlugin("../src/index.css"),
        new OptimizeCssAssetsPlugin()
    ] 
}