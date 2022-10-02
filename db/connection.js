const mongoose = require('mongoose');
const config = require('../config');

let connection = mongoose.connect(config.mongoUrl);

mongoose.connection.on('connected', () => {
    console.info('DB connected successfully!');
});

mongoose.connection.on('error', (error) => {
    console.info('DB connection error', error);
});

module.exports = connection;