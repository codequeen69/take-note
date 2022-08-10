const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db.json')


//require  routes
const apiRoutes = require('./routes/apiRoutes/noteRoutes');
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes');


const PORT = process.env.PORT || 3001;
const app = express();
//if a request is given to this file give them the other files in the folder
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//can't fetch the body or different properties of fetch request without this
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//makes the server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});