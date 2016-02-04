var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

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
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data){
    if (err) throw err;
    var urls = data.toString().split('\n').slice(0, -1);
    callback(urls);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls) {
    callback(urls.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, function(err) {
    if (err) throw err;
    callback();
  });

};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files){
    if (err) throw err;
    callback(files.indexOf(url) !== -1);
  });
};

exports.downloadUrls = function(urlArray) {
  _.each(urlArray, function(url) {
    var filePath = path.join(exports.paths.archivedSites, url);
    var protocolUrl = 'http://' + url;
    request(protocolUrl, function(err, response, body) {
      if (err) throw err;
      fs.writeFile(filePath, body, function(err) {
        if (err) throw err;
      });
    });
  });
  fs.writeFile(exports.paths.list, '', function(err) {
    if (err) throw err;
  });
};

































