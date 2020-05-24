const pool = require('../modules/pool');
const table = 'user';

const user = {
        //회원가입을 위한 데이터베이스 접근 로직
        signup: async (id, name, password, salt, email) => {
            const fields = 'id, name, password, salt, email';
            const questions = `?, ?, ?, ?, ?`; //parameter로 들어오는 값의 기호 ``
            const values = [id, name, password, salt, email];
            const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
            try {
                const result = await pool.queryParamArr(query, values);
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
                if (result.length == 0) {
                    return false;
                } else return true;
            } catch (err) {
                throw err;
            }
        }
    },
    signin: async (id, password) => {},
}

module.exports = user;