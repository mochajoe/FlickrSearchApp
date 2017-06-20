var express = require('express');
var app = express();

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "",
      secret: ""
    };

    var RESULTS_TO_DISPLAY = 32;
    var PHOTO_SIZE = 'q';

app.set('port', (process.env.PORT || 3000));

app.post('/', (req,res) => {
  var searchString = Object.keys(req.body)[0]
  console.log('Recieved POST with request body :', searchString);
  var searchResult = [];
  //make a flickr call
  Flickr.tokenOnly(flickrOptions,(error,flickr) => {
    flickr.photos.search({
      text:searchString,
      page:1,
      per_page: RESULTS_TO_DISPLAY
    }, function(err,result) {
      if (err) {
        throw new Error(err)
      }

      for (var i=0;i<RESULTS_TO_DISPLAY;i++) {
        var currentPhoto = result.photos.photo[i];
        var url = `https://farm${result.photos.photo[i].farm}.staticflickr.com/${result.photos.photo[i].server}/${result.photos.photo[i].id}_${result.photos.photo[i].secret}`;

        searchResults.push(url);
      }
      res.end(JSON.stringify(searchResults), 201);
    });
  });
});



app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});