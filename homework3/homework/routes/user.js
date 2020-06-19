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

// 1단계
// router.post('/signup', async (req, res) => {
//     const { id, name, password, email } = req.body;
//     User.push({id, name, password, email});
//     res.status(200).send(User);
// });

// 2단계
// router.post('/signup', async (req, res) => {
//     const { id, name, password, email } = req.body;
//     // request data 확인 - 없다면 Bad Request 반환
//     if ( !id || !name || !password || !email ) {
//         return res.status(400).send({ message: 'BAD REQUEST' });
//     }
//     //already ID
//     if (User.filter(user => user.id == id).length > 0) {
//         return res.status(400).send({ message: 'ALREADY ID' });
//     }
//     User.push({id, name, password, email});
//     res.status(200).send(User);
// });

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
  if (UserModel.filter(user => user.id == id).length > 0) {
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }


  const salt = crypto.randomBytes(32).toString('hex'); //랜덤 솔트값
  //사용자로부터 받은 비밀번호에 salt를 쳐서 hashed한다.
  const hashedPassword = crypto.pbkdf2Sync(password, salt.toString(), 100000, 32, 'sha512').toString('hex');

  UserModel.push({
    id,
    name,
    password: hashedPassword, //비밀번호를 hashed로 변환해 넣는 것
    salt, //salt도 저장
    email
  });

  res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
      userId: id
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
  const user = UserModel.filter(user => user.id == id);
  if (user.length == 0) { //길이가 0이라는 것은 아무것도 없다는 뜻
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }


  //사용자로부터 받은 비밀번호에 salt를 쳐서 hashed한다.
  const hashedPassword = crypto.pbkdf2Sync(password, user[0].salt.toString(), 100000, 32, 'sha512').toString('hex');

  // 비밀번호 확인 - 없다면 Miss match password 반환
  if (user[0].password != hashedPassword) { //찾은 user의 패스워드가 입력한 패스워드와 다르다면,
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
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

  // param data 확인 - 없다면 Null Value 반환
  if (!id) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  // id가 같은게 있으면 새로운 배열의 [0]에 넣어서 user에 저장.
  const user = UserModel.filter(user => user.id == id)[0];

  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (user.length == 0) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }
  const data = {
    id: user.id,
    name: user.name,
    email: user.email
  }
  // 성공 - login success와 함께 user 반환
  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS,
    data
  ));
});
module.exports = router;