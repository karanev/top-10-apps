const express = require ('express');

const port    = process.env.port || 3000;

const app     = express ();

app.get ('/', (req, res) => res.send ('send top 10 apps'));

app.listen (port, () => console.log (`App listening on port ${port}`));