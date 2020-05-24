// module.exports = {
//     signup: async (req, res) => {
//         const {
//             id,
//             name,
//             password,
//             email
//         } = req.body;
//         if (!id || !name || !password || !email) {
//             res.status(statusCode.BAD_REQUEST)
//                 .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
//             return;
//         }
//         // 사용자 중인 아이디가 있는지 확인
//         if (await UserModel.checkUser(id)) {
//             res.status(statusCode.BAD_REQUEST)
//                 .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
//             return;
//         }
//         const {
//             salt,
//             hashed
//         } = await encrypt.encrypt(password);
//         const idx = await UserModel.signup(id, name, hashed, salt, email);
//         if (idx === -1) {
//             return res.status(statusCode.DB_ERROR)
//                 .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
//         }
//         res.status(statusCode.OK)
//             .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
//                 userId: idx
//             }));
//     });
// }

// module.exports = user;