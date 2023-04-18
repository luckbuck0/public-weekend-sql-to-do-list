
//-------------------------SERVER CODE---------------------------------

// calling express
const express = require('express');

// initiating express
const app = express();

// calling body parser
const bodyParser = require('body-parser');

// setting 5000 to Port
const PORT = 5000;

// calling the todoroutes js file that contains all routes
const toDoList = require('./routes/todoroutes');

// identify the server/public file
app.use(express.static('./server/public'));

// boiler plate
app.use(bodyParser.urlencoded({ extended: true }));

// telling js to use todolist for every todolist request
app.use('/toDoList', toDoList);

// telling js to listen on port 5000
app.listen(PORT, () => {
  console.log('Now listening on port: ', PORT);
});
