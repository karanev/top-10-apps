const axios   = require ('axios');
const cheerio = require ('cheerio');
const model   = require ('./models/app');

const apps_controller = {};

apps_controller.getTopTenApps = async function (req, res) {
    /*
    get top 10 apps from DB
    */
    let top_ten_apps;
    try {
        top_ten_apps = await model.getTopTenApps ();
    } catch (err) {
        console.error ({err : err, message : err.message, stack : err.stack});
        return res.send ({err : err, message : err.message});
    }

    /*
    send these apps
    */
    res.send ({data : top_ten_apps});
};

apps_controller.getAppDetails = function (req, res) {
};

apps_controller.refreshDB = async function (req, res) {
    /*
    get the page listing all the top apps
    */
    let top_apps;
    try {
        top_apps = await axios.get ('https://play.google.com/store/apps/collection/topselling_free');
    } catch (err) {
        console.error ({err : err, message : err.message, stack : err.stack});
        return res.send ({err : err, message : err.message});
    }

    /*
    remove ranks of previous top 10s
    */
    try {
        await model.removeRanks ();
    } catch (err) {
        console.error ({err : err, message : err.message, stack : err.stack});
        return res.send ({err : err, message : err.message});
    }

    /*
    parse the apps names
    */
    const $ = cheerio.load (top_apps.data);
    const apps_data  = $('div.vU6FJ.p63iDd').map (function (index, divName) {
        let app_id   = parse_id_from_url ($('a.JC71ub', this).attr ('href'));
        let app_data = { id : app_id, rank : index + 1, name : $('div.WsMG1c.nnK0zc', this).text () }

        return app_data;
    }).get ();

    for (const app_data of apps_data) {
        // TODO
        // user bulkWrite to update in one batch
        try {
            await model.upsertByAppId (app_data.id, app_data);
        } catch (err) {
            console.error ({err : err, message : err.message, stack : err.stack});
            return res.send ({err : err, message : err.message});
        }
    }

    res.send ({data : apps_data});
};

parse_id_from_url = function (url) {
    let __url = new URL (url, 'https://play.google.com/');
    return __url.searchParams.get ('id');
};

module.exports = apps_controller;