const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');

const upload = require('../modules/multer');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/
router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);
//포스트맨 body, form-data에 key값을 profile로 주면 실행됨

/* 
    ✔️ update selfies
    METHOD : POST
    URI : localhost:3000/user/selfies
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image files ⭐️
    RESPONSE DATA : user profile
*/
router.get('/selfies', AuthMiddleware.checkToken, UserController.getAllSelfie);
router.post('/selfies', AuthMiddleware.checkToken, upload.array('selfies', 10), UserController.uploadSelfie);

module.exports = router;