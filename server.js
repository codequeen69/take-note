const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db.json')
const uniqid = require('uniqid');

const PORT = process.env.PORT || 3001;
const app = express();
//if a request is given to this file give them the other files in the folder
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

//can't fetch the body or different properties of fetch request without this
app.use(express.json());

app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(results)
    res.json(results);
})

//will receive a new note to save on the req body, add to db.json
//file then return the new note to the client. Give each note unique id with an npm package.
app.post('/api/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
   
});


function createNewNote(body, notesArray) {
    let newNote = {
        title: body.title,
        text: body.text,
        id: uniqid()
    };
    notesArray.push(newNote);
    console.log(notesArray);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2),
    );
    return newNote;
};

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id === id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 4),
            );
            break;
        }
    }
}

//delete a note by id
app.delete('/api/notes/:id', function (req, res) {
    deleteNote(req.params.id, notes);
    res.json(true);
});


// function deleteNote(id, notesArray) {
//     for (var i=0; i<notesArray.length; i++) {
//         let note = notesArray[i];
//         if(note[i].id == id){
//           notesArray.splice(i, 1);
//           fs.writeFileSync(
//             path.join(__dirname, './db/db.json'),
//             JSON.stringify(notesArray, null, 2),
//         );
//         }
//     }

// }
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

//will return the  notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})


//wildcard! Will be directed to the homepage if a path doesn't work out. Must come last!
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '.public/index.html'))
})



//makes the server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});