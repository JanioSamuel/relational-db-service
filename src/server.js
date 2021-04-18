const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./model/User');

async function load() { await database.sync(); }

load();

require('./workers/Consumer');

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000);