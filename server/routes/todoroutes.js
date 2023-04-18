//-------------------------CALLING ---------------------------------
// calling the router from express
const router = require('express').Router();
// calling the pool js file with our database
const pool = require('../modules/pool');

//-------------------------GET ROUTE---------------------------------

// creating a get route 
router.get('/', (req, res) => {
    // sql text to send to database
    let sqlText = 'SELECT * FROM "toDoList";';
  
    // Send a sql query to our database:
    pool.query(sqlText)
      .then((dbRes) => {
        let toDoList = dbRes.rows;
        res.send(toDoList)
      })
      .catch((dbErr) => {
        console.log('SQL query in GET /list failed:', dbErr)
        res.sendStatus(500);
      })
   
  })

//-------------------------POST ROUTE---------------------------------
// creating a post route to send info to database
  router.post('/', (req, res) => {
    console.log('POST /toDoList');
    // getting the properties from the req obtained from dom
    // and capturing them in a variable
    let date = req.body.date;
    let todo = req.body.todo;
    let is_Complete= req.body.is_Complete
   
  // sql text that inserts items in the database
    let sqlText = `
      INSERT INTO "toDoList"
        ("date", "todo","is_Complete")
        VALUES
        ($1, $2, $3);
    `;

    // capturing the properties from the req from the js
    let sqlValues = [date, todo,is_Complete]

    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log('POST /list error:', dbErr);
        res.sendStatus(500);
      })
  })

//-------------------------PUT ROUTE---------------------------------
// creating a put request to update something from server
router.put('/:id', (req, res) => {
// capturing the id from the req data taken from client side
    let theIdToUpdate = req.params.id;
  
// capturing the is complete info from the req data taken from client side
    let is_Complete = req.body.is_Complete;
  // sql text to update certain properties
    let sqlText = `
      UPDATE "toDoList"
        SET "is_Complete"=$1
        WHERE "id"=$2;
    `
    // capturing the properties from req
    let sqlValues = [is_Complete, theIdToUpdate];
  
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        console.log('PUT /treats/:id fail:', dbErr);
        res.sendStatus(500);
      })
    
  
  })

  //-------------------------DELETE ROUTE---------------------------------

  // creating a delete request
  router.delete('/:id', (req, res) => {
// identifying the id
    let theIdToDelete = req.params.id;
// sql text to delete something from database
    let sqlText = `
      DELETE FROM "toDoList"
        WHERE "id"=$1;
    `
    // capturing the prop id
    let sqlValues = [theIdToDelete]
  
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
    
        res.sendStatus(200); 
      })
      .catch((dbErr) => {
        console.log('delete /toDoList error:', dbErr);

        res.sendStatus(500);
      })
  })

// used to allow for exports
  module.exports = router;