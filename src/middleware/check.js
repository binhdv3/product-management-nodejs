const jwt = require('jsonwebtoken');
const db = require('../config/db/index');
const User = require('../app/models/User')
require('dotenv').config();

// const middleware = {
//     verifyToken: (req, res, next) => {
//         const token = req.headers.token;
//         if(token){
//             const acssessToken = token.split(" ")[1]
//             jwt.verify(acssessToken, db.secret, (err, user)=> {
//                 if(err){
//                     res.status(403).json('token is not valid');
//                 }
//                 req.user = user;
//                 next();
//             })
//         }else{
//             console.log('you are not authenticated');   
//             res.redirect('/loginsignup/login')
//         }
//     }
// }

const check = async (req, res, next) => {

    let header_token = req.headers;

    if (typeof(header_token) == 'undefined') {
        return res.status(403).json({ msg: 'Không xác định token' });
    }

    // const token = header_token.replace('Bearer ', '')
    console.log('<-------------headers---'+ header_token + '------------->');

    try {
        const data = jwt.verify(token, ' ')
        console.log(data);
        const user = await User.findOne({ _id: data._id})
        if (!user) {
            throw new Error("Không xác định được người dùng")
        }
        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: error.message })
    }

}

module.exports = { check };