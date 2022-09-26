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

function getFilter(column, condition, search) {
    let str = '';

    switch(condition) {
        case 'equals':
            str = `${column}='${search}'`;
            break;
        case 'contains':
            const fixColumn = isNaN(column) ? column : `${column}::varchar(255)`;
            str = `${fixColumn} like '%${search}%'`;
            break;
        case 'more':
            str = `${column}>'${search}'`;
            break;
        case 'less':
            str = `${column}<'${search}'`;
            break;
    }

    return str;
}

const ITEMS_ON_PAGE = 5;

async function getDataByPage(page, sort, order, search, column, condition) {
    const startNumber = (page - 1) * ITEMS_ON_PAGE;
    const orderBy = (sort == null || sort === '') ? '' : `ORDER BY ${sort} ${order}`;
    const filter = (search == null || search === '') ? '' : 'WHERE ' + getFilter(column, condition, search) ;
    const dataSql = `SELECT * FROM data ${filter} ${orderBy} LIMIT ${ITEMS_ON_PAGE} OFFSET ${startNumber}`;
    const countSql = `SELECT COUNT(*) AS _amount FROM data ${filter}`;
console.log(filter);
    try {
        const dataResponse = await client.query(dataSql);
        const countResponse = await client.query(countSql);

        return {
            "data": dataResponse.rows,
            "count": countResponse.rows[0]._amount
        };
    } catch (error) {
        console.log(error);
    }
}

async function getData (request, response) {
  const dataRes = await getDataByPage(request.query.page, request.query.sort, request.query.order, request.query.search, request.query.column, request.query.condition);

  const pages = Math.ceil(dataRes.count / ITEMS_ON_PAGE);
  const newData = {
    "pages": pages,
    "data": dataRes.data
  };

  response.status(200).json(newData);
}

router.get('/', async function(req, res) {
    getData(req, res);
});

module.exports = router;
