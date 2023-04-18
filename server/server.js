
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

const toDoList = require('./routes/todoroutes');

app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/toDoList', toDoList);

app.listen(PORT, () => {
  console.log('Now listening on port: ', PORT);
});
