// We use this because we are making multiple connections to the DB from the controllers files and the seed file
const sqlite3 = require('sqlite3').verbose();

const ConnectToDB = () => {
    let db = new sqlite3.Database('./database/main.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error(err.message);
            process.exit(1);  //documentation can be found here for this function https://nodejs.org/api/process.html#process_process_exit_code
        }
    });

    db.get("PRAGMA foreign_keys = ON");  // Turn on foreign keys for the DB connection https://stackoverflow.com/a/53085206

    return db;  // Return the connection to the calling function
};

module.exports = ConnectToDB;  //export the constant "ConnectToDB" so that we can make use of it outside this file