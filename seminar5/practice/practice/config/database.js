const mysql = require('promise-mysql');

const dbConfig = {
    host: 'db-our-sopt.c6dyeqqc4qhu.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'alswld135',
    database: 'test'
}

module.exports = mysql.createPool(dbConfig);