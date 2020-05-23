const mysql = require('promise-mysql');

const dbConfig = {
    host: 'db-our-sopt.c6dyeqqc4qhu.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'alswld135',
    database: 'Sopt' //내부 DB중 어떤 DB에 접근할거야?
}
module.exports = mysql.createPool(dbConfig);