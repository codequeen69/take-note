const path = require('path');
const router = require('express').Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});


//will return the  notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
});


//wildcard! Will be directed to the homepage if a path doesn't work out. Must come last!
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});

module.exports = router;

