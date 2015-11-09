var express = require('express');
var router = express.Router();
var google = require('googleapis');
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  renderPage(req, res, next);
});

router.get('/:key', function(req, res, next) {
  renderPage(req, res, next);
});

function renderPage(req, res, next){
  var r_res = res;
  var playlist = [];
  var infolist = [];

  //read file asynchronously
  // fs.readFile('players.json', 'utf8', function (err, data) {
  //  if (err) {
  //      return console.error(err);
  //  }
  //  players = JSON.parse(data);
  // });
  var players = JSON.parse(fs.readFileSync('players.json', 'utf8'));

  var yt = google.youtube({version:'v3', auth:players.api_key});

  //get key from parameters
  var paramsKey = req.params.key;

  //we need to replace spaces with plus signs to correctly search
  var artists = players.artists;
  artists = artists.map(function(item){
    item.query = item.query.replace(/\s+/g, '+');
    if (item.query === paramsKey) {
      item.selected = true;
    }
    return item;
  });

  // For now, only 20 results
  var list = yt.search.list({
    'q': paramsKey || artists[0].query,
    'type': 'video',
    'part': 'snippet',
    'videoEmbeddable': 'true',
    'maxResults': 20
  }, onGotList);

  function onGotList(req, res, next){
    //set information for new arrays: playlist and infolist
    playlist = res.items.map(function(item){
      return item.id.videoId;
    });

    infolist = res.items.map(function(item){
      item.snippet.thumbnail = item.snippet.thumbnails.default.url;
      delete item.snippet.thumbnails;
      return item.snippet;
    });

    r_res.render('index', {
       title: 'Video Playlist',
       artists: artists,
       playlist: playlist,
       infolist: infolist,
       paramsKey: paramsKey || artists[0].query,
       prev: (res.prevPageToken || ''),
       next: (res.nextPageToken || '')
      });
  }
}

module.exports = router;
