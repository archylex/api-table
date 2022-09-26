const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

router.get('/all', async function(req, res) {
    /*const { rows } = await client.query(`SELECT * FROM rating WHERE size='${size}'`);*/
    res.status(200).json([{"n":"1"}]);
});

module.exports = router;
