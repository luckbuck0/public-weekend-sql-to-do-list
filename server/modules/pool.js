
//-------------------------DATABASE IDENTIFYER---------------------------------
// calling pg
const pg = require('pg');

// telling pg where to find our database
const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'weekend-2-do-app', 
});

// exporting pool
module.exports = pool;