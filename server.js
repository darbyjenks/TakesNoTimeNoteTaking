const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const apiRoute = require('./routes/apiRoutes');
const htmlRoute = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.use('/api', apiRoute);
app.use('/', htmlRoute);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

