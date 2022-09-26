const express = require('express') ;
const app = express();

const cors = require('cors');
app.use(cors());

const dataRouter = require('./routers/DataRouter');

function requestListener(req, res) {
    console.log('Server is running...');
}

function getRoot(req, res) {
    res.send('<h1>REST API Server</h1>\
  <h3>Get request.</h3>');
}

function getPosts(req, res) {
    const posts = [{"pages":23, "data":{"first":"1","second":"2"}}];
    res.json(posts);
}

app.use(express.static('public'));
app.use(express.json());

app.use('/getdata', cors(), dataRouter);

app.get('/', getRoot);
app.get('/posts', getPosts);

app.listen(process.env.PORT || 3000, requestListener);
