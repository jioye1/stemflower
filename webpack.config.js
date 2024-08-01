const path = require('path');

module.exports = {
    entry: './src/index.js', // Your entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel to transpile your code if needed
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
