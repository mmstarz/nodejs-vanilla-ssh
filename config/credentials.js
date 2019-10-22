if (process.env.NODE_ENV === 'production') {
    // production set of keys
    module.exports = require('./production');
} else {
    // development set of keys
    module.exports = require('./development');
}