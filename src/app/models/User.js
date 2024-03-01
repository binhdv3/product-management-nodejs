const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const slug = require('mongoose-slug-generator');
require('dotenv').config();
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require('bcrypt-nodejs');
mongoose.plugin(slug);

const User = new mongoose.Schema({
    name: { type: String, require: true },
    adress: { type: String },
    password: { type: String },
    email: { type: String },
    token: {  // trường hợp lưu nhiều token thì phải dùng mảng. Trong demo này sẽ dùng 1 token
        type: String, required: false
    },
    slug: {type: String, slug : 'name'},
}, { 
    timestamps: true,
});

User.pre('save', function(next){
    const user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, (err, salt) => {
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt,null, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }else{
        return next();
    }
})

User.methods.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });  
}

User.methods.generateAuthToken = async function(){
    const user = this;
    console.log(user);
    const token = jwt.sign({email: user.email, password: user.password}, chuoi_ky_tu_bi_mat);
    user.token = token;
    await user.save();
    return token
}


 // dùng cho đăng nhập: 
 User.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email});

    if (!user) {
        throw new Error({error: 'Không tồn tại user'})
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Sai password'})
    }
    return user
}

module.exports = mongoose.model('User', User);