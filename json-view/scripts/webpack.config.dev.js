const path = require('path');

module.exports = {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    entry: {
        app: './test/index.js'
    },   
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../test')
    },
    devServer: {
        port: 7001,
        contentBase: './test'
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
    }
}