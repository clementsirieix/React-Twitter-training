var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, "dist"),
    SRC_DIR = path.resolve(__dirname, "src/client");

module.exports = {
    devtool: "inline-source-map",
    entry: [
        'whatwg-fetch',
        'webpack-hot-middleware/client',
        SRC_DIR + "/index.js",
        path.resolve(SRC_DIR, "../style/main.sass")
    ],
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        preLoaders: [
            { test: /\.json$/, loader: 'json'},
        ],
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("main.css", {
            allChunks: true
        }),
        new FlowBabelWebpackPlugin()
    ],
    devServer: {
        historyApiFallback: true,
    },
};
