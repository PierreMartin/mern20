const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common.config');

module.exports = (env = {}) => {
    const isServerSide = env.server;

    const configuration = merge(commonConfig, {
        mode: 'production',
        devtool: 'source-map',
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

        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(), // Css minify
                new TerserPlugin() // Js minify
            ]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ]
    });

    return configuration;
};
