const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    
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

  router.post('/', (req, res) => {
    console.log('POST /toDoList');
    let date = req.body.date;
    let todo = req.body.todo;
    let is_Complete= req.body.is_Complete
   
  
    let sqlText = `
      INSERT INTO "toDoList"
        ("date", "todo","is_Complete")
        VALUES
        ($1, $2, $3);
    `;
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


router.put('/:id', (req, res) => {

    let theIdToUpdate = req.params.id;
  

    let is_Complete = req.body.is_Complete;
  
    let sqlText = `
      UPDATE "toDoList"
        SET "is_Complete"=$1
        WHERE "id"=$2;
    `
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

  router.delete('/:id', (req, res) => {

    let theIdToDelete = req.params.id;

    let sqlText = `
      DELETE FROM "toDoList"
        WHERE "id"=$1;
    `
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


  module.exports = router;