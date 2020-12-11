// All requirements 
const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

var app = express();
// Establishing the port
var PORT = process.env.PORT || 8080;
// Ability to decipher all required data
// First one to parse data with qs library
app.use(express.urlencoded({extended:true}));
// Second to parse JSON data
app.use(express.json());
// Create the directory to the public file for express 
app.use(express.static('public'));
// Home page path for displaying home page, uses fs and express
// express to route it and file system to read it 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
// Note page path using express and file system
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})
// JSON of note data, JSON express and fs 
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        return res.json(JSON.parse(data));
    })
})
// Convert user input to JSON and use fs to write it to the .json file
// db.json in the db folder so it can be read with the app.get above
app.post("/api/notes", (req, res) =>{
    console.log(req.body);
    req.body["id"] = notes.length + 1;
    notes.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
        if (err) throw err;
        return res.json(req.body);
    })
})
// When the delete button is clicked, delete the note with the trashcan's ID
app.delete("/api/notes/:id", (req, res) =>{
    let ID = req.params.id;
    for(i=0;i<notes.length;i++){
        if(notes[i].id == ID){
            notes.splice(i, 1)
            fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
                if (err) throw err;
                return;
            })
        }
    } 
    res.end()
})


app.listen(PORT, () => {
    console.log("Hello world!")
});
