var express = require('express'),
    path = require('path'),
    config = require('../../webpack.config.js'),
    configApi = require('./configApi.js');
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    Twitter = require('twitter');

var app = express(),
    compiler = webpack(config),
    port = 3000,
    twitter = new Twitter({
      consumer_key: configApi.consumer_key,
      consumer_secret: configApi.consumer_secret,
      bearer_token: configApi.bearer_token
    });

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.use('/api/place/:location', function(req, res) {
    var location = req.params.location.split('&');
    twitter.get('trends/closest', {
        lat: location[0],
        long: location[1]
    }, function(error, response) {
        if(error) {
            res.send({
                status: 'ERROR',
                message: error
            });
        } else {
            res.send({
                status: 'OK',
                data: response
            });
        }
    });
});

app.use('/api/trends/:woeid', function(req, res) {
    var woeid = req.params.woeid;
    twitter.get('trends/place', {
        id: woeid
    }, function(error, response) {
        if(error) {
            res.send({
                status: 'ERROR',
                message: error
            });
        } else {
            res.send({
                status: 'OK',
                data: response
            });
        }
    });
});

app.use('/', function(req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.listen(port, function(error) {
    if(error) throw error;
    console.log('express server running on localhost:', port);
});
