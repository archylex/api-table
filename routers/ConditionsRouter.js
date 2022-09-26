const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    const columns = {
      Дата: '_date',
      Название: '_name',
      Количество: '_count',
      Расстояние: '_distance',
    };

    res.status(200).json(columns);
});

module.exports = router;
