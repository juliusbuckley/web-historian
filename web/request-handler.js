var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');


var render = function (request, response, assets, route) {
  fs.readFile(assets + route, 'utf8', function(err, html) { 
    if (err) {
      response.writeHead(404, helpers.headers);
      response.end();
    } else {
      response.writeHead(200, helpers.headers);
      response.end(html);
    }
  });
};

var routes = {
  '/': '/index.html',
  '/web/public/index.html': '/index.html',
  '/web/public/loading.html': '/loading.html',
  '/styles.css': '/styles.css'
};

var actions = {
  'GET': function(request, response) {
  
    if (routes[request.url]) {
      render(request, response, archive.paths.siteAssets, routes[request.url]);
    } else {

    }


  }, 
  'POST': function(request, response) {



    sendResponse(response, '', 201);
  },
  'OPTIONS': function(request, response) {

    sendResponse(response, null);
  }
};

exports.handleRequest = function (req, res) {

  //console.log('req.url', req.url);
  var parsedUrl = url.parse(req.url);
  //console.log('hostname', parsedUrl);

  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    sendResponse(res, '', 404);
  }

};