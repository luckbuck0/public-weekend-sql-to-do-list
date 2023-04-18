const router = require('express').Router();
const pool = require('/Users/LuckieBah/Documents/Coding/wk9/full-stack-treats/server/modules/pool');

router.get('/', (req, res) => {
    
    let sqlText = 'SELECT * FROM "toDoList";';
  

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


  module.exports = router;