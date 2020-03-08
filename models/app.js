const Schema = require ('../schemas/app');
const db     = require ('../common/db');

const connection = db.db ();
const Model      = connection.model ('app', Schema);

const model = {};

model.save = async function (app_data) {
    if (!Model)
        throw new Error ('DB not ready yet');
    
    const response = await Model.create (app_data);

    return response;
}

model.getTopTenApps = async function () {
    if (!Model)
        throw new Error ('DB not ready yet');
    
    const response = await Model.find ({ rank : { $lte : 10 }}).exec ();

    return response;
}

model.removeRanks = async function () {
    if (!Model)
        throw new Error ('DB not ready yet');
    
    const response = await Model.update ({}, { rank : null });

    return response;
}

model.upsertByAppId = async function (id, app_data) {
    if (!Model)
        throw new Error ('DB not ready yet');
    
    const response = await Model.updateOne ({ id : id }, app_data, { upsert : true });

    return response;
}

module.exports = model;