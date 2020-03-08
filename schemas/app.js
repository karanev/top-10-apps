const mongoose = require ('mongoose');

let Schema     = mongoose.Schema;

let app_schema = new Schema (
    {
        id   : { type : String, required : true },
        rank : { type : Number, required : false },
        name : { type : String, required : true  },
    }
);

module.exports = app_schema;