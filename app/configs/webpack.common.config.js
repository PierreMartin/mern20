const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();

exports.commonConfig = {
    entry: {
        app: './src/client.jsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(CURRENT_WORKING_DIR, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            /*
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            */
        ]
    }
};
