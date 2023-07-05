
const express = require('express');
const cors = require('cors');
const main = require('./router/main')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/", main)

const port = 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
