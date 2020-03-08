const mongoose = require ('mongoose');

const db_url   = 'mongodb+srv://toptenapps:toptenapps@cluster0-edzww.mongodb.net/test?retryWrites=true&w=majority';

let connection = mongoose.createConnection (db_url, {
    useNewUrlParser : true
});

function db () {
    return connection;
}

module.exports.db = db;