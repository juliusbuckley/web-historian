var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      cb(data.split('\n'));
    }
  });
};

exports.isUrlInList = function(target, cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var arr = data.split('\n');
      var exists = arr.indexOf(target) > -1;
      cb(exists);
    }
  });
};

exports.addUrlToList = function(target, cb) {
  fs.appendFile(exports.paths.list, target, function(err) {});
  cb();
};

exports.isUrlArchived = function(target, cb) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) {
      console.log(err);
    } else {
      var exists = files.indexOf(target) > -1;
      cb(exists);
    }
  });
};

exports.downloadUrls = function() {

};
