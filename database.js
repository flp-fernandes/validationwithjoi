const sqlite3 = require('sqlite3').verbose();

// open  database in memory
let db = new sqlite3.Database('./db/chinook.db', err => {
    if (err) console.error(err.message)

    console.log('Connected to the Sqlite database.');
});

db.close(err => {
    if (err) console.error(err.message);

    console.log('Close the database connection.');
});