var express = require('express');
var router = express.Router();
let UserModel = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
var crypto = require('crypto');

/* 
    ✔️ sign up
    METHOD : POST
    URI : localhost:3000/user/signup
    REQUEST BODY : id, name, password, email
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/

// 3단계
router.post('/signup', async (req, res) => {
  const {
    id,
    name,
    password,
    email
  } = req.body;
  // request data 확인 - 없다면 Null Value 반환
  if (!id || !name || !password || !email) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  //already ID
  if (await UserModel.checkUser(id) === true) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }

  const salt = crypto.randomBytes(32).toString('hex'); //랜덤 솔트값

  const idx = await UserModel.signup(id, name, password, salt, email);

  if (idx === -1) {
    return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
  }
  res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
      userId: idx
    }));
});

/* 
    ✔️ sign in
    METHOD : POST
    URI : localhost:3000/user/signin
    REQUEST BODY : id, password
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/
router.post('/signin', async (req, res) => {
  // request body 에서 데이터 가져오기
  const {
    id,
    password
  } = req.body;
  // request data 확인 - 없다면 Null Value 반환
  if (!id || !password) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }
  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (await UserModel.checkUser(id) === false) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }


  // 비밀번호 확인 - 없다면 Miss match password 반환
  if (await UserModel.signin(id, password) === false) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    return;
  }

  // 성공 - login success와 함께 user Id 반환
  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
    userId: id
  }));
});

/* 
    ✔️ get profile
    METHOD : GET
    URI : localhost:3000/user/profile/:id
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User Id, name, email
*/
router.get('/profile/:id', async (req, res) => {
  // request params 에서 데이터 가져오기
  const id = req.params.id;

  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (await UserModel.checkUser(id) === false) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  // id로 User 받아옴
  const result = await UserModel.getUserById(id);

  const data = {
    id: result[0].id,
    name: result[0].name,
    email: result[0].email
  }

  // 성공 - login success와 함께 user 반환
  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS,
    data));
});
module.exports = router;