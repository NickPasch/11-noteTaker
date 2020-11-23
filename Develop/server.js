const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        return res.json(JSON.parse(data));
    })
})

app.post("/api/notes", (req, res) =>{
    console.log(req.body);
    req.body["id"] = notes.length + 1;
    notes.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
        if (err) throw err;
        return res.json(req.body);
    })
})

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