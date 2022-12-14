const express = require('express') ;
const app = express();

const cors = require('cors');
app.use(cors());

const dataRouter = require('./routers/DataRouter');
const columnRouter = require('./routers/ColumnsRouter');
const conditionRouter = require('./routers/ConditionsRouter');

function requestListener(req, res) {
    console.log('Server is running...');
}

function getRoot(req, res) {
    res.send('<h1>REST API Server</h1>\
  <h3>Get request.</h3>');
}

app.use(express.static('public'));
app.use(express.json());

app.use('/getdata', cors(), dataRouter);
app.use('/getcolumns', cors(), columnRouter);
app.use('/getconditions', cors(), conditionRouter);

app.get('/', getRoot);

app.listen(process.env.PORT || 3000, requestListener);
