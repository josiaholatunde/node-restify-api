const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.use(rjwt({secret: config.JWT_SECRET}).unless({path: ['/auth/login','/auth/register']}));

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/customer')(server);
    require('./routes/user')(server);
    console.log(`Server running on port ${config.PORT}`);
});