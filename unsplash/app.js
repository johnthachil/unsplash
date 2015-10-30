var unsplash = require('unsplash-api');
var clientId = 'f4281a65f03576558acf4b03d6be6e1835f9b3f42fb0316d77dcf81564f04c58'; //this is required to verify your application's requests
unsplash.init(clientId);

var result =[];
var photolink = [];

unsplash.searchPhotos('office', null, null, null, function(error, photos, link) {
  for (var key in photos) {
    result.push(photos[key].urls);
  }
   for (var pey in result) {
     photolink.push(result[pey].full);
   }
});
console.log(photolink);
