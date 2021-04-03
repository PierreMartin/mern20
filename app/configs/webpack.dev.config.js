const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common.config');

module.exports = (env = {}) => {
    const isClientSide = env.client;
    const isServerSide = env.server;

    const configuration = merge(commonConfig, {
        mode: 'development',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ['babel-loader']
                },
                {
                    test: [/\.less$/, /\.css$/],
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'postcss-preset-env', // autoprefix css + browserslist
                                            {
                                                browsers: 'last 2 versions'
                                            }
                                        ],
                                        require('tailwindcss'),
                                        require('autoprefixer')
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + './../public/index.html',
                filename: './index.html',
                // inject: 'body'
            })
        ]
    });

    if (isClientSide) {
        configuration.devServer = {
            inline: true,
            port: 3000,
            hot: true,
            historyApiFallback: true
            // Proxy backend requests to Express server
            /*
            proxy: {
                "/api/!*": {
                    target: "http://localhost:3080",
                        secure: false
                }
            }
            */
        };
    }

    return configuration;
};
