const fs = require('fs');
const path = require('path');
const express = require('express');
const uniqid = require('uniqid'); 
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();
//if a request is given to this file give them the other files in the folder
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

//can't fetch the body or different properties of fetch request without this
app.use(express.json());

app.get('/api/notes', (req, res) =>{
    let results = notes;
    console.log(results)
    res.json(results);
})

//will receive a new note to save on the req body, add to db.json
//file then return the new note to the client. Give each note unique id with an npm package.
app.post('/api/notes', (req, res)=> {

   // if any data in req.body is incorrect, send 400 error back
   if (!validateNote(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
} else {
    const note = createNewNote(req.body, notes);
    res.json(note);
}
});


function createNewNote(body, notesArray) {
    const newNote = {
        title: body.title,
        text: body.text,
        id: uniqid()
    };
    //read db to get data saved
    // fs.readFile('/db/db.json', 'utf8', (err, data) =>{
    //     if (err){
    //         throw err;
    //     }else{
    //         //convert string to JSON object
    //         const parsedNotes = JSON.parse(data);

    //         //add new note
    //         parsedNotes.push(newNote);

    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2),
        (err)=>{
            if(err){
                throw err;
            }else console.info('Successfully added note!');
        }
    )
    return newNote;
};

function validateNote(note){
    if (!note.title || typeof note.title !== 'string'){
        return false;
    }if (!note.text || typeof note.text !=='string'){
        return false;
    }
}
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

//will return the  notes.html
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname,'./public/notes.html' ))
})


//wildcard! Will be directed to the homepage if a path doesn't work out. Must come last!
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '.public/index.html'))
})



//makes the server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});