var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var req = require('request');
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
  fs.appendFile(exports.paths.list, target, function(err) {
    cb();
  });

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

exports.downloadUrls = function(urls) {
  console.log('urls', urls);
  _.each(urls, function(url) {
    console.log('1 earl', url);
    req(`http://${url}`, function (error, response, body) {
      console.log('in req npm');
      console.log('test', !error && response.statusCode === 200);
      console.log('status code', response.statusCode);
      if (!error && response.statusCode === 200) {
        fs.createWriteStream(exports.paths.archivedSites + '/' + url, 'utf8', function() {
          console.log('success!');
        });
      } else {
        console.log('fail!');
      }
    });
  });


    // if (!error && response.statusCode === 200) {
    //   fs.createWriteStream(exports.paths.archivedSites + '/www.' + url));
    // }

    // var test = exports.isUrlArchived(url, function(exists) { return exists; });
    // console.log(test);

    // if (!exports.isUrlArchived(url, function(exists) { return exists; })) {
    //   req(`http://${url}`).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
    // } 



  // fs.readFile(exports.paths.list, 'utf8', function(err, data) {
  //   // var arr = data.split('\n');
  //   urls.forEach(function(url) {
  //     reqHTTP(`http://www.${url}`, function (error, response, body) {
  //       console.log('here');
  //       console.log(response.req);
  //     });
  //   });
    //console.log('ARRR', arr);
  // });
};

// .pipe(fs.createWriteStream(exports.paths.archivedSites + '/www.' + url));
