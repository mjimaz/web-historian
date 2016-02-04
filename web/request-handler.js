var path = require('path');
var archive = require('../helpers/archive-helpers');
var httphelpers = require('./http-helpers.js');
// require more modules/folders here!


var renderPage = function(err, data, response){
  if (err) {
    console.log(err);
    response.writeHead(404);
    response.end('Not found');
  }
  response.writeHead(200, httphelpers.headers);
  response.end(data);

};


exports.handleRequest = function (request, response) {
  var requestedUrl = request.url;
  if (requestedUrl === '/') {
    requestedUrl = '/index.html';
  }

  if (request.method === 'GET') {
    httphelpers.serveAssets(response, requestedUrl, function(err, data){
      renderPage(err, data, response);
    });
  } else if (request.method === 'POST') {
    httphelpers.collectData(request, function(message) {
      archive.isUrlArchived(message, function(isArchived){
        if(isArchived){
          httphelpers.serveAssets(response, message, function(err, data){
            renderPage(err, data, response);
          });
        }else{
          archive.addUrlToList(message + '\n', function() {
            response.writeHead(302, httphelpers.headers);
            response.end();      
          });      
          //redirect to 'loading.html'
          httphelpers.serveAssets(response, '/loading.html', function(err, data){
            renderPage(err, data, response);
          });
        }
      });

    });






  } else {
    res.end(archive.paths.list);
  }
};
