module.exports = {
    PORT: process.env.PORT || 9000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/customer-api',
    JWT_SECRET: process.env.JWT_SECRET || 'fhdfgasafeshnrdgtreytr'
}