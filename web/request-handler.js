var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');

var actions = {
  'GET': function(request, response) {

    // only do this when page loads  
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, html) {
      response.writeHead(200, helpers.headers);
      response.end(html);
    });

  }, 
  'POST': function(request, response) {



    sendResponse(response, '', 201);
  },
  'OPTIONS': function(request, response) {

    sendResponse(response, null);
  }
};


exports.handleRequest = function (req, res) {

  console.log('req.url', req.url);

  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    sendResponse(res, '', 404);
  }

};
