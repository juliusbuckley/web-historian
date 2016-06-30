var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');

var init = function (request, response, assets, route) {
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

var send = function (request, response, assets, route) {
  console.log(assets + route);
  fs.readFile(assets + route, 'utf8', function(err, data) { 
    if (err) {
      console.log('errrrroor');
      response.writeHead(404, helpers.headers);
      response.end();
    } else {
      response.writeHead(200, helpers.headers);
      console.log(data);
      response.end(data);
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

    console.log('archive.paths.siteAssets: ', archive.paths.siteAssets, 'requestURL: ', request.url);
    
  
    if (routes[request.url]) {
      init(request, response, archive.paths.siteAssets, routes[request.url]);
    } else {
      send(request, response, archive.paths.archivedSites, request.url);
    }


  }, 
  'POST': function(request, response) {
    console.log('in post');
    var data = '';
    request.on('data', function(chunk) {
      data += chunk.toString();
    });
    request.on('end', function() {
      var text = data.split('=')[1] + '\n';
      archive.addUrlToList(text, function() {
        response.writeHead(302, helpers.headers);
        response.end();
      });
    });
    

    
  },
  'OPTIONS': function(request, response) {

    sendResponse(response, null);
  }
};

exports.handleRequest = function (req, res) {

  // console.log('req.url', req.url);
  // var parsedUrl = url.parse(req.url);
  // console.log('hostname', parsedUrl.pathname);

  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    sendResponse(res, '', 404);
  }

};