var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};
//example of asset = '/index.html'
exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  var fullPath = '';
  var staticExtensions = ['.html', '.css', '.js'];
  var websiteExtensions = ['.com'];

  if(staticExtensions.indexOf(path.extname(asset)) !== -1){
    fullPath = path.join(archive.paths.siteAssets, asset);
  }else if(websiteExtensions.indexOf(path.extname(asset)) !== -1){
    fullPath = path.join(archive.paths.archivedSites, asset);
  }

  console.log(fullPath);
  fs.readFile(fullPath, callback);
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function(){
    data = data.split('url=')[1];
    callback(data);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
