var express = require("express");
var path = require("path");
var http = require("http")
var fs = require("fs");
var database = require("./data/db.json")

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


    database.push(newNote);
      
      dbJSON = JSON.stringify(database);
   
     

    fs.writeFile('data/db.json', dbJSON, function(err) {
    if(err) {console.log(err);
     }});
 
  });
    
  
  app.delete("/api/notes/:id", (req, res) => {
    
    const idParam = req.params.id;
  
    
   for (var i = 0; i < database.length; i++) {
    if (idParam === database[i].id) {
      var removeIndex = database.map(function(item) { return item.id; }).indexOf(idParam);
      console.log(removeIndex)
      database.splice(removeIndex, 1)
      }
    }

      (async () => {
        await fs.writeFile('data/db.json', JSON.stringify(database), err => {
          if(err) throw err;
        })
      })()
    return ("you messed up")
  })

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });






