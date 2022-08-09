const router = require('express').Router();
const path = require('path');
const {createNewNote, deleteNote} =require('../../lib/notes');
const notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    console.log(results)
    res.json(results);
})

//will receive a new note to save on the req body, add to db.json
//file then return the new note to the client. Give each note unique id with an npm package.
router.post('/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
   
});

//delete a note by id
router.delete('/notes/:id', function (req, res) {
    deleteNote(req.params.id, notes);
    res.json(true);
});

module.exports = router;