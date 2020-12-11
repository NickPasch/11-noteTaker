// All requirements 
const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

var app = express();
// Establishing the port
var PORT = process.env.PORT || 8080;
// Ability to decipher all required data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
// Home page path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
// Note page path 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})
// JSON of note data
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        return res.json(JSON.parse(data));
    })
})
// Convert user input to JSON and add to data
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
