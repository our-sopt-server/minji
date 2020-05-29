var express = require('express');
var router = express.Router();
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let PostModel = require('../models/post');

// 모든 게시글 조회
router.get('/', async (req, res) => {
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_ALL_POST_SUCCESS, await PostModel.getPostAllRead()));
});

// 게시글 고유 id를 조회
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const result = await PostModel.getPostRead(id);

    // 해당 게시글 존재하지 않음
    if (result.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
    }

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, result));
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

    const postIdx = await PostModel.postUpload(author, title, content);

    res.status(statusCode.CREATED)
        .send(util.success(statusCode.OK, resMessage.CREATED_POST_SUCCESS, {
            postIdx: postIdx
        }));
});


// 게시글 고유 id 값을 가진 게시글 수정
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const {
        title,
        content
    } = req.body;

    // 하나라도 작성되지 않았을 경우 null_value 에러
    if (!title || !content)
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));


    await PostModel.postUpdate(id, title, content); //업데이트 하고
    const result = await PostModel.getPostRead(id); //수정된 글 상세조회

    // 해당 게시글 존재하지 않음
    if (result.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));
    }

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.MODIFY_POST_SUCCESS, result));
});



// 게시글 고유 id 값을 가진 게시글 삭제
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    var result = await PostModel.getPostRead(id);

    // 해당 게시글 존재하지 않음
    if (result.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_FAIL));

    }

    await PostModel.postDelete(id);
    result = await PostModel.getPostAllRead();

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.DELETE_POST_SUCCESS, {
            result
        }));
});


module.exports = router;