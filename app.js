require('dotenv').config();
const express = require('express');
const { PORT } = require('./config/constants');

const app = express();

require('./startups/env')();
require('./startups/routes')(app);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
