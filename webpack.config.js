const path = require('path');

module.exports = {
    // Other webpack config settings
    output: {
        path: path.resolve(__dirname, 'public'), // Change this line to 'public'
        filename: 'bundle.js'
    }
    // Other settings
};
