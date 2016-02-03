var path = require('path');
var archive = require('../helpers/archive-helpers');
var httphelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (request, response) {
  var requestedUrl = request.url;
  if (requestedUrl === '/') {
    requestedUrl = '/index.html';
  }

  if (requestedUrl === '/index.html') {
    httphelpers.serveAssets(response, requestedUrl, function(err, data){
      if (err) {
        console.log(err);
        response.writeHead(404);
        response.end('Not found');
      }
      response.writeHead(200, httphelpers.headers);
      response.end(data);

    });
  } else {
    res.end(archive.paths.list);
  }
};
