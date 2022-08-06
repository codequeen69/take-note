const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
//can't fetch the body or different properties of fetch request without this
app.use(express.json());
//if a request is given to this file give them the other files in the folder
app.use(express.static('public'));

function createNewNote(){

}
const addNewNote = newNote => {
    //read db to get data saved
    fs.readFile('/db/db.json', 'utf8', (err, data) =>{

    })
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({})
    )
}

app.get('/api/notes', (req, res) =>{
    let results = note
    res.json(results);
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname,'./public/notes.html' ))
})
app.post('/api/notes', (req, res)=> {
    const note = {
        id: uniqid.time(),
        title: req.body.title,
        description: req.body.description
    }
    console.log(note.id);
 
})







//makes the server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});