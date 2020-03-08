const express         = require ('express');
const apps_controller = require ('./apps-controller');

/*
connect to database
*/
const mongodb         = require ('./common/db');

const app             = express ();

app.get ('/',           apps_controller.getTopTenApps);
app.get ('/appdetails', apps_controller.getAppDetails);

app.get ('/refresh',    apps_controller.refreshDB);

const port    = process.env.PORT || 3000;
app.listen (port, () => console.log (`App listening on port ${port}`));