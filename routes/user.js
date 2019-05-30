const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const auth = require('../auth');
const errors = require('restify-errors');

module.exports = server => {
    server.post('/auth/register', async (req, res, next) => {
        const { email, password } = req.body;
        try {
            User.findOne({email}, (err, userFromDb) => {
                if (userFromDb) {
                    return next(new errors.BadRequestError(`User with the email ${email} exists`));
                }
                const user = new User({
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, async (err, hashedPassword) => {
                        user.password = hashedPassword;
                        const userToSave = await user.save();
                        res.send(201);
                        next();
                    });
                });
            });

        } catch (error) {
            return next(new errors.BadRequestError(error.message));
        }
    
    });
    server.post('/auth/login', async (req, res, next) => {
        const {email, password} = req.body;
        try {
          const result =  await auth.authenticate(email, password);
          jwt.sign({
              email
          }, config.JWT_SECRET, {expiresIn: '15m'}, (err, token) => {
              const {iat, exp} = jwt.decode(token);
              res.send({iat, exp, token});
              next();
          });    
        } catch (error) {
           return next(new errors.UnauthorizedError('Invalid Username or Password')); 
        }
    })
}