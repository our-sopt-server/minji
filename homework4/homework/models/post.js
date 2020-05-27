const pool = require('../modules/pool');
const table = 'post';

let moment = require('moment');

const post = {

    // 게시글 전체 조회
    getPostAllRead: async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('postAllRead ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('postAllRead ERROR : ', err);
            throw err;
        }
    },

    // 게시글 상세 조회
    getPostRead: async (id) => {
        const query = `SELECT * FROM ${table} WHERE postIdx=${id}`;
        try {
            const result = await pool.queryParam(query); //query문에 values를 넣어 결과를 받아옴
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('postRead ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('postRead ERROR : ', err);
            throw err;
        }
    },

    // 게시글 업로드
    postUpload: async (author, title, content) => {

        // 게시글 업로드 날짜 설정(moment 모듈 사용) --> 설치 npm install --save moment
        const createdAt = moment().format("YYYY년 MM월 DD일");

        const fields = 'author, title, content, createdAt';
        const questions = `?, ?, ?, ?`;
        const values = [author, title, content, createdAt];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values); //query문에 values를 넣어 결과를 받아옴
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('postUpload ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('postUpload ERROR : ', err);
            throw err;
        }
    },

    // 특정 게시글 수정
    postUpdate: async (id, title, content) => {
        const query = `UPDATE ${table} SET title="${title}", content = "${content}" where postIdx="${id}"`;

        try {
            await pool.queryParam(query);

        } catch (err) {
            if (err.errno == 1062) {
                console.log('postUpdate ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('postUpdate ERROR : ', err);
            throw err;
        }
    },

    // 특정 게시글 삭제
    postDelete: async (id) => {
        const query = `DELETE FROM ${table} where postIdx="${id}"`;

        try {
            await pool.queryParamArr(query);

        } catch (err) {
            if (err.errno == 1062) {
                console.log('postDelete ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('postDelete ERROR : ', err);
            throw err;
        }
    }

}


module.exports = post;