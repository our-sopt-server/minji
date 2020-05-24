var express = require('express');
var router = express.Router();
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let PostModel = require('../models/post');
let moment = require('moment');

// 모든 게시글 조회
router.get('/', async (req, res) => {
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_ALL_POST_SUCCESS, PostModel));
});

// 게시글 고유 id 값을 조회
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const post = PostModel.filter(post => post.postIdx == id);

    // 해당 게시글 존재하지 않음
    if (post.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));

    }

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, post[0]));
});

// 게시글 업로드
router.post('/', async (req, res) => {
    const {
        author,
        title,
        content
    } = req.body;

    // 하나라도 작성되지 않았을 경우 null_value 에러
    if (!author || !title || !content)
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));

    // 게시글 번호 생성(가장 마지막 게시글의 번호에 1을 더해서 부여)
    const postIdx = parseInt(PostModel[PostModel.length - 1].postIdx) + 1;

    // 게시글 업로드 날짜 설정(moment 모듈 사용) --> 설치 npm install --save moment
    const date = moment().format("YYYY년 MM월 DD일");

    // 성공했을 경우
    PostModel.push({
        postIdx,
        author,
        title,
        content,
        date
    });

    const post = PostModel.filter(post => post.postIdx == postIdx);

    res.status(statusCode.CREATED)
        .send(util.success(statusCode.OK, resMessage.CREATED_POST_SUCCESS,
            post[0]
        ));
});


// 게시글 고유 id 값을 가진 게시글 수정
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const {
        author,
        title,
        content
    } = req.body;

    // 하나라도 작성되지 않았을 경우 null_value 에러
    if (!author || !title || !content)
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));


    const post = PostModel.filter(post => post.postIdx == id);

    // 해당 게시글 존재하지 않음
    if (post.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
    }

    // 게시글 제목, 내용, 작성자 갱신
    post[0].title = title;
    post[0].content = content;
    post[0].author = author;

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.MODIFY_POST_SUCCESS, post[0]));
});



// 게시글 고유 id 값을 가진 게시글 삭제
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const post = PostModel.filter(post => post.postIdx == id);

    // 해당 게시글 존재하지 않음
    if (post.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));

    }

    //모델의 id값을 가진 원소 제거
    PostModel.splice(id, 1);

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.DELETE_POST_SUCCESS, {
            delete: id
        }));
});


module.exports = router;