const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
   return new Promise(async (resolve, reject) => {
       try {
        const userFromDb = await  User.findOne({email});
        bcrypt.compare(password, userFromDb.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                resolve(userFromDb);
            } else {
                reject('Authentication Failed');
            }
        });
       } catch (error) {
           reject('Authentication Failed');
       }
    });
}