const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CURRENT_WORKING_DIR = process.cwd();

module.exports = (env = {}) => {
    const isServerSide = env.server;

    const configuration = {
        mode: 'production',
        entry: {
            app: './src/client.jsx',
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

                // Css minify:
                {
                    test: [/\.less$/, /\.css$/],
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
                }
            ]
        },

        // Css minify:
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin()
            ]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ]
    };

    return configuration;
};
