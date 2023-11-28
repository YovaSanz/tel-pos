const mariadb = require('mariadb');

const config = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'telpos',
};


const pool = mariadb.createPool(config);

module.exports = pool;