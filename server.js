var express = require("express");
var path = require("path");
var http = require("http")
var fs = require("fs");
// var uniqid = require('uniqid')
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/notes', express.static('static'))
app.use('/static', express.static('static'))

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "html/index.html"));
  });


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "html/notes.html"));
  });

  app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "data/db.json"));
  });

  app.post("/api/notes", function(req, res) {
   
    const newNote = req.body;

    fs.readFile('data/db.json', function(err, dbJSON) {
      if (err) {
          console.log(err);
      }

      var database = JSON.parse([dbJSON]);
      console.log(database)
      database.push(newNote);
      dbJSON = JSON.stringify(database);

    fs.writeFile('data/db.json', dbJSON, function(err) {
    if(err) {console.log(err);
     }});

  });
    console.log(newNote);
  
     ;
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });