const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) { //pre save hook. This will run when we attempt to save a user
    const user = this; // when this function is called the user data can be accessed using "this"
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err){
                return reject(err);
            } if(!isMatch) {
                return reject(false);
            }
            return resolve(true);
        })
    })

}

mongoose.model('User', userSchema);