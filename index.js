const express = require('express') ;
const app = express();

function requestListener(req, res) {
    console.log('hey');
}

function getRoot(req, res) {
    res.send('Api');
}

function getPosts(req, res) {
    res.json(posts);
}

app.get('/', getRoot);
app.get('/posts', getPosts);

app.listen(process.env.PORT || 3000, requestListener);
