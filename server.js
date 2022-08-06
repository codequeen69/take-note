const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { notes } = require('./db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();
//if a request is given to this file give them the other files in the folder
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

//can't fetch the body or different properties of fetch request without this
app.use(express.json());


// function createNewNote(){

// }
// const addNewNote = newNote => {
//     //read db to get data saved
//     fs.readFile('/db/db.json', 'utf8', (err, data) =>{

//     })
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify({})
//     )
// }

app.get('/api/notes', (req, res) =>{
    let results = notes
    res.json(results);
    console.log(results)
})

//will receive a new note to save on the req body, add to db.json
//file then return the new note to the client. Give each note unique id with an npm package.
app.post('/api/notes', (req, res)=> {
    console.info(`${req.method} request received to add a note`)
    const {title, text} = req.body
    const newNote = {
        title: req.body.title,
        text: req.body.description,
        id: uuidv4()
    }
    console.log(newNote);
    console.log(newNote.id);
 
    //get existing notes from db file
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if (err){
            throw err;
        }else{
            //convert string to JSON object
            const parsedNotes = JSON.parse(data);

            //add new note
            parsedNotes.push(newNote);

            //write new note back to db file
            fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedNotes, null, 4),
                (err)=>{
                    if(err){
                        throw err;
                    }else console.info('Successfully added note!');
                    
                }
            )
        }
    })
})


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
});



//makes the server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});