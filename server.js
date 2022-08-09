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