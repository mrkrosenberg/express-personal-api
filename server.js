// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



/*
 * JSON API Endpoints
 */



app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false,
    message: "Mark Rosenberg's API",
    documentation_url: "https://github.com/mrkrosenberg",
    base_url: "https://git.heroku.com/immense-sea-47144.git",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about Mark Rosenberg"},
      {method: "POST", path: "/api/music", description: "E.g. Create new music artists"} 
    ]
  })
});


app.get('/api/profile', function(req,res){
  res.json({
    name: "Remy Pearlstone",
    github_link: "https://github.com/mrkrosenberg/",
    github_profile_image: "",
    current_city: 'Denver', 
    pets:[{name: "Macdawg", species: "dire-wolf"}, {name: "Lupine Whisker-lickens", species: "sabretooth tiger"}]
  })
})


//index
app.get('/api/music', function(req,res){
  db.music.find(function(err, music){
    if (err) {
      return console.log ("Error:", err)
    }
    res.json(music)
  })

})

//show
app.get('/api/music/:id', function(req,res){
  db.music.findById(req.params.id, function(err, music){
    if (err) {return console.log("Error:", + err)}
    res.json(music);
  })
})
//create
app.post('/api/music', function(req,res){
  var newMusic = new db.music({
    name: req.body.name,
    songName: req.body.songName,
  })

  newMusic.save(function(err, music){
    if (err) {
      return console.log("create error: " + err);
    }
    console.log("created ", music.name);
    res.json(music);
  });
});

//update
app.put('/api/music/:id', function(req, res){
  db.music.findOneAndUpdate({_id: req.params.id }, {$set: {name: req.body.name, songName: req.body.songName}}, {new: true}, function(err, music){
    if (err) {return console.log("Error:", + err)}
    res.json(music);
  })
})

//delete
app.delete('/api/music/:id', function (req, res) {
  console.log(req.params)
  var musicId = req.params.id;

  db.music.findOneAndRemove({ _id: musicId }, function (err, deletedMusic) {
    res.json(deletedMusic);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
