const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    const conditions = {
      равно: 'equals',
      содержит: 'contains',
      больше: 'more',
      меньше: 'less'
    };

    response.status(200).json(conditions);
});

module.exports = router;
