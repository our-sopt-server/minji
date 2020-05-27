const pool = require('../modules/pool');
const table = 'user';
const crypto = require('crypto');

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;
        const hashed = crypto.pbkdf2Sync(password, salt.toString(), 1, 32, 'sha512').toString('hex');
        const values = [id, name, hashed, salt, email]; //여기서 해쉬된 비밀번호를 DB에 넣어준다
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values); //query문에 values를 넣어 결과를 받아옴
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) { //길이가 0이라는 것은 id가 존재하지 않는 것
                return false;
            } else return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    signin: async (id, password) => {
        const query = `SELECT * FROM ${table} where id="${id}"`;

        try {
            const result = await pool.queryParam(query);
            const now_hashed = crypto.pbkdf2Sync(password, result[0].salt.toString(), 1, 32, 'sha512').toString('hex');

            if (result[0].password === now_hashed) { //result[0].password에 hash된 비밀번호 넣어줬었음
                return true;
            } else {
                return false;
            }

        } catch (err) {
            if (err.errno == 1062) {
                console.log('signin ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signin ERROR : ', err);
            throw err;
        }
    },
    getUserById: async (id) => {
        const query = `SELECT * FROM ${table} where id="${id}"`;

        try {
            const result = await pool.queryParam(query);

            return result;

        } catch (err) {
            if (err.errno == 1062) {
                console.log('getUser ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getUser ERROR : ', err);
            throw err;
        }
    }

}

module.exports = user;