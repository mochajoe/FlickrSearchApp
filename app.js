var express = require('express');
var app = express();
var keys = require('./keys');
var path = require('path')


var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: keys.key,
      secret: keys.secret
    };

    var RESULTS_TO_DISPLAY = 32;
    var PHOTO_SIZE = 'q';

app.set('port', (process.env.PORT || 3000));



app.use('/',express.static(path.join(__dirname,'public')));

var searchResults =[];

app.post('/', (req,res) => {
  var searchString = 'cheese'
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
      
        
       const searchResults = RESULTS_TO_DISPLAY.map(res=>
                                                    {
       const currentPhoto = result.photos.photo[i];
           const url = `https://farm${result.photos.photo[i].farm}.staticflickr.com/${result.photos.photo[i].server}/${result.photos.photo[i].id}_${result.photos.photo[i].secret}`;

       return url
       }                         
  
      res.end(JSON.stringify(searchResults), 201);
    });
  });
});



app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
